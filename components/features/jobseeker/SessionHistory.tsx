// src/components/jobseeker/history/SessionHistory.tsx
import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Star, Layers, BarChart2, TrendingUp, Trophy, Sparkles, Award,
  Zap, Flame, Calendar, CalendarCheck, Target, MessageSquare,
  MessageCircle, Sunrise, Moon, RotateCcw, LayoutGrid, CheckCircle2,
  X, Medal,
} from "lucide-react";
import { AppContext } from "../../../App";
import { DIALOGUE } from "@/constants";
import {
  loadHistory,
  deleteHistoryEntry,
  clearHistory,
  formatRelative,
  type HistoryItem,
} from "@/utils/History";
import { Language } from "@/types";
import {
  JOBSEEKER_HISTORY_CONTENT,
  JOBSEEKER_BADGE_LABELS,
} from "@/constants/jobseeker/jobseeker";
import { loadWellness, type WellnessEntry } from "@/utils/wellness";

/* ─── Seen-badge persistence ──────────────────────────────────────── */

const SEEN_KEY = "neuro_seen_badges";

function loadSeenBadges(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || "[]")); }
  catch { return new Set(); }
}

function markBadgesSeen(ids: string[]) {
  const seen = loadSeenBadges();
  ids.forEach((id) => seen.add(id));
  localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
}

/* ─── XP / Streak ─────────────────────────────────────────────────── */

type Stats = {
  totalSessions: number;
  avgScore: number;
  xp: number;
  level: number;
  nextLevelXp: number;
  xpIntoLevel: number;
  streakDays: number;
  weekCount: number;
  byType: Record<string, number>;
};

const LEVEL_THRESHOLDS = [0, 50, 120, 220, 360, 540, 760, 1020, 1320, 1660];

const getLevelFromXP = (xp: number) => {
  let lvl = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) lvl = i + 1;
  }
  const next = LEVEL_THRESHOLDS[Math.min(lvl, LEVEL_THRESHOLDS.length - 1)];
  const prev = LEVEL_THRESHOLDS[Math.max(0, lvl - 2)];
  return { level: lvl, nextLevelXp: next ?? xp, xpIntoLevel: xp - (prev ?? 0) };
};

const xpFor = (h: HistoryItem) => {
  const base = 10;
  const scoreBonus = Math.round((h.overallScore || 0) * 4);
  const typeBonus = h.type === "STAR Interview" ? 6 : h.type === "Common Questions" ? 4 : 5;
  return base + scoreBonus + typeBonus;
};

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const computeStreakDays = (items: HistoryItem[]): number => {
  if (!items.length) return 0;
  const days = new Set(items.map((i) => startOfDay(new Date(i.ts))));
  const today = startOfDay(new Date());
  let ptr = days.has(today) ? today : today - 86_400_000;
  if (!days.has(ptr)) return 0;
  let streak = 0;
  while (days.has(ptr)) { streak++; ptr -= 86_400_000; }
  return streak;
};

const computeStats = (items: HistoryItem[]): Stats => {
  const total = items.length;
  const avgScore = total === 0 ? 0
    : Math.round(items.reduce((s, i) => s + (i.overallScore || 0), 0) / total * 10) / 10;
  const xp = items.reduce((s, i) => s + xpFor(i), 0);
  const { level, nextLevelXp, xpIntoLevel } = getLevelFromXP(xp);
  const weekCount = items.filter((i) => i.ts >= Date.now() - 7 * 86_400_000).length;
  const byType: Record<string, number> = {};
  for (const i of items) byType[i.type] = (byType[i.type] || 0) + 1;
  return { totalSessions: total, avgScore, xp, level, nextLevelXp, xpIntoLevel, streakDays: computeStreakDays(items), weekCount, byType };
};

/* ─── Badge definitions ───────────────────────────────────────────── */

type BadgeId = keyof typeof JOBSEEKER_BADGE_LABELS;

type Badge = {
  id: BadgeId;
  Icon: LucideIcon;
  bg: string;
  iconColor: string;
  ring: string;
};

