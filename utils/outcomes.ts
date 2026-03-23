const KEY = 'aicc.outcomes.v1';
const MAX = 200;

export type OutcomeType = 'applied' | 'interview_invite' | 'interview_completed' | 'offer';

export type OutcomeEntry = {
  id: string;
  ts: number;
  type: OutcomeType;
};

export const OUTCOME_META: Record<OutcomeType, { emoji: string; labelEn: string; labelVn: string; color: string }> = {
  applied:              { emoji: '📝', labelEn: 'Applied for a job',          labelVn: 'Đã nộp đơn xin việc',       color: 'bg-blue-50 border-blue-200 text-blue-800' },
  interview_invite:     { emoji: '📬', labelEn: 'Got an interview invitation', labelVn: 'Nhận được lời mời phỏng vấn', color: 'bg-violet-50 border-violet-200 text-violet-800' },
  interview_completed:  { emoji: '🤝', labelEn: 'Completed an interview',      labelVn: 'Đã hoàn thành phỏng vấn',    color: 'bg-amber-50 border-amber-200 text-amber-800' },
  offer:                { emoji: '🎉', labelEn: 'Received a job offer',         labelVn: 'Nhận được đề nghị việc làm', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
};

function read(): OutcomeEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as OutcomeEntry[];
    return Array.isArray(arr) ? arr.sort((a, b) => b.ts - a.ts) : [];
  } catch { return []; }
}

function write(items: OutcomeEntry[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX))); } catch { /* quota */ }
}

export function loadOutcomes(): OutcomeEntry[] { return read(); }

export function addOutcome(type: OutcomeType): OutcomeEntry {
  const entry: OutcomeEntry = {
    id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    ts: Date.now(),
    type,
  };
  write([entry, ...read()]);
  return entry;
}
