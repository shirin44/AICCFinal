import React, { useEffect, useMemo, useState, useContext } from "react";
import { AppContext } from "@/App";
import { ROUTINE_CONTENT } from "@/constants/Routine";
import { Language } from "@/types";
import {
  SparklesIcon,
  ArrowPathIcon,
  ClipboardDocumentCheckIcon,
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";

const MAX_STEPS = 3;

function pickRandom<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === "vi" || l === "VN" ? Language.VN : Language.EN;

const RoutineBuilder: React.FC = () => {
  const { language } = useContext(AppContext);
  const lang = normalizeLang(language);

  // Localised options
  const options = useMemo(
    () =>
      ROUTINE_CONTENT.options.map((o) => ({
        id: o.id,
        text: o.label[lang],
      })),
    [lang]
  );

  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const remaining = MAX_STEPS - selected.length;

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    } else if (selected.length < MAX_STEPS) {
      setSelected([...selected, id]);
    }
  };

  const suggest = () =>
    setSelected(pickRandom(options.map((o) => o.id), MAX_STEPS));

  const clearAll = () => setSelected([]);

  const copyRoutine = async () => {
    const textLines = selected.map((id, i) => {
      const opt = ROUTINE_CONTENT.options.find((o) => o.id === id);
      const label = opt ? opt.label[lang] : id;
      return `${i + 1}. ${label}`;
    });
    try {
      await navigator.clipboard.writeText(textLines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore failures silently
    }
  };

  // Text from content (no hard-coded strings)
  const title = ROUTINE_CONTENT.title[lang];
  const subtitle = ROUTINE_CONTENT.subtitle[lang];
  const stepsSelected = ROUTINE_CONTENT.stepsSelected[lang];
  const optionsSection = ROUTINE_CONTENT.optionsSection[lang];
  const yourRoutine = ROUTINE_CONTENT.yourRoutine[lang];
  const noStepsYet = ROUTINE_CONTENT.noStepsYet[lang];
  const suggestForMe = ROUTINE_CONTENT.suggestForMe[lang];
  const clear = ROUTINE_CONTENT.clear[lang];
  const copy = ROUTINE_CONTENT.copy[lang];
  const copiedLabel = ROUTINE_CONTENT.copied[lang];
  const removeLabel = ROUTINE_CONTENT.remove[lang];
  const addLabel = ROUTINE_CONTENT.add[lang];
  const limitReached = ROUTINE_CONTENT.limitReached[lang];
  const dragToReorder = ROUTINE_CONTENT.dragToReorder[lang];

  const pillLabel = ROUTINE_CONTENT.ui.pillLabel[lang];
  const evidenceLine = ROUTINE_CONTENT.ui.evidenceLine[lang];
  const emptyTitle = ROUTINE_CONTENT.ui.emptyTitle[lang];
  const emptyBody = ROUTINE_CONTENT.ui.emptyBody[lang];

  const pickMore =
    remaining <= 0
      ? ""
      : remaining === 1
      ? ROUTINE_CONTENT.pickMore_singular[lang]
      : ROUTINE_CONTENT.pickMore_plural[lang].replace(
          "{n}",
          String(remaining)
        );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-background p-5 shadow-sm">
      {/* Top tag + header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
            <AdjustmentsHorizontalIcon
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            <span>{pillLabel}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            <p className="mt-1 text-xs text-muted-foreground/90">
              {evidenceLine}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={suggest}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition hover:bg-primary/15"
            type="button"
          >
            <SparklesIcon className="h-4 w-4" aria-hidden="true" />
            <span>{suggestForMe}</span>
          </button>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-2 text-xs font-medium text-foreground/80 transition hover:bg-muted/80"
            type="button"
          >
            <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
            <span>{clear}</span>
          </button>
        </div>
      </div>

      {/* Progress line */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{stepsSelected}</span>
          <span className="font-medium text-foreground">
            {selected.length} / {MAX_STEPS}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(selected.length / MAX_STEPS) * 100}%` }}
          />
        </div>
        {pickMore && (
          <p className="text-[11px] text-muted-foreground">{pickMore}</p>
        )}
      </div>

      {/* Options chips */}
      <div className="mt-5">
        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground/90">
          <AdjustmentsHorizontalIcon
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span>{optionsSection}</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const isChosen = selected.includes(opt.id);
            const disabled = !isChosen && selected.length >= MAX_STEPS;
            return (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                aria-pressed={isChosen}
                disabled={disabled}
                className={[
                  "group relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition",
                  "focus:outline-none focus:ring-2 focus:ring-primary/40",
                  isChosen
                    ? "border-primary bg-primary text-primary-foreground shadow-sm hover:shadow"
                    : "border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground",
                  disabled ? "cursor-not-allowed opacity-50" : "",
                ].join(" ")}
                title={
                  isChosen ? removeLabel : disabled ? limitReached : addLabel
                }
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60 group-aria-pressed:bg-primary-foreground" />
                <span className="truncate">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected routine list */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground/90">
            {yourRoutine}
          </h4>
          <button
            onClick={copyRoutine}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:bg-muted"
          >
            <ClipboardDocumentCheckIcon
              className="h-4 w-4"
              aria-hidden="true"
            />
            <span>{copied ? copiedLabel : copy}</span>
          </button>
        </div>

        {selected.length === 0 ? (
          <div className="mt-3 rounded-xl border border-dashed border-border bg-background/60 p-4">
            <p className="text-sm font-medium text-foreground/90">
              {emptyTitle}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {emptyBody || noStepsYet}
            </p>
          </div>
        ) : (
          <ol className="mt-3 space-y-2">
            {selected.map((id, idx) => {
              const opt = ROUTINE_CONTENT.options.find((o) => o.id === id);
              const text = opt ? opt.label[lang] : id;
              return (
                <li
                  key={id}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card/80 p-3 shadow-sm"
                  title={dragToReorder}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <span className="text-xs font-semibold text-foreground/80">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 items-center gap-3">
                    <Bars3BottomLeftIcon
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-sm text-foreground">
                      {text}
                    </span>
                  </div>
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