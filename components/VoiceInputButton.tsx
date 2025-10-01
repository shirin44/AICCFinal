// components/VoiceInputButton.tsx
import React, { useEffect, useRef, useState } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import MicrophoneIcon from "./icons/MicrophoneIcon";

// Optional tiny dot icon for the banner
const Dot: React.FC<{ className?: string }> = ({ className }) => (
  <span className={`inline-block w-2.5 h-2.5 rounded-full ${className ?? ""}`} />
);

interface VoiceInputButtonProps {
  onTextReceived: (text: string) => void;
  lang?: string;                 // e.g., "en-US"
  continuous?: boolean;          // defaults to true (no need to hold)
  showInterimBelow?: boolean;    // shows interim transcript below button (off by default)
  showBanner?: boolean;          // show the big "Recording..." banner (on by default)
  bannerPosition?: "top" | "bottom";
}

const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onTextReceived,
  lang = "en-US",
  continuous = true,
  showInterimBelow = false,
  showBanner = true,
  bannerPosition = "top",
}) => {
  const {
    isListening,
    finalTranscript,
    interimTranscript,
    startListening,
    stopListening,
    hasSupport,
    error,
    setFinalTranscript,
    setInterimTranscript,
  } = useSpeechRecognition({
    lang,
    continuous,           // keep listening across phrases
    interimResults: true, // still capture interim for the preview
    autoStopSilenceMs: 2000, // stop after ~2s of silence
    keepAliveOnEnd: true, // mitigate random onend in Chrome/Safari
  });

  // A calm status string we also announce in a live region
  const [status, setStatus] = useState("Idle");

  // When a final chunk arrives, pass it up, then clear buffers
  useEffect(() => {
    if (!finalTranscript) return;
    onTextReceived(finalTranscript);
    setFinalTranscript("");
    setInterimTranscript("");
  }, [finalTranscript, onTextReceived, setFinalTranscript, setInterimTranscript]);

  // Update status text for live region
  useEffect(() => {
    setStatus(isListening ? "Recording started" : "Recording stopped");
  }, [isListening]);

  // Click/keyboard toggle (no need to hold)
  const toggleListening = () => {
    if (isListening) stopListening();
    else startListening();
  };

  // Keyboard: Enter/Space toggles; Escape stops.
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleListening();
    } else if (e.key === "Escape" && isListening) {
      e.preventDefault();
      stopListening();
    }
  };

  // Live region (screen readers announce state changes)
  const liveRef = useRef<HTMLDivElement | null>(null);

  if (!hasSupport) {
    return (
      <div className="text-xs text-slate-700" role="note">
        Voice input isn’t supported in this browser.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Accessible live status, visually hidden but announced */}
      <div
        ref={liveRef}
        aria-live="polite"
        className="sr-only"
      >
        {status}
      </div>

      {/* Optional calm banner */}
      {showBanner && isListening && (
        <div
          className={`w-full ${
            bannerPosition === "top" ? "mb-3" : "mt-3"
          }`}
        >
          <div className="flex items-center justify-center">
            <div
              className="inline-flex items-center gap-3 rounded-lg border border-rose-200
                         bg-rose-50 px-4 py-2 text-rose-900"
              role="status"
              aria-label="Recording in progress"
            >
              <Dot className="bg-rose-600" />
              <span className="font-medium">Recording…</span>
              <span className="text-sm opacity-80">(press Stop when finished)</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-8">
        {/* Big, calm button with text label — no flashing animations */}
        <button
          type="button"
          onClick={toggleListening}
          onKeyDown={onKeyDown}
          role="switch"
          aria-checked={isListening}
          aria-label={isListening ? "Stop recording" : "Start recording"}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-base font-semibold outline-none
            focus-visible:ring-2 focus-visible:ring-blue-600
            ${
              isListening
                ? "bg-rose-600 text-white hover:bg-rose-700"
                : "bg-brand-neutral-100 text-brand-neutral-800 hover:bg-brand-neutral-300"
            }`}
        >
          <MicrophoneIcon className="w-5 h-5" />
          {isListening ? "Stop" : "Start voice input"}
        </button>

        {/* Clear, calm error text */}
        {error && (
          <p className="text-sm text-red-700">
            {error}
          </p>
        )}
      </div>

      {/* Optional interim preview (no flashing; small, muted) */}
      {showInterimBelow && interimTranscript && (
        <div className="mt-2 text-sm text-slate-700">
          <span className="font-medium text-slate-900">Heard: </span>
          <span>{interimTranscript}</span>
        </div>
      )}
    </div>
  );
};

export default VoiceInputButton;
