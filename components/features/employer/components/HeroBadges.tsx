// src/components/employer/components/HeroBadges.tsx
import React from "react";
import { EMPLOYER_CONTENT, EmployerViewMode } from "@/constants/Employer";
import { Language } from "@/types";

const HeroBadges: React.FC<{ lang: Language; mode: EmployerViewMode }> = ({
  lang,
  mode,
}) => {
  const t = EMPLOYER_CONTENT.hero;
  const subtitle =
    mode === "calm" ? t.subtitleCalm[lang] : t.subtitleResearch[lang];

  return (
    <section className="p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent space-y-3">
      <h2 className="font-display text-2xl sm:text-3xl font-bold">
        {t.title[lang]}
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground">
        {subtitle}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {t.badges.map((b) => (
          <div
            key={b.key}
            className="inline-flex items-center gap-2 px-3 py-1 text-xs sm:text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-medium">{b.label[lang]}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroBadges;