// src/components/jobseeker/interview/InterviewPractice.tsx
import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "@/App";
import { DIALOGUE } from "@/constants";
import type { StarFeedback } from "@/types";
import { Language } from "@/types";

import VoiceInputButton from "@/components/VoiceInputButton";
import Tooltip from "@/components/Tooltip";
import {
  addHistoryEntry,
  type PracticeType as HistoryPracticeType,
} from "@/utils/History";
import StarRating from "@/components/StarRating";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import SavedQuestionsList from "@/components/SavedQuestionsList";
import QuestionControls from "@/components/QuestionControls";
import BookmarkIcon from "@/components/icons/BookmarkIcon";

import {
  loadSavedQuestions,
  saveQuestion,
  removeSavedQuestion,
  isQuestionSaved,
  type SavedQuestion,
} from "@/utils/savedQuestions";

import {
  getInterviewFeedback,
  getImprovementSuggestion,
} from "@/services/geminiService";

import { INTERVIEW_PRACTICE_CONTENT } from "@/constants/jobseeker/interviewPracticeContent";

// Heroicons (or similar icon library)
import {
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  ArrowLeftIcon,
  HeartIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";

type FlowStep = "setup" | "practice" | "summary";
type PracticeType = "STAR Interview" | "Common Questions" | "Small Talk";
type StarComponent = "situation" | "task" | "action" | "result";

const MAX_ANSWER_LENGTH = 2000;

const questionSets: Record<PracticeType, string[]> = {
  "STAR Interview": [
    "Tell me about a time you worked effectively under pressure.",
    "Describe a situation where you had to work with a difficult coworker.",
    "Give an example of a goal you reached and tell me how you achieved it.",
    "Tell me about a time you made a mistake. What did you do to correct it?",
  ],
  "Common Questions": [
    "Tell me about yourself.",
    "What are your biggest strengths?",
    "What are your biggest weaknesses?",
    "Why do you want to work here?",
  ],
  "Small Talk": [
    "How was your weekend?",
    "Do you have any plans for the upcoming holiday?",
    "What do you enjoy doing outside of work?",
  ],
};

const InterviewPractice: React.FC = () => {
  const { language, setNarratorDialogue, setNarratorState } =
    useContext(AppContext);

  const [flowStep, setFlowStep] = useState<FlowStep>("setup");
  const [practiceType, setPracticeType] =
    useState<PracticeType>("STAR Interview");

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<StarFeedback | null>(null);
  const [suggestions, setSuggestions] = useState<
    Partial<Record<StarComponent, string>>
  >({});
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCalmMode, setIsCalmMode] = useState(false);

  const [saved, setSaved] = useState<SavedQuestion[]>([]);

  // language helper
  const langKey = language === "en" ? Language.EN : Language.VN;
  const t = <K extends keyof typeof INTERVIEW_PRACTICE_CONTENT>(key: K) =>
    INTERVIEW_PRACTICE_CONTENT[key][langKey];

  const practiceLabel = (type: PracticeType) =>
    INTERVIEW_PRACTICE_CONTENT.practiceTypeLabel[langKey][type];

  const practiceDescription = (type: PracticeType) =>
    INTERVIEW_PRACTICE_CONTENT.practiceTypeDescription[langKey][type];

  useEffect(() => {
    setSaved(loadSavedQuestions());
  }, []);

  // Narrator dialogue / avatar state
  useEffect(() => {
    let dialogueKey = "";
    switch (flowStep) {
      case "setup":
        dialogueKey = "jobseekerSetup";
        setNarratorState("pointing");
        break;
      case "practice":
        dialogueKey = "jobseekerPractice";
        setNarratorState("idle");
        break;
      case "summary":
        dialogueKey =
          feedback?.overall.score && feedback.overall.score >= 4
            ? "jobseekerSummary"
            : "jobseekerFeedback";
        setNarratorState(
          feedback?.overall.score && feedback.overall.score >= 4
            ? "celebrating"
            : "explaining"
        );
        break;
    }
    if (dialogueKey) setNarratorDialogue(DIALOGUE[dialogueKey][language]);
  }, [flowStep, language, setNarratorDialogue, feedback, setNarratorState]);

  useEffect(() => {
    if (isLoading) setNarratorState("thinking");
  }, [isLoading, setNarratorState]);

  const startPractice = (type: PracticeType) => {
    setPracticeType(type);
    setQuestions(questionSets[type]);
    setCurrentQuestionIndex(0);
    setAnswer("");
    setFeedback(null);
    setSuggestions({});
    setError("");
    setFlowStep("practice");
  };

  const startFromSaved = (q: string) => {
    setPracticeType("STAR Interview");
    setQuestions([
      q,
      ...questionSets["STAR Interview"].filter((x) => x !== q),
    ]);
    setCurrentQuestionIndex(0);
    setAnswer("");
    setFeedback(null);
    setSuggestions({});
    setError("");
    setFlowStep("practice");
  };

  const currentQuestion = questions[currentQuestionIndex] || "";
  const isFirst = currentQuestionIndex === 0;
  const isLast =
    currentQuestionIndex === Math.max(0, questions.length - 1);
  const isBookmarked = currentQuestion
    ? isQuestionSaved(currentQuestion, saved)
    : false;

  const toggleBookmark = () => {
    if (!currentQuestion) return;
    if (isBookmarked) {
      removeSavedQuestion(currentQuestion);
    } else {
      saveQuestion(currentQuestion);
    }
    setSaved(loadSavedQuestions());
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      setError(t("errorNoAnswer"));
      return;
    }
    setIsLoading(true);
    setError("");
    setSuggestions({});

    try {
      const fb = await getInterviewFeedback(currentQuestion, answer);
      setFeedback(fb);
      setFlowStep("summary");

      // Save compact session history entry
      addHistoryEntry({
        type: practiceType as HistoryPracticeType,
        question: currentQuestion,
        overallScore: fb.overall?.score ?? 0,
        answer:
          answer.length > 1000 ? `${answer.slice(0, 1000)}…` : answer,
        feedback: fb.overall ? { overall: fb.overall } : undefined,
      });

      // Work out which STAR parts need suggestions
      const toImprove: StarComponent[] = (
        Object.keys(fb) as (keyof StarFeedback)[]
      )
        .filter(
          (k) => k !== "overall" && (fb as any)[k]?.score < 4
        )
        .map((k) => k as StarComponent);

      if (toImprove.length > 0) {
        setIsFetchingSuggestions(true);
        const settled = await Promise.all(
          toImprove.map((comp) =>
            getImprovementSuggestion(
              currentQuestion,
              answer,
              (comp.charAt(0).toUpperCase() + comp.slice(1)) as any
            ).then((res) => ({ [comp]: res.suggestion }))
          )
        );
        setSuggestions(
          settled.reduce(
            (acc, cur) => ({ ...acc, ...cur }),
            {} as Partial<Record<StarComponent, string>>
          )
        );
        setIsFetchingSuggestions(false);
      }
    } catch (err: any) {
      setError(t("unknownError"));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForQuestion = (nextIndex: number) => {
    setCurrentQuestionIndex(nextIndex);
    setFlowStep("practice");
    setAnswer("");
    setFeedback(null);
    setError("");
    setSuggestions({});
  };

  const prevQuestion = () => {
    if (isFirst) return;
    resetForQuestion(currentQuestionIndex - 1);
  };

  const nextQuestion = () => {
    if (isLast) {
      // No surprise alert: show a calm inline message instead
      setError(t("endOfSetNotice"));
      return;
    }
    resetForQuestion(currentQuestionIndex + 1);
  };

  const skipQuestion = () => {
    // Skip behaves like next without requiring an answer
    nextQuestion();
  };

  const resetPractice = () => {
    setFlowStep("setup");
    setFeedback(null);
    setSuggestions({});
    setAnswer("");
    setError("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
  };

  const handleVoiceInput = (text: string) => {
    setAnswer((prev) => (prev ? prev.trim() + " " : "") + text);
  };

  /* -------------------------------- Render: SETUP -------------------------------- */

  if (flowStep === "setup") {
    return (
      <div className="space-y-6">
        {/* Step label */}
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          <SparklesIcon className="h-4 w-4" />
          <span>{t("stepLabelSetup")}</span>
        </div>

        <header>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-black tracking-tight">
            {t("chooseTypeTitle")}
          </h2>
          <p className="mt-2 text-slate-800">
            {t("chooseTypeSubtitle")}
          </p>
        </header>

        <div className="space-y-4">
          {(Object.keys(questionSets) as PracticeType[]).map((type) => (
            <button
              key={type}
              onClick={() => startPractice(type)}
              className="w-full text-left p-5 bg-white border border-slate-200 rounded-xl shadow-sm
                         hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                         flex items-start gap-3"
            >
              <div className="mt-1">
                {type === "STAR Interview" && (
                  <SparklesIcon className="h-6 w-6 text-violet-600" />
                )}
                {type === "Common Questions" && (
                  <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600" />
                )}
                {type === "Small Talk" && (
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-teal-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900">
                  {practiceLabel(type)}
                </h3>
                <p className="mt-1 text-sm text-slate-800">
                  {practiceDescription(type)}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <input
            type="checkbox"
            id="calm-mode"
            checked={isCalmMode}
            onChange={() => setIsCalmMode(!isCalmMode)}
            className="mt-1 h-5 w-5 rounded border-slate-400 text-blue-700 focus:ring-blue-600"
          />
          <div>
            <label
              htmlFor="calm-mode"
              className="flex items-center gap-2 font-semibold text-slate-900"
            >
              <HeartIcon className="h-5 w-5 text-rose-500" />
              <span>{t("calmModeLabel")}</span>
            </label>
            <p className="mt-1 text-sm text-slate-800">
              {t("calmModeDescription")}
            </p>
          </div>
        </div>

        <SavedQuestionsList
          saved={saved}
          onPractice={startFromSaved}
          onRemove={(q) => {
            removeSavedQuestion(q);
            setSaved(loadSavedQuestions());
          }}
        />
      </div>
    );
  }

  /* -------------------------------- Render: PRACTICE / SUMMARY -------------------------------- */

  return (
    <div className="space-y-6">
      {/* Top bar: back + step label */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={resetPractice}
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700
                     hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>{t("backToSetup")}</span>
        </button>

        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          <SparklesIcon className="h-4 w-4" />
          <span>
            {flowStep === "summary"
              ? t("stepLabelSummary")
              : t("stepLabelPractice")}
          </span>
        </div>
      </div>

      {/* Question card */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <p className="font-semibold text-blue-700 flex items-center gap-2">
            <span>
              {t("questionLabel")} {currentQuestionIndex + 1}{" "}
              {questions.length > 0 && (
                <>
                  / {questions.length}{" "}
                  <span className="text-slate-700">
                    ({practiceLabel(practiceType)})
                  </span>
                </>
              )}
            </span>
            {isBookmarked && (
              <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 border border-amber-200">
                <BookmarkIcon
                  filled
                  className="w-4 h-4 mr-1 text-amber-600"
                />
                {t("savedBadge")}
              </span>
            )}
          </p>
        </div>

        <p className="text-lg text-slate-900 leading-relaxed">
          {currentQuestion}
        </p>

        {practiceType === "STAR Interview" && (
          <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-3 text-sm text-slate-800">
            <p className="font-semibold mb-1">
              {t("starHintTitle")}
            </p>
            <ul className="space-y-0.5">
              <li>{t("starHintLine1")}</li>
              <li>{t("starHintLine2")}</li>
              <li>{t("starHintLine3")}</li>
              <li>{t("starHintLine4")}</li>
            </ul>
          </div>
        )}
      </section>

      {/* Calm mode banner */}
      {isCalmMode && (
        <div className="flex items-start gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-slate-900">
          <HeartIcon className="h-5 w-5 text-sky-600 mt-0.5" />
          <p>{t("calmModeBanner")}</p>
        </div>
      )}

      {/* Answer input */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="answer"
            className="block text-lg font-medium text-slate-900"
          >
            {t("yourAnswerLabel")}
          </label>
          <div className="flex items-center gap-2">
            <Tooltip
              content={
                language === "en"
                  ? "Use your voice if typing feels tiring."
                  : "Dùng giọng nói nếu bạn thấy gõ phím mệt."
              }
            >
              <div className="inline-flex items-center gap-1 text-sm text-slate-700">
                <MicrophoneIcon className="h-4 w-4" />
                <span>Voice</span>
              </div>
            </Tooltip>
            <VoiceInputButton onTextReceived={handleVoiceInput} />
          </div>
        </div>

        <textarea
          id="answer"
          rows={10}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={t("answerPlaceholder")}
          className="w-full p-3 bg-white text-slate-900 placeholder:text-slate-600
                     border border-slate-300 rounded-lg
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                     leading-relaxed"
          disabled={isLoading}
          maxLength={MAX_ANSWER_LENGTH}
          aria-invalid={!!error}
        />
        <div
          className={`flex justify-between text-xs mt-1 ${
            answer.length > MAX_ANSWER_LENGTH - 100
              ? "text-red-700"
              : "text-slate-700"
          }`}
        >
          <span>
            {answer.length} / {MAX_ANSWER_LENGTH} ·{" "}
            {t("characterCountLabel")}
          </span>
        </div>
      </section>

      {/* Error / calm message */}
      {error && (
        <p className="mt-1 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Summary / feedback */}
      {flowStep === "summary" && feedback && (
        <section className="mt-4">
          <h3 className="font-display text-2xl font-bold mb-4 text-slate-900">
            {t("summaryTitle")}
          </h3>
          <FeedbackDisplay
            feedback={feedback}
            suggestions={suggestions}
            isFetchingSuggestions={isFetchingSuggestions}
          />
        </section>
      )}

      {/* Controls (prev/next/skip/submit/bookmark) */}
      <QuestionControls
        flowStep={flowStep}
        isLoading={isLoading}
        isBookmarked={isBookmarked}
        onSubmit={handleSubmitAnswer}
        onPrev={prevQuestion}
        onSkip={skipQuestion}
        onNext={nextQuestion}
        onToggleBookmark={toggleBookmark}
        isFirst={isFirst}
        isLast={isLast}
      />
    </div>
  );
};

export default InterviewPractice;