const computeBadges = (items: HistoryItem[], stats: Stats): Badge[] => {
  const add = (id: BadgeId, Icon: LucideIcon, bg: string, iconColor: string, ring: string) =>
    ({ id, Icon, bg, iconColor, ring });

  const earned: Badge[] = [];

  // ── Session milestones ──────────────────────────────────────────
  if (stats.totalSessions >= 1)
    earned.push(add("first", Star, "bg-blue-50", "text-blue-600", "border-blue-200"));
  if (stats.totalSessions >= 5)
    earned.push(add("five", Layers, "bg-blue-50", "text-blue-600", "border-blue-200"));
  if (stats.totalSessions >= 10)
    earned.push(add("ten", BarChart2, "bg-indigo-50", "text-indigo-600", "border-indigo-200"));
  if (stats.totalSessions >= 20)
    earned.push(add("twenty", TrendingUp, "bg-violet-50", "text-violet-600", "border-violet-200"));

  // ── Score achievements ──────────────────────────────────────────
  const highScoreCount = items.filter((i) => i.overallScore >= 4).length;
  if (highScoreCount >= 1)
    earned.push(add("four-star", Sparkles, "bg-violet-50", "text-violet-600", "border-violet-200"));
  if (highScoreCount >= 3)
    earned.push(add("high-scorer", CheckCircle2, "bg-violet-50", "text-violet-700", "border-violet-200"));
  if (items.some((i) => i.overallScore >= 5))
    earned.push(add("perfect", Award, "bg-amber-50", "text-amber-600", "border-amber-200"));
  if (stats.totalSessions >= 3 && stats.avgScore >= 4)
    earned.push(add("avg-four", Trophy, "bg-amber-50", "text-amber-600", "border-amber-200"));

  // ── Streaks ─────────────────────────────────────────────────────
  if (stats.streakDays >= 2)
    earned.push(add("streak2", Zap, "bg-orange-50", "text-orange-500", "border-orange-200"));
  if (stats.streakDays >= 3)
    earned.push(add("streak3", Zap, "bg-orange-50", "text-orange-600", "border-orange-300"));
  if (stats.streakDays >= 7)
    earned.push(add("streak7", Flame, "bg-rose-50", "text-rose-500", "border-rose-200"));
  if (stats.streakDays >= 14)
    earned.push(add("streak14", Flame, "bg-rose-50", "text-rose-700", "border-rose-300"));

  // ── Weekly ──────────────────────────────────────────────────────
  if (stats.weekCount >= 3)
    earned.push(add("consistency", CalendarCheck, "bg-teal-50", "text-teal-600", "border-teal-200"));
  if (stats.weekCount >= 5)
    earned.push(add("weekly5", Calendar, "bg-teal-50", "text-teal-700", "border-teal-300"));

  // ── Mode specialization ─────────────────────────────────────────
  const typeCount = Object.keys(stats.byType).length;
  if (typeCount >= 2)
    earned.push(add("explorer", LayoutGrid, "bg-emerald-50", "text-emerald-600", "border-emerald-200"));
  if (typeCount >= 3)
    earned.push(add("diverse", LayoutGrid, "bg-emerald-50", "text-emerald-700", "border-emerald-300"));
  if ((stats.byType["STAR Interview"] || 0) >= 3)
    earned.push(add("star-specialist", Target, "bg-emerald-50", "text-emerald-600", "border-emerald-200"));
  if ((stats.byType["STAR Interview"] || 0) >= 10)
    earned.push(add("star-master", Target, "bg-emerald-50", "text-emerald-800", "border-emerald-300"));
  if ((stats.byType["Common Questions"] || 0) >= 3)
    earned.push(add("common-pro", MessageSquare, "bg-sky-50", "text-sky-600", "border-sky-200"));
  if ((stats.byType["Small Talk"] || 0) >= 3)
    earned.push(add("smalltalker", MessageCircle, "bg-sky-50", "text-sky-600", "border-sky-200"));

  // ── Time of day ─────────────────────────────────────────────────
  if (items.some((i) => { const h = new Date(i.ts).getHours(); return h >= 5 && h <= 9; }))
    earned.push(add("early-bird", Sunrise, "bg-amber-50", "text-amber-500", "border-amber-200"));
  if (items.some((i) => { const h = new Date(i.ts).getHours(); return h >= 20 && h <= 23; }))
    earned.push(add("night-owl", Moon, "bg-slate-100", "text-slate-500", "border-slate-300"));

  // ── Special ─────────────────────────────────────────────────────
  // Speed runner: 2+ sessions same calendar day
  const dayCounts: Record<number, number> = {};
  for (const i of items) { const d = startOfDay(new Date(i.ts)); dayCounts[d] = (dayCounts[d] || 0) + 1; }
  if (Object.values(dayCounts).some((c) => c >= 2))
    earned.push(add("speed-runner", Zap, "bg-yellow-50", "text-yellow-600", "border-yellow-200"));

  // Comeback: gap >= 7 days between any two consecutive sessions
  const sorted = [...items].sort((a, b) => a.ts - b.ts);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].ts - sorted[i - 1].ts >= 7 * 86_400_000) {
      earned.push(add("comeback", RotateCcw, "bg-slate-50", "text-slate-600", "border-slate-300"));
      break;
    }
  }

  return earned;
};

