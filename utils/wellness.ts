const KEY = 'aicc.wellness.v1';
const MAX = 100;

export type WellnessEntry = {
  id: string;
  ts: number;
  confidence: number; // 1–5
  anxiety: number;    // 1–5
};

function read(): WellnessEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as WellnessEntry[];
    return Array.isArray(arr) ? arr.sort((a, b) => b.ts - a.ts) : [];
  } catch { return []; }
}

function write(items: WellnessEntry[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX))); } catch { /* quota */ }
}

export function loadWellness(): WellnessEntry[] { return read(); }

export function addWellnessEntry(confidence: number, anxiety: number): WellnessEntry {
  const entry: WellnessEntry = {
    id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    ts: Date.now(),
    confidence,
    anxiety,
  };
  write([entry, ...read()]);
  return entry;
}
