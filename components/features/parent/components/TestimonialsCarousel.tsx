import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import TestimonialCard from "./TestimonialCard";

interface TestimonialsCarouselProps {
  items: Array<{
    id: string;
    name: string;
    role: string;
    quote: string;
    thumbnail?: string;
    videoUrl?: string;
  }>;
  onOpenVideo: (url: string, title: string) => void;
  ctaLabel?: string;

  // i18n-able labels (pass from translation files)
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  slideAriaLabelPrefix?: string; // e.g. "Testimonial"
}

const AUTO_PLAY_MS = 4000;

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  items,
  onOpenVideo,
  ctaLabel = "Watch",
  prevAriaLabel = "Previous testimonial",
  nextAriaLabel = "Next testimonial",
  slideAriaLabelPrefix = "Testimonial",
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragRef = useRef<{ startX: number; delta: number } | null>(null);

  const wrap = (i: number) => {
    if (!items.length) return 0;
    return (i + items.length) % items.length;
  };

  // Auto-advance
  useEffect(() => {
    if (paused || items.length <= 1) return;
    const t = setInterval(() => setIndex((i) => wrap(i + 1)), AUTO_PLAY_MS);
    return () => clearInterval(t);
  }, [paused, items.length]);

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIndex((i) => wrap(i + 1));
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => wrap(i - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Drag/swipe
  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, delta: 0 };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    dragRef.current.delta = e.clientX - dragRef.current.startX;
  };

  const onPointerUp = () => {
    if (!dragRef.current) return;
    const { delta } = dragRef.current;
    dragRef.current = null;
    if (Math.abs(delta) > 60) {
      setIndex((i) => (delta < 0 ? wrap(i + 1) : wrap(i - 1)));
    }
  };

  if (!items.length) {
    return null;
  }

  const visibleCount = Math.min(3, items.length);

  return (
    <section
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      {/* Cards */}
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {Array.from({ length: visibleCount }).map((_, offset) => {
          const logicalIndex = wrap(index + offset);
          const it = items[logicalIndex];
          const isPrimary =
            (visibleCount === 1 && offset === 0) ||
            (visibleCount === 2 && offset === 0) ||
            (visibleCount === 3 && offset === 1); // center card on desktop

          return (
            <div
              key={`${it.id}-${offset}`}
              className={[
                "transition transform duration-300",
                isPrimary
                  ? "scale-[1.02] shadow-md shadow-primary/10"
                  : "scale-[0.97] opacity-90",
              ].join(" ")}
              aria-label={`${slideAriaLabelPrefix} ${logicalIndex + 1} of ${items.length}`}
            >
              <TestimonialCard
                name={it.name}
                role={it.role}
                quote={it.quote}
                thumbnail={it.thumbnail}
                ctaLabel={ctaLabel}
                onPlay={() => {
                  // If no video URL, still open modal (your VideoModal already handles empty url
                  const url = it.videoUrl ?? "";
                  onOpenVideo(url, it.name);
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        {/* Prev */}
        <button
          type="button"
          onClick={() => setIndex((i) => wrap(i - 1))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={prevAriaLabel}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, i) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition",
                  isActive
                    ? "bg-primary shadow-sm shadow-primary/40"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60",
                ].join(" ")}
                aria-label={`${slideAriaLabelPrefix} ${i + 1}`}
                aria-pressed={isActive}
              />
            );
          })}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => setIndex((i) => wrap(i + 1))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={nextAriaLabel}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Small autoplay status indicator (optional, subtle) */}
      <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <PlayCircleIcon
          className={`h-3.5 w-3.5 ${
            paused ? "opacity-40" : "opacity-80"
          }`}
          aria-hidden="true"
        />
        <span>{paused ? "" : ""}</span>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;