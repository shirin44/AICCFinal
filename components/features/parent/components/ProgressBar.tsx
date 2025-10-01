import React from "react";

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-semibold text-muted-foreground">Progress</span>
      <span className="text-sm font-bold">{clamp(value, 0, 100)}%</span>
    </div>
    <div className="h-3 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-primary transition-all" style={{ width: `${clamp(value, 0, 100)}%` }} />
    </div>
  </div>
);

export default ProgressBar;
