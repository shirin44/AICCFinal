// VolunteerPractice.tsx — Coming Soon placeholder
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

const VolunteerPractice: React.FC = () => {
  const { language, setNarratorDialogue, setNarratorState } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setNarratorDialogue(
      language === 'en'
        ? 'Volunteer practice is coming soon. Thanks for your patience!'
        : 'Bài luyện tập cho tình nguyện viên sẽ sớm có mặt. Cảm ơn bạn đã chờ đợi!'
    );
    setNarratorState('intro');
  }, [language, setNarratorDialogue, setNarratorState]);

  const title = language === 'en' ? 'Coming Soon' : 'Sắp ra mắt';
  const desc =
    language === 'en'
      ? 'We’re polishing the Volunteer Practice experience. Check back soon!'
      : 'Chúng tôi đang hoàn thiện trải nghiệm Luyện tập Tình nguyện viên. Hãy quay lại sau nhé!';
  const hint =
    language === 'en'
      ? 'Tip: You can explore other modes in the meantime.'
      : 'Gợi ý: Trong lúc chờ, bạn có thể khám phá các chế độ khác.';

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-display text-2xl font-bold">{title}</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-foreground/10 text-muted-foreground">
            Beta
          </span>
        </div>
        <div className="w-full bg-foreground/10 rounded-full h-2.5">
          <div className="h-2.5 rounded-full bg-muted animate-pulse" style={{ width: '24%' }} />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-md">
        {/* Glow */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />

        <div className="flex items-start gap-4">
          {/* Icon */}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 h-10 w-10 text-primary" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20Zm1 5v6h5v2h-7V7h2Z" />
          </svg>

          <div>
            <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
            <p className="mt-2 text-muted-foreground">{desc}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-foreground/5 px-3 py-2 text-sm text-muted-foreground">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
              {hint}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            onClick={() => {
              setNarratorState('idle');
              navigate('/mode-selection');
            }}
          >
            {language === 'en' ? 'Back' : 'Quay lại'}
          </button>
        </div>
      </div>

      {/* Minimal inline styles for pulse/fade (if Tailwind animations not present) */}
      <style>{`
        @keyframes pulseLite { 0%,100%{opacity:.6} 50%{opacity:1} }
        .animate-pulse { animation: pulseLite 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default VolunteerPractice;