/* ─── Badge toast ─────────────────────────────────────────────────── */

const BadgeToast: React.FC<{
  badge: Badge;
  label: typeof JOBSEEKER_BADGE_LABELS[BadgeId];
  lang: Language;
  onDismiss: () => void;
}> = ({ badge, label, lang, onDismiss }) => {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setTimeout(onDismiss, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        minWidth: 280,
        maxWidth: "calc(100vw - 32px)",
        animation: "badgeSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      <div className={`flex items-start gap-3 rounded-2xl border shadow-lg px-4 py-3 ${badge.bg} ${badge.ring}`}>
        <div className={`mt-0.5 flex-shrink-0 rounded-full p-2 bg-white/80 ${badge.iconColor}`}>
          <badge.Icon className="w-5 h-5" aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {lang === Language.EN ? "Badge unlocked" : "Huy hiệu mới"}
          </p>
          <p className="font-bold text-slate-900">{label.name[lang]}</p>
          <p className="text-sm text-slate-700">{label.description[lang]}</p>
        </div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 mt-0.5 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label={lang === Language.EN ? "Dismiss" : "Đóng"}
        >
          <X className="w-4 h-4" aria-hidden />
        </button>
      </div>
      <style>{`
        @keyframes badgeSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(24px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

/* ─── Star rating ──────────────────────────────────────────────────── */

const StarRating: React.FC<{ score: number; size?: string }> = ({ score, size = "w-5 h-5" }) => (
  <div role="img" aria-label={`${score} out of 5 stars`} className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`${size} ${i < Math.round(score || 0) ? "text-yellow-500" : "text-slate-300"}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.363 2.44a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.363-2.44a1 1 0 00-1.175 0l-3.363 2.44c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    ))}
  </div>
);

/* ─── Main component ───────────────────────────────────────────────── */

