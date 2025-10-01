import React from "react";
import { EMPLOYER_CONTENT } from "@/constants/Employer";
import { Language } from "@/types";

const HeroBadges: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = EMPLOYER_CONTENT.hero;
  return (
    <section className="p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent">
      <h2 className="font-display text-3xl font-bold">{t.title[lang]}</h2>
      <p className="mt-2 text-muted-foreground">{t.subtitle[lang]}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {t.badges.map(b => (
          <span
            key={b.key}
            className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            {lang === Language.EN ? b.en : b.vn}
          </span>
        ))}
      </div>
    </section>
  );
};

export default HeroBadges;
