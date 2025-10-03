import React, { useContext, useId } from "react";
import { AppContext } from "../App";
import Tooltip from "./Tooltip";

const FloatingCalmButton: React.FC = () => {
  const { setIsBreathingGuideVisible } = useContext(AppContext);
  const tooltipId = useId(); // make Tooltip accessible on mobile/keyboard

  return (
    <div
      className="
        fixed
        right-4 sm:right-6
        bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]
        z-50
      "
    >
      <Tooltip
        tip="Feeling stressed? Open a guided breathing exercise."
        position="top"
        // If your Tooltip supports passing an id for aria-describedby:
        id={tooltipId as unknown as string}
      >
        <button
          type="button"
          onClick={() => setIsBreathingGuideVisible(true)}
          className="
            w-16 h-16 sm:w-20 sm:h-20 rounded-full
            bg-primary text-primary-foreground
            shadow-xl hover:shadow-2xl
            flex items-center justify-center
            transition-all duration-200 ease-in-out
            hover:bg-primary/90 hover:-translate-y-0.5
            focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40
            motion-safe:animate-pulse-calm motion-reduce:animate-none
          "
          aria-label="Open breathing exercise"
          aria-describedby={tooltipId as unknown as string}
        >
          <img
            src="/calm.png"        // <-- served from public/calm.png
            alt=""                 // decorative; label is on the button
            width={40}
            height={40}
            loading="lazy"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </button>
      </Tooltip>
    </div>
  );
};

export default FloatingCalmButton;
