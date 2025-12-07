// src/components/employer/components/StoryCards.tsx
import React from "react";
import { EMPLOYER_CONTENT, EmployerViewMode } from "@/constants/Employer";
import { Language } from "@/types";

const StoryCards: React.FC<{ lang: Language; mode: EmployerViewMode }> = ({
  lang,
  mode,
}) => {
  const t = EMPLOYER_CONTENT.stories;
  return (
    <section>
      <h3 className="font-display text-2xl font-bold mb-3">
        {t.title[lang]}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {t.items.map((s) => {
          const body =
            mode === "calm"
              ? s.bodyCalm[lang]
              : s.bodyResearch[lang];
          return (
            <article
              key={s.id}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                {s.role[lang]}
              </div>
              <h4 className="mt-1 font-semibold">{s.headline[lang]}</h4>
              <p className="text-sm text-muted-foreground mt-2">
                {body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default StoryCards;