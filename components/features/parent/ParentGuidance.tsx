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

const pick = <T extends Record<Language, string> | undefined>(obj: T, lang: Language) =>
  obj?.[lang] ?? obj?.[Language.EN] ?? "";

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
  const [video, setVideo] = useState<{ url: string; title: string } | null>(null);

  // simple filters for psychologists
  const [psySearch, setPsySearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // 👉 one-tap switch to Jobseeker practice
  const goToJobseekerPractice = () => {
    setNarratorRole(NarratorRole.Jobseeker);
    setMode("practice");
    navigate("/dashboard"); // adjust if your route differs
  };

  // Guarded narrator dialogue setter (prevents "reading 'en'" crash)
  useEffect(() => {
    let dialogueKey = "";
    switch (screen) {
      case "intro": dialogueKey = "parentIntro"; break;
      case "overview": dialogueKey = "parentOverview"; break;
      case "module1": dialogueKey = "parentModule1"; break;
      case "module2": dialogueKey = "parentModule2"; break;
      case "module3": dialogueKey = "parentModule3"; break;
      case "module4": dialogueKey = "parentModule4"; break;
      case "faq": dialogueKey = "parentFAQ"; break;
      case "resources": dialogueKey = "parentResources"; break;
      case "testimonials": dialogueKey = ""; break;
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
    () => Math.round((completedModules.length / Math.max(1, totalModules)) * 100),
    [completedModules.length, totalModules]
  );

  const allDone = completedModules.length >= totalModules;

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules((prev) => [...prev, moduleId]);
      setToast("Nice! Module completed.");
    }
    const idx = PARENT_CONTENT.modules.findIndex((m) => m.id === moduleId);
    if (idx < PARENT_CONTENT.modules.length - 1) {
      setScreen(PARENT_CONTENT.modules[idx + 1].id as ParentScreen);
    } else {
      setScreen("overview");
    }
  };

  // Small shared CTA block (localized)
  const PracticeWithChildCTA = () => (
    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
      <button
        onClick={goToJobseekerPractice}
        className="px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
      >
        {pick(PARENT_CONTENT.practiceWithChild, lang)}
      </button>
      <span className="text-sm text-muted-foreground">
        {pick(PARENT_CONTENT.jobseekerCoachLine, lang)}
      </span>
    </div>
  );

  const renderScreen = () => {
    switch (screen) {
      case "intro":
        return (
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold mb-4">A Warm Welcome</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              I'm here to share simple, evidence-informed steps to support your child’s journey. You're not alone.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setScreen("overview")}
                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full text-lg hover:bg-primary/90 transition-colors shadow-md"
              >
                {pick(LOCALIZED_CONTENT.start, lang)}
              </button>
            </div>
          </div>
        );

      case "overview":
        return (
          <div>
            <div className="mb-6">
              <ProgressBar value={progress} />
            </div>

            <h2 className="font-display text-3xl font-bold mb-6">
              {pick(LOCALIZED_CONTENT.whatYouWillLearn, lang)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {PARENT_CONTENT.modules.map((m) => (
                <ModuleCard
                  key={m.id}
                  title={pick(m.title as Record<Language, string>, lang)}
                  time={pick(m.time as Record<Language, string>, lang)}
                  isCompleted={completedModules.includes(m.id)}
                  onClick={() => setScreen(m.id as ParentScreen)}
                />
              ))}
            </div>

            {allDone && (
              <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50">
                <h3 className="font-semibold text-emerald-800">
                  {pick(PARENT_CONTENT.allLessonsDone, lang)}
                </h3>
                <p className="text-emerald-700 mt-1">
                  {pick(PARENT_CONTENT.readyToPracticeQ, lang)}
                </p>
                <PracticeWithChildCTA />
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button
                onClick={() => setScreen("faq")}
                className="px-8 py-3 bg-card border border-primary text-primary font-semibold rounded-full hover:bg-primary/10"
              >
                {pick(LOCALIZED_CONTENT.faq, lang)}
              </button>
              <button
                onClick={() => setScreen("resources")}
                className="px-8 py-3 bg-card border border-primary text-primary font-semibold rounded-full hover:bg-primary/10"
              >
                {pick(LOCALIZED_CONTENT.resources, lang)}
              </button>
              <button
                onClick={() => setScreen("testimonials")}
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90"
              >
                {pick(PARENT_CONTENT.ui.testimonialsTitle, lang)}
              </button>
            </div>
          </div>
        );

      case "module1":
        return (
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              {pick(LOCALIZED_CONTENT.module1Title, lang)}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground mb-6">
              <li>Autistic individuals may need more time to process questions.</li>
              <li>They often interpret language literally; avoid sarcasm or vague phrases.</li>
              <li>Small talk can be stressful; it's okay to get straight to the point.</li>
            </ul>
            <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-md">
              <h3 className="font-bold text-primary/90">Try This Now:</h3>
              <p className="text-primary/80">
                Ask one clear question at a time. After you ask, count to 10 in your head to create a comfortable pause.
              </p>
            </div>
            <button
              onClick={() => handleModuleComplete("module1")}
              className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90"
            >
              {pick(LOCALIZED_CONTENT.completeAndNext, lang)} &rarr;
            </button>
          </div>
        );

      case "module2":
        return (
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              {pick(LOCALIZED_CONTENT.module2Title, lang)}
            </h2>
            <StarInfographic />
            <div className="p-4 bg-secondary border border-border rounded-lg text-foreground space-y-3">
              <p className="font-semibold">Practice Script:</p>
              <p><strong>You (Parent):</strong> "Tell me about a time you solved a problem."</p>
              <p><strong>Your Child:</strong> (S) "At my internship, the team's shared drive was disorganized."</p>
              <p><strong>You (Parent):</strong> "Good start! What were you asked to do? (Task)"</p>
              <p><strong>Your Child:</strong> "My manager asked me to create a new folder system."</p>
              <p><strong>You (Parent):</strong> "Great! Now add what you actually did. (Action)"</p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong>Tip:</strong> Replace broad questions with step-by-step prompts.
            </p>
            <button
              onClick={() => handleModuleComplete("module2")}
              className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90"
            >
              {pick(LOCALIZED_CONTENT.completeAndNext, lang)} &rarr;
            </button>
          </div>
        );

      case "module3":
        return (
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              {pick(LOCALIZED_CONTENT.module3Title, lang)}
            </h2>
            <p className="mb-4">Create a calm pre-interview routine to reduce anxiety.</p>
            <RoutineBuilder />
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-2">Practice a Calming Breath</h3>
              <BreathingCoach />
            </div>
            <button
              onClick={() => handleModuleComplete("module3")}
              className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90"
            >
              {pick(LOCALIZED_CONTENT.completeAndNext, lang)} &rarr;
            </button>
          </div>
        );

      case "module4":
        return (
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              {pick(LOCALIZED_CONTENT.module4Title, lang)}
            </h2>
            <p className="mb-4">Model supportive phrasing and encourage autonomy.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold text-green-800">Do 👍</h3>
                <p className="text-green-700">
                  "I noticed you explained your actions clearly." (Specific praise)
                </p>
                <p className="mt-2 text-green-700">
                  "What part do you want to practice next?" (Gives autonomy)
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-bold text-red-800">Don't 👎</h3>
                <p className="text-red-700">"Good job." (Too general)</p>
                <p className="mt-2 text-red-700">
                  "You need to fix your posture, speak louder, and smile." (Overwhelming)
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => handleModuleComplete("module4")}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90"
              >
                {pick(LOCALIZED_CONTENT.finishAndReturn, lang)}
              </button>

              {/* parent → jobseeker handoff */}
              <button
                onClick={goToJobseekerPractice}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700"
              >
                {pick(PARENT_CONTENT.practiceWithChild, lang)}
              </button>
            </div>
          </div>
        );

      case "faq":
        return (
          <div>
            <h2 className="font-display text-3xl font-bold mb-6">
              {pick(LOCALIZED_CONTENT.faq, lang)}
            </h2>

            {(!PARENT_CONTENT.faqs || PARENT_CONTENT.faqs.length === 0) ? (
              <div className="p-4 bg-muted/40 border border-border rounded-lg text-muted-foreground">
                No FAQs yet. Check back soon.
              </div>
            ) : (
              <div className="space-y-4">
                {PARENT_CONTENT.faqs.map((faq, i) => (
                  <Accordion key={i} title={pick(faq.q, lang) || `FAQ #${i + 1}`}>
                    <p>{pick(faq.a, lang)}</p>
                  </Accordion>
                ))}
              </div>
            )}
          </div>
        );

      case "resources":
        return (
          <div>
            <h2 className="font-display text-3xl font-bold mb-6">
              {pick(LOCALIZED_CONTENT.resources, lang)}
            </h2>

            <div className="space-y-4 mb-10">
              {PARENT_CONTENT.resources.map((r) => (
                <ResourceCard
                  key={r.name}
                  name={r.name}
                  desc={pick(r.desc as Record<Language, string>, lang)}
                  url={r.url}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl font-bold">
                {pick(PARENT_CONTENT.ui.psychologistsTitle, lang)}
              </h3>
              <div className="flex items-center gap-2">
                <input
                  value={psySearch}
                  onChange={(e) => setPsySearch(e.target.value)}
                  placeholder={pick(PARENT_CONTENT.ui.searchPlaceholder, lang)}
                  className="px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-ring focus:border-ring"
                />
                <label className="inline-flex items-center gap-2 text-sm">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PARENT_CONTENT.psychologists
                .filter((p) => (onlyAvailable ? p.isAvailable : true))
                .filter((p) => {
                  const q = psySearch.trim().toLowerCase();
                  if (!q) return true;
                  const hay = `${pick(p.name as Record<Language, string>, lang)} ${pick(
                    p.title as Record<Language, string>, lang
                  )} ${pick(p.org as Record<Language, string>, lang)} ${pick(
                    p.location as Record<Language, string>, lang
                  )} ${(p.specialties?.join(" ") ?? "").toLowerCase()}`.toLowerCase();
                  return hay.includes(q);
                })
                .map((p) => (
                  <PsychologistCard
                    key={p.id}
                    photo={p.photo}
                    name={pick(p.name as Record<Language, string>, lang)}
                    title={pick(p.title as Record<Language, string>, lang)}
                    org={pick(p.org as Record<Language, string>, lang)}
                    location={pick(p.location as Record<Language, string>, lang)}
                    bio={pick(p.bio as Record<Language, string>, lang)}
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
        );

      case "testimonials":
        const items = (PARENT_CONTENT.testimonials ?? []).map((t) => ({
          id: t.id,
          name: pick(t.name as Record<Language, string>, lang),
          role: pick(t.role as Record<Language, string>, lang),
          quote: pick(t.quote as Record<Language, string>, lang),
          thumbnail: t.thumbnail,
          videoUrl: t.videoUrl,
        }));
        return (
          <div>
            <h2 className="font-display text-3xl font-bold mb-6">
              {pick(PARENT_CONTENT.ui.testimonialsTitle, lang)}
            </h2>
            <TestimonialsCarousel
              items={items}
              onOpenVideo={(url, title) => setVideo({ url, title })}
              ctaLabel={pick(PARENT_CONTENT.ui.testimonialsCTA, lang)}
            />
            <div className="mt-8 text-center">
              <button
                onClick={() => setScreen("overview")}
                className="px-6 py-3 bg-card border border-primary text-primary font-semibold rounded-full hover:bg-primary/10"
              >
                &larr; {pick(LOCALIZED_CONTENT.backToOverview, lang)}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {screen !== "intro" && screen !== "overview" && (
        <button
          onClick={() => setScreen("overview")}
          className="mb-6 text-sm font-semibold text-primary hover:underline"
        >
          &larr; {pick(LOCALIZED_CONTENT.backToOverview, lang)}
        </button>
      )}

      {renderScreen()}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      {video && <VideoModal url={video.url} title={video.title} onClose={() => setVideo(null)} />}
    </div>
  );
};

export default ParentGuidance;
