import React, { useState } from "react";
import { EMPLOYER_CONTENT } from "@/constants/Employer";
import { Language } from "@/types";

const StrengthChips: React.FC<{ lang: Language }> = ({ lang }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {EMPLOYER_CONTENT.strengths.map((s) => {
          const isOn = active === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setActive(isOn ? null : s.key)}
              className={`px-3 py-1 text-sm rounded-full border transition
                ${isOn ? "bg-primary text-primary-foreground border-primary"
                       : "bg-card text-muted-foreground border-border hover:bg-muted"}`}
              aria-pressed={isOn}
            >
              {s.label[lang]}
            </button>
          );
        })}
      </div>

      {active && (
        <div className="mt-4 p-3 rounded-md bg-primary/10 text-primary/90">
          {EMPLOYER_CONTENT.strengths.find((s) => s.key === active)?.blurb[lang]}
        </div>
      )}
    </div>
  );
};

export default StrengthChips;
