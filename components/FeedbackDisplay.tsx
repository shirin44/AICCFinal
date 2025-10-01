import React from "react";
import type { StarFeedback } from "../types"; // adjust path if needed
import StarRating from "./StarRating";
import StarMethodIcon from "./icons/StarMethodIcon";
import LightbulbIcon from "./icons/LightbulbIcon";

type StarComponent = "situation" | "task" | "action" | "result";

const FeedbackDisplay: React.FC<{
  feedback: StarFeedback;
  suggestions: Partial<Record<StarComponent, string>>;
  isFetchingSuggestions: boolean;
}> = ({ feedback, suggestions, isFetchingSuggestions }) => {
  const items: {
    label: string;
    data: { score: number; feedback: string; strengths?: string[] };
    icon: StarComponent;
    suggestion?: string;
    classes: string;
    headText: string;
  }[] = [
    { label: "Situation", data: feedback.situation, icon: "situation", suggestion: suggestions.situation, classes: "border-sky-300 bg-sky-50", headText: "text-sky-900" },
    { label: "Task",      data: feedback.task,      icon: "task",      suggestion: suggestions.task,      classes: "border-violet-300 bg-violet-50", headText: "text-violet-900" },
    { label: "Action",    data: feedback.action,    icon: "action",    suggestion: suggestions.action,    classes: "border-emerald-300 bg-emerald-50", headText: "text-emerald-900" },
    { label: "Result",    data: feedback.result,    icon: "result",    suggestion: suggestions.result,    classes: "border-amber-300 bg-amber-50",     headText: "text-amber-900" },
  ];

  const copyRevised = async () => {
    if (!feedback.overall?.revisedAnswer) return;
    try {
      await navigator.clipboard.writeText(feedback.overall.revisedAnswer);
    } catch { /* noop */ }
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-xl shadow-lg overflow-hidden border border-slate-300 bg-white">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="font-display font-bold text-2xl">Overall Feedback</h3>
          <StarRating score={feedback.overall.score} size="w-6 h-6" />
        </div>
        <div className="p-6">
          <p className="text-lg text-slate-900">{feedback.overall.feedback}</p>

          {feedback.overall.strengths?.length ? (
            <div className="mt-4">
              <h5 className="font-bold text-sm text-emerald-700">Top strengths:</h5>
              <ul className="list-disc ml-5 text-sm text-slate-800">
                {feedback.overall.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
              </ul>
            </div>
          ) : null}

          {feedback.overall.revisedAnswer ? (
            <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h5 className="font-bold text-sm text-slate-900">Revised answer (try saying this):</h5>
              <p className="mt-2 text-slate-800 italic">{feedback.overall.revisedAnswer}</p>
              <button
                type="button"
                onClick={copyRevised}
                className="mt-3 px-3 py-1.5 text-sm bg-white text-slate-900 rounded border border-slate-300 hover:bg-slate-100"
              >
                Copy
              </button>
            </div>
          ) : null}
        </div>
      </div>

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
              <p className="text-slate-800">{item.data.feedback}</p>

              {item.data.strengths?.length ? (
                <div className="mt-3">
                  <h5 className="font-bold text-sm text-emerald-900">What you did well:</h5>
                  <ul className="list-disc ml-5 text-sm text-slate-800">
                    {item.data.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                  </ul>
                </div>
              ) : null}

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

      {isFetchingSuggestions && (
        <div className="text-center text-slate-800 mt-4 motion-safe:animate-pulse">
          Generating specific examples...
        </div>
      )}
    </div>
  );
};

export default FeedbackDisplay;
