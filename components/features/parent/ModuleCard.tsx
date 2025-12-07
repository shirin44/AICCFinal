import React from "react";

interface ModuleCardProps {
  title: string;
  time: string;
  isCompleted: boolean;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  time,
  isCompleted,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group w-full text-left
        rounded-2xl border
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background
        ${isCompleted
          ? "bg-accent/10 border-accent/30 hover:bg-accent/20 hover:shadow-md"
          : "bg-card border-border hover:bg-primary/5 hover:border-primary/40 hover:shadow-md"
        }
        px-5 py-4 sm:px-6 sm:py-5
      `}
    >
      <div className="flex items-center gap-4">
        {/* Progress dot / ring */}
        <div
          className={`
            flex items-center justify-center
            w-10 h-10 rounded-full
            shrink-0
            transition-colors duration-200
            ${isCompleted
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-primary/70 group-hover:bg-primary/10"
            }
          `}
        >
          {isCompleted ? (
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M5 13l4 4L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <div className="w-3 h-3 rounded-full bg-primary/70 group-hover:bg-primary" />
          )}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`
              font-display text-base sm:text-lg font-semibold truncate
              ${isCompleted ? "text-accent" : "text-foreground"}
            `}
          >
            {title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              {/* tiny clock icon – purely visual */}
              <span className="w-3 h-3 rounded-full border border-muted-foreground/40" />
              {time}
            </span>
          </div>
        </div>

        {/* Subtle chevron for affordance */}
        <div className="hidden sm:flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M9 5l7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ModuleCard;