import React from "react";

type Props = {
  index: number;                // 0-based
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
      onClick={onClick}
      className={`group w-full text-left p-5 rounded-2xl border border-border bg-card hover:bg-muted/60
                  transition-all shadow-sm hover:shadow-md focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-ring`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {time && (
            <p className="mt-1 text-sm text-muted-foreground">{time}</p>
          )}
        </div>

      
        <div
          className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors
                      ${isCompleted ? "bg-primary border-primary" : "border-border"}`}
        >
          {isCompleted && <span className="w-2 h-2 bg-white rounded-full"></span>}
        </div>
      </div>
    </button>
  );
};

export default EmployerModuleCard;
