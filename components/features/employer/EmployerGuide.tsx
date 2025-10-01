import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../App";
import { DIALOGUE } from "@/constants";
import { EMPLOYER_CONTENT } from "@/constants/Employer";
import { Language } from "@/types";

import ProgressBar from "../parent/components/ProgressBar";
import QuestionCleaner from "./QuestionCleaner";
import HeroBadges from "./components/HeroBadges";
import KPIBar from "./components/KPIBar";
import SuperpowerGrid from "./components/SuperpowerGrid";
import StoryCards from "./components/StoryCards";
import QuoteCarousel from "./components/QuoteCarousel";
import EmployerModuleCard from "./components/EmployerModuleCard";

type EmployerScreen = "intro" | "overview" | "whyHire" | "module1" | "module2";

const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === "vi" || l === "VN" ? Language.VN : Language.EN;

const pick = <T extends Record<Language, string>>(obj: T, lang: Language) =>
  obj?.[lang] ?? obj?.[Language.EN] ?? "";

const CTA: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <div className="text-right">
    <button
      onClick={onClick}
      className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90"
    >
      {label} &rarr;
    </button>
  </div>
);

const EmployerGuide: React.FC = () => {
  const { language, setNarratorDialogue, setNarratorState } = useContext(AppContext);
  const lang = normalizeLang(language);

  const [screen, setScreen] = useState<EmployerScreen>("intro");
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("eg_completed") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    let key = "";
    switch (screen) {
      case "intro": key = "employerIntro"; break;
      case "overview": key = "employerOverview"; break;
      case "whyHire": key = "employerWhyHire"; break;
      case "module1": key = "employerModule1"; break;
      case "module2": key = "employerModule2"; break;
    }
    if (key && (DIALOGUE as any)[key]) setNarratorDialogue((DIALOGUE as any)[key][lang]);
    setNarratorState("talking");
  }, [screen, lang, setNarratorDialogue, setNarratorState]);

  useEffect(() => {
    localStorage.setItem("eg_completed", JSON.stringify(completedModules));
  }, [completedModules]);

  const totalModules = EMPLOYER_CONTENT.modules.length;
  const progress = useMemo(
    () => Math.round((completedModules.length / Math.max(1, totalModules)) * 100),
    [completedModules.length, totalModules]
  );

  const done = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
    const idx = EMPLOYER_CONTENT.modules.findIndex(m => m.id === moduleId);
    if (idx < EMPLOYER_CONTENT.modules.length - 1) {
      setScreen(EMPLOYER_CONTENT.modules[idx + 1].id as EmployerScreen);
    } else {
      setScreen("overview");
    }
  };

  const renderIntro = () => (
    <div className="text-center">
      <h2 className="font-display text-3xl font-bold mb-3">{EMPLOYER_CONTENT.intro.heading[lang]}</h2>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
        {EMPLOYER_CONTENT.intro.blurb[lang]}
      </p>
      <button
        onClick={() => setScreen("overview")}
        className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full text-lg hover:bg-primary/90 transition-colors shadow-md"
      >
        {EMPLOYER_CONTENT.ui.start[lang]}
      </button>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <ProgressBar value={progress} />
      <h2 className="font-display text-3xl font-bold">{EMPLOYER_CONTENT.ui.whatYouWillLearn[lang]}</h2>

      {/* Circle indicator cards (consistent with Parent UI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {EMPLOYER_CONTENT.modules.map((m, i) => (
          <EmployerModuleCard
            key={m.id}
            index={i}
            title={(m.title as any)[lang]}
            time={(m.time as any)[lang]}
            isCompleted={completedModules.includes(m.id)}
            onClick={() => setScreen(m.id as EmployerScreen)}
          />
        ))}
      </div>
    </div>
  );

  const renderWhyHire = () => (
    <div className="space-y-8">
      <HeroBadges lang={lang} />
      <KPIBar lang={lang} />
      <SuperpowerGrid lang={lang} />
      <StoryCards lang={lang} />
      <QuoteCarousel lang={lang} />
      <CTA onClick={() => done("whyHire")} label={EMPLOYER_CONTENT.ui.completeAndNext[lang]} />
    </div>
  );

  const renderModule1 = () => (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold">
        {(EMPLOYER_CONTENT.modules[1].title as any)[lang]}
      </h2>
      <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
        <li>Use short, clear questions.</li>
        <li>Avoid sarcasm and vague words.</li>
        <li>Give 5–10 seconds to think.</li>
        <li>Offer notes, examples, or a small task.</li>
        <li>Judge skills, not small talk.</li>
      </ul>
      <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-md">
        <h3 className="font-bold text-primary/90">Try this:</h3>
        <p className="text-primary/80">Ask one question at a time. Pause. Then ask a follow-up if needed.</p>
      </div>
      <CTA onClick={() => done("module1")} label={EMPLOYER_CONTENT.ui.completeAndNext[lang]} />
    </div>
  );

  const renderModule2 = () => (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold">
        {(EMPLOYER_CONTENT.modules[2].title as any)[lang]}
      </h2>
      <QuestionCleaner />
      <CTA onClick={() => done("module2")} label={EMPLOYER_CONTENT.ui.backToOverview[lang]} />
    </div>
  );

  const renderScreen = () => {
    switch (screen) {
      case "intro": return renderIntro();
      case "overview": return renderOverview();
      case "whyHire": return renderWhyHire();
      case "module1": return renderModule1();
      case "module2": return renderModule2();
    }
  };

  return (
    <div>
      {screen !== "intro" && screen !== "overview" && (
        <button
          onClick={() => setScreen("overview")}
          className="mb-6 text-sm font-semibold text-primary hover:underline"
        >
          &larr; {EMPLOYER_CONTENT.ui.backToOverview[lang]}
        </button>
      )}
      {renderScreen()}
    </div>
  );
};

export default EmployerGuide;
