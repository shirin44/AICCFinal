import React, { useState } from "react";
import type { StarFeedback } from "../types";
import StarRating from "./StarRating";
import StarMethodIcon from "./icons/StarMethodIcon";
import LightbulbIcon from "./icons/LightbulbIcon";

type StarComponent = "situation" | "task" | "action" | "result";

const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded bg-slate-200 ${className}`} aria-hidden />
);

const SuggestionSkeleton: React.FC = () => (
  <div className="mt-3 pt-3 border-t border-dashed border-slate-300 space-y-2" aria-label="Loading suggestion…">
    <Skeleton className="h-3 w-32" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
  </div>
);

const FeedbackDisplay: React.FC<{
  feedback: StarFeedback;
  suggestions: Partial<Record<StarComponent, string>>;
  isFetchingSuggestions: boolean;
}> = ({ feedback, suggestions, isFetchingSuggestions }) => {
  const [copiedRevised, setCopiedRevised] = useState(false);

  const items: {
    label: string;
    data: { score: number; feedback: string; strengths?: string[] };
    icon: StarComponent;
    suggestion?: string;
    classes: string;
    headText: string;
    needsSuggestion: boolean;
  }[] = [
    { label: "Situation", data: feedback.situation, icon: "situation", suggestion: suggestions.situation, classes: "border-sky-300 bg-sky-50",       headText: "text-sky-900",     needsSuggestion: (feedback.situation?.score ?? 5) < 4 },
    { label: "Task",      data: feedback.task,      icon: "task",      suggestion: suggestions.task,      classes: "border-violet-300 bg-violet-50", headText: "text-violet-900",  needsSuggestion: (feedback.task?.score ?? 5) < 4 },
    { label: "Action",    data: feedback.action,    icon: "action",    suggestion: suggestions.action,    classes: "border-emerald-300 bg-emerald-50",headText: "text-emerald-900", needsSuggestion: (feedback.action?.score ?? 5) < 4 },
    { label: "Result",    data: feedback.result,    icon: "result",    suggestion: suggestions.result,    classes: "border-amber-300 bg-amber-50",    headText: "text-amber-900",   needsSuggestion: (feedback.result?.score ?? 5) < 4 },
  ];

  const copyRevised = async () => {
    if (!feedback.overall?.revisedAnswer) return;
    try {
      await navigator.clipboard.writeText(feedback.overall.revisedAnswer);
      setCopiedRevised(true);
      setTimeout(() => setCopiedRevised(false), 2000);
    } catch { /* noop */ }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Overall feedback card */}
      <div className="rounded-xl shadow-lg overflow-hidden border border-slate-300 bg-white">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="font-display font-bold text-2xl">Overall Feedback</h3>
          <StarRating score={feedback.overall.score} size="w-6 h-6" />
        </div>
        <div className="p-6 space-y-4">
          <p className="text-lg text-slate-900 leading-relaxed">{feedback.overall.feedback}</p>

          {feedback.overall.strengths?.length ? (
            <div>
              <h5 className="font-bold text-sm text-emerald-700 mb-1">Top strengths:</h5>
              <ul className="list-disc ml-5 text-sm text-slate-800 space-y-0.5">
                {feedback.overall.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
              </ul>
            </div>
          ) : null}

          {feedback.overall.revisedAnswer ? (
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h5 className="font-bold text-sm text-slate-900 mb-2">Revised answer (try saying this):</h5>
              <p className="text-slate-800 italic leading-relaxed">{feedback.overall.revisedAnswer}</p>
              <button
                type="button"
                onClick={copyRevised}
                className="mt-3 px-3 py-1.5 text-sm bg-white text-slate-900 rounded border border-slate-300 hover:bg-slate-100 transition-colors"
              >
                {copiedRevised ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* STAR breakdown grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.label} className={`rounded-xl shadow-md overflow-hidden border ${item.classes}`}>
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <StarMethodIcon type={item.icon} className={`w-7 h-7 ${item.headText}`} />
                <h4 className={`font-display font-bold text-lg ${item.headText}`}>{item.label}</h4>
              </div>
              <StarRating score={item.data.score} />
            </div>

            <div className="p-4 bg-white border-t border-slate-200">
              <p className="text-slate-800 leading-relaxed">{item.data.feedback}</p>

              {item.data.strengths?.length ? (
                <div className="mt-3">
                  <h5 className="font-bold text-sm text-emerald-900">What you did well:</h5>
                  <ul className="list-disc ml-5 text-sm text-slate-800 space-y-0.5 mt-1">
                    {item.data.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                  </ul>
                </div>
              ) : null}

              {/* Show skeleton while fetching, suggestion when ready */}
              {item.needsSuggestion && !item.suggestion && isFetchingSuggestions && (
                <SuggestionSkeleton />
              )}

              {item.suggestion && (
                <div className="mt-3 pt-3 border-t border-dashed border-slate-300">
                  <h5 className="flex items-center font-bold text-sm text-amber-900">
                    <LightbulbIcon className="w-4 h-4 mr-1.5 text-amber-600" />
                    Example for Improvement:
                  </h5>
                  <p className="text-sm text-slate-800 italic mt-1 pl-1">"{item.suggestion}"</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackDisplay;
