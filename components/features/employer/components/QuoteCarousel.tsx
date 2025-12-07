// src/components/employer/components/QuoteCarousel.tsx
import React, { useState } from "react";
import { EMPLOYER_CONTENT, EmployerViewMode } from "@/constants/Employer";
import { Language } from "@/types";

const QuoteCarousel: React.FC<{ lang: Language; mode: EmployerViewMode }> = ({
  lang,
  mode,
}) => {
  const t = EMPLOYER_CONTENT.quotes;
  const [index, setIndex] = useState(0);

  if (!t.items.length) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + t.items.length) % t.items.length);
  const next = () =>
    setIndex((i) => (i + 1) % t.items.length);

  const it = t.items[index];
  const text =
    mode === "calm" ? it.textCalm[lang] : it.textResearch[lang];

  return (
    <section className="p-4 sm:p-5 rounded-2xl border border-border bg-card space-y-3">
      <div className="flex items-center gap-3">
        <img
          src={it.avatar}
          alt=""
          className="w-12 h-12 rounded-full object-cover border border-border"
        />
        <div>
          <div className="font-semibold">{it.name[lang]}</div>
          <div className="text-xs text-muted-foreground">
            {it.title[lang]}
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={prev}
            className="w-7 h-7 flex items-center justify-center border border-border rounded-full hover:bg-muted text-xs"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="w-7 h-7 flex items-center justify-center border border-border rounded-full hover:bg-muted text-xs"
          >
            ›
          </button>
        </div>
      </div>
      <p className="mt-1 text-sm text-foreground leading-relaxed">
        “{text}”
      </p>
    </section>
  );
};

export default QuoteCarousel;