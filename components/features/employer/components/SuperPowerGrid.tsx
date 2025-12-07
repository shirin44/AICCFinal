// src/components/employer/components/SuperpowerGrid.tsx
import React from "react";
import { EMPLOYER_CONTENT, EmployerViewMode } from "@/constants/Employer";
import { Language } from "@/types";

const SuperpowerGrid: React.FC<{ lang: Language; mode: EmployerViewMode }> = ({
  lang,
}) => {
  const strengths = EMPLOYER_CONTENT.strengthsGrid;
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {strengths.map((s, i) => (
        <div
          key={i}
          className="p-4 rounded-xl border border-border bg-card hover:shadow-sm transition"
        >
          <div className="text-2xl">{s.icon}</div>
          <h4 className="mt-2 font-semibold">{s.label[lang]}</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {s.blurb[lang]}
          </p>
        </div>
      ))}
    </section>
  );
};

export default SuperpowerGrid;