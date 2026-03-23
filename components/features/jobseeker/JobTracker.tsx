import React, { useState, useEffect, useContext } from 'react';
import {
  Briefcase, Plus, Trash2, Bookmark, Send, Phone,
  Users, CheckCircle, XCircle, MinusCircle, ExternalLink,
  ChevronDown, ChevronUp, PenLine,
} from 'lucide-react';
import { AppContext } from '@/App';
import {
  loadJobs, addJob, updateJob, deleteJob,
  type JobEntry, type JobStatus,
} from '@/utils/jobTracker';

/* ─── Status metadata ──────────────────────────────────────────────── */

const STATUS_META: Record<JobStatus, {
  label: { en: string; vn: string };
  Icon: React.FC<{ className?: string }>;
  bg: string;
  text: string;
  border: string;
}> = {
  saved:        { label: { en: 'Saved',        vn: 'Đã lưu'         }, Icon: Bookmark,    bg: 'bg-slate-100',   text: 'text-slate-700',  border: 'border-slate-300' },
  applied:      { label: { en: 'Applied',      vn: 'Đã nộp'         }, Icon: Send,         bg: 'bg-blue-50',     text: 'text-blue-700',   border: 'border-blue-200'  },
  phone_screen: { label: { en: 'Phone Screen', vn: 'Phỏng vấn điện' }, Icon: Phone,        bg: 'bg-violet-50',   text: 'text-violet-700', border: 'border-violet-200'},
  interview:    { label: { en: 'Interview',    vn: 'Phỏng vấn'      }, Icon: Users,        bg: 'bg-amber-50',    text: 'text-amber-700',  border: 'border-amber-200' },
  offer:        { label: { en: 'Offer',        vn: 'Đề nghị việc'   }, Icon: CheckCircle,  bg: 'bg-emerald-50',  text: 'text-emerald-700',border: 'border-emerald-200'},
  rejected:     { label: { en: 'Not selected', vn: 'Không được chọn'}, Icon: XCircle,      bg: 'bg-rose-50',     text: 'text-rose-700',   border: 'border-rose-200'  },
  withdrawn:    { label: { en: 'Withdrawn',    vn: 'Đã rút'         }, Icon: MinusCircle,  bg: 'bg-slate-50',    text: 'text-slate-500',  border: 'border-slate-200' },
};

const ALL_STATUSES = Object.keys(STATUS_META) as JobStatus[];

/* ─── Status Badge ─────────────────────────────────────────────────── */

