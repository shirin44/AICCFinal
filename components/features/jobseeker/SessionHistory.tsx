// src/components/jobseeker/history/SessionHistory.tsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import StarMethodIcon from "../../icons/StarMethodIcon";
import { AppContext } from "../../../App";
import { DIALOGUE } from "@/constants";
import {
  loadHistory,
  deleteHistoryEntry,
  clearHistory,
  formatRelative,
  type HistoryItem,
} from "@/utils/History";

/* ----------------------------- XP / Streak Logic ----------------------------- */

type Stats = {
  totalSessions: number;
  avgScore: number;             // 0..5
  xp: number;                   // running XP
  level: number;                // 1+
  nextLevelXp: number;          // threshold for next level
  xpIntoLevel: number;          // current xp - prev threshold
  streakDays: number;           // consecutive day streak (today-inclusive if practiced today)
  weekCount: number;            // sessions in last 7 days
  byType: Record<string, number>;
};

const LEVEL_THRESHOLDS = [0, 50, 120, 220, 360, 540, 760, 1020, 1320, 1660]; // L1..L10
const getLevelFromXP = (xp: number) => {
  let lvl = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) lvl = i + 1;
  }
  const next = LEVEL_THRESHOLDS[Math.min(lvl, LEVEL_THRESHOLDS.length - 1)];
  const prev = LEVEL_THRESHOLDS[Math.max(0, lvl - 2)];
  return {
    level: lvl,
    nextLevelXp: next ?? xp,
    xpIntoLevel: xp - (prev ?? 0),
    prevLevelXp: prev ?? 0,
  };
};

// XP per session = base + score bonus + variety bonus
const xpFor = (h: HistoryItem) => {
  const base = 10;
  const scoreBonus = Math.round((h.overallScore || 0) * 4); // 0..20
  const typeBonus = h.type === "STAR Interview" ? 6 : h.type === "Common Questions" ? 4 : 5;
  return base + scoreBonus + typeBonus; // ~20–36 XP typical
};

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const computeStreakDays = (items: HistoryItem[]): number => {
  if (items.length === 0) return 0;
  // Build a set of practiced days (UTC-local naive)
  const days = new Set(items.map(i => startOfDay(new Date(i.ts))));
  let streak = 0;
  let ptr = startOfDay(new Date()); // today
  while (days.has(ptr)) {
    streak += 1;
    ptr -= 86400000;
  }
  // If no session today but had yesterday, allow yesterday-based streak
  if (streak === 0 && days.has(ptr - 86400000 + 86400000)) {
    // check yesterday
    let y = ptr - 86400000;
    while (days.has(y)) {
      streak += 1;
      y -= 86400000;
    }
  }
  return streak;
};

const computeStats = (items: HistoryItem[]): Stats => {
  const totalSessions = items.length;
  const avgScore =
    totalSessions === 0
      ? 0
      : Math.round(
          (items.reduce((s, i) => s + (i.overallScore || 0), 0) / totalSessions) * 10
        ) / 10;

  const xp = items.reduce((s, i) => s + xpFor(i), 0);
  const { level, nextLevelXp, xpIntoLevel, prevLevelXp } = getLevelFromXP(xp);

  const sevenDaysAgo = Date.now() - 7 * 86400000;
  const weekCount = items.filter(i => i.ts >= sevenDaysAgo).length;

  const byType: Record<string, number> = {};
  for (const i of items) byType[i.type] = (byType[i.type] || 0) + 1;

  return {
    totalSessions,
    avgScore,
    xp,
    level,
    nextLevelXp,
    xpIntoLevel,
    streakDays: computeStreakDays(items),
    weekCount,
    byType,
  };
};

/* ----------------------------- Badges (Gamified) ----------------------------- */

type Badge = {
  id: string;
  name: string;
  description: string;
  icon: "situation" | "task" | "action" | "result";
};

