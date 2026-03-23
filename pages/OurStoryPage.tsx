// src/pages/OurStoryPage.tsx
import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import { AppContext } from "../App";
import { Language } from "../types";
import { OUR_STORY_CONTENT } from "@/constants/Ourstory";
import { Award, Mic2, Rocket, ExternalLink, ChevronRight } from "lucide-react";

const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === "vi" || l === "VN" ? Language.VN : Language.EN;

/* ── Media loader ── */
const imgMods = import.meta.glob("/src/assets/images/OurStory/*", { eager: true, as: "url" });
const vidMods = import.meta.glob("/src/assets/videos/OurStory/*", { eager: true, as: "url" });
const byBasename = (mods: Record<string, string>) => {
  const out: Record<string, string> = {};
  for (const p in mods) out[p.split("/").pop()!] = mods[p];
  return out;
};
const IMAGES = byBasename(imgMods);
const VIDEOS = byBasename(vidMods);
const imageUrl = (f?: string) => (f && IMAGES[f]) || "";
const videoUrl = (f?: string) => (f && VIDEOS[f]) || "";

/* ── Placeholder key → filename maps ── */
const MEDIA_IMAGE_MAP: Record<string, string | undefined> = {
  TEAM_PHOTO: "ADC1.png",
  BRAINSTORM: "team_photo.jpg",
  TEAM_CALL: "team_photo.jpg",
  BOOTCAMP: "bootcamp.jpg",
  MEETING_THUY: "meeting_thuy.png",
  IDEA_REFINEMENT: "idea_refinement.jpg",
  TEAM_LAUGH: "team_photo.jpg",
  SANDY_WORKSHOP: "sandy_workshop.jpg",
  DRAFT: "proposal.JPG",
  TRUNG_MEETING: "trung.jpg",
  SURVEY: "team_photo.jpg",
  FEEDBACK: "feedback.jpg",
  PROPOSAL: "proposal.JPG",
  KRISTEN: "kristen.png",
  BUG: "prototype.png",
  CODING: "coding.jpg",
  SIMONA: "simona.png",
  TROY: "troy.jpg",
  FINAL_SPRINT: "final_sprint.JPG",
  REFLECTION: "reflection.jpg",
  GALLERY: undefined,
  ADC_WIN: "ADC2.png",
  SPARK_HUB: "us.png",
};
const MEDIA_VIDEO_MAP: Record<string, string | undefined> = {
  TEAM_PHOTO: undefined, BRAINSTORM: undefined, TEAM_CALL: undefined,
  BOOTCAMP: "bootcamp.mov", MEETING_THUY: undefined, IDEA_REFINEMENT: "debate.mov",
  TEAM_LAUGH: "team_laugh.mov", SANDY_WORKSHOP: undefined, DRAFT: undefined,
  TRUNG_MEETING: undefined, SURVEY: undefined, FEEDBACK: undefined,
  PROPOSAL: "proposal.MOV", KRISTEN: undefined, BUG: undefined, CODING: undefined,
  SIMONA: undefined, TROY: undefined, FINAL_SPRINT: undefined,
  REFLECTION: "reflection.MP4", GALLERY: "bootcamp.mp4",
  ADC_WIN: undefined, SPARK_HUB: undefined,
};

/* ── MediaBlock ── */
const PlaceholderMedia: React.FC<{ label: string; aspectClass?: string }> = ({ label, aspectClass }) => (
  <div className={`relative ${aspectClass || "aspect-[16/9]"} w-full overflow-hidden rounded-xl border-2 border-dashed border-border bg-gradient-to-br from-slate-50 to-slate-100`}>
    <div className="absolute inset-0 grid place-items-center">
      <span className="rounded-lg bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">{label}</span>
    </div>
  </div>
);

