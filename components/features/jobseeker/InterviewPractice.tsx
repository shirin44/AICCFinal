import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "@/App";
import { DIALOGUE } from "@/constants";
import type { StarFeedback } from "@/types";
import VoiceInputButton from "@/components/VoiceInputButton";
import Tooltip from "@/components/Tooltip";
import { addHistoryEntry, type PracticeType as HistoryPracticeType } from "@/utils/History";
import StarRating from "@/components/StarRating";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import SavedQuestionsList from "@/components/SavedQuestionsList";
import QuestionControls from "@/components/QuestionControls";
import BookmarkIcon from "@/components/icons/BookmarkIcon";

import { loadSavedQuestions, saveQuestion, removeSavedQuestion, isQuestionSaved, type SavedQuestion } from "@/utils/savedQuestions";

import { getInterviewFeedback, getImprovementSuggestion } from "@/services/geminiService";

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
  const { language, setNarratorDialogue, setNarratorState } = useContext(AppContext);

  const [flowStep, setFlowStep] = useState<FlowStep>("setup");
  const [practiceType, setPracticeType] = useState<PracticeType>("STAR Interview");

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<StarFeedback | null>(null);
  const [suggestions, setSuggestions] = useState<Partial<Record<StarComponent, string>>>({});
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCalmMode, setIsCalmMode] = useState(false);

  const [saved, setSaved] = useState<SavedQuestion[]>([]);

  useEffect(() => {
    setSaved(loadSavedQuestions());
  }, []);

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
        setNarratorState(feedback?.overall.score && feedback.overall.score >= 4 ? "celebrating" : "explaining");
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
    setQuestions([q, ...questionSets["STAR Interview"].filter((x) => x !== q)]);
    setCurrentQuestionIndex(0);
    setAnswer("");
    setFeedback(null);
    setSuggestions({});
    setError("");
    setFlowStep("practice");
  };

  const currentQuestion = questions[currentQuestionIndex] || "";
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === Math.max(0, questions.length - 1);
  const isBookmarked = currentQuestion ? isQuestionSaved(currentQuestion, saved) : false;

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
      setError("Please provide an answer.");
      return;
    }
    setIsLoading(true);
    setError("");
    setSuggestions({});
  
    try {
      const fb = await getInterviewFeedback(currentQuestion, answer);
      setFeedback(fb);
      setFlowStep("summary");
  
      // --- NEW: save compact session history entry ---
      addHistoryEntry({
        type: practiceType,                  // "STAR Interview" | "Common Questions" | "Small Talk"
        question: currentQuestion,
        overallScore: fb.overall?.score ?? 0,
        // keep payload small (optional)
        answer: answer.length > 1000 ? `${answer.slice(0, 1000)}…` : answer,
        feedback: fb.overall ? { overall: fb.overall } : undefined,
      });
      // --- end new code ---
  
      const toImprove: StarComponent[] = (Object.keys(fb) as (keyof StarFeedback)[])
        .filter((k) => k !== "overall" && (fb as any)[k]?.score < 4)
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
        setSuggestions(settled.reduce((acc, cur) => ({ ...acc, ...cur }), {}));
        setIsFetchingSuggestions(false);
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
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
      alert("You've completed all questions in this set!");
      resetPractice();
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

  /* -------------------------------- Render -------------------------------- */
  if (flowStep === "setup") {
    return (
      <div>
        <h2 className="font-display text-3xl font-extrabold mb-4 text-black tracking-tight">
          Choose Your Practice Type
        </h2>

        <p className="mb-6 text-slate-800">Choose how you'd like to practice today.</p>

        <div className="space-y-4">
          {(Object.keys(questionSets) as PracticeType[]).map((type) => (
            <button
              key={type}
              onClick={() => startPractice(type)}
              className="w-full text-left p-6 bg-white border border-slate-300 rounded-lg shadow-sm
                         hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <h3 className="font-semibold text-lg text-slate-900">{type}</h3>
              <p className="text-sm text-slate-800">
                Practice with common {type.toLowerCase()} questions.
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3 p-3 bg-slate-100 rounded-lg border border-slate-300">
          <input
            type="checkbox"
            id="calm-mode"
            checked={isCalmMode}
            onChange={() => setIsCalmMode(!isCalmMode)}
            className="h-5 w-5 rounded text-blue-700 border-slate-400 focus:ring-blue-600"
          />
          <div>
            <label htmlFor="calm-mode" className="font-semibold text-slate-900">
              Enable Calm Practice Mode
            </label>
            <p className="text-sm text-slate-800">Slower pace with breathing reminders.</p>
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

  // practice / summary
  return (
    <div>
      <button
        onClick={resetPractice}
        className="mb-4 text-sm font-semibold text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
      >
        &larr; Back to Setup
      </button>

      <div className="p-4 bg-white rounded-lg border border-slate-300">
        <p className="font-semibold text-blue-700 flex items-center">
          Question {currentQuestionIndex + 1}/{questions.length}
          {isBookmarked && (
            <span className="ml-2 inline-flex items-center text-amber-700 text-sm">
              <BookmarkIcon filled className="w-4 h-4 mr-1 text-amber-600" />
              Saved
            </span>
          )}
        </p>
        <p className="text-lg text-slate-900">{currentQuestion}</p>
      </div>

      {isCalmMode && (
        <div className="my-4 p-3 bg-sky-50 text-slate-900 rounded-lg text-center font-medium border border-sky-200">
          Take a deep breath. You're doing great.
        </div>
      )}

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="answer" className="block text-lg font-medium text-slate-900">
            Your Answer:
          </label>
          <VoiceInputButton onTextReceived={handleVoiceInput} />
        </div>
        <textarea
          id="answer"
          rows={10}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type or use the microphone to speak your answer..."
          className="w-full p-3 bg-white text-slate-900 placeholder:text-slate-600
                     border border-slate-300 rounded-lg
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          disabled={isLoading || flowStep === "summary"}
          maxLength={MAX_ANSWER_LENGTH}
          aria-invalid={!!error}
        />
        <div className={`text-right text-sm mt-1 ${answer.length > MAX_ANSWER_LENGTH - 100 ? "text-red-700" : "text-slate-800"}`}>
          {answer.length} / {MAX_ANSWER_LENGTH}
        </div>
      </div>

      {error && <p className="mt-2 text-red-700">{error}</p>}

      {flowStep === "summary" && feedback && (
        <div className="mt-8">
          <h3 className="font-display text-2xl font-bold mb-4 text-slate-900">Session Summary</h3>
          <FeedbackDisplay
            feedback={feedback}
            suggestions={suggestions}
            isFetchingSuggestions={isFetchingSuggestions}
          />
        </div>
      )}

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