const StatusBadge: React.FC<{ status: JobStatus; lang: string }> = ({ status, lang }) => {
  const m = STATUS_META[status];
  const l = lang === 'en' ? 'en' : 'vn';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${m.bg} ${m.text} ${m.border}`}>
      <m.Icon className="w-3.5 h-3.5" />
      {m.label[l]}
    </span>
  );
};

/* ─── Add Form ─────────────────────────────────────────────────────── */

const AddJobForm: React.FC<{ lang: string; onAdd: () => void; onCancel: () => void }> = ({ lang, onAdd, onCancel }) => {
  const [company, setCompany] = useState('');
  const [role, setRole]       = useState('');
  const [status, setStatus]   = useState<JobStatus>('saved');
  const [url, setUrl]         = useState('');
  const [notes, setNotes]     = useState('');
  const [error, setError]     = useState('');

  const t = (en: string, vn: string) => lang === 'en' ? en : vn;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) {
      setError(t('Company name and job title are required.', 'Tên công ty và chức danh là bắt buộc.'));
      return;
    }
    addJob({ company: company.trim(), role: role.trim(), status, url: url.trim() || undefined, notes: notes.trim() || undefined });
    onAdd();
  };

  const fieldClass = 'w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 placeholder:text-slate-400';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1';

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4" noValidate>
      <h3 className="font-semibold text-slate-900">{t('Add a job application', 'Thêm đơn xin việc')}</h3>

      {error && (
        <p role="alert" className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="jt-company" className={labelClass}>{t('Company name', 'Tên công ty')} <span className="text-rose-600" aria-hidden>*</span></label>
          <input id="jt-company" type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder={t('e.g. Accenture', 'vd. FPT Software')} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="jt-role" className={labelClass}>{t('Job title', 'Chức danh')} <span className="text-rose-600" aria-hidden>*</span></label>
          <input id="jt-role" type="text" value={role} onChange={e => setRole(e.target.value)} placeholder={t('e.g. Junior Developer', 'vd. Lập trình viên')} className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="jt-status" className={labelClass}>{t('Current status', 'Trạng thái hiện tại')}</label>
        <select id="jt-status" value={status} onChange={e => setStatus(e.target.value as JobStatus)} className={fieldClass}>
          {ALL_STATUSES.map(s => (
            <option key={s} value={s}>{STATUS_META[s].label[lang === 'en' ? 'en' : 'vn']}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="jt-url" className={labelClass}>{t('Job listing URL', 'Đường dẫn tin tuyển dụng')} <span className="text-slate-400 font-normal">({t('optional', 'tùy chọn')})</span></label>
        <input id="jt-url" type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="jt-notes" className={labelClass}>{t('Notes', 'Ghi chú')} <span className="text-slate-400 font-normal">({t('optional', 'tùy chọn')})</span></label>
        <textarea id="jt-notes" rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder={t('Interview date, contact name, anything useful…', 'Ngày phỏng vấn, tên liên lạc, ghi chú hữu ích…')} className={fieldClass} />
      </div>

      <div className="flex gap-3 pt-1">
        <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
          {t('Save application', 'Lưu đơn xin việc')}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-white text-slate-700 text-sm font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
          {t('Cancel', 'Hủy')}
        </button>
      </div>
    </form>
  );
};

/* ─── Job Card ─────────────────────────────────────────────────────── */

const JobCard: React.FC<{ job: JobEntry; lang: string; onRefresh: () => void }> = ({ job, lang, onRefresh }) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing]   = useState(false);
  const [editNotes, setEditNotes] = useState(job.notes || '');
  const [editStatus, setEditStatus] = useState<JobStatus>(job.status);

  const t = (en: string, vn: string) => lang === 'en' ? en : vn;
  const l = lang === 'en' ? 'en' : 'vn';

  const handleStatusChange = (s: JobStatus) => {
    setEditStatus(s);
    updateJob(job.id, { status: s });
    onRefresh();
  };

  const handleSaveEdit = () => {
    updateJob(job.id, { notes: editNotes.trim() || undefined, status: editStatus });
    setEditing(false);
    onRefresh();
  };

  const handleDelete = () => {
    if (window.confirm(t(`Remove "${job.role}" at ${job.company}?`, `Xóa "${job.role}" tại ${job.company}?`))) {
      deleteJob(job.id);
      onRefresh();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-start gap-3 p-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 truncate">{job.role}</p>
          <p className="text-sm text-slate-600 truncate">{job.company}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={job.status} lang={lang} />
          <button
            onClick={() => setExpanded(x => !x)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label={expanded ? t('Collapse details', 'Thu gọn') : t('Expand details', 'Mở rộng')}
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded section */}
      {expanded && (
        <div className="border-t border-slate-100 p-4 space-y-4">
          {/* Status selector */}
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">{t('Update status', 'Cập nhật trạng thái')}</p>
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.map(s => {
                const m = STATUS_META[s];
                const active = editStatus === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStatusChange(s)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      active ? `${m.bg} ${m.text} ${m.border} ring-2 ring-offset-1 ${m.border}` : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                    aria-pressed={active}
                  >
                    <m.Icon className="w-3.5 h-3.5" />
                    {m.label[l]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* URL */}
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
            >
              <ExternalLink className="w-4 h-4" aria-hidden />
              {t('View job listing', 'Xem tin tuyển dụng')}
            </a>
          )}

          {/* Notes */}
          {editing ? (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 block">{t('Notes', 'Ghi chú')}</label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={e => setEditNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />
              <div className="flex gap-2">
                <button onClick={handleSaveEdit} className="px-3 py-1.5 text-sm bg-slate-900 text-white rounded-lg hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  {t('Save', 'Lưu')}
                </button>
                <button onClick={() => setEditing(false)} className="px-3 py-1.5 text-sm bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  {t('Cancel', 'Hủy')}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {job.notes ? (
                <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-200 leading-relaxed">{job.notes}</p>
              ) : (
                <p className="text-sm text-slate-400 italic">{t('No notes yet.', 'Chưa có ghi chú.')}</p>
              )}
            </div>
          )}

          {/* Footer actions */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-slate-400">
              {t('Added', 'Đã thêm')} {new Date(job.addedAt).toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(x => !x)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <PenLine className="w-3.5 h-3.5" aria-hidden />
                {t('Edit notes', 'Sửa ghi chú')}
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden />
                {t('Remove', 'Xóa')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Status summary bar ───────────────────────────────────────────── */

const StatusSummary: React.FC<{ jobs: JobEntry[]; lang: string }> = ({ jobs, lang }) => {
  const t = (en: string, vn: string) => lang === 'en' ? en : vn;
  const active: JobStatus[] = ['applied', 'phone_screen', 'interview', 'offer'];
  const counts = active.map(s => ({ status: s, count: jobs.filter(j => j.status === s).length })).filter(x => x.count > 0);
  if (!counts.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {counts.map(({ status, count }) => {
        const m = STATUS_META[status];
        const l = lang === 'en' ? 'en' : 'vn';
        return (
          <div key={status} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${m.bg} ${m.text} ${m.border}`}>
            <m.Icon className="w-4 h-4" />
            {count} {m.label[l]}
          </div>
        );
      })}
    </div>
  );
};

