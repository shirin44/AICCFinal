import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Narrator } from '../types';
import { Language } from '../types';
import { AppContext } from '../App';

/* ------- i18n helpers ------- */
const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === 'vi' || l === 'VN' ? Language.VN : Language.EN;

const pick = <T extends Record<Language, string>>(obj: T | undefined, lang: Language) =>
  obj?.[lang] ?? obj?.[Language.EN] ?? '';

interface NarratorCardProps {
  narrator: Narrator;
}

const TALK_MS = 3000; // how long the character "talks" on hover/select

const NarratorCard: React.FC<NarratorCardProps> = ({ narrator }) => {
  const navigate = useNavigate();
  const {
    language,
    setNarratorRole,
    setMode,
    setNarratorDialogue,
    setNarratorState,
  } = React.useContext(AppContext);

  const lang = normalizeLang(language);
  const [isHovered, setIsHovered] = useState(false);
  const speakTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const themeClass = `theme-${narrator.theme}`;
  const avatarSrc = isHovered ? narrator.avatars.happy : narrator.avatars.neutral;

  const clearSpeakTimeout = () => {
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }
  };

  const speak = (text: string, ms = TALK_MS) => {
    // show dialogue + switch to talking state for N ms
    setNarratorDialogue(text);
    setNarratorState('talking'); // make sure your Narrator component listens for 'talking'
    clearSpeakTimeout();
    speakTimeoutRef.current = setTimeout(() => {
      setNarratorDialogue('');
      setNarratorState('idle');
    }, ms);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const line = pick(narrator.hover, lang);
    if (line) speak(line);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // don't hard stop the bubble; let it fade after TALK_MS. If you want instant stop, uncomment:
    // clearSpeakTimeout();
    // setNarratorDialogue('');
    // setNarratorState('idle');
  };

  const handleFocus = () => {
    // keyboard focus acts like hover
    setIsHovered(true);
    const line = pick(narrator.hover, lang);
    if (line) speak(line);
  };

  const handleBlur = () => {
    setIsHovered(false);
  };

  const handleSelect = () => {
    // give a short confirmation line, then navigate
    const line = pick(narrator.selectLine || narrator.hover, lang) || pick(narrator.intro, lang);
    if (line) speak(line, 1200);

    setNarratorRole(narrator.role);
    setMode(null); // Reset mode when selecting a new narrator

    // a tiny delay so the user briefly sees the “talk”
    setTimeout(() => {
      navigate('/mode-selection');
    }, 250);
  };

  // Prefer a localized role label field if your Narrator model has it
  // e.g., narrator.roleLabel?: Record<Language, string>
  const roleLabel =
    pick((narrator as any).roleLabel, lang) ||
    // fallback: if narrator.role is an enum, you might want a mapping
    // otherwise this may show a number
    String(narrator.role);

  return (
    <button
      type="button"
      className={`group relative ${themeClass} bg-card rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-xl cursor-pointer border border-border text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      onClick={handleSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={`${pick(narrator.name, lang)} — ${roleLabel}`}
    >
      {/* Floating hover bubble (still shows even if narrator state text is managed globally) */}
      {isHovered && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max max-w-xs z-10 pointer-events-none">
          <div className="bg-foreground text-background text-sm font-semibold px-4 py-2 rounded-lg shadow-lg animate-fadeInUp">
            {pick(narrator.hover, lang)}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-foreground translate-y-full" />
          </div>
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full flex-shrink-0 bg-muted overflow-hidden ring-4 ring-card">
            <img
              className="h-full w-full object-cover"
              src={avatarSrc}
              alt={`${pick(narrator.name, lang)} avatar`}
            />
          </div>
          <div>
            <div className="font-display text-xl font-bold text-card-foreground">
              {pick(narrator.name, lang)}
            </div>
            <p className="text-sm font-medium text-primary">{roleLabel}</p>
          </div>
        </div>
        <p className="mt-4 text-card-foreground">{pick(narrator.intro, lang)}</p>
      </div>

      <div className="absolute inset-0 bg-primary/90 group-hover:bg-opacity-90 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <span className="text-primary-foreground font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {pick((narrator as any).ctaLabel || { [Language.EN]: 'Select & Begin', [Language.VN]: 'Chọn & Bắt đầu' }, lang)}
        </span>
      </div>
    </button>
  );
};

export default NarratorCard;
