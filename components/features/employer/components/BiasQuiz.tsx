// src/components/employer/components/BiasQuiz.tsx
import React, { useState } from "react";
import { EMPLOYER_CONTENT, EmployerViewMode } from "@/constants/Employer";
import { Language } from "@/types";

type Props = {
  lang: Language;
  mode: EmployerViewMode;
};

const BiasQuiz: React.FC<Props> = ({ lang, mode }) => {
  const t = EMPLOYER_CONTENT.quiz;
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  if (!t || !t.qas || t.qas.length === 0) return null;

  const item = t.qas[index];

  const handleNext = () => {
    setShow(false);
    setIndex((prev) => (prev + 1) % t.qas.length);
  };

  const answer =
    mode === "calm"
      ? item.aCalm?.[lang] ?? item.aCalm?.[Language.EN]
      : item.aResearch?.[lang] ?? item.aResearch?.[Language.EN];

  const revealLabel =
    mode === "calm"
      ? EMPLOYER_CONTENT.ui.quizRevealCalmLabel[lang]
      : EMPLOYER_CONTENT.ui.quizRevealResearchLabel[lang];

  const nextLabel = EMPLOYER_CONTENT.ui.quizNextLabel[lang];

  return (
    <section className="p-4 sm:p-5 rounded-2xl border border-border bg-card space-y-3">
      <h4 className="font-semibold text-sm sm:text-base">
        {t.title[lang]}
      </h4>

      <p className="text-sm text-foreground leading-relaxed">
        {item.q[lang]}
      </p>

      {!show ? (
        <button
          type="button"
          onClick={() => setShow(true)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {revealLabel}
        </button>
      ) : (
        <div className="mt-2 p-3 rounded-md bg-primary/10 text-primary/90 text-sm leading-relaxed space-y-3">
          <p>{answer}</p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="px-3 py-1 rounded-md border border-border hover:bg-muted text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {nextLabel}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BiasQuiz;