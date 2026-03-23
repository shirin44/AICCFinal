export type JobStatus =
  | 'saved'
  | 'applied'
  | 'phone_screen'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'withdrawn';

export interface JobEntry {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  url?: string;
  notes?: string;
  addedAt: number;
  updatedAt: number;
}

const KEY = 'neuro_job_tracker';

export function loadJobs(): JobEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAll(jobs: JobEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(jobs));
}

export function addJob(entry: Omit<JobEntry, 'id' | 'addedAt' | 'updatedAt'>): JobEntry {
  const job: JobEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    addedAt: Date.now(),
    updatedAt: Date.now(),
  };
  const jobs = loadJobs();
  saveAll([job, ...jobs]);
  return job;
}

export function updateJobStatus(id: string, status: JobStatus): void {
  const jobs = loadJobs().map(j =>
    j.id === id ? { ...j, status, updatedAt: Date.now() } : j
  );
  saveAll(jobs);
}

export function updateJob(id: string, patch: Partial<Pick<JobEntry, 'company' | 'role' | 'url' | 'notes' | 'status'>>): void {
  const jobs = loadJobs().map(j =>
    j.id === id ? { ...j, ...patch, updatedAt: Date.now() } : j
  );
  saveAll(jobs);
}

export function deleteJob(id: string): void {
  saveAll(loadJobs().filter(j => j.id !== id));
}
