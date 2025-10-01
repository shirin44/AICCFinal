import React from "react";
import Tooltip from "./Tooltip";
import NextArrowIcon from "./icons/NextArrowIcon"; // your existing icon
import CheckIcon from "./icons/CheckIcon";         // your existing icon

interface Props {
  step: "practice" | "summary";
  currentIndex: number;
  total: number;
  isLoading: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
  onSubmit?: () => void;
}

const QuestionNavigator: React.FC<Props> = ({
  step,
  currentIndex,
  total,
  isLoading,
  onPrev,
  onNext,
  onSkip,
  onSubmit,
}) => {
  const isLast = currentIndex >= total - 1;

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-4">
      <Tooltip tip="Go back to the previous question.">
        <button
          onClick={onPrev}
          className="flex-1 px-8 py-4 text-lg bg-white border border-slate-300 text-slate-900 font-bold rounded-lg
                     hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          ← Previous
        </button>
      </Tooltip>

      {step === "practice" && onSubmit && (
        <Tooltip tip="Get instant AI feedback on your answer.">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center px-8 py-4 text-lg
                       bg-blue-700 text-white font-bold rounded-lg shadow-md
                       hover:bg-blue-800 disabled:bg-slate-300
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <CheckIcon className="w-6 h-6 mr-2" />
            {isLoading ? "Getting Feedback..." : "Submit for Feedback"}
          </button>
        </Tooltip>
      )}

      <Tooltip tip="Skip this question and go to the next.">
        <button
          onClick={onSkip}
          className="flex-1 px-8 py-4 text-lg bg-white border border-slate-300 text-slate-900 font-bold rounded-lg
                     hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          Skip →
        </button>
      </Tooltip>

      <Tooltip tip={isLast ? "Finish practice" : "Go to the next question"}>
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center px-8 py-4 text-lg
                     bg-slate-900 text-white font-bold rounded-lg
                     hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {isLast ? "Finish Practice" : "Next Question"}
          <NextArrowIcon className="w-5 h-5 ml-2" />
        </button>
      </Tooltip>
    </div>
  );
};

export default QuestionNavigator;