const MediaBlock: React.FC<{
  placeholderKey: string; alt: string; placeholderLabel: string;
  frameAspectClass?: string; fit?: "cover" | "contain";
}> = ({ placeholderKey, alt, placeholderLabel, frameAspectClass, fit = "cover" }) => {
  const [useVideo, setUseVideo] = useState(false);
  const imgFile = MEDIA_IMAGE_MAP[placeholderKey];
  const vidFile = MEDIA_VIDEO_MAP[placeholderKey];
  const imgSrc = imageUrl(imgFile);
  const vidSrc = videoUrl(vidFile);
  const hasImg = !!imgFile && !!imgSrc;
  const hasVid = !!vidFile && !!vidSrc;
  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  const wrap = (node: React.ReactNode) => (
    <div className={`relative w-full ${frameAspectClass || "aspect-[16/9]"} overflow-hidden rounded-xl bg-slate-100`}>
      <div className="absolute inset-0">{node}</div>
    </div>
  );

  if (!hasImg && !hasVid) return <PlaceholderMedia label={placeholderLabel} aspectClass={frameAspectClass} />;

  if (hasImg && !useVideo) {
    const el = <img src={imgSrc} alt={alt} className={`h-full w-full ${fitClass} object-center rounded-xl`} onError={() => { if (hasVid) setUseVideo(true); }} loading="lazy" />;
    return frameAspectClass ? wrap(el) : <img src={imgSrc} alt={alt} className="w-full h-auto rounded-xl object-cover" onError={() => { if (hasVid) setUseVideo(true); }} loading="lazy" />;
  }
  if (hasVid) {
    const el = <video className={`h-full w-full ${fitClass} object-center rounded-xl`} controls playsInline preload="metadata" src={vidSrc}><track kind="captions" /></video>;
    return frameAspectClass ? wrap(el) : <video className="w-full h-auto rounded-xl" controls playsInline preload="metadata" src={vidSrc}><track kind="captions" /></video>;
  }
  return <PlaceholderMedia label={placeholderLabel} aspectClass={frameAspectClass} />;
};

/* ── GalleryMedia ── */
type GalleryItem = { type: "image" | "video"; file: string; poster?: string; caption: Record<Language, string> };
const isHttp = (p?: string) => !!p && /^https?:\/\//i.test(p);
const resolveSrc = (type: "image" | "video", file: string) =>
  isHttp(file) ? file : type === "image" ? imageUrl(file) : videoUrl(file);

const GalleryMedia: React.FC<{ item: GalleryItem; alt: string; aspect?: string }> = ({ item, alt, aspect = "aspect-[4/3]" }) => {
  const src = resolveSrc(item.type, item.file);
  const poster = item.poster ? (isHttp(item.poster) ? item.poster : imageUrl(item.poster)) : undefined;
  return (
    <div className={`relative w-full ${aspect} overflow-hidden rounded-xl bg-slate-100`}>
      {item.type === "image"
        ? <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" />
        : <video className="absolute inset-0 h-full w-full object-cover" controls playsInline preload="metadata" poster={poster} src={src}><track kind="captions" /></video>
      }
    </div>
  );
};

/* ── Achievement icon map ── */
const ACHIEVEMENT_ICONS: Record<string, React.ReactNode> = {
  Award:  <Award  className="h-5 w-5 text-primary" />,
  Mic2:   <Mic2   className="h-5 w-5 text-primary" />,
  Rocket: <Rocket className="h-5 w-5 text-primary" />,
};

