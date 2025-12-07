import React, { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import { DIALOGUE, LOCALIZED_CONTENT } from "@/constants";
import { PARENT_CONTENT } from "@/constants/Parent";

import ModuleCard from "./ModuleCard";
import Accordion from "./Accordion";
import RoutineBuilder from "./RoutineBuilder";
import BreathingCoach from "./BreathingCoach";
import StarInfographic from "./StarInfographic";
import ProgressBar from "./components/ProgressBar";
import Toast from "./components/Toast";
import VideoModal from "./components/VideoModal";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import ResourceCard from "./components/ResourceCard";
import PsychologistCard from "./components/PsychologistCard";

import { Language, NarratorRole } from "@/types";

import {
  HeartIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  PlayCircleIcon,
  ArrowRightCircleIcon,
  SparklesIcon,
  BoltIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

type ParentScreen =
  | "intro"
  | "overview"
  | "module1"
  | "module2"
  | "module3"
  | "module4"
  | "faq"
  | "resources"
  | "testimonials";

/* -------- i18n helpers -------- */
const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === "vi" || l === "VN" ? Language.VN : Language.EN;

const pick = <T extends Record<Language, string> | undefined>(
  obj: T,
  lang: Language
) => obj?.[lang] ?? obj?.[Language.EN] ?? "";

/* ---------------------------------- */
const ParentGuidance: React.FC = () => {
  const {
    language,
    setNarratorDialogue,
    setNarratorState,
    setNarratorRole,
    setMode,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const lang = normalizeLang(language);

  const [screen, setScreen] = useState<ParentScreen>("intro");
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("pg_completed") || "[]");
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState<string | null>(null);
  const [video, setVideo] = useState<{ url: string; title: string } | null>(
    null
  );

  // simple filters for psychologists
  const [psySearch, setPsySearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const goToJobseekerPractice = () => {
    setNarratorRole(NarratorRole.Jobseeker);
    setMode("practice");
    navigate("/dashboard");
  };

  // narrator dialogue
  useEffect(() => {
    let dialogueKey = "";
    switch (screen) {
      case "intro":
        dialogueKey = "parentIntro";
        break;
      case "overview":
        dialogueKey = "parentOverview";
        break;
      case "module1":
        dialogueKey = "parentModule1";
        break;
      case "module2":
        dialogueKey = "parentModule2";
        break;
      case "module3":
        dialogueKey = "parentModule3";
        break;
      case "module4":
        dialogueKey = "parentModule4";
        break;
      case "faq":
        dialogueKey = "parentFAQ";
        break;
      case "resources":
        dialogueKey = "parentResources";
        break;
      case "testimonials":
        dialogueKey = "";
        break;
    }

    const nextLine = dialogueKey ? DIALOGUE?.[dialogueKey]?.[lang] : "";
    if (nextLine && typeof nextLine === "string") {
      setNarratorDialogue(nextLine);
      setNarratorState("talking");
    } else {
      setNarratorDialogue("");
      setNarratorState("idle");
    }
  }, [screen, lang, setNarratorDialogue, setNarratorState]);

  useEffect(() => {
    localStorage.setItem("pg_completed", JSON.stringify(completedModules));
  }, [completedModules]);

  const totalModules = PARENT_CONTENT.modules.length;
  const progress = useMemo(
    () =>
      Math.round(
        (completedModules.length / Math.max(1, totalModules)) * 100
      ),
    [completedModules.length, totalModules]
  );

  const allDone = completedModules.length >= totalModules;

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules((prev) => [...prev, moduleId]);
      setToast(pick(PARENT_CONTENT.ui.moduleCompletedToast, lang));
    }
    const idx = PARENT_CONTENT.modules.findIndex((m) => m.id === moduleId);
    if (idx < PARENT_CONTENT.modules.length - 1) {
      setScreen(PARENT_CONTENT.modules[idx + 1].id as ParentScreen);
    } else {
      setScreen("overview");
    }
  };

  const PracticeWithChildCTA = () => (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        onClick={goToJobseekerPractice}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
      >
        <PlayCircleIcon className="h-5 w-5" aria-hidden="true" />
        {pick(PARENT_CONTENT.practiceWithChild, lang)}
        <ArrowRightCircleIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <span className="text-sm text-muted-foreground">
        {pick(PARENT_CONTENT.jobseekerCoachLine, lang)}
      </span>
    </div>
  );

  const renderModuleHeader = (moduleId: "module1" | "module2" | "module3" | "module4") => {
    const details = PARENT_CONTENT.moduleDetails[moduleId];
    const iconMap: Record<typeof moduleId, JSX.Element> = {
      module1: <BoltIcon className="h-6 w-6 text-primary" aria-hidden="true" />,
      module2: <SparklesIcon className="h-6 w-6 text-primary" aria-hidden="true" />,
      module3: <ClipboardDocumentListIcon className="h-6 w-6 text-primary" aria-hidden="true" />,
      module4: <UsersIcon className="h-6 w-6 text-primary" aria-hidden="true" />,
    };

    return (
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            {iconMap[moduleId]}
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">
              {pick(PARENT_CONTENT.modules.find((m) => m.id === moduleId)?.title as any, lang)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {pick(details.subtitle, lang)}
            </p>
          </div>
        </div>
        <div className="rounded-full border border-border bg-card px-4 py-1 text-xs text-muted-foreground">
          {pick(PARENT_CONTENT.modules.find((m) => m.id === moduleId)?.time as any, lang)}
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (screen) {
      case "intro":
        return (
          <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-card to-background shadow-sm">
            <div className="grid gap-8 p-8 sm:grid-cols-[1.5fr,1fr] sm:p-10">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-border">
                  <HeartIcon className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>{pick(PARENT_CONTENT.ui.parentIntroTitle, lang)}</span>
                </div>
                <p className="max-w-xl text-sm text-muted-foreground">
                  {pick(PARENT_CONTENT.ui.parentIntroBody, lang)}
                </p>
                <button
                  onClick={() => setScreen("overview")}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                >
                  <PlayCircleIcon className="h-5 w-5" aria-hidden="true" />
                  {pick(LOCALIZED_CONTENT.start, lang)}
                </button>
              </div>

              {/* right side: simple visual roadmap, icon-only, no new text */}
              <div className="grid gap-3 rounded-2xl bg-background/70 p-4 shadow-inner">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2">
                  <BoltIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <div className="h-1 w-full rounded-full bg-muted">
                    <div className="h-1 w-1/4 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2">
                  <SparklesIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <div className="h-1 w-full rounded-full bg-muted">
                    <div className="h-1 w-1/2 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2">
                  <ClipboardDocumentListIcon
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  <div className="h-1 w-full rounded-full bg-muted">
                    <div className="h-1 w-3/4 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2">
                  <UsersIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <div className="h-1 w-full rounded-full bg-muted">
                    <div className="h-1 w-full rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "overview":
        return (
          <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                  <UserGroupIcon className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>{pick(LOCALIZED_CONTENT.whatYouWillLearn, lang)}</span>
                </div>
              </div>
              <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{pick(LOCALIZED_CONTENT.progressLabel, lang) || ""}</span>
                  <span className="font-medium">
                    {completedModules.length}/{totalModules}
                  </span>
                </div>
                <ProgressBar value={progress} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {PARENT_CONTENT.modules.map((m) => (
                <ModuleCard
                  key={m.id}
                  title={pick(m.title as any, lang)}
                  time={pick(m.time as any, lang)}
                  isCompleted={completedModules.includes(m.id)}
                  onClick={() => setScreen(m.id as ParentScreen)}
                />
              ))}
            </div>

            {allDone && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <HeartIcon className="mt-1 h-5 w-5 text-emerald-700" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-semibold text-emerald-900">
                      {pick(PARENT_CONTENT.allLessonsDone, lang)}
                    </h3>
                    <p className="mt-1 text-sm text-emerald-800">
                      {pick(PARENT_CONTENT.readyToPracticeQ, lang)}
                    </p>
                    <PracticeWithChildCTA />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button
                onClick={() => setScreen("faq")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/60 hover:bg-primary/5"
              >
                <QuestionMarkCircleIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                {pick(LOCALIZED_CONTENT.faq, lang)}
              </button>
              <button
                onClick={() => setScreen("resources")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/60 hover:bg-primary/5"
              >
                <ClipboardDocumentListIcon
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
                {pick(LOCALIZED_CONTENT.resources, lang)}
              </button>
              <button
                onClick={() => setScreen("testimonials")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                <PlayCircleIcon className="h-5 w-5" aria-hidden="true" />
                {pick(PARENT_CONTENT.ui.testimonialsTitle, lang)}
              </button>
            </div>
          </div>
        );

      case "module1": {
        const details = PARENT_CONTENT.moduleDetails.module1;
        return (
          <div className="space-y-6">
            {renderModuleHeader("module1")}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                {pick(details.heading, lang)}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {details.bullets.map((b) => (
                  <li key={b.id}>{pick(b.text, lang)}</li>
                ))}
              </ul>
              <div className="mt-5 flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                <SparklesIcon className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                <p className="text-sm text-primary/90">
                  {pick(details.recap, lang)}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleModuleComplete("module1")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              {pick(LOCALIZED_CONTENT.completeAndNext, lang)}
              <ArrowRightCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        );
      }

      case "module2": {
        const details = PARENT_CONTENT.moduleDetails.module2;
        const script = PARENT_CONTENT.moduleDetails.module2.bullets;
        return (
          <div className="space-y-6">
            {renderModuleHeader("module2")}
            <div className="grid gap-6 md:grid-cols-[1.1fr,1fr]">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <StarInfographic />
              </div>
              <div className="rounded-2xl border border-border bg-muted/40 p-5 text-sm text-foreground shadow-sm">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  {pick(details.heading, lang)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {pick(details.subtitle, lang)}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {details.bullets.map((b) => (
                    <li key={b.id}>{pick(b.text, lang)}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  {pick(details.recap, lang)}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleModuleComplete("module2")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              {pick(LOCALIZED_CONTENT.completeAndNext, lang)}
              <ArrowRightCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        );
      }

      case "module3": {
        const details = PARENT_CONTENT.moduleDetails.module3;
        return (
          <div className="space-y-6">
            {renderModuleHeader("module3")}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-muted-foreground">
                {pick(details.heading, lang)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {pick(details.subtitle, lang)}
              </p>
              <div className="mt-4">
                <RoutineBuilder />
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {details.bullets.map((b) => (
                  <li key={b.id}>{pick(b.text, lang)}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                {pick(details.recap, lang)}
              </p>
            </div>

            <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <ClipboardDocumentListIcon
                  className="h-5 w-5 text-sky-700"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold text-sky-900">
                  {pick(LOCALIZED_CONTENT.breathingSectionTitle, lang) || ""}
                </h3>
              </div>
              <BreathingCoach />
            </div>

            <button
              onClick={() => handleModuleComplete("module3")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              {pick(LOCALIZED_CONTENT.completeAndNext, lang)}
              <ArrowRightCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        );
      }

      case "module4": {
        const details = PARENT_CONTENT.moduleDetails.module4;
        return (
          <div className="space-y-6">
            {renderModuleHeader("module4")}

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-muted-foreground">
                {pick(details.heading, lang)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {pick(details.subtitle, lang)}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {details.bullets.map((b) => (
                  <li key={b.id}>{pick(b.text, lang)}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                {pick(details.recap, lang)}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => handleModuleComplete("module4")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                {pick(LOCALIZED_CONTENT.finishAndReturn, lang)}
                <ArrowRightCircleIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                onClick={goToJobseekerPractice}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <PlayCircleIcon className="h-5 w-5" aria-hidden="true" />
                {pick(PARENT_CONTENT.practiceWithChild, lang)}
              </button>
            </div>
          </div>
        );
      }

      case "faq":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <QuestionMarkCircleIcon
                className="h-6 w-6 text-primary"
                aria-hidden="true"
              />
              <h2 className="font-display text-3xl font-bold tracking-tight">
                {pick(LOCALIZED_CONTENT.faq, lang)}
              </h2>
            </div>

            {PARENT_CONTENT.faqs && PARENT_CONTENT.faqs.length > 0 && (
              <div className="space-y-4">
                {PARENT_CONTENT.faqs.map((faq, i) => (
                  <Accordion
                    key={i}
                    title={pick(faq.q, lang) || `FAQ #${i + 1}`}
                  >
                    <p className="text-sm text-muted-foreground">
                      {pick(faq.a, lang)}
                    </p>
                  </Accordion>
                ))}
              </div>
            )}
          </div>
        );

      case "resources":
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <ClipboardDocumentListIcon
                className="h-6 w-6 text-primary"
                aria-hidden="true"
              />
              <h2 className="font-display text-3xl font-bold tracking-tight">
                {pick(LOCALIZED_CONTENT.resources, lang)}
              </h2>
            </div>

            <div className="space-y-4">
              {PARENT_CONTENT.resources.map((r) => (
                <ResourceCard
                  key={r.name}
                  name={r.name}
                  desc={pick(r.desc as any, lang)}
                  url={r.url}
                />
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-bold">
                    {pick(PARENT_CONTENT.ui.psychologistsTitle, lang)}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    value={psySearch}
                    onChange={(e) => setPsySearch(e.target.value)}
                    placeholder={pick(
                      PARENT_CONTENT.ui.searchPlaceholder,
                      lang
                    )}
                    className="w-full max-w-xs rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      className="accent-primary"
                      checked={onlyAvailable}
                      onChange={(e) => setOnlyAvailable(e.target.checked)}
                    />
                    {pick(PARENT_CONTENT.ui.onlyAvailable, lang)}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {PARENT_CONTENT.psychologists
                  .filter((p) => (onlyAvailable ? p.isAvailable : true))
                  .filter((p) => {
                    const q = psySearch.trim().toLowerCase();
                    if (!q) return true;
                    const hay = `${pick(
                      p.name as any,
                      lang
                    )} ${pick(p.title as any, lang)} ${pick(
                      p.org as any,
                      lang
                    )} ${pick(
                      p.location as any,
                      lang
                    )} ${(p.specialties?.join(" ") ?? "").toLowerCase()}`.toLowerCase();
                    return hay.includes(q);
                  })
                  .map((p) => (
                    <PsychologistCard
                      key={p.id}
                      photo={p.photo}
                      name={pick(p.name as any, lang)}
                      title={pick(p.title as any, lang)}
                      org={pick(p.org as any, lang)}
                      location={pick(p.location as any, lang)}
                      bio={pick(p.bio as any, lang)}
                      languages={p.languages}
                      specialties={p.specialties}
                      contact={p.contact}
                      bookingUrl={p.bookingUrl}
                      isAvailable={p.isAvailable}
                      labels={{
                        contact: pick(PARENT_CONTENT.ui.contact, lang),
                        viewProfile: pick(PARENT_CONTENT.ui.viewProfile, lang),
                        book: pick(PARENT_CONTENT.ui.book, lang),
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        );

      case "testimonials": {
        const items =
          (PARENT_CONTENT.testimonials ?? []).map((t) => ({
            id: t.id,
            name: pick(t.name as any, lang),
            role: pick(t.role as any, lang),
            quote: pick(t.quote as any, lang),
            thumbnail: t.thumbnail,
            videoUrl: t.videoUrl,
          })) || [];
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <PlayCircleIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="font-display text-3xl font-bold tracking-tight">
                {pick(PARENT_CONTENT.ui.testimonialsTitle, lang)}
              </h2>
            </div>
            <TestimonialsCarousel
              items={items}
              onOpenVideo={(url, title) => setVideo({ url, title })}
              ctaLabel={pick(PARENT_CONTENT.ui.testimonialsCTA, lang)}
            />
            <div className="mt-8 text-center">
              <button
                onClick={() => setScreen("overview")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/60 hover:bg-primary/5"
              >
                <ArrowRightCircleIcon className="h-5 w-5 rotate-180" aria-hidden="true" />
                {pick(LOCALIZED_CONTENT.backToOverview, lang)}
              </button>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div>
      {screen !== "intro" && screen !== "overview" && (
        <button
          onClick={() => setScreen("overview")}
          className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowRightCircleIcon
            className="h-4 w-4 rotate-180"
            aria-hidden="true"
          />
          {pick(LOCALIZED_CONTENT.backToOverview, lang)}
        </button>
      )}

      {renderScreen()}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      {video && (
        <VideoModal
          url={video.url}
          title={video.title}
          onClose={() => setVideo(null)}
        />
      )}
    </div>
  );
};

export default ParentGuidance;