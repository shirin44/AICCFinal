// src/components/employer/EmployerGuide.tsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../App";
import { DIALOGUE } from "@/constants";
import {
  EMPLOYER_CONTENT,
  EmployerViewMode,
} from "@/constants/Employer";
import { Language } from "@/types";

import ProgressBar from "../parent/components/ProgressBar";
import QuestionCleaner from "./QuestionCleaner";
import HeroBadges from "./components/HeroBadges";
import KPIBar from "./components/KPIBar";
import SuperpowerGrid from "./components/SuperpowerGrid";
import StoryCards from "./components/StoryCards";
import QuoteCarousel from "./components/QuoteCarousel";
import EmployerModuleCard from "./components/EmployerModuleCard";
import StrengthChips from "./components/StrengthChips";
import BiasQuiz from "./components/BiasQuiz";

type EmployerScreen = "intro" | "overview" | "whyHire" | "module1" | "module2";

const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === "vi" || l === "VN" ? Language.VN : Language.EN;

const CTA: React.FC<{ onClick: () => void; label: string }> = ({
  onClick,
  label,
}) => (
  <div className="flex justify-end mt-4">
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
    >
      <span>{label}</span>
      <span>→</span>
    </button>
  </div>
);

const EmployerGuide: React.FC = () => {
  const { language, setNarratorDialogue, setNarratorState } =
    useContext(AppContext);
  const lang = normalizeLang(language);

  const [screen, setScreen] = useState<EmployerScreen>("intro");
  const [viewMode, setViewMode] = useState<EmployerViewMode>("calm");

  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("eg_completed") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let key = "";
    switch (screen) {
      case "intro":
        key = "employerIntro";
        break;
      case "overview":
        key = "employerOverview";
        break;
      case "whyHire":
        key = "employerWhyHire";
        break;
      case "module1":
        key = "employerModule1";
        break;
      case "module2":
        key = "employerModule2";
        break;
    }
    if (key && (DIALOGUE as any)[key]) {
      setNarratorDialogue((DIALOGUE as any)[key][lang]);
    }
    setNarratorState("talking");
  }, [screen, lang, setNarratorDialogue, setNarratorState]);

  useEffect(() => {
    localStorage.setItem("eg_completed", JSON.stringify(completedModules));
  }, [completedModules]);

  const totalModules = EMPLOYER_CONTENT.modules.length;
  const progress = useMemo(
    () =>
      Math.round(
        (completedModules.length / Math.max(1, totalModules)) * 100
      ),
    [completedModules.length, totalModules]
  );

  const done = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules((prev) => [...prev, moduleId]);
    }
    const idx = EMPLOYER_CONTENT.modules.findIndex((m) => m.id === moduleId);
    if (idx < EMPLOYER_CONTENT.modules.length - 1) {
      setScreen(EMPLOYER_CONTENT.modules[idx + 1].id as EmployerScreen);
    } else {
      setScreen("overview");
    }
  };

  /* ---------------------------- UI helpers ---------------------------- */

  const renderModeToggle = () => (
    <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 border border-border px-2 py-1">
      <div className="inline-flex rounded-full bg-background px-1 py-1">
        <button
          type="button"
          onClick={() => setViewMode("calm")}
          className={`px-3 py-1 text-xs rounded-full transition ${
            viewMode === "calm"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          {EMPLOYER_CONTENT.ui.calmModeLabel[lang]}
        </button>
        <button
          type="button"
          onClick={() => setViewMode("research")}
          className={`px-3 py-1 text-xs rounded-full transition ${
            viewMode === "research"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          {EMPLOYER_CONTENT.ui.researchModeLabel[lang]}
        </button>
      </div>
    </div>
  );

  /* ---------------------------- Render sections ---------------------------- */

  const renderIntro = () => (
    <div className="space-y-8 text-center">
      <h2 className="font-display text-3xl sm:text-4xl font-bold">
        {EMPLOYER_CONTENT.intro.heading[lang]}
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
        {EMPLOYER_CONTENT.intro.blurb[lang]}
      </p>

      <div className="mt-4 max-w-2xl mx-auto rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-card to-background p-5 sm:p-6 text-left space-y-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {EMPLOYER_CONTENT.ui.calmModeLabel[lang]}
          </p>
          <p className="text-sm text-muted-foreground">
            {EMPLOYER_CONTENT.ui.calmModeDescription[lang]}
          </p>
        </div>
        <div className="border-t border-border/60 pt-3">
          <p className="text-sm font-semibold text-foreground">
            {EMPLOYER_CONTENT.ui.researchModeLabel[lang]}
          </p>
          <p className="text-sm text-muted-foreground">
            {EMPLOYER_CONTENT.ui.researchModeDescription[lang]}
          </p>
        </div>
      </div>

      <button
        onClick={() => setScreen("overview")}
        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full text-lg hover:bg-primary/90 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span>{EMPLOYER_CONTENT.ui.start[lang]}</span>
        <span>→</span>
      </button>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold">
            {EMPLOYER_CONTENT.ui.whatYouWillLearn[lang]}
          </h2>
          <ProgressBar value={progress} />
        </div>
        <div className="flex justify-start sm:justify-end">{renderModeToggle()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {EMPLOYER_CONTENT.modules.map((m, i) => (
          <EmployerModuleCard
            key={m.id}
            index={i}
            title={m.title[lang]}
            time={m.time[lang]}
            isCompleted={completedModules.includes(m.id)}
            onClick={() => setScreen(m.id as EmployerScreen)}
          />
        ))}
      </div>
    </div>
  );

  const renderMetricsSummary = () => {
    const t = EMPLOYER_CONTENT.metricsSummary;
    return (
      <section className="mt-4 p-4 sm:p-5 rounded-2xl border border-border bg-card space-y-3">
        <h3 className="font-display text-lg font-semibold">
          {EMPLOYER_CONTENT.ui.metricsTitle[lang]}
        </h3>
        <p className="text-sm text-muted-foreground">
          {EMPLOYER_CONTENT.ui.metricsSubtitle[lang]}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          {t.cards.map((c) => (
            <div
              key={c.id}
              className="p-3 rounded-xl bg-muted/60 border border-border text-sm flex flex-col gap-1"
            >
              <div className="font-semibold">{c.title[lang]}</div>
              <p className="text-xs text-muted-foreground leading-snug">
                {c.body[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderWhyHire = () => (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] lg:items-start">
        <HeroBadges lang={lang} mode={viewMode} />
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">{renderModeToggle()}</div>
        </div>
      </div>

      <KPIBar lang={lang} mode={viewMode} />
      <SuperpowerGrid lang={lang} mode={viewMode} />
      <StrengthChips lang={lang} mode={viewMode} />
      <StoryCards lang={lang} mode={viewMode} />
      <QuoteCarousel lang={lang} mode={viewMode} />
      <BiasQuiz lang={lang} mode={viewMode} />
      {renderMetricsSummary()}
      <CTA
        onClick={() => done("whyHire")}
        label={EMPLOYER_CONTENT.ui.completeAndNext[lang]}
      />
    </div>
  );

  const renderModule1 = () => {
    const t = EMPLOYER_CONTENT.interviewBasics;

    return (
      <div className="space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold">
          {EMPLOYER_CONTENT.modules[1].title[lang]}
        </h2>

        {/* Main layout: steps on the left, calm callout on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6">
          {/* Steps / checklist */}
          <section className="space-y-4">
            <div className="rounded-2xl border border-border bg-card/70 p-4 sm:p-5">
              <h3 className="font-semibold text-sm sm:text-base mb-3">
                {t.subheading[lang]}
              </h3>

              <ol className="space-y-3">
                {t.bullets.map((b, idx) => (
                  <li key={b.id} className="flex gap-3 items-start">
                    <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-xs font-semibold text-primary">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {b.text[lang]}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tiny recap strip using same content, no new strings */}
            <div className="rounded-2xl border border-dashed border-border bg-muted/60 px-4 py-3">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t.recap[lang]}
              </p>
            </div>
          </section>

          {/* Calm / “try this” panel */}
          <section className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
              <h3 className="font-semibold text-primary text-sm sm:text-base">
                {t.tryTitle[lang]}
              </h3>
              <p className="text-sm text-primary/90 leading-relaxed">
                {t.tryBody[lang]}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/80 p-4 space-y-3">
              <h4 className="font-semibold text-xs sm:text-sm text-foreground">
                {t.supportTitle[lang]}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t.supportPoints.map((p) => (
                  <li key={p.id}>• {p.text[lang]}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <CTA
          onClick={() => done("module1")}
          label={EMPLOYER_CONTENT.ui.completeAndNext[lang]}
        />
      </div>
    );
  };

  const renderModule2 = () => (
    <div className="space-y-6">
      <h2 className="font-display text-2xl sm:text-3xl font-bold">
        {EMPLOYER_CONTENT.modules[2].title[lang]}
      </h2>
      <QuestionCleaner />
      <CTA
        onClick={() => done("module2")}
        label={EMPLOYER_CONTENT.ui.backToOverview[lang]}
      />
    </div>
  );

  const renderScreen = () => {
    switch (screen) {
      case "intro":
        return renderIntro();
      case "overview":
        return renderOverview();
      case "whyHire":
        return renderWhyHire();
      case "module1":
        return renderModule1();
      case "module2":
        return renderModule2();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="rounded-3xl border border-border bg-background/70 shadow-sm p-5 sm:p-8 space-y-6">
        {screen !== "intro" && screen !== "overview" && (
          <button
            onClick={() => setScreen("overview")}
            className="text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded inline-flex items-center gap-1"
          >
            <span>←</span>
            <span>{EMPLOYER_CONTENT.ui.backToOverview[lang]}</span>
          </button>
        )}
        {renderScreen()}
      </div>
    </div>
  );
};

export default EmployerGuide;