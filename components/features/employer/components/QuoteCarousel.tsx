import React, { useState } from "react";
import { EMPLOYER_CONTENT } from "@/constants/Employer";
import { Language } from "@/types";

const QuoteCarousel: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = EMPLOYER_CONTENT.quotes;
  const [i, setI] = useState(0);
  const prev = () => setI((i - 1 + t.items.length) % t.items.length);
  const next = () => setI((i + 1) % t.items.length);
  const it = t.items[i];

  return (
    <section className="p-4 rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-3">
        <img src={it.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-border" />
        <div>
          <div className="font-semibold">{it.name[lang]}</div>
          <div className="text-xs text-muted-foreground">{it.title[lang]}</div>
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={prev} className="px-2 py-1 border rounded-md hover:bg-muted" aria-label="Prev">‹</button>
          <button onClick={next} className="px-2 py-1 border rounded-md hover:bg-muted" aria-label="Next">›</button>
        </div>
      </div>
      <p className="mt-3 text-sm text-foreground">“{it.text[lang]}”</p>
    </section>
  );
};

export default QuoteCarousel;
