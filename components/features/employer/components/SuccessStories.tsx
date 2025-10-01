import React, { useState } from "react";
import { EMPLOYER_CONTENT } from "@/constants/Employer";
import { Language } from "@/types";

const SuccessStories: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = EMPLOYER_CONTENT.stories;
  const [i, setI] = useState(0);

  const prev = () => setI((i - 1 + t.items.length) % t.items.length);
  const next = () => setI((i + 1) % t.items.length);

  const it = t.items[i];

  return (
    <div className="p-4 rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">{t.title[lang]}</h4>
        <div className="flex gap-2">
          <button onClick={prev} className="px-2 py-1 border rounded-md hover:bg-muted" aria-label="Prev">‹</button>
          <button onClick={next} className="px-2 py-1 border rounded-md hover:bg-muted" aria-label="Next">›</button>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-muted/40">
        <p className="text-sm">
          <strong>{it.role[lang]}:</strong> {it.win[lang]}
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
