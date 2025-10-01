import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../App';
import { NARRATORS } from '@/constants';
import type { NarratorAppEmotion, NarratorState } from '../types';

const mapAppEmotionToImageState = (emotion: NarratorAppEmotion): NarratorState => {
  switch (emotion) {
    case 'happy':
    case 'celebrating':
    case 'intro':
      return 'happy';
    case 'sad':
      return 'sad';
    case 'neutral':
    case 'thinking':
    case 'pointing':
    case 'explaining':
    case 'talking':
    case 'idle':
    default:
      return 'neutral';
  }
};

const NarratorAvatar: React.FC = () => {
  const { narratorRole, narratorDialogue, language, narratorState } = useContext(AppContext);
  const [highlight, setHighlight] = useState(false);

  // Trigger a one-time gentle pulse when new dialogue appears
  useEffect(() => {
    if (!narratorDialogue) return;
    setHighlight(true);
    const t = setTimeout(() => setHighlight(false), 1500); // 1.5s then stop
    return () => clearTimeout(t);
  }, [narratorDialogue]);

  if (!narratorRole) return null;

  const narrator = NARRATORS[narratorRole];
  const appEmotion: NarratorAppEmotion =
    narratorDialogue && (narratorState === 'idle' || narratorState === 'neutral')
      ? 'talking'
      : narratorState;

  const imageState = mapAppEmotionToImageState(appEmotion);
  const avatarSrc = narrator.avatars[imageState];

  // Optional: read a global calm mode from CSS (e.g., html[data-calm="true"])
  const calmMode = useMemo(
    () => typeof window !== 'undefined' && document.documentElement.dataset.calm === 'true',
    []
  );

  return (
    <div className="fixed bottom-2 left-2 z-40 pointer-events-none w-full max-w-[46rem]">
      <div className="flex items-center space-x-2">
        {/* Avatar — bigger, near edge */}
        <div className="relative flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
          {/* One-time, gentle attention pulse (calm & motion-safe) */}
          {!calmMode && highlight && (
            <span
              aria-hidden
              className="motion-safe:animate-ping absolute inset-0 rounded-full bg-white/10"
            />
          )}
          {/* Soft static ring for focus without motion */}
          <span aria-hidden className="absolute -inset-1 rounded-full ring-2 ring-white/25" />
          <img
            key={avatarSrc}
            src={avatarSrc}
            alt={narrator.name[language]}
            className="relative w-full h-full object-contain drop-shadow-2xl motion-safe:animate-fadeIn"
          />
        </div>

        {/* Speech Bubble — horizontal & close to avatar */}
        {narratorDialogue && (
          <div className="relative max-w-[28rem] md:max-w-[32rem]">
            <div
              className="bg-card px-6 py-3 rounded-xl shadow-lg border border-border
                         text-card-foreground font-medium leading-snug"
              role="status"
              aria-live="polite"
            >
              {narratorDialogue}
            </div>
            {/* Arrow centered toward avatar */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full
                         w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent
                         border-r-8 border-r-card"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NarratorAvatar;
