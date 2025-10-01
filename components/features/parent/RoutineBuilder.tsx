import React, { useEffect, useMemo, useState, useContext } from "react";
import { AppContext } from "@/App";
import { ROUTINE_CONTENT } from "@/constants/Routine";
import { Language } from "@/types";

const MAX_STEPS = 3;

function pickRandom<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

const RoutineBuilder: React.FC = () => {
  const { language } = useContext(AppContext);

  // Build options localized
  const options = useMemo(
    () => ROUTINE_CONTENT.options.map(o => ({ id: o.id, text: o.label[language] })),
    [language]
  );

  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const remaining = MAX_STEPS - selected.length;

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(x => x !== id));
    } else if (selected.length < MAX_STEPS) {
      setSelected([...selected, id]);
    }
  };

  const suggest = () => setSelected(pickRandom(options.map(o => o.id), MAX_STEPS));
  const clearAll = () => setSelected([]);
  const copyRoutine = async () => {
    const textLines = selected.map((id, i) => {
      const opt = ROUTINE_CONTENT.options.find(o => o.id === id);
      const label = opt ? opt.label[language] : id;
      return `${i + 1}. ${label}`;
    });
    try {
      await navigator.clipboard.writeText(textLines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  // Build UI text from content
  const title = ROUTINE_CONTENT.title[language];
  const subtitle = ROUTINE_CONTENT.subtitle[language];
  const stepsSelected = ROUTINE_CONTENT.stepsSelected[language];
  const optionsSection = ROUTINE_CONTENT.optionsSection[language];
  const yourRoutine = ROUTINE_CONTENT.yourRoutine[language];
  const noStepsYet = ROUTINE_CONTENT.noStepsYet[language];
  const suggestForMe = ROUTINE_CONTENT.suggestForMe[language];
  const clear = ROUTINE_CONTENT.clear[language];
  const copy = ROUTINE_CONTENT.copy[language];
  const copiedLabel = ROUTINE_CONTENT.copied[language];
  const removeLabel = ROUTINE_CONTENT.remove[language];
  const addLabel = ROUTINE_CONTENT.add[language];
  const limitReached = ROUTINE_CONTENT.limitReached[language];
  const dragToReorder = ROUTINE_CONTENT.dragToReorder[language];

  const pickMore =
    remaining <= 0
      ? ""
      : remaining === 1
      ? ROUTINE_CONTENT.pickMore_singular[language]
      : ROUTINE_CONTENT.pickMore_plural[language].replace("{n}", String(remaining));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={suggest}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/15"
            type="button"
          >
            {suggestForMe}
          </button>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-muted/80"
            type="button"
          >
            {clear}
          </button>
        </div>
      </div>

      {/* Progress (count only, simple) */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{stepsSelected}</span>
          <span className="font-medium text-foreground">{selected.length} / {MAX_STEPS}</span>
        </div>
        {pickMore && <p className="mt-2 text-xs text-muted-foreground">{pickMore}</p>}
      </div>

      {/* Options */}
      <div className="mt-5">
        <h4 className="mb-2 text-sm font-semibold text-foreground/90">{optionsSection}</h4>
        <div className="flex flex-wrap gap-2">
          {options.map(opt => {
            const isChosen = selected.includes(opt.id);
            const disabled = !isChosen && selected.length >= MAX_STEPS;
            return (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                aria-pressed={isChosen}
                disabled={disabled}
                className={[
                  "group relative rounded-full border px-3 py-1.5 text-sm transition",
                  "focus:outline-none focus:ring-2 focus:ring-primary/40",
                  isChosen
                    ? "border-primary bg-primary text-primary-foreground shadow-sm hover:shadow"
                    : "border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground",
                  disabled ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
                title={isChosen ? removeLabel : disabled ? limitReached : addLabel}
              >
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected list */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground/90">{yourRoutine}</h4>
          <button
            onClick={copyRoutine}
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:bg-muted"
          >
            {copied ? copiedLabel : copy}
          </button>
        </div>

        {selected.length === 0 ? (
          <div className="mt-3 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
            {noStepsYet}
          </div>
        ) : (
          <ol className="mt-3 space-y-2">
            {selected.map((id, idx) => {
              const opt = ROUTINE_CONTENT.options.find(o => o.id === id);
              const text = opt ? opt.label[language] : id;
              return (
                <li
                  key={id}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card/70 p-3 shadow-sm"
                  title={dragToReorder}
                >
                  <span className="text-muted-foreground select-none" aria-hidden>⋮⋮</span>
                  <span className="mr-2 rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-foreground/80">
                    {idx + 1}
                  </span>
                  <span className="flex-1 text-foreground">{text}</span>
                  <button
                    type="button"
                    onClick={() => toggle(id)}
                    className="rounded-md border border-transparent px-2 py-1 text-xs text-muted-foreground transition hover:border-border hover:text-foreground"
                    aria-label={`${removeLabel} ${text}`}
                  >
                    {removeLabel}
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
};

export default RoutineBuilder;
