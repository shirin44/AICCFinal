import React from "react";
import { EMPLOYER_CONTENT } from "@/constants/Employer";
import { Language } from "@/types";

const SuperpowerGrid: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {EMPLOYER_CONTENT.strengthsGrid.map((s, i) => (
        <div key={i} className="p-4 rounded-xl border border-border bg-card hover:shadow-sm transition">
          <div className="text-2xl">{s.icon}</div>
          <h4 className="mt-2 font-semibold">{s.label[lang]}</h4>
          <p className="text-sm text-muted-foreground mt-1">{s.blurb[lang]}</p>
        </div>
      ))}
    </div>
  );
};

export default SuperpowerGrid;
