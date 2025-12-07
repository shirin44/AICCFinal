// src/components/employer/components/StrengthChips.tsx
import React, { useState } from "react";
import { EMPLOYER_CONTENT, EmployerViewMode } from "@/constants/Employer";
import { Language } from "@/types";

type Props = {
  lang: Language;
  mode: EmployerViewMode;
};

const StrengthChips: React.FC<Props> = ({ lang, mode }) => {
  const strengths = EMPLOYER_CONTENT.strengthsGrid ?? [];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!strengths.length) return null;

  const active = activeIndex !== null ? strengths[activeIndex] : null;
  const modeHint =
    mode === "calm"
      ? EMPLOYER_CONTENT.ui.calmHint[lang]
      : EMPLOYER_CONTENT.ui.researchHint[lang];

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {strengths.map((s, idx) => {
          const isOn = activeIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(isOn ? null : idx)}
              className={[
                "px-3 py-1.5 text-xs sm:text-sm rounded-full border transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isOn
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:bg-muted",
              ].join(" ")}
              aria-pressed={isOn}
            >
              {s.label[lang]}
            </button>
          );
        })}
      </div>

      {active && (
        <div className="mt-2 p-3 rounded-lg bg-primary/10 text-primary/90 text-sm leading-relaxed">
          <div className="text-base mb-1">
            {active.icon} {active.label[lang]}
          </div>
          <p>{active.blurb[lang]}</p>
          {modeHint && (
            <p className="mt-2 text-xs text-primary/80">{modeHint}</p>
          )}
        </div>
      )}
    </section>
  );
};

export default StrengthChips;