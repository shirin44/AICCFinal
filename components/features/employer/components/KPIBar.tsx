// src/components/employer/components/KPIBar.tsx
import React from "react";
import { EMPLOYER_CONTENT, EmployerViewMode } from "@/constants/Employer";
import { Language } from "@/types";

const KPIBar: React.FC<{ lang: Language; mode: EmployerViewMode }> = ({
  lang,
  mode,
}) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {EMPLOYER_CONTENT.kpis.map((k) => (
        <div
          key={k.key}
          className="p-4 rounded-xl border border-border bg-card text-center flex flex-col justify-between shadow-xs"
        >
          <div className="text-sm font-semibold mb-1">
            {k.label[lang]}
          </div>
          <div className="text-xs text-muted-foreground leading-snug">
            {mode === "calm" ? k.calm[lang] : k.research[lang]}
          </div>
        </div>
      ))}
    </section>
  );
};

export default KPIBar;