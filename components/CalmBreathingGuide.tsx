// CalmBreathingGuide.tsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../App';
import { LOCALIZED_CONTENT, DIALOGUE, NARRATORS, CALM_PRACTICES } from '@/constants';
import { NarratorRole } from '../types';

type Practice = 'bloom' | 'tracing' | 'flow' | 'tap';

// --- Icons for the Menu (inlined to avoid new files) ---
const BloomIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z" /></svg>;
const TraceIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3h18v2H3V3zm0 16h18v2H3v-2zm16-4.08V7.08L12 12l7 4.92zM5 7.08v9.84L12 12 5 7.08zM3 7h2v10H3V7zm16 0h2v10h-2V7z" /></svg>;
const FlowIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 10c.2 0 .3-.1.4-.2.1-.1.2-.3.2-.4 0-.3-.1-.5-.3-.7l-2.8-2.8c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.3 1.3H5c-.6 0-1 .4-1 1s.4 1 1 1h14.2l-1.3 1.3c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l2.8-2.8c.2-.2.3-.4.3-.6z" /></svg>;
const TapIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM10 8v8l6-4-6-4z" /></svg>;

const practiceIcons: Record<Practice, React.FC> = { bloom: BloomIcon, tracing: TraceIcon, flow: FlowIcon, tap: TapIcon };

// --- Practice: Breathing Bloom ---
const BreathingBloom: React.FC = () => {
  const { language } = useContext(AppContext);
  const [instruction, setInstruction] = useState(LOCALIZED_CONTENT.breatheIn[language]);
  const [animationClass, setAnimationClass] = useState<'inhale' | 'exhale' | ''>('inhale');
  const timeoutIdRef = useRef<number | null>(null);
  const speakingRef = useRef(false);

  useEffect(() => {
    let idx = 0;
    const seq = [
      { text: LOCALIZED_CONTENT.breatheIn[language], anim: 'inhale' as const, dur: 4000 },
      { text: LOCALIZED_CONTENT.hold[language],      anim: ''           as const, dur: 4000 },
      { text: LOCALIZED_CONTENT.breatheOut[language],anim: 'exhale'     as const, dur: 6000 },
    ];

    const speak = (text: string) => {
      if (!('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = language === 'en' ? 'en-US' : 'vi-VN';
        speakingRef.current = true;
        u.onend = () => { speakingRef.current = false; };
        window.speechSynthesis.speak(u);
      } catch { /* no-op */ }
    };

    const step = () => {
      const cur = seq[idx];
      setInstruction(cur.text);
      setAnimationClass(cur.anim);
      speak(cur.text);
      timeoutIdRef.current = window.setTimeout(() => {
        idx = (idx + 1) % seq.length;
        step();
      }, cur.dur);
    };

    step();

    return () => {
      if (timeoutIdRef.current) window.clearTimeout(timeoutIdRef.current);
      if ('speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch {}
      }
    };
  }, [language]);

  const FlowerSVG = () => (
    <div className={`relative w-64 h-64 bloom ${animationClass}`}>
      <svg viewBox="-50 -50 100 100" className="absolute inset-0 w-full h-full text-pink-400 opacity-50" style={{ fill: 'currentColor' }}>
        {[15, 75, 135, 195, 255, 315].map(a => (
          <path key={a} transform={`rotate(${a})`} d="M0,0 C25,25 25,50 0,50 C-25,50 -25,25 0,0" />
        ))}
      </svg>
      <svg viewBox="-50 -50 100 100" className="absolute inset-0 w-full h-full text-pink-300 opacity-70 scale-90" style={{ fill: 'currentColor' }}>
        {[0, 60, 120, 180, 240, 300].map(a => (
          <path key={a} transform={`rotate(${a})`} d="M0,0 C25,25 25,50 0,50 C-25,50 -25,25 0,0" />
        ))}
      </svg>
      <svg viewBox="-50 -50 100 100" className="absolute inset-0 w-full h-full text-pink-200 scale-75" style={{ fill: 'currentColor' }}>
        {[30, 90, 150, 210, 270, 330].map(a => (
          <path key={a} transform={`rotate(${a})`} d="M0,0 C20,20 20,40 0,40 C-20,40 -20,20 0,0" />
        ))}
      </svg>
    </div>
  );

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <FlowerSVG />
      <p className="absolute font-display text-3xl font-bold text-white text-center pointer-events-none" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <span aria-live="polite" aria-atomic="true">{instruction}</span>
      </p>
    </div>
  );
};