/* ── Category tag color map ── */
const categoryColor: Record<string, string> = {
  Research: "bg-blue-100 text-blue-700",
  Pivot: "bg-orange-100 text-orange-700",
  "Mentor Session": "bg-violet-100 text-violet-700",
  Workshop: "bg-emerald-100 text-emerald-700",
  "Expert Consultation": "bg-teal-100 text-teal-700",
  "Feedback Session": "bg-amber-100 text-amber-700",
  Writing: "bg-pink-100 text-pink-700",
  Building: "bg-cyan-100 text-cyan-700",
  Breakthrough: "bg-green-100 text-green-700",
  "Strategy Session": "bg-indigo-100 text-indigo-700",
  "Final Sprint": "bg-red-100 text-red-700",
  Award: "bg-yellow-100 text-yellow-700",
  Recognition: "bg-purple-100 text-purple-700",
};
const getCatClass = (cat?: string) =>
  (cat && categoryColor[cat]) || "bg-slate-100 text-slate-700";

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
const OurStoryPage: React.FC = () => {
  const { language } = useContext(AppContext);
  const lang = normalizeLang(language);
  const UI = OUR_STORY_CONTENT.ui;
  const P = UI.placeholders;
  const marqueeItems = OUR_STORY_CONTENT.marqueeItems[lang];

  return (
    <Layout>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative mb-10 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 p-8 md:p-10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="sparkles" aria-hidden="true" />

        <div className="relative">
          {/* RMIT feature link */}
          <a
            href={OUR_STORY_CONTENT.rmitArticleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300 bg-white/80 px-3 py-1 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-sm hover:bg-white transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {UI.rmitBadge[lang]}
          </a>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            NeuroAICC
          </h1>
          <p className="mt-1 text-lg font-semibold text-primary">{UI.heroTitle[lang]}</p>
          <p className="mt-3 text-2xl md:text-3xl font-bold text-slate-800 leading-snug">
            {UI.heroTagline[lang]}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr,400px]">
            <p className="text-base text-slate-700 leading-relaxed max-w-xl">
              {UI.heroCopy[lang]}
            </p>
            <div className="rounded-2xl border border-border bg-white p-4 shadow-md">
              <MediaBlock placeholderKey="TEAM_PHOTO" alt="Team" placeholderLabel={P.TEAM_PHOTO[lang]} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE TICKER ════════════════════════════════════ */}
      <div className="mb-10 overflow-hidden rounded-2xl border border-border bg-card py-3 shadow-sm marquee-fade">
        <div className="marquee-track flex gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-xs font-semibold text-muted-foreground shrink-0 uppercase tracking-wide">
              {item}
              <span className="h-1 w-1 rounded-full bg-border inline-block" />
            </span>
          ))}
        </div>
      </div>

   

      {/* ══ THE JOURNEY ══════════════════════════════════════ */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-8 pb-3 border-b border-border">
          {UI.diary[lang]}
        </h2>

        <div className="space-y-6">
          {OUR_STORY_CONTENT.entries.map((e, idx) => {
            const isAward = e.id === "adc-result" || e.id === "spark-hub";
            return (
              <article
                key={idx}
                className={`grid items-start gap-5 md:grid-cols-2 ${
                  idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className={`rounded-2xl border p-5 shadow-sm ${
                  isAward
                    ? "border-primary/25 bg-gradient-to-br from-primary/5 to-accent/5"
                    : "border-border bg-white"
                }`}>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">{e.date[lang]}</span>
                    {e.category?.[lang] && (
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getCatClass(e.category[Language.EN])}`}>
                        {e.category[lang]}
                      </span>
                    )}
                  </div>
                  {e.title?.[lang] && (
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 leading-snug">{e.title[lang]}</h3>
                  )}
                  <p className="whitespace-pre-line text-slate-700 leading-relaxed text-sm">{e.body[lang]}</p>

                  {e.id === "0820" && (
                    <blockquote className="mt-4 border-l-4 border-amber-300 pl-4">
                      <p className="text-sm italic text-slate-600 leading-relaxed">
                        &ldquo;{OUR_STORY_CONTENT.sandyQuote[lang]}&rdquo;
                      </p>
                      <footer className="mt-1.5 text-xs font-semibold text-amber-700">
                        — {OUR_STORY_CONTENT.sandyQuoteAttr[lang]}
                      </footer>
                    </blockquote>
                  )}
                </div>

                <div className="rounded-2xl border border-border bg-white p-3 shadow-sm">
                  <MediaBlock
                    placeholderKey={e.placeholderKey}
                    alt={e.title?.[lang] || e.date[lang]}
                    placeholderLabel={P[e.placeholderKey]?.[lang] ?? e.placeholderKey}
                    frameAspectClass="aspect-[4/3]"
                    fit="cover"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════ */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
          {OUR_STORY_CONTENT.stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1 px-6 py-6 text-center">
              <span className="font-display text-3xl font-extrabold text-primary">{s.value}</span>
              <span className="text-xs text-muted-foreground leading-snug mt-0.5">{s.label[lang]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ RECOGNITION ══════════════════════════════════════ */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-8 pb-3 border-b border-border">
          {UI.recognition[lang]}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {OUR_STORY_CONTENT.achievements.map((a, i) => (
            <div key={i} className="rounded-2xl border border-border bg-white p-5 shadow-sm flex flex-col gap-2">
              <div className="mb-1">{ACHIEVEMENT_ICONS[a.icon]}</div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{a.label[lang]}</p>
              <h3 className="font-display text-lg font-bold text-foreground leading-snug">{a.title[lang]}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{a.body[lang]}</p>
            </div>
          ))}
        </div>

        {/* RMIT article CTA */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-sm text-slate-600 flex-1">
            {lang === Language.VN
              ? "RMIT Việt Nam đã chia sẻ câu chuyện của chúng tôi — về tác động xã hội, thiết kế tiếp cận và sứ mệnh phía sau NeuroAICC."
              : "RMIT Vietnam covered our story — the social impact, the accessibility focus, and the mission behind NeuroAICC."}
          </p>
          <a
            href={OUR_STORY_CONTENT.rmitArticleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {lang === Language.VN ? "Đọc bài viết" : "Read article"}
          </a>
        </div>
      </section>

      {/* ══ WHY THIS MATTERS ══════════════════════════════════ */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-8 pb-3 border-b border-border">
          {UI.impact[lang]}
        </h2>
        <p className="whitespace-pre-line text-slate-700 leading-relaxed max-w-2xl">
          {OUR_STORY_CONTENT.impact[lang]}
        </p>
      </section>

      {/* ══ WHAT WE LEARNED ═══════════════════════════════════ */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-8 pb-3 border-b border-border">
          {UI.lessons[lang]}
        </h2>
        <div className="space-y-4 border-l-2 border-primary/20 pl-5">
          {OUR_STORY_CONTENT.lessons[lang].map((lesson, i) => (
            <div key={i} className="flex items-start gap-3">
              <ChevronRight className="mt-0.5 shrink-0 h-4 w-4 text-primary/60" />
              <p className="text-slate-700 leading-relaxed">{lesson}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ REFLECTIONS ═══════════════════════════════════════ */}
      <section className="mb-12">
        <div className="grid gap-5 md:grid-cols-[1fr,380px]">
          <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">{UI.reflections[lang]}</h2>
            <p className="whitespace-pre-line text-slate-700 leading-relaxed text-sm">
              {OUR_STORY_CONTENT.reflections[lang]}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-3 shadow-sm">
            <MediaBlock placeholderKey="REFLECTION" alt="Reflection" placeholderLabel={P.REFLECTION[lang]} />
          </div>
        </div>
      </section>

      {/* ══ WITH GRATITUDE ════════════════════════════════════ */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-8 pb-3 border-b border-border">
          {UI.appreciation[lang]}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {OUR_STORY_CONTENT.appreciation[lang].map((line, i) => {
            const [nameRole, ...rest] = line.split(" — ");
            return (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">
                <span className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-primary/60" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{nameRole}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{rest.join(" — ")}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ MEDIA GALLERY ═════════════════════════════════════ */}
      <section className="mb-4">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-border">{UI.media[lang]}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(OUR_STORY_CONTENT.galleryItems as any[]).map((item: any, i: number) => (
            <div key={i} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <GalleryMedia item={item} alt={item.caption[lang]} aspect="aspect-[4/3]" />
              <p className="mt-2 text-center text-sm font-medium text-slate-700">{item.caption[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── inline styles ── */}
      <style>{`
        .sparkles {
          position: absolute; inset: 0;
          background:
            radial-gradient(2px 2px at 20% 30%, rgba(59,130,246,.6) 50%, transparent 51%) repeat,
            radial-gradient(2px 2px at 70% 60%, rgba(168,85,247,.55) 50%, transparent 51%) repeat,
            radial-gradient(2px 2px at 40% 80%, rgba(236,72,153,.5) 50%, transparent 51%) repeat;
          background-size: 180px 180px, 220px 220px, 200px 200px;
          animation: sparkleMove 18s linear infinite;
          opacity: .45; pointer-events: none;
        }
        @keyframes sparkleMove {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 180px 180px, -220px 220px, 200px -200px; }
        }
        .marquee-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .marquee-track {
          animation: marquee 40s linear infinite;
          display: inline-flex;
          padding: 0 2rem;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </Layout>
  );
};

export default OurStoryPage;
