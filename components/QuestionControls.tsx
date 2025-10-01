import React from "react";
import Tooltip from "./Tooltip";
import NextArrowIcon from "./icons/NextArrowIcon";
import CheckIcon from "./icons/CheckIcon";
import BookmarkIcon from "./icons/BookmarkIcon";

type Props = {
  flowStep: "setup" | "practice" | "summary";
  isLoading: boolean;
  isBookmarked: boolean;
  onSubmit: () => void;
  onPrev: () => void;
  onSkip: () => void; // skip = go forward without submitting
  onNext: () => void;
  onToggleBookmark: () => void;
  isFirst: boolean;
  isLast: boolean;
};

const QuestionControls: React.FC<Props> = ({
  flowStep,
  isLoading,
  isBookmarked,
  onSubmit,
  onPrev,
  onSkip,
  onNext,
  onToggleBookmark,
  isFirst,
  isLast,
}) => {
  return (
    <div className="mt-6 flex flex-col gap-3">
      {flowStep === "practice" && (
        <Tooltip tip="Get instant AI feedback on your STAR answer.">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-8 py-4 text-lg
                       bg-blue-700 text-white font-bold rounded-lg shadow-md
                       hover:bg-blue-800 disabled:bg-slate-300
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <CheckIcon className="w-6 h-6 mr-2" />
            {isLoading ? "Getting Feedback..." : "Submit for Feedback"}
          </button>
        </Tooltip>
      )}

      {/* Navigation row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Tooltip tip="Go to previous question.">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="flex-1 px-6 py-3 rounded-lg border bg-white text-slate-900
                       disabled:opacity-50 hover:bg-slate-50"
          >
            ← Previous
          </button>
        </Tooltip>

        <Tooltip tip={isBookmarked ? "Remove bookmark" : "Save this question to practice again later."}>
          <button
            onClick={onToggleBookmark}
            aria-pressed={isBookmarked}
            className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg border
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                        ${
                          isBookmarked
                            ? "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
                            : "bg-white border-slate-300 text-slate-900 hover:bg-slate-50"
                        }`}
          >
            <BookmarkIcon
              filled={isBookmarked}
              className={`w-5 h-5 mr-2 ${isBookmarked ? "text-amber-600" : "text-slate-900"}`}
            />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </Tooltip>

        <Tooltip tip="Skip this question and move to the next one.">
          <button
            onClick={onSkip}
            className="flex-1 px-6 py-3 rounded-lg border bg-white text-slate-900 hover:bg-slate-50"
          >
            Skip →
          </button>
        </Tooltip>

        <Tooltip tip="Go to next question.">
          <button
            onClick={onNext}
            className="flex-1 flex items-center justify-center px-6 py-3 rounded-lg
                       bg-slate-900 text-white hover:bg-black"
          >
            {isLast ? "Finish" : "Next"}
            <NextArrowIcon className="w-5 h-5 ml-2" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default QuestionControls;