/* ─── Main component ───────────────────────────────────────────────── */

const JobTracker: React.FC = () => {
  const { language } = useContext(AppContext);
  const lang = language === 'en' ? 'en' : 'vn';
  const t = (en: string, vn: string) => lang === 'en' ? en : vn;

  const [jobs, setJobs]       = useState<JobEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter]   = useState<JobStatus | 'all'>('all');

  const refresh = () => setJobs(loadJobs());

  useEffect(() => { refresh(); }, []);

  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-5 h-5 text-slate-700" aria-hidden />
            <h2 className="font-display text-2xl font-bold text-slate-900">
              {t('Job Applications', 'Đơn xin việc')}
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            {t('Keep track of every job you apply for — status, notes, and links in one place.', 'Theo dõi mọi công việc bạn nộp đơn — trạng thái, ghi chú và liên kết ở một nơi.')}
          </p>
        </div>
        <button
          onClick={() => setShowForm(x => !x)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <Plus className="w-4 h-4" aria-hidden />
          {t('Add application', 'Thêm đơn')}
        </button>
      </div>

      {/* Active status summary */}
      {jobs.length > 0 && <StatusSummary jobs={jobs} lang={lang} />}

      {/* Add form */}
      {showForm && (
        <AddJobForm lang={lang} onAdd={() => { refresh(); setShowForm(false); }} onCancel={() => setShowForm(false)} />
      )}

      {/* Filter pills */}
      {jobs.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('Filter by status', 'Lọc theo trạng thái')}>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${filter === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
          >
            {t(`All (${jobs.length})`, `Tất cả (${jobs.length})`)}
          </button>
          {ALL_STATUSES.filter(s => jobs.some(j => j.status === s)).map(s => {
            const m = STATUS_META[s];
            const active = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(active ? 'all' : s)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${active ? `${m.bg} ${m.text} ${m.border} ring-2 ring-offset-1 ${m.border}` : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                aria-pressed={active}
              >
                <m.Icon className="w-3.5 h-3.5" />
                {m.label[lang === 'en' ? 'en' : 'vn']} ({jobs.filter(j => j.status === s).length})
              </button>
            );
          })}
        </div>
      )}

      {/* Job list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 gap-3 text-slate-400">
          <Briefcase className="w-10 h-10 opacity-30" aria-hidden />
          <p className="text-base font-medium">
            {jobs.length === 0
              ? t('No applications yet. Add one to get started.', 'Chưa có đơn nào. Thêm đơn để bắt đầu.')
              : t('No applications match this filter.', 'Không có đơn nào phù hợp với bộ lọc này.')}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(job => (
            <JobCard key={job.id} job={job} lang={lang} onRefresh={refresh} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobTracker;
