import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../../App";
import { BREATHING_CONTENT } from "@/constants/BreathingCoach";
import { Language } from "@/types";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ArrowPathIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

type PhaseKey = "breatheIn" | "hold" | "breatheOut";

const PHASES: Array<{ key: PhaseKey; ms: number; scale: number }> = [
  { key: "breatheIn", ms: 4000, scale: 1.25 }, // grow
  { key: "hold", ms: 4000, scale: 1.25 }, // stay big
  { key: "breatheOut", ms: 6000, scale: 0.85 }, // shrink
];

const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === "vi" || l === "VN" ? Language.VN : Language.EN;

const BreathingCoach: React.FC = () => {
  const { language } = useContext(AppContext);
  const lang = normalizeLang(language);

  const phases = useMemo(
    () =>
      PHASES.map((p) => ({
        ...p,
        label: BREATHING_CONTENT[p.key][lang],
        longText:
          p.key === "breatheIn"
            ? BREATHING_CONTENT.breatheInInstruction[lang]
            : p.key === "hold"
            ? BREATHING_CONTENT.holdInstruction[lang]
            : BREATHING_CONTENT.breatheOutInstruction[lang],
      })),
    [lang]
  );

  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [label, setLabel] = useState(phases[0].label);
  const [longText, setLongText] = useState(phases[0].longText);

  const timeoutRef = useRef<number | null>(null);
  const cur = phases[phaseIdx];

  // Update labels when phase or language changes
  useEffect(() => {
    setLabel(phases[phaseIdx].label);
    setLongText(phases[phaseIdx].longText);
  }, [phaseIdx, phases]);

  // Timer cycle
  useEffect(() => {
    if (!running) return;

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setPhaseIdx((i) => (i + 1) % phases.length);
    }, cur.ms) as unknown as number;

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [running, phaseIdx, phases, cur.ms]);

  const toggle = () => setRunning((v) => !v);

  const reset = () => {
    setRunning(false);
    setPhaseIdx(0);
    setLabel(phases[0].label);
    setLongText(phases[0].longText);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  };

  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-background p-4 shadow-sm sm:p-5">
      {/* Header + controls */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <HeartIcon className="h-4 w-4 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {BREATHING_CONTENT.ui.title[lang]}
            </h3>
            <p className="text-xs text-muted-foreground">
              {BREATHING_CONTENT.followGuide[lang]}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggle}
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              running
                ? "border-border bg-muted text-foreground hover:bg-muted/80"
                : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/15"
            }`}
          >
            {running ? (
              <>
                <PauseCircleIcon className="h-4 w-4" aria-hidden="true" />
                {BREATHING_CONTENT.ui.pause[lang]}
              </>
            ) : (
              <>
                <PlayCircleIcon className="h-4 w-4" aria-hidden="true" />
                {BREATHING_CONTENT.ui.start[lang]}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:bg-muted"
          >
            <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
            {BREATHING_CONTENT.ui.reset[lang]}
          </button>
        </div>
      </div>

      {/* Visual + texts */}
      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        {/* Animated circle */}
        <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
          <div
            className="absolute inset-0 rounded-full bg-primary/15 shadow-inner"
            style={{
              transform: `scale(${cur.scale})`,
              transition: `transform ${cur.ms}ms ease-in-out`,
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-card/90 shadow-sm sm:h-24 sm:w-24">
            <span
              className="px-3 text-center font-display text-sm font-semibold text-foreground"
              aria-live="polite"
              aria-atomic="true"
            >
              {label.replace("...", "")}
            </span>
          </div>
        </div>

        {/* Instruction + phase dots */}
        <div className="flex-1 space-y-3">
          <p className="text-sm text-foreground/90">{longText}</p>

          <div className="flex items-center gap-2">
            {phases.map((p, i) => (
              <span
                key={p.key + i}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === phaseIdx ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            {BREATHING_CONTENT.ui.timingHint[lang]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreathingCoach;