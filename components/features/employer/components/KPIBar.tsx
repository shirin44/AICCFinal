import React from "react";
import { EMPLOYER_CONTENT } from "@/constants/Employer";
import { Language } from "@/types";

const KPIBar: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {EMPLOYER_CONTENT.kpis.map(k => (
        <div key={k.key} className="p-4 rounded-xl border border-border bg-card text-center">
          <div className="text-lg font-semibold">
            {lang === Language.EN ? k.en : k.vn}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIBar;
