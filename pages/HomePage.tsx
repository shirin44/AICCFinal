// src/pages/HomePage.tsx
import React from "react";
import Layout from "../components/Layout";
import NarratorCard from "../components/NarratorCard";
import { NARRATORS } from "@/constants";
import { HOME_PAGE_CONTENT } from "@/constants/homePage";
import { NarratorRole, Language } from "../types";
import { AppContext } from "../App";
import logoUrl from "src/assets/images/logo.png";

const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === "vi" || l === "VN" ? Language.VN : Language.EN;

/* ---------- Hero ---------- */
const HeroSection: React.FC = () => {
  const { language } = React.useContext(AppContext);
  const lang = normalizeLang(language);
  const H = HOME_PAGE_CONTENT;
  const wl = H.hero.welcomeLeadParts[lang];

  const [showPlayer, setShowPlayer] = React.useState(false);
  const YT_ID = "Q_lkVCYpJCg"; // extracted from your YouTube link

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center relative bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-5xl px-4 animate-fadeInUp">
        <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground flex items-center justify-center gap-3 md:gap-4">
          <span>{H.hero.title[lang]}</span>
          <img
            src={logoUrl}
            alt="AICC logo"
            className="h-24 w-auto align-middle"
          />
        </h1>

        <p className="mt-3 text-base md:text-lg text-foreground/80 font-semibold">
          {wl.before}
          <span className="inline-block text-4xl font-extrabold text-primary animate-slam">
            {wl.word}
          </span>
          {wl.after}
        </p>

        <p className="mt-2 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {H.hero.tagline[lang]}
        </p>

        {/* Video area */}
        <div className="mt-12 w-full max-w-4xl mx-auto aspect-video rounded-2xl shadow-2xl border-2 border-border relative overflow-hidden">
          {!showPlayer ? (
            <button
              onClick={() => setShowPlayer(true)}
              className="absolute inset-0"
              aria-label="Play video"
            >
              <iframe
                src={`https://www.youtube.com/embed/${YT_ID}`}
                title="YouTube video"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <span className="absolute inset-0 m-auto z-10 w-20 h-20 bg-background/80 rounded-full flex items-center justify-center shadow-xl">
                ▶
              </span>
            </button>
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
          <p className="absolute bottom-4 right-4 z-10 text-white/90 text-sm font-semibold drop-shadow px-2 py-1 rounded">
            {H.hero.videoLabel[lang]}
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#narrators"
        aria-label={HOME_PAGE_CONTENT.hero.ariaScroll[lang]}
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("narrators")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow"
      >
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center ring-4 ring-primary/10 hover:bg-primary/30 transition-colors">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </a>
    </div>
  );
};

/* ---------- Narrator Selection ---------- */
const NarratorSelection: React.FC = () => {
  const { language } = React.useContext(AppContext);
  const lang = normalizeLang(language);
  const H = HOME_PAGE_CONTENT;

  return (
    <section id="narrators" className="py-16">
      <h2 className="text-center font-display text-3xl font-bold mb-10">
        {H.narrators.title[lang]}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
    <section className="py-20 bg-card rounded-2xl shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-display text-3xl font-bold text-brand-blue-900">
              {H.facts.f1.head[lang]}
            </h3>
            <p className="mt-2 text-muted-foreground font-medium">
              {H.facts.f1.body[lang]}
            </p>
          </div>
          <div>
            <h3 className="font-display text-3xl font-bold text-brand-red-900">
              {H.facts.f2.head[lang]}
            </h3>
            <p className="mt-2 text-muted-foreground font-medium">
              {H.facts.f2.body[lang]}
            </p>
          </div>
          <div>
            <h3 className="font-display text-3xl font-bold text-brand-purple-900">
              {H.facts.f3.head[lang]}
            </h3>
            <p className="mt-2 text-muted-foreground font-medium">
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
    <section className="py-16 text-center">
      <h2 className="font-display text-2xl font-bold text-muted-foreground mb-8">
        {H.sponsors.title[lang]}
      </h2>
      <div className="flex justify-center items-center space-x-8 md:space-x-12 text-muted-foreground">
        <span className="font-bold text-lg">{H.sponsors.labels.adc[lang]}</span>
        <img
          src="https://1000logos.net/wp-content/uploads/2019/07/RMIT-Logo.png"
          alt="RMIT University Logo"
          className="h-10 md:h-12 w-auto"
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
      <div>
        <HeroSection />
        <div className="py-20">
          <div className="space-y-20">
            <NarratorSelection />
            <QuickFacts />
            <Sponsors />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