const SessionHistory: React.FC = () => {
  const { language, setNarratorDialogue, setNarratorState } = useContext(AppContext);
  const [items, setItems] = useState<HistoryItem[]>(() => loadHistory());
  const [wellness] = useState<WellnessEntry[]>(() => loadWellness());
  const [toastQueue, setToastQueue] = useState<Badge[]>([]);

  const langKey = language === "en" ? Language.EN : Language.VN;
  const t = <K extends keyof typeof JOBSEEKER_HISTORY_CONTENT>(key: K) =>
    JOBSEEKER_HISTORY_CONTENT[key][langKey];

  useEffect(() => {
    setNarratorDialogue(DIALOGUE.jobseekerHistory[language]);
    setNarratorState("celebrating");
    const timer = setTimeout(() => setNarratorState("idle"), 1500);
    return () => clearTimeout(timer);
  }, [language, setNarratorDialogue, setNarratorState]);

  const stats = useMemo(() => computeStats(items), [items]);
  const badges = useMemo(() => computeBadges(items, stats), [items, stats]);

  // Detect newly earned badges and queue toasts
  useEffect(() => {
    if (!badges.length) return;
    const seen = loadSeenBadges();
    const newBadges = badges.filter((b) => !seen.has(b.id));
    if (newBadges.length) {
      markBadgesSeen(newBadges.map((b) => b.id));
      setToastQueue((q) => [...q, ...newBadges]);
    }
  }, [badges]);

  const dismissToast = () => setToastQueue((q) => q.slice(1));

  const handleDelete = (id: string) => {
    deleteHistoryEntry(id);
    setItems(loadHistory());
  };

  const handleClear = () => {
    if (confirm(t("clearConfirm"))) {
      clearHistory();
      setItems([]);
    }
  };

  const levelProgressPct = stats.nextLevelXp === stats.xp ? 100
    : Math.max(0, Math.min(100, Math.round(
        ((stats.xp - Math.max(0, stats.xp - stats.xpIntoLevel)) /
          (stats.nextLevelXp - (stats.xp - stats.xpIntoLevel))) * 100
      )));

  // Wellness trend
  const wellnessTrend = useMemo(() => {
    const recent = wellness.slice(0, 10).reverse();
    if (!recent.length) return null;
    const avgConf = Math.round(recent.reduce((s, e) => s + e.confidence, 0) / recent.length * 10) / 10;
    const avgAnx  = Math.round(recent.reduce((s, e) => s + e.anxiety,    0) / recent.length * 10) / 10;
    return { recent, avgConf, avgAnx };
  }, [wellness]);

  return (
    <div className="space-y-8">

      {/* Toast (show one at a time) */}
      {toastQueue[0] && (() => {
        const b = toastQueue[0];
        const label = JOBSEEKER_BADGE_LABELS[b.id];
        return <BadgeToast key={b.id} badge={b} label={label} lang={langKey} onDismiss={dismissToast} />;
      })()}

      {/* Progress header */}
      <section aria-labelledby="progress-heading" className="relative overflow-hidden rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 id="progress-heading" className="font-display text-3xl font-extrabold text-slate-900">
              {t("progressTitle")}
            </h2>
            <p className="mt-1 text-slate-800">
              {t("levelLabel")} <span className="font-semibold">{stats.level}</span> ·{" "}
              {t("xpLabel")} <span className="font-semibold">{stats.xp}</span> ·{" "}
              {t("streakLabel")} <span className="font-semibold">{stats.streakDays}{t("streakSuffix")}</span>
            </p>
          </div>
          {stats.totalSessions > 0 && (
            <button onClick={handleClear} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50">
              {t("clearAll")}
            </button>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-slate-700">
            <span>{t("xpToNextLabel")}</span>
            <span>{stats.xp}/{stats.nextLevelXp}</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-[width] duration-700 ease-out shimmer"
              style={{ width: `${levelProgressPct}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-700">
            {t("sessionsLabel")}: <span className="font-semibold">{stats.totalSessions}</span> ·{" "}
            {t("avgScoreLabel")}: <span className="font-semibold">{stats.avgScore}</span> ·{" "}
            {t("thisWeekLabel")}: <span className="font-semibold">{stats.weekCount}</span>
          </p>
        </div>
      </section>

      {/* Badges */}
      <section aria-labelledby="badges-heading" className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Medal className="w-5 h-5 text-slate-700" aria-hidden />
          <h3 id="badges-heading" className="font-display text-2xl font-bold text-slate-900">
            {t("badgesTitle")}
          </h3>
          {badges.length > 0 && (
            <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {badges.length}
            </span>
          )}
        </div>

        {badges.length === 0 ? (
          <p className="text-slate-700">{t("badgesEmpty")}</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {badges.map((b) => {
              const label = JOBSEEKER_BADGE_LABELS[b.id];
              return (
                <li
                  key={b.id}
                  className={`rounded-xl border p-4 shadow-sm ${b.bg} ${b.ring} flex flex-col items-center text-center gap-2`}
                >
                  <div className={`rounded-full p-2.5 bg-white/80 shadow-sm ${b.iconColor}`}>
                    <b.Icon className="w-6 h-6" aria-hidden />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm leading-snug">{label.name[langKey]}</p>
                  <p className="text-xs text-slate-600 leading-snug">{label.description[langKey]}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Past Sessions */}
      <section aria-labelledby="sessions-heading">
        <h3 id="sessions-heading" className="font-display text-2xl font-bold mb-4 text-slate-900">
          {t("sessionsTitle")}
        </h3>

        {items.length === 0 ? (
          <p className="text-slate-800">{t("sessionsEmpty")}</p>
        ) : (
          <ul className="space-y-3">
            {items.map((s) => (
              <li key={s.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-300 shadow-sm">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{s.type}</p>
                  <p className="text-sm text-slate-800">{formatRelative(s.ts)}</p>
                  <p className="mt-1 text-sm text-slate-700 line-clamp-1">{s.question}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <StarRating score={s.overallScore} />
                    <p className="text-xs text-slate-800 mt-1">{t("overallScoreLabel")}</p>
                  </div>
                  <button
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold hover:bg-slate-50"
                    onClick={() => handleDelete(s.id)}
                  >
                    {language === "en" ? "Delete" : "Xóa"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Wellness trend */}
      {wellnessTrend && (
        <section aria-labelledby="wellness-heading" className="space-y-3">
          <h3 id="wellness-heading" className="font-display text-xl font-bold text-slate-900">
            {language === "en" ? "How you have been feeling" : "Cảm xúc của bạn"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-sm font-semibold text-blue-700">{language === "en" ? "Avg. Confidence" : "Tự tin TB"}</p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-3xl font-bold text-blue-900">{wellnessTrend.avgConf}</span>
                <span className="text-sm text-blue-600 mb-1">/5</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm font-semibold text-amber-700">{language === "en" ? "Avg. Anxiety" : "Lo lắng TB"}</p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-3xl font-bold text-amber-900">{wellnessTrend.avgAnx}</span>
                <span className="text-sm text-amber-600 mb-1">/5</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .shimmer { background-size: 200% 100%; animation: shimmerMove 2.2s linear infinite; }
        @keyframes shimmerMove { 0% { background-position: 0% 0%; } 100% { background-position: 200% 0%; } }
      `}</style>
    </div>
  );
};

export default SessionHistory;
