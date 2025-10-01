import React, { useState } from "react";
import { EMPLOYER_CONTENT } from "@/constants/Employer";
import { Language } from "@/types";

const BiasQuiz: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = EMPLOYER_CONTENT.quiz;
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);

  const item = t.qas[i];

  const next = () => {
    setShow(false);
    setI((prev) => (prev + 1) % t.qas.length);
  };

  return (
    <div className="p-4 rounded-xl border border-border bg-card">
      <h4 className="font-semibold mb-3">{t.title[lang]}</h4>

      <p className="mb-3">{item.q[lang]}</p>

      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
        >
          Reveal
        </button>
      ) : (
        <div className="p-3 mt-2 rounded-md bg-primary/10 text-primary/90">
          {item.a[lang]}
          <div className="mt-3">
            <button
              onClick={next}
              className="px-3 py-1 rounded-md border border-border hover:bg-muted text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiasQuiz;