const computeBadges = (items: HistoryItem[], stats: Stats): Badge[] => {
  const badges: Badge[] = [];

  // Milestones
  if (stats.totalSessions >= 1)
    badges.push({ id: "first", name: "First Step", description: "Completed your first practice session!", icon: "action" });
  if (stats.totalSessions >= 5)
    badges.push({ id: "five", name: "High-Five", description: "Reached 5 total sessions.", icon: "result" });
  if (stats.totalSessions >= 10)
    badges.push({ id: "ten", name: "Double Digits", description: "Completed 10 sessions — consistency pays!", icon: "task" });

  // Score achievements
  if (items.some(i => i.overallScore >= 4))
    badges.push({ id: "four-star", name: "STAR Expert", description: "Achieved an overall score ≥ 4.", icon: "situation" });
  if (items.some(i => i.overallScore >= 5))
    badges.push({ id: "perfect", name: "Perfect Answer", description: "Hit a 5-star overall score.", icon: "result" });

  // Streaks & weekly activity
  if (stats.streakDays >= 2)
    badges.push({ id: "streak2", name: "On a Roll", description: `Practiced ${stats.streakDays} days in a row.`, icon: "action" });
  if (stats.streakDays >= 7)
    badges.push({ id: "streak7", name: "Weekly Streak", description: "7-day practice streak!", icon: "result" });
  if (stats.weekCount >= 5)
    badges.push({ id: "weekly5", name: "Week Warrior", description: "Practiced 5+ times this week.", icon: "task" });

  // Mode specialization
  if ((stats.byType["STAR Interview"] || 0) >= 3)
    badges.push({ id: "star-specialist", name: "STAR Specialist", description: "3 STAR Interview sessions.", icon: "situation" });
  if ((stats.byType["Common Questions"] || 0) >= 3)
    badges.push({ id: "common-pro", name: "Common Q Pro", description: "3 Common Questions sessions.", icon: "task" });
  if ((stats.byType["Small Talk"] || 0) >= 3)
    badges.push({ id: "smalltalker", name: "Small Talker", description: "3 Small Talk sessions.", icon: "result" });

  // Time-of-day bonuses (first time you practice in those ranges)
  // morning 5–9, evening 20–23
  const hasMorning = items.some(i => {
    const h = new Date(i.ts).getHours();
    return h >= 5 && h <= 9;
  });
  const hasEvening = items.some(i => {
    const h = new Date(i.ts).getHours();
    return h >= 20 || h <= 23;
  });
  if (hasMorning) badges.push({ id: "early-bird", name: "Early Bird", description: "Practiced in the morning.", icon: "task" });
  if (hasEvening) badges.push({ id: "night-owl", name: "Night Owl", description: "Practiced in the evening.", icon: "situation" });

  // Comeback: had a gap ≥ 7 days then returned
  const sorted = [...items].sort((a,b) => a.ts - b.ts);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].ts - sorted[i-1].ts >= 7 * 86400000) {
      badges.push({ id: "comeback", name: "Comeback", description: "Returned after a long break.", icon: "action" });
      break;
    }
  }

  return badges;
};

/* ----------------------------- Star Display ----------------------------- */

