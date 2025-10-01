// src/utils/history.ts
import type { StarFeedback } from "@/types";

export type PracticeType = "STAR Interview" | "Common Questions" | "Small Talk";

export type HistoryItem = {
  id: string;
  ts: number;               // epoch ms
  type: PracticeType;
  question: string;
  overallScore: number;     // 0..5
  // Optional rich data (kept small so localStorage doesn't explode)
  answer?: string;
  feedback?: Pick<StarFeedback, "overall">;
};

const KEY = "interview.history.v1";
const MAX_ITEMS = 200; // avoid unbounded growth

function read(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as HistoryItem[];
    if (!Array.isArray(arr)) return [];
    return arr.sort((a, b) => b.ts - a.ts);
  } catch {
    return [];
  }
}

function write(items: HistoryItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
  } catch {
    // ignore quota errors
  }
}

export function loadHistory(): HistoryItem[] {
  return read();
}

export function addHistoryEntry(partial: Omit<HistoryItem, "id" | "ts">): HistoryItem {
  const item: HistoryItem = {
    id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    ts: Date.now(),
    ...partial,
  };
  const cur = read();
  write([item, ...cur]);
  return item;
}

export function deleteHistoryEntry(id: string) {
  const cur = read();
  write(cur.filter(i => i.id !== id));
}

export function clearHistory() {
  write([]);
}

export function formatRelative(ts: number): string {
  const now = Date.now();
  const diff = Math.max(0, now - ts);
  const d = Math.floor(diff / 86400000);
  if (d === 0) {
    const h = Math.floor(diff / 3600000);
    if (h <= 0) return "Just now";
    return `${h} hour${h > 1 ? "s" : ""} ago`;
  }
  if (d === 1) return "Yesterday";
  if (d < 7) return `${d} days ago`;
  const weeks = Math.floor(d / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const date = new Date(ts);
  return date.toLocaleDateString();
}
