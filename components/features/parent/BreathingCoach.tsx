import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../../App";
import { BREATHING_CONTENT } from "@/constants/BreathingCoach";
import { Language } from "@/types";

type PhaseKey = "breatheIn" | "hold" | "breatheOut";

const PHASES: Array<{ key: PhaseKey; ms: number; scale: number }> = [
  { key: "breatheIn", ms: 4000, scale: 1.25 }, // grow
  { key: "hold", ms: 4000, scale: 1.25 },      // stay big
  { key: "breatheOut", ms: 6000, scale: 0.85 },// shrink
];

const BreathingCoach: React.FC = () => {
  const { language } = useContext(AppContext);

  // Build labels from content (same [language] style as Header)
  const phases = useMemo(
    () =>
      PHASES.map((p) => ({
        ...p,
        label: BREATHING_CONTENT[p.key][language],
        longText:
          p.key === "breatheIn"
            ? BREATHING_CONTENT.breatheInInstruction[language]
            : p.key === "hold"
            ? BREATHING_CONTENT.holdInstruction[language]
            : BREATHING_CONTENT.breatheOutInstruction[language],
      })),
    [language]
  );

  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [label, setLabel] = useState(phases[0].label);
  const [longText, setLongText] = useState(phases[0].longText);

  const timeoutRef = useRef<number | null>(null);
  const cur = phases[phaseIdx];

  // Phase label + instruction update
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
    <div className="rounded-xl border border-border bg-card p-4">
      {/* Header + controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Calm Breathing</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggle}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition border
              ${
                running
                  ? "border-border bg-muted text-foreground hover:bg-muted/80"
                  : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/15"
              }`}
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground/80 hover:bg-muted transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Visual + texts */}
      <div className="mt-4 flex items-center gap-4">
        {/* Animated circle */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full bg-primary/20"
            style={{
              transform: `scale(${cur.scale})`,
              transition: `transform ${cur.ms}ms linear`,
            }}
            aria-hidden
          />
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-card/80 shadow">
            <span
              className="px-2 text-center font-display text-sm font-bold text-foreground"
              aria-live="polite"
              aria-atomic="true"
            >
              {label.replace("...", "")}
            </span>
          </div>
        </div>

        {/* Instruction + dots */}
        <div className="flex-1">
          <p className="text-foreground/90">
            {longText}
          </p>
          <div className="mt-3 flex items-center gap-2">
            {phases.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${i === phaseIdx ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {BREATHING_CONTENT.followGuide[language]} · 4s in · 4s hold · 6s out
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreathingCoach;