const StarRating: React.FC<{ score: number; size?: string }> = ({ score, size = "w-5 h-5" }) => (
  <div role="img" aria-label={`${score} out of 5 stars`} className="flex">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`${size} ${i < Math.round(score) ? "text-yellow-500" : "text-slate-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.363 2.44a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.363-2.44a1 1 0 00-1.175 0l-3.363 2.44c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    ))}
  </div>
);

/* ----------------------------- Component ----------------------------- */

const SessionHistory: React.FC = () => {
  const { language, setNarratorDialogue, setNarratorState } = useContext(AppContext);
  const [items, setItems] = useState<HistoryItem[]>(() => loadHistory());

  useEffect(() => {
    setNarratorDialogue(DIALOGUE.jobseekerHistory[language]);
    setNarratorState("celebrating");
    const t = setTimeout(() => setNarratorState("idle"), 1500);
    return () => clearTimeout(t);
  }, [language, setNarratorDialogue, setNarratorState]);

  const stats = useMemo(() => computeStats(items), [items]);
  const badges = useMemo(() => computeBadges(items, stats), [items, stats]);

  const handleDelete = (id: string) => {
    deleteHistoryEntry(id);
    setItems(loadHistory());
  };

  const handleClear = () => {
    if (confirm(language === "en" ? "Clear all history?" : "Xóa toàn bộ lịch sử?")) {
      clearHistory();
      setItems([]);
    }
  };

  const levelProgressPct =
    stats.nextLevelXp === stats.xp
      ? 100
      : Math.max(
          0,
          Math.min(
            100,
            Math.round(
              ((stats.xp - Math.max(0, stats.xp - stats.xpIntoLevel)) /
                (stats.nextLevelXp - (stats.xp - stats.xpIntoLevel))) *
                100
            )
          )
        );

  return (
    <div className="space-y-8">
      {/* Profile / Progress header */}
      <section aria-labelledby="progress-heading" className="relative overflow-hidden rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 id="progress-heading" className="font-display text-3xl font-extrabold text-slate-900">
              {language === "en" ? "Your Progress" : "Tiến độ của bạn"}
            </h2>
            <p className="mt-1 text-slate-800">
              {language === "en" ? "Level" : "Cấp"} <span className="font-semibold">{stats.level}</span> · XP{" "}
              <span className="font-semibold">{stats.xp}</span> · {language === "en" ? "Streak" : "Chuỗi ngày"}{" "}
              <span className="font-semibold">{stats.streakDays}d</span>
            </p>
          </div>

          {stats.totalSessions > 0 && (
            <button
              onClick={handleClear}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              {language === "en" ? "Clear All" : "Xóa tất cả"}
            </button>
          )}
        </div>

        {/* XP progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-slate-700">
            <span>{language === "en" ? "XP to next level" : "XP tới cấp tiếp theo"}</span>
            <span>
              {stats.xp}/{stats.nextLevelXp}
            </span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-[width] duration-700 ease-out shimmer"
              style={{ width: `${levelProgressPct}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-700">
            {language === "en" ? "Sessions" : "Phiên"}: <span className="font-semibold">{stats.totalSessions}</span> ·{" "}
            {language === "en" ? "Avg score" : "Điểm TB"}: <span className="font-semibold">{stats.avgScore}</span> ·{" "}
            {language === "en" ? "This week" : "Tuần này"}: <span className="font-semibold">{stats.weekCount}</span>
          </p>
        </div>
      </section>

      {/* Badges */}
      <section aria-labelledby="badges-heading" className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h3 id="badges-heading" className="font-display text-2xl font-bold text-slate-900 mb-4">
          {language === "en" ? "Your Badges" : "Huy hiệu của bạn"}
        </h3>

        {badges.length === 0 ? (
          <p className="text-slate-800">
            {language === "en"
              ? "No badges yet — complete a practice to earn your first badge."
              : "Chưa có huy hiệu — hãy hoàn thành một buổi luyện tập để nhận huy hiệu đầu tiên."}
          </p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {badges.map((b, idx) => (
              <li
                key={b.id}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                {/* subtle confetti on first few badges */}
                {idx < 2 && <div className="confetti" aria-hidden="true" />}

                <div className="flex flex-col items-center text-center">
                  <StarMethodIcon
                    type={b.icon}
                    className="w-10 h-10 text-slate-900 bg-slate-100 rounded-full p-2"
                    aria-hidden="true"
                  />
                  <p className="mt-2 font-semibold text-slate-900">{b.name}</p>
                  <p className="text-sm text-slate-700">{b.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Past Sessions */}
      <section aria-labelledby="sessions-heading">
        <h3 id="sessions-heading" className="font-display text-2xl font-bold mb-4 text-slate-900">
          {language === "en" ? "Past Sessions" : "Các buổi trước"}
        </h3>

        {items.length === 0 ? (
          <p className="text-slate-800">
            {language === "en" ? "No sessions yet. Start a practice to see your history here." : "Chưa có phiên luyện tập. Hãy bắt đầu để xem lịch sử tại đây."}
          </p>
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
                    <p className="text-xs text-slate-800 mt-1">{language === "en" ? "Overall Score" : "Điểm tổng"}</p>
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

      {/* tiny inline styles for shimmer + confetti */}
      <style>{`
        .shimmer {
          background-size: 200% 100%;
          animation: shimmerMove 2.2s linear infinite;
        }
        @keyframes shimmerMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        .confetti::before, .confetti::after {
          content: "";
          position: absolute;
          inset: -4px;
          background:
            radial-gradient(circle at 10% 20%, #f43f5e 2px, transparent 3px),
            radial-gradient(circle at 80% 30%, #22c55e 2px, transparent 3px),
            radial-gradient(circle at 30% 80%, #3b82f6 2px, transparent 3px),
            radial-gradient(circle at 60% 60%, #eab308 2px, transparent 3px);
          opacity: .18;
          transform: rotate(0deg);
          animation: popConfetti 1.4s ease-out infinite;
          pointer-events: none;
        }
        .confetti::after {
          animation-delay: .6s;
          opacity: .12;
        }
        @keyframes popConfetti {
          0% { transform: scale(0.95) rotate(0deg); }
          50% { transform: scale(1.02) rotate(3deg); }
          100% { transform: scale(0.98) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default SessionHistory;
