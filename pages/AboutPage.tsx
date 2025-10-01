// src/pages/AboutPage.tsx
import React from "react";
import Layout from "../components/Layout";
import { AppContext } from "../App";
import { Sparkles, Globe2, Link as LinkIcon } from "lucide-react";
import { Linkedin, Facebook } from "lucide-react";
import { Language } from "../types";
import { ABOUT_PAGE_CONTENT } from "@/constants/AboutPage";

/* ---------- Language Helper ---------- */
const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === "vi" || l === "VN" ? Language.VN : Language.EN;

/* ---------- Reusable Section ---------- */
const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = "" }) => (
  <section className={`mb-16 ${className}`}>
    <h2 className="font-display text-3xl font-bold text-foreground mb-8 pb-4 border-b-4 border-primary">
      {title}
    </h2>
    <div className="text-foreground/90 text-lg space-y-5 leading-relaxed">
      {children}
    </div>
  </section>
);

/* ---------- Team Member Card (collapsible bio + localized labels) ---------- */
type TeamMemberProps = {
  name: string;
  title: string;
  bio: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  avatarSrc?: string;
};

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  name,
  title,
  bio,
  portfolioUrl,
  linkedinUrl,
  resumeUrl,
  avatarSrc,
}) => {
  const { language } = React.useContext(AppContext);
  const lang = normalizeLang(language);
  const fallback = `https://via.placeholder.com/128/E3EEF6/375071?text=Photo`;
  const src = avatarSrc || fallback;
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-card p-6 rounded-xl shadow-md border border-border transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
      <div className="flex-shrink-0">
        <img
          className="h-24 w-24 rounded-full object-cover ring-4 ring-card shadow-sm bg-muted"
          src={src}
          alt={`${name} portrait`}
          loading="lazy"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-display text-xl font-bold text-card-foreground">
          {name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-primary">{title}</p>

        {/* Collapsible bio */}
        <div className="mt-4 relative">
          <p
            className={[
              "text-muted-foreground whitespace-pre-line transition-all duration-300",
              expanded ? "max-h-none" : "max-h-20 overflow-hidden",
            ].join(" ")}
          >
            {bio}
          </p>
          {!expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent" />
          )}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 text-primary font-semibold text-sm hover:underline"
        >
          {expanded
            ? ABOUT_PAGE_CONTENT.sections.buttons.showLess[lang]
            : ABOUT_PAGE_CONTENT.sections.buttons.showMore[lang]}
        </button>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3">
          {portfolioUrl && (
            <a
              href={portfolioUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 px-4 py-2 bg-primary/10 text-primary font-bold rounded-full text-sm hover:bg-primary/20 transition-colors"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              {ABOUT_PAGE_CONTENT.sections.buttons.viewPortfolio[lang]}
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 px-3 py-1.5 rounded-full border border-border text-sm text-foreground/80 hover:bg-muted transition-colors"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              {ABOUT_PAGE_CONTENT.sections.buttons.linkedIn[lang]}
            </a>
          )}
          {resumeUrl && (
            <a
              href={resumeUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 px-3 py-1.5 rounded-full border border-border text-sm text-foreground/80 hover:bg-muted transition-colors"
            >
              {ABOUT_PAGE_CONTENT.sections.buttons.resume[lang]}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- Mentor Card (localized role + testimony + socials) ---------- */
type MentorCardProps = {
  name: string;
  role: string;
  avatarSrc?: string;
  socials?: { linkedin?: string; facebook?: string; website?: string };
  testimony?: string;
};

const MentorCard: React.FC<MentorCardProps> = ({
  name,
  role,
  avatarSrc,
  socials,
  testimony,
}) => {
  const fallback = `https://via.placeholder.com/160/E3EEF6/375071?text=Mentor`;
  const src = avatarSrc || fallback;

  return (
    <div className="min-w-[280px] max-w-xs flex-shrink-0 bg-card p-5 rounded-xl shadow-md border border-border hover:shadow-lg transition-all">
      <div className="flex items-center space-x-4">
        <img
          src={src}
          alt={`${name} portrait`}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-card"
          loading="lazy"
        />
        <div>
          <h3 className="font-display text-base font-bold text-card-foreground">
            {name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground leading-snug">{role}</p>

          {socials && (
            <div className="flex space-x-3 mt-2">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name}'s LinkedIn`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name}'s Facebook`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {socials.website && (
                <a
                  href={socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors font-semibold text-xs"
                >
                  {
                    ABOUT_PAGE_CONTENT.sections.buttons.website[
                      normalizeLang(Language.EN)
                    ] /* identical label */
                  }
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {testimony && (
        <blockquote className="mt-3 text-xs italic text-muted-foreground border-l-4 border-primary/40 pl-3">
          “{testimony}”
        </blockquote>
      )}
    </div>
  );
};

/* ---------- Page ---------- */
const AboutPage: React.FC = () => {
  const { setNarratorDialogue, language } = React.useContext(AppContext);

  React.useEffect(() => {
    setNarratorDialogue("");
  }, [setNarratorDialogue]);

  const lang = normalizeLang(language);
  const C = ABOUT_PAGE_CONTENT;

  // Build localized arrays at render-time to avoid scattering i18n logic
  const TEAM = C.team.map((m) => ({
    name: m.name,
    avatarSrc: m.avatarSrc,
    portfolioUrl: (m as any).portfolioUrl,
    linkedinUrl: (m as any).linkedinUrl,
    resumeUrl: (m as any).resumeUrl,
    title: m.title[lang],
    bio: m.bio[lang],
  }));

  const MENTORS = C.mentors.map((m) => ({
    name: m.name,
    avatarSrc: m.avatarSrc,
    role: m.role[lang],
    testimony: m.testimony[lang],
    socials: (m as any).socials,
  }));

  return (
    <Layout>
      <div className="bg-card p-8 md:p-12 rounded-2xl shadow-lg">
        {/* Hero */}
        <div className="text-center mb-16 py-8 bg-muted/50 rounded-xl border border-border">
          <h1 className="mt-0 font-display text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            {C.heroTitle[lang]}
          </h1>
          <p className="mt-4 font-display text-lg md:text-xl text-muted-foreground">
            {C.heroSubtitle[lang]}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Our Story */}
          <Section title={C.sections.ourStory.title[lang]}>
            <p>{C.sections.ourStory.p1[lang]}</p>
            <p>{C.sections.ourStory.p2[lang]}</p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
              {C.sections.ourStory.list[lang].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>{C.sections.ourStory.p3[lang]}</p>
          </Section>

          {/* Founding Team */}
          <Section title={C.sections.foundingTeam.title[lang]}>
            <p>{C.sections.foundingTeam.intro[lang]}</p>
            <div className="mt-8 grid grid-cols-1 gap-8">
              {TEAM.map((tm) => (
                <TeamMemberCard key={tm.name} {...tm} />
              ))}
            </div>
          </Section>

          {/* Evolution */}
          <Section title={C.sections.evolution.title[lang]}>
            <p>{C.sections.evolution.intro[lang]}</p>
            <ul className="list-disc list-inside space-y-3 pl-4 font-semibold">
              {C.sections.evolution.points[lang].map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
            <p>{C.sections.evolution.outro[lang]}</p>
          </Section>

          {/* Mission & Vision */}
          <Section title={C.sections.missionVision.title[lang]}>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 to-card p-6 rounded-xl shadow-md border border-primary/20">
                <h3 className="flex items-center font-display text-2xl font-bold text-foreground">
                  <Sparkles className="w-6 h-6 mr-3 text-primary" />
                  {C.sections.mission[lang]}
                </h3>
                <p className="mt-2 text-muted-foreground text-lg">
                  {C.sections.missionText[lang]}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-card p-6 rounded-xl shadow-md border border-primary/20">
                <h3 className="flex items-center font-display text-2xl font-bold text-foreground">
                  <Globe2 className="w-6 h-6 mr-3 text-primary" />
                  {C.sections.vision[lang]}
                </h3>
                <p className="mt-2 text-muted-foreground text-lg">
                  {C.sections.visionText[lang]}
                </p>
              </div>
            </div>
          </Section>

          {/* Acknowledgements */}
          <Section title={C.sections.acknowledgements.title[lang]}>
            <p>{C.sections.acknowledgements.text[lang]}</p>
            <div className="mt-6 overflow-x-auto pb-2 -mx-2">
              <div className="px-2 flex space-x-4">
                {MENTORS.map((m) => (
                  <MentorCard
                    key={m.name}
                    name={m.name}
                    role={m.role}
                    avatarSrc={m.avatarSrc}
                    socials={m.socials}
                    testimony={m.testimony}
                  />
                ))}
              </div>
            </div>
          </Section>

          {/* Research */}
          <Section title={C.sections.research.title[lang]}>
            <p>{C.sections.research.text[lang]}</p>
          </Section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
