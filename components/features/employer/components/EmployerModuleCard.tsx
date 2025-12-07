// src/components/employer/components/EmployerModuleCard.tsx
import React from "react";

type Props = {
  index: number; // 0-based
  title: string;
  time?: string;
  isCompleted?: boolean;
  onClick?: () => void;
};

const EmployerModuleCard: React.FC<Props> = ({
  index,
  title,
  time,
  isCompleted,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full text-left p-5 rounded-2xl border border-border bg-card hover:bg-muted/60
                  transition-all shadow-sm hover:shadow-md focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-ring`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            {index + 1}
          </div>
          <h3 className="font-semibold text-foreground text-sm sm:text-base">
            {title}
          </h3>
          {time && (
            <p className="text-xs text-muted-foreground">
              {time}
            </p>
          )}
        </div>

        <div
          className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-colors
                      ${
                        isCompleted
                          ? "bg-primary border-primary"
                          : "border-border"
                      }`}
        >
          {isCompleted && (
            <span className="w-3 h-3 bg-white rounded-full" />
          )}
        </div>
      </div>
    </button>
  );
};

export default EmployerModuleCard;