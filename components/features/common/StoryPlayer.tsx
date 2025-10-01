import React, { useState, useContext, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Story, StoryChoice, StoryScene } from '../../../types';
import { AppContext } from '../../../App';
import { LOCALIZED_CONTENT } from '@/constants';
import CheckIcon from '../../icons/CheckIcon';
import { Star, Lightbulb, Target } from 'lucide-react';
import { getStoryFeedback } from '../../../services/geminiService';
import { Language } from '@/types';
import { CHARACTER_INTROS, CharacterIntro } from '@/constants/CharacterIntros';

/* =========================
   i18n helpers (robust)
   ========================= */
const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === 'vi' || l === 'VN' ? Language.VN : Language.EN;

const pick = <T extends Record<Language, string> | undefined>(obj: T, lang: Language) =>
  obj?.[lang] ?? obj?.[Language.EN] ?? '';

/* =========================
   UX constants
   ========================= */
const AFFIRMATION_MS = 7000; // narrator “talks” for 7s

/* =========================
   Text helpers (no emojis)
   ========================= */
const stripEmoji = (s: string) =>
  (s ?? '')
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0F\u200D]/gu, '')
    .replace(/^[\s*#♪★☆⭐✨⚠️ℹ️✅❗❕❓✳️✴️☑️➕➖➗✔️✖️•◆◇◉◈]+/u, '')
    .trim();

const pickIcon = (raw: string) => {
  const t = raw?.toLowerCase() ?? '';
  if (/[💡]|lightbulb|idea|tip/.test(t)) return 'idea';
  return 'star';
};

/* =========================
   Side Progress Bar
   ========================= */
interface SideProgressBarProps {
  scenes: StoryScene[];
  activeSceneIndex: number;
  completedScenes: boolean[];
  onNodeClick: (index: number) => void;
}
const SideProgressBar: React.FC<SideProgressBarProps> = ({
  scenes,
  activeSceneIndex,
  completedScenes,
  onNodeClick,
}) => (
  <div className="sticky top-24 h-full">
    <div className="relative h-full py-4">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-foreground/20" />
      <div className="relative flex flex-col items-center justify-between h-full space-y-8">
        {scenes.map((_, index) => {
          const isActive = index === activeSceneIndex;
          const isCompleted = completedScenes[index];
          return (
            <button
              key={index}
              type="button"
              onClick={() => onNodeClick(index)}
              className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Go to Scene ${index + 1}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                className={`absolute w-full h-full rounded-full ${isActive ? 'bg-primary/30 animate-progress-node-pulse' : ''}`}
              />
              <span
                className={`relative w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted ? 'bg-primary' : isActive ? 'bg-primary' : 'bg-foreground/30'
                }`}
              >
                {isCompleted && <CheckIcon className="w-3 h-3 text-primary-foreground" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

/* =========================
   Choice Button
   ========================= */
interface ChoiceButtonProps {
  choice: StoryChoice;
  label: string;
  isSelected: boolean;
  isMultiSelect: boolean;
  onClick: () => void;
}
const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  label,
  isSelected,
  isMultiSelect,
  onClick,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onClick();
    }
  };

  const base =
    'w-full text-left flex items-start p-4 rounded-lg border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring';
  const selected =
    'bg-primary border-primary shadow-lg text-primary-foreground transform scale-105';
  const unselected = 'bg-card hover:bg-muted border-border text-card-foreground';

  const indicatorBase = 'flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors';
  const indicator = isMultiSelect
    ? `w-6 h-6 rounded-md border-2 ${isSelected ? 'border-primary-foreground bg-primary-foreground' : 'border-primary'}`
    : `w-6 h-6 rounded-full border-2 ${isSelected ? 'border-primary-foreground' : 'border-primary'}`;

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isMultiSelect ? 'checkbox' : 'radio'}
      aria-checked={isSelected}
      aria-label={label}
      className={`${base} ${isSelected ? selected : unselected}`}
    >
      <span className={`${indicatorBase} ${indicator}`}>
        {isMultiSelect ? (isSelected ? <CheckIcon className="w-4 h-4 text-primary" /> : null) : isSelected ? <span className="w-3 h-3 bg-primary-foreground rounded-full" /> : null}
      </span>
      <span className="ml-4 flex-1">{label}</span>
    </button>
  );
};

/* =========================
   Main Story Player
   ========================= */
interface StoryPlayerProps {
  story: Story;
}
const StoryPlayer: React.FC<StoryPlayerProps> = ({ story }) => {
  const { language, narratorRole, setNarratorDialogue, setNarratorState, setMode } =
    useContext(AppContext);
  const lang = normalizeLang(language);
  const navigate = useNavigate();

  const [userSelections, setUserSelections] = useState<Record<number, string[]>>({});
  const [affirmations, setAffirmations] = useState<Record<number, string | null>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showReflections, setShowReflections] = useState(false);

  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const affirmationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Keep refs in sync with scene count */
  useEffect(() => {
    sceneRefs.current = sceneRefs.current.slice(0, story.scenes.length);
  }, [story.scenes]);

  /* Track which scene is in view */
  useEffect(() => {
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sceneRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) setActiveSceneIndex(index);
          }
        }
      },
      { rootMargin: '-40% 0px -60% 0px', threshold: 0.1 }
    );
    observerRef.current = observer;

    sceneRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [story.scenes.length]);

  /* Narrator + AI when finished */
  useEffect(() => {
    if (isFinished) {
      setNarratorDialogue(pick(story.closingAffirmation as any, lang));
      setNarratorState('celebrating');

      (async () => {
        try {
          setAiLoading(true);
          const result = await getStoryFeedback(userSelections, story, lang);
          setAiFeedback(result.feedback || '');
        } catch (err) {
          console.error('AI feedback error:', err);
          setAiFeedback('');
        } finally {
          setAiLoading(false);
        }
      })();
    } else {
      setNarratorDialogue('');
      setNarratorState('idle');
    }

    return () => {
      if (affirmationTimeoutRef.current) clearTimeout(affirmationTimeoutRef.current);
    };
  }, [isFinished, lang, setNarratorDialogue, setNarratorState, story, userSelections]);

  /* Selection handling */
  const handleSelection = (sceneIndex: number, choice: StoryChoice) => {
    const choiceText = pick((choice as any).text, lang);
    const currentChoices = userSelections[sceneIndex] || [];
    const isMultiSelect = (story.scenes[sceneIndex] as any).choices.some((c: any) => c.isMultiSelect);

    let newChoices: string[] = [];
    let affirmationToShow: string | null = null;

    if (isMultiSelect) {
      if (currentChoices.includes(choiceText)) {
        // unselect
        newChoices = currentChoices.filter((c) => c !== choiceText);
        if (newChoices.length > 0) {
          const lastSelectedText = newChoices[newChoices.length - 1];
          const lastChoice = (story.scenes[sceneIndex] as any).choices.find(
            (c: any) => pick(c.text, lang) === lastSelectedText
          );
          affirmationToShow = lastChoice ? pick(lastChoice.affirmation, lang) : null;
        }
      } else {
        // select additional
        newChoices = [...currentChoices, choiceText];
        affirmationToShow = pick((choice as any).affirmation, lang) || null;
      }
    } else {
      // radio-like single select
      newChoices = [choiceText];
      affirmationToShow = pick((choice as any).affirmation, lang) || null;
    }

    setUserSelections((prev) => ({ ...prev, [sceneIndex]: newChoices }));
    setAffirmations((prev) => ({ ...prev, [sceneIndex]: affirmationToShow }));

    if (affirmationTimeoutRef.current) clearTimeout(affirmationTimeoutRef.current);
    if (affirmationToShow) {
      const dialogueText = stripEmoji(affirmationToShow);
      setNarratorDialogue(dialogueText);
      setNarratorState('talking');
      affirmationTimeoutRef.current = setTimeout(() => {
        setNarratorDialogue('');
        setNarratorState('idle');
      }, AFFIRMATION_MS);
    } else {
      setNarratorDialogue('');
      setNarratorState('idle');
    }
  };

  /* Finish / navigation handlers */
  const finishStory = () => {
    setIsFinished(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPractice = () => {
    setMode('practice');
    navigate('/dashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/mode-selection');
  };

  const handleScrollToScene = (index: number) => {
    sceneRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  /* Derived state */
  const completedScenes = useMemo(
    () => story.scenes.map((_, i) => (userSelections[i] || []).length > 0),
    [story.scenes, userSelections]
  );
  const isAllScenesCompleted = useMemo(
    () => completedScenes.every(Boolean),
    [completedScenes]
  );

  /* i18n labels */
  const L = LOCALIZED_CONTENT;
  const BACK_TO_DASHBOARD = (L as any)?.backToDashboard?.[lang] ?? 'Back to Dashboard';

  /* Character Intro (photo + intro + goal) */
  const renderIntro = () => {
    const ci: CharacterIntro | undefined = narratorRole ? (CHARACTER_INTROS as any)[narratorRole] : undefined;

    // Fallback intro synthesis
    const synthesizedIntro =
      ci && !ci.intro
        ? (() => {
            const parts: string[] = [];
            const name = pick(ci.name, lang);
            const age = ci.age ? `${ci.age}` : '';
            const city = pick(ci.city, lang);
            const role = pick(ci.roleLabel, lang);

            if (name) {
              parts.push(
                lang === Language.VN
                  ? `Bạn là ${name}${age ? `, ${age} tuổi` : ''}${city ? `, sống ở ${city}` : ''}.`
                  : `You are ${name}${age ? `, ${age} years old` : ''}${city ? `, living in ${city}` : ''}.`
              );
            }
            if (role) {
              parts.push(lang === Language.VN ? `Vai trò: ${role}.` : `Role: ${role}.`);
            }
            parts.push(lang === Language.VN ? "Hãy theo dõi câu chuyện để tìm hiểu thêm." : "Follow this story to learn more.");
            return parts.join(' ');
          })()
        : undefined;

    const introText = ci?.intro ? pick(ci.intro, lang) : synthesizedIntro || pick(story.description as any, lang);
    const goalText = ci?.goal ? pick(ci.goal, lang) : '';
    const GOAL_PREFIX = lang === Language.VN ? "Khi theo dõi câu chuyện này, bạn sẽ" : "By going through this story, you'll";

    return (
      <div className="p-6 bg-muted/40 rounded-xl border border-border shadow-sm">
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-border shadow-sm bg-muted">
              {ci?.avatar ? (
                <img
                  src={ci.avatar}
                  alt={ci?.alt ? pick(ci.alt, lang) : `Portrait`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  No photo
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {pick(story.title as any, lang)}
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {introText}
            </p>

            {!!goalText && (
              <div className="mt-4 px-4 py-3 rounded-lg border border-primary/30 bg-primary/5 text-foreground">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 mt-0.5 text-primary" aria-hidden="true" />
                  <p className="text-base">
                    <span className="font-semibold">{GOAL_PREFIX}:</span> {goalText}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* Finished UI */
  if (isFinished) {
    const closingRaw = pick(story.closingAffirmation as any, lang);
    const closingIcon = pickIcon(closingRaw);
    const closingText = stripEmoji(closingRaw);

    return (
      <div className="w-full text-center p-8 md:p-16 bg-gradient-to-b from-primary/10 to-background rounded-2xl shadow-xl border border-primary/20 animate-fadeInUp">
        <div className="mb-6 animate-pulse-calm" style={{ animationIterationCount: 1, animationDuration: '2s' }} aria-hidden="true">
          {closingIcon === 'idea' ? (
            <Lightbulb className="w-20 h-20 mx-auto text-primary/70" strokeWidth={2.2} />
          ) : (
            <Star className="w-20 h-20 mx-auto text-primary/70" strokeWidth={2.2} />
          )}
        </div>

        <h2 className="font-display text-4xl font-bold text-foreground">
          {`You've completed "${pick(story.title as any, lang)}"`}
        </h2>
        <p className="mt-4 text-2xl font-medium text-foreground/80 max-w-3xl mx-auto">
          {closingText}
        </p>

        {/* Collapsible Reflections */}
        <div className="mt-12 text-left max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => setShowReflections((prev) => !prev)}
            className="flex items-center justify-between w-full px-4 py-3 bg-card border border-border rounded-lg shadow-sm hover:bg-muted transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-expanded={showReflections}
            aria-controls="reflections-panel"
          >
            <span className="text-lg font-semibold text-foreground">
              {showReflections ? (L as any).hideChoices?.[lang] || 'Hide Your Choices' : (L as any).viewChoices?.[lang] || 'View Your Choices'}
            </span>
            <span className="text-sm text-muted-foreground">{showReflections ? '▲' : '▼'}</span>
          </button>

          {showReflections && (
            <ul id="reflections-panel" className="mt-4 space-y-4">
              {story.scenes.map((scene, idx) => (
                <li key={idx} className="p-4 bg-card rounded-lg border border-border shadow-sm">
                  <h4 className="font-semibold text-lg text-card-foreground">
                    {pick((scene as any).title, lang)}
                  </h4>
                  <p className="text-sm text-muted-foreground">{pick((scene as any).text, lang)}</p>
                  <div className="mt-2">
                    <span className="text-sm font-semibold text-primary">
                      {(L as any).yourChoice?.[lang] || 'Your choice:'}
                    </span>
                    <ul className="list-disc list-inside text-card-foreground mt-1">
                      {(userSelections[idx] || []).map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* AI feedback */}
        {aiLoading && (
          <p className="mt-8 text-muted-foreground">
            {(L as any).generatingFeedback?.[lang] || 'Generating feedback…'}
          </p>
        )}
        {aiFeedback && !aiLoading && (
          <div className="mt-12 max-w-3xl mx-auto p-6 bg-muted/50 rounded-xl border border-border shadow-inner text-left">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              {(L as any).aiFeedback?.[lang] || 'Feedback'}
            </h3>
            <p className="text-foreground/90 whitespace-pre-line">{aiFeedback}</p>
          </div>
        )}

        <div className="my-10 h-px w-2/3 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleStartPractice}
            className="px-12 py-4 bg-primary text-primary-foreground font-bold rounded-full text-xl transform hover:scale-105 transition-all duration-300 shadow-lg ring-4 ring-primary/30 hover:ring-primary/50"
          >
            {pick((L as any).startPractice, lang)}
          </button>
          <button
            type="button"
            onClick={handleBackToDashboard}
            className="px-12 py-4 rounded-full text-xl font-semibold border-2 border-border bg-card text-card-foreground hover:bg-muted transition-all duration-200 shadow-sm"
          >
            {BACK_TO_DASHBOARD}
          </button>
        </div>
      </div>
    );
  }

  /* In-progress UI */
  return (
    <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-8 md:gap-12 animate-fadeIn">
      {/* Left Column: Progress Bar */}
      <div className="hidden md:block">
        <SideProgressBar
          scenes={story.scenes}
          activeSceneIndex={activeSceneIndex}
          completedScenes={completedScenes}
          onNodeClick={handleScrollToScene}
        />
      </div>

      {/* Right Column: Story Content */}
      <div className="space-y-16">
        {renderIntro()}

        {story.scenes.map((scene, sceneIndex) => {
          const isMultiSelect = (scene as any).choices.some((c: any) => c.isMultiSelect);
          const options = isMultiSelect ? (scene as any).choices.slice(1) : (scene as any).choices;

          const rawAff = affirmations[sceneIndex];
          const affText = rawAff ? stripEmoji(rawAff) : '';
          const affIcon = rawAff ? pickIcon(rawAff) : 'star';

          return (
            <div key={sceneIndex} ref={(el) => { sceneRefs.current[sceneIndex] = el; }}>
              <div className="mb-6 p-6 bg-card rounded-lg border border-border shadow-md relative overflow-hidden border-t-4 border-t-primary">
                <h2 className="font-display text-2xl font-bold text-card-foreground">
                  {pick((scene as any).title, lang)}
                </h2>
                <p className="mt-2 text-lg text-card-foreground/90">
                  {pick((scene as any).text, lang)}
                </p>
              </div>

              <fieldset>
                <legend className="font-semibold text-lg text-foreground mb-4">
                  {isMultiSelect ? pick((L as any).yourReflectionMulti, lang) : pick((L as any).yourReflection, lang)}
                </legend>

                <div
                  className="space-y-3"
                  role={isMultiSelect ? 'group' : 'radiogroup'}
                  aria-label={isMultiSelect ? pick((L as any).yourReflectionMulti, lang) : pick((L as any).yourReflection, lang)}
                >
                  {options.map((choice: any, choiceIndex: number) => {
                    const label = pick(choice.text, lang);
                    const selected = (userSelections[sceneIndex] || []).includes(label);
                    return (
                      <ChoiceButton
                        key={choiceIndex}
                        choice={choice}
                        label={label}
                        isSelected={selected}
                        isMultiSelect={isMultiSelect}
                        onClick={() => handleSelection(sceneIndex, choice)}
                      />
                    );
                  })}
                </div>
              </fieldset>

              {rawAff && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 p-6 flex items-start space-x-4 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground animate-fadeInUp rounded-xl shadow-2xl border-2 border-accent-foreground/50"
                >
                  <div className="flex-shrink-0">
                    {affIcon === 'idea' ? (
                      <Lightbulb className="w-14 h-14 text-accent-foreground transform -rotate-12" strokeWidth={2.2} />
                    ) : (
                      <Star className="w-14 h-14 text-accent-foreground transform -rotate-12" strokeWidth={2.2} />
                    )}
                  </div>
                  <p className="font-display font-bold text-3xl tracking-tight">{affText}</p>
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-8 border-top border-border">
          <button
            type="button"
            onClick={finishStory}
            disabled={!isAllScenesCompleted}
            className="w-full flex items-center justify-center px-6 py-4 text-lg bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-colors shadow-md disabled:bg-muted disabled:cursor-not-allowed disabled:shadow-none"
          >
            <CheckIcon className="w-6 h-6 mr-2" />
            {pick((LOCALIZED_CONTENT as any).finishStory, lang)}
          </button>
          {!isAllScenesCompleted && (
            <p className="text-center mt-3 text-sm text-foreground/80">
              {(LOCALIZED_CONTENT as any).completeAllScenes?.[lang] || 'Please make a selection in every scene to finish the story.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryPlayer;
