import React, { useState } from "react";
import { EMPLOYER_CONTENT } from "@/constants/Employer";
import { Language } from "@/types";

type SuccessStoriesProps = {
  lang: Language;
  mode: "calm" | "research";
};

const SuccessStories: React.FC<SuccessStoriesProps> = ({ lang, mode }) => {
  const t = EMPLOYER_CONTENT.stories;
  const items = t.items ?? [];
  const [index, setIndex] = useState(0);

  if (!items.length) return null;

  const safeIndex = ((index % items.length) + items.length) % items.length;
  const story = items[safeIndex];

  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % items.length);

  // Calm: show headline and role only
  // Research: also show full body text
  const showBody = mode === "research";

  return (
    <section className="p-5 rounded-2xl border border-border bg-card space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-lg font-semibold">
          {t.title[lang]}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {safeIndex + 1} / {items.length}
          </span>
          <div className="inline-flex rounded-full border border-border bg-background overflow-hidden">
            <button
              type="button"
              onClick={handlePrev}
              className="px-2 py-1 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-2 py-1 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <article className="p-4 rounded-xl bg-muted/40">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {story.role[lang]}
        </div>
        <h4 className="mt-1 font-semibold text-foreground">
          {story.headline[lang]}
        </h4>
        {showBody && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {story.body[lang]}
          </p>
        )}
      </article>
    </section>
  );
};

export default SuccessStories;