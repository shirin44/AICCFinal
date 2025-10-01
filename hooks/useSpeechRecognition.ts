// hooks/useSpeechRecognition.ts
import { useCallback, useEffect, useRef, useState } from "react";

type RecognitionCtor = new () => SpeechRecognition;
declare global {
  interface Window {
    webkitSpeechRecognition?: RecognitionCtor;
    SpeechRecognition?: RecognitionCtor;
  }
}

export type UseSpeechRecognitionOptions = {
  lang?: string;                 // e.g. "en-US"
  continuous?: boolean;          // keep listening across multiple phrases
  interimResults?: boolean;      // get interim hypotheses
  autoStopSilenceMs?: number;    // stop after this much silence (if provided)
  keepAliveOnEnd?: boolean;      // restart onend (workaround for iOS/Chrome flakiness)
};

export function useSpeechRecognition(opts: UseSpeechRecognitionOptions = {}) {
  const {
    lang = "en-US",
    continuous = false,
    interimResults = true,
    autoStopSilenceMs = 1500,
    keepAliveOnEnd = true,
  } = opts;

  const Rec = (typeof window !== "undefined") &&
              (window.SpeechRecognition || window.webkitSpeechRecognition);

  const hasSupport = Boolean(Rec);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  // Silence timer to auto-stop after no results
  const silenceTimerRef = useRef<number | null>(null);

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) {
      window.clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  const armSilenceTimer = useCallback(() => {
    if (!autoStopSilenceMs) return;
    clearSilenceTimer();
    silenceTimerRef.current = window.setTimeout(() => {
      // No speech for a while → stop
      stopListening();
    }, autoStopSilenceMs) as unknown as number;
  }, [autoStopSilenceMs]);

  // Create recognition instance lazily
  const getRecognition = useCallback(() => {
    if (!hasSupport) return null;
    if (recognitionRef.current) return recognitionRef.current;

    const rec = new Rec!();
    rec.lang = lang;
    rec.continuous = continuous;
    rec.interimResults = interimResults;

    rec.onstart = () => {
      setError(null);
      setIsListening(true);
      // arm timer early so we stop on silence even without initial result
      armSilenceTimer();
    };

    rec.onresult = (ev: SpeechRecognitionEvent) => {
      let interim = "";
      let finalChunk = "";

      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const res = ev.results[i];
        const text = res[0]?.transcript ?? "";
        if (res.isFinal) {
          finalChunk += text;
        } else {
          interim += text;
        }
      }

      if (finalChunk) {
        setFinalTranscript((prev) => (prev ? prev + " " : "") + finalChunk.trim());
        setInterimTranscript("");
      } else {
        setInterimTranscript(interim.trim());
      }

      // every time we get audio, reset the silence timer
      armSilenceTimer();
    };

    rec.onerror = (e: SpeechRecognitionErrorEvent) => {
      // ignore harmless "no-speech" errors when we auto-stop
      if (e.error === "no-speech" || e.error === "aborted") return;
      setError(e.error || "speech-recognition-error");
    };

    rec.onend = () => {
      setIsListening(false);
      clearSilenceTimer();

      // Chrome/Safari sometimes end spontaneously. If user still expects listening, restart.
      if (keepAliveOnEnd && recognitionRef.current && isListening) {
        try {
          recognitionRef.current.start();
        } catch {
          // swallow; next user press will start it
        }
      }
    };

    recognitionRef.current = rec;
    return rec;
  }, [Rec, hasSupport, lang, continuous, interimResults, armSilenceTimer, keepAliveOnEnd, isListening]);

  const startListening = useCallback(() => {
    if (!hasSupport) return;
    setError(null);
    const rec = getRecognition();
    if (!rec) return;
    try {
      // reset interim on a new start if not continuous
      if (!continuous) {
        setInterimTranscript("");
      }
      rec.start();
    } catch (e) {
      // calling start twice throws - safe to ignore
    }
  }, [continuous, getRecognition, hasSupport]);

  const stopListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) return;
    try {
      rec.stop();
    } catch {
      // ignore
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      clearSilenceTimer();
      try {
        recognitionRef.current?.stop();
      } catch {}
      recognitionRef.current = null;
    };
  }, []);

  // Expose a combined transcript for convenience
  const transcript = (finalTranscript + (interimTranscript ? " " + interimTranscript : "")).trim();

  return {
    hasSupport,
    isListening,
    error,
    startListening,
    stopListening,
    transcript,
    finalTranscript,
    interimTranscript,
    setFinalTranscript,   // in case caller wants to clear
    setInterimTranscript, // in case caller wants to clear
  };
}