// --- Practice: Tracing Breaths (box breathing) ---
const TracingBreaths: React.FC = () => {
  const { language } = useContext(AppContext);
  const [instruction, setInstruction] = useState(LOCALIZED_CONTENT.breatheIn[language]);
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    let idx = 0;
    const seq = [
      { text: LOCALIZED_CONTENT.breatheIn[language],  dur: 4000 },
      { text: LOCALIZED_CONTENT.hold[language],       dur: 4000 },
      { text: LOCALIZED_CONTENT.breatheOut[language], dur: 4000 },
      { text: LOCALIZED_CONTENT.hold[language],       dur: 4000 },
    ];

    const speak = (text: string) => {
      if (!('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = language === 'en' ? 'en-US' : 'vi-VN';
        window.speechSynthesis.speak(u);
      } catch {}
    };

    const step = () => {
      const cur = seq[idx];
      setInstruction(cur.text);
      speak(cur.text);
      timeoutIdRef.current = window.setTimeout(() => {
        idx = (idx + 1) % seq.length;
        step();
      }, cur.dur);
    };

    step();
    return () => {
      if (timeoutIdRef.current) window.clearTimeout(timeoutIdRef.current);
      if ('speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch {}
      }
    };
  }, [language]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <svg width="220" height="220" viewBox="0 0 200 200" className="overflow-visible">
        <rect x="10" y="10" width="180" height="180" rx="12" ry="12" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3"/>
        {/* moving dot via CSS motion path (with webkit prefix) */}
        <circle cx="0" cy="0" r="8" className="trace-dot" />
      </svg>
      <p className="absolute font-display text-3xl font-bold text-white text-center pointer-events-none" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <span aria-live="polite" aria-atomic="true">{instruction}</span>
      </p>
    </div>
  );
};

// --- Practice: Gentle Color Flow (aurora blobs + soft arpeggio) ---
const GentleColorFlow: React.FC = () => {
  // Audio is started by CareGiver upon practice selection (user gesture).
  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-900">
      <div className="relative w-full h-full">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
    </div>
  );
};

// --- Practice: Steady Rhythm Tap (heartbeat + ripples) ---
const SteadyRhythmTap: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-72 h-72">
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="1" className="ripple" style={{ animationDelay: '0s' }} />
          <circle cx="50" cy="50" r="1" className="ripple" style={{ animationDelay: '1s' }} />
        </svg>
      </div>
      <p className="absolute font-display text-2xl font-bold text-white text-center pointer-events-none" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        Focus on the steady rhythm
      </p>
    </div>
  );
};

