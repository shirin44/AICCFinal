// src/pages/HomePage.tsx
import React from "react";
import Layout from "../components/Layout";
import NarratorCard from "../components/NarratorCard";
import { NARRATORS } from "@/constants";
import { HOME_PAGE_CONTENT } from "@/constants/homePage";
import { NarratorRole, Language } from "../types";
import { AppContext } from "../App";

const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === "vi" || l === "VN" ? Language.VN : Language.EN;

/* ---------- Skip link ---------- */
const SkipToContent: React.FC = () => (
  <a
    href="#main"
    className="
      sr-only focus:not-sr-only
      fixed top-2 left-2 z-50
      rounded bg-primary text-primary-foreground px-3 py-2 text-sm shadow
    "
  >
    Skip to main content
  </a>
);

/* ---------- Hero ---------- */
const HeroSection: React.FC = () => {
  const { language } = React.useContext(AppContext);
  const lang = normalizeLang(language);
  const H = HOME_PAGE_CONTENT;
  const wl = H.hero.welcomeLeadParts[lang];
  const [showPlayer, setShowPlayer] = React.useState(false);
  const YT_ID = "Q_lkVCYpJCg";

  const scrollToNarrators = (e: React.MouseEvent) => {
    e.preventDefault();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("narrators")
      ?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-[85vh] flex flex-col items-center justify-center text-center relative bg-gradient-to-b from-background to-muted/50 px-4"
    >
      <div className="w-full max-w-5xl mx-auto motion-safe:animate-fadeInUp">
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-foreground flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
          <span>{H.hero.title[lang]}</span>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="AICC logo"
            width={96}
            height={96}
            className="h-16 sm:h-20 md:h-24 w-auto align-middle"
          />
        </h1>

        <p className="mt-3 text-base sm:text-lg md:text-xl text-foreground/80 font-semibold">
          {wl.before}
          <span className="inline-block text-3xl sm:text-4xl font-extrabold text-primary motion-safe:animate-slam motion-reduce:animate-none">
            {wl.word}
          </span>
          {wl.after}
        </p>

        <p className="mt-2 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {H.hero.tagline[lang]}
        </p>

        {/* Video */}
        <div className="mt-8 sm:mt-12 w-full max-w-4xl mx-auto aspect-video rounded-2xl shadow-2xl border border-border relative overflow-hidden bg-black">
          {!showPlayer ? (
            <>
              <img
                src={`https://img.youtube.com/vi/${YT_ID}/hqdefault.jpg`}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                onClick={() => setShowPlayer(true)}
                className="absolute inset-0 grid place-items-center focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
                aria-label="Play video"
              >
                <span className="grid place-items-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-background/80 backdrop-blur-md shadow-xl ring-1 ring-border transition group-hover:scale-105">
                  ▶
                </span>
              </button>
              <p className="absolute bottom-3 right-3 z-10 text-white/95 text-xs sm:text-sm font-semibold drop-shadow px-2 py-1 rounded bg-black/30">
                {H.hero.videoLabel[lang]}
              </p>
            </>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0`}
              title="AICC Home Video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#narrators"
        aria-label={HOME_PAGE_CONTENT.hero.ariaScroll[lang]}
        onClick={scrollToNarrators}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce-slow motion-reduce:animate-none focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 rounded-full"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/20 flex items-center justify-center ring-4 ring-primary/10 hover:bg-primary/30 transition-colors">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </a>
    </section>
  );
};

/* ---------- Narrator Selection ---------- */
const NarratorSelection: React.FC = () => {
  const { language } = React.useContext(AppContext);
  const lang = normalizeLang(language);
  const H = HOME_PAGE_CONTENT;

  return (
    <section id="narrators" className="py-12 sm:py-16 px-4">
      <h2 className="text-center font-display text-2xl sm:text-3xl font-bold mb-6 sm:mb-10">
        {H.narrators.title[lang]}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        <NarratorCard narrator={NARRATORS[NarratorRole.Jobseeker]} />
        <NarratorCard narrator={NARRATORS[NarratorRole.Employer]} />
        <NarratorCard narrator={NARRATORS[NarratorRole.CareGiver]} />
        <NarratorCard narrator={NARRATORS[NarratorRole.Volunteer]} />
      </div>
    </section>
  );
};

/* ---------- Quick Facts ---------- */
const QuickFacts: React.FC = () => {
  const { language } = React.useContext(AppContext);
  const lang = normalizeLang(language);
  const H = HOME_PAGE_CONTENT;

  return (
    <section className="py-12 sm:py-20 bg-card rounded-2xl shadow-lg mx-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-blue-900">
              {H.facts.f1.head[lang]}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">
              {H.facts.f1.body[lang]}
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-red-900">
              {H.facts.f2.head[lang]}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">
              {H.facts.f2.body[lang]}
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-purple-900">
              {H.facts.f3.head[lang]}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">
              {H.facts.f3.body[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Sponsors ---------- */
const Sponsors: React.FC = () => {
  const { language } = React.useContext(AppContext);
  const lang = normalizeLang(language);
  const H = HOME_PAGE_CONTENT;

  return (
    <section className="py-12 sm:py-16 text-center px-4">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-muted-foreground mb-6 sm:mb-8">
        {H.sponsors.title[lang]}
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-12 text-muted-foreground">
        <span className="font-bold text-base sm:text-lg">{H.sponsors.labels.adc[lang]}</span>
        <img
          src="https://1000logos.net/wp-content/uploads/2019/07/RMIT-Logo.png"
          alt="RMIT University Logo"
          className="h-8 sm:h-10 md:h-12 w-auto"
        />
      </div>
    </section>
  );
};

/* ---------- Page ---------- */
const HomePage: React.FC = () => {
  const { setNarratorDialogue, setNarratorRole } = React.useContext(AppContext);

  React.useEffect(() => {
    setNarratorDialogue("");
    setNarratorRole(null);
  }, [setNarratorDialogue, setNarratorRole]);

  return (
    <Layout>
      <SkipToContent />
      <main id="main">
        <HeroSection />
        <div className="py-12 sm:py-20">
          <div className="space-y-12 sm:space-y-20">
            <NarratorSelection />
            <QuickFacts />
            <Sponsors />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