// --- Main ---
const CalmBreathingGuide: React.FC = () => {
  const { language, setIsBreathingGuideVisible } = useContext(AppContext);
  const [activePractice, setActivePractice] = useState<Practice | null>(null);
  const narratorData = NARRATORS[NarratorRole.Jobseeker];

  // Shared AudioContext for sound-based practices (created only after click)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const arpeggioTimerRef = useRef<number | null>(null);
  const heartbeatTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsBreathingGuideVisible(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setIsBreathingGuideVisible]);

  // Start/stop audio based on selected practice
  useEffect(() => {
    const stopAudio = () => {
      if (arpeggioTimerRef.current) { window.clearInterval(arpeggioTimerRef.current); arpeggioTimerRef.current = null; }
      if (heartbeatTimerRef.current) { window.clearInterval(heartbeatTimerRef.current); heartbeatTimerRef.current = null; }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };

    if (!activePractice) { stopAudio(); return; }

    // Only create after user clicked a practice (gesture)
    const getAudio = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      return audioCtxRef.current;
    };

    if (activePractice === 'flow') {
      const ctx = getAudio();
      const notes = [261.63, 329.63, 392.0, 493.88]; // Cmaj7
      let i = 0;
      const play = () => {
        if (!ctx || ctx.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[i], ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 1.0);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 2.8);
        i = (i + 1) % notes.length;
      };
      play();
      arpeggioTimerRef.current = window.setInterval(play, 2800);
    }

    if (activePractice === 'tap') {
      const ctx = getAudio();
      const beat = () => {
        if (!ctx || ctx.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.5);
      };
      beat();
      heartbeatTimerRef.current = window.setInterval(beat, 1000); // 60 BPM
    }

    return stopAudio;
  }, [activePractice]);

  const PracticeCard: React.FC<{ practice: Practice; onClick: () => void }> = ({ practice, onClick }) => {
    const content = CALM_PRACTICES[practice];
    const Icon = practiceIcons[practice];
    return (
      <button onClick={onClick} className="w-full text-left p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 text-white opacity-80 mt-1" aria-hidden="true"><Icon /></div>
        <div>
          <h3 className="font-bold text-lg text-white">{content.title[language]}</h3>
          <p className="text-sm text-white/80">{content.description[language]}</p>
        </div>
      </button>
    );
  };

  const renderContent = () => {
    if (!activePractice) {
      return (
        <div className="w-full max-w-md space-y-4">
          {(Object.keys(CALM_PRACTICES) as Practice[]).map(p =>
            <PracticeCard key={p} practice={p} onClick={() => setActivePractice(p)} />
          )}
        </div>
      );
    }
    const PracticeComponent = {
      bloom: BreathingBloom,
      tracing: TracingBreaths,
      flow: GentleColorFlow,
      tap: SteadyRhythmTap,
    }[activePractice];
    const practiceInfo = CALM_PRACTICES[activePractice];

    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="absolute top-4 left-4 z-10">
          <button onClick={() => setActivePractice(null)} className="px-4 py-2 bg-black/30 text-white text-sm font-semibold rounded-full hover:bg-black/50 backdrop-blur-sm">&larr; Back to Menu</button>
        </div>
        <div className="absolute top-4 text-center pointer-events-none">
          <h2 className="text-xl font-bold text-white p-2 rounded-lg bg-black/20 backdrop-blur-sm">{practiceInfo.title[language]}</h2>
        </div>
        <PracticeComponent />
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(8,10,15,0.85)] backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-4 transition-opacity duration-300 fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) setIsBreathingGuideVisible(false); }}
      role="dialog"
      aria-modal="true"
      aria-label="Calm Breathing Guide"
    >
      {!activePractice && (
        <div className="absolute top-10 flex flex-col items-center pointer-events-none">
          <div className="relative mb-2">
            <div className="bg-white/90 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-lg">
              {DIALOGUE.jobseekerCalm[language]}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white/90 translate-y-full" />
          </div>
          <img
            src={narratorData.avatars.neutral}
            alt={narratorData.name[language]}
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover bg-gray-200"
          />
        </div>
      )}

      {renderContent()}

      <p className="absolute bottom-4 text-white/70 text-sm">Click the background or press ESC to close</p>

      {/* Inline CSS for required keyframes & classes so animations work without tailwind.config edits */}
      <style>{`
        /* Fade in for overlay */
        .fade-in { animation: fadeIn 300ms ease-out both; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

        /* Breathing bloom scale animation */
        .bloom { will-change: transform; }
        .bloom.inhale { animation: bloomInhale 4s ease-in-out forwards; }
        .bloom.exhale { animation: bloomExhale 6s ease-in-out forwards; }
        @keyframes bloomInhale { 
          0% { transform: scale(0.85) rotate(0deg) } 
          50% { transform: scale(1.05) rotate(3deg) }
          100% { transform: scale(1.0) rotate(0deg) } 
        }
        @keyframes bloomExhale { 
          0% { transform: scale(1.0) rotate(0deg) } 
          100% { transform: scale(0.85) rotate(-3deg) } 
        }

        /* Tracing dot along box (CSS Motion Path + webkit prefix) */
        .trace-dot {
          fill: white;
          filter: drop-shadow(0 0 6px white);
          offset-path: path('M 10,10 H 190 V 190 H 10 Z');
          -webkit-offset-path: path('M 10,10 H 190 V 190 H 10 Z');
          offset-distance: 0%;
          -webkit-offset-distance: 0%;
          animation: tracePath 16s linear infinite;
        }
        @keyframes tracePath {
          0%   { offset-distance: 0%;   -webkit-offset-distance: 0%;   }
          25%  { offset-distance: 25%;  -webkit-offset-distance: 25%;  }
          50%  { offset-distance: 50%;  -webkit-offset-distance: 50%;  }
          75%  { offset-distance: 75%;  -webkit-offset-distance: 75%;  }
          100% { offset-distance: 100%; -webkit-offset-distance: 100%; }
        }

        /* Aurora blobs */
        .blob {
          position: absolute;
          border-radius: 9999px;
          opacity: 0.5;
          mix-blend-mode: screen;
          filter: blur(60px);
          will-change: transform;
        }
        .blob-1 {
          top: 25%;
          left: 25%;
          width: 24rem; height: 24rem;
          background: #3B82F6; /* blue-500 */
          animation: flowBlob1 20s ease-in-out infinite;
        }
        .blob-2 {
          top: 50%;
          right: 25%;
          width: 20rem; height: 20rem;
          background: #A855F7; /* purple-500 */
          animation: flowBlob2 25s ease-in-out infinite;
        }
        .blob-3 {
          bottom: 25%;
          left: 50%;
          width: 18rem; height: 18rem;
          background: #4ADE80; /* green-400 */
          opacity: 0.4;
          animation: flowBlob3 18s ease-in-out infinite;
        }
        @keyframes flowBlob1 {
          0%   { transform: translate(0,0) scale(1) }
          50%  { transform: translate(40px,-30px) scale(1.15) }
          100% { transform: translate(0,0) scale(1) }
        }
        @keyframes flowBlob2 {
          0%   { transform: translate(0,0) scale(1) }
          50%  { transform: translate(-50px,20px) scale(1.2) }
          100% { transform: translate(0,0) scale(1) }
        }
        @keyframes flowBlob3 {
          0%   { transform: translate(0,0) scale(1) }
          50%  { transform: translate(20px,30px) scale(0.9) }
          100% { transform: translate(0,0) scale(1) }
        }

        /* Ripples for Tap practice */
        .ripple {
          stroke: rgba(255,255,255,0.5);
          fill: rgba(255,255,255,0.25);
          transform-origin: 50% 50%;
          animation: ripple 2s cubic-bezier(0.2, 0.6, 0.8, 1) infinite;
        }
        @keyframes ripple {
          0%   { r: 1;   opacity: 0.9; }
          70%  { r: 35;  opacity: 0.25; }
          100% { r: 50;  opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CalmBreathingGuide;
