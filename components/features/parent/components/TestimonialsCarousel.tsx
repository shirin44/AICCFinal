import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
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
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  slideAriaLabelPrefix?: string;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  items,
  onOpenVideo,
  ctaLabel = "Watch",
  prevAriaLabel = "Go to previous story",
  nextAriaLabel = "Go to next story",
  slideAriaLabelPrefix = "Story",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!items.length) return null;

  return (
    <section aria-roledescription="carousel" aria-label="Testimonials">
      {/* Slide track */}
      <div style={{ overflow: "hidden" }} ref={emblaRef}>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {items.map((it, i) => (
            <div
              key={it.id}
              style={{ flex: "0 0 100%", minWidth: 0 }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideAriaLabelPrefix} ${i + 1} of ${items.length}`}
            >
              <TestimonialCard
                name={it.name}
                role={it.role}
                quote={it.quote}
                thumbnail={it.thumbnail}
                ctaLabel={ctaLabel}
                onPlay={() => onOpenVideo(it.videoUrl ?? "", it.name)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40 disabled:pointer-events-none"
          aria-label={prevAriaLabel}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Position dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Stories">
          {items.map((_, i) => {
            const isActive = i === selectedIndex;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${slideAriaLabelPrefix} ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition",
                  isActive
                    ? "bg-primary shadow-sm shadow-primary/40"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60",
                ].join(" ")}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40 disabled:pointer-events-none"
          aria-label={nextAriaLabel}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Current position label for screen readers */}
      <p className="mt-2 text-center text-xs text-muted-foreground" aria-live="polite" aria-atomic="true">
        {slideAriaLabelPrefix} {selectedIndex + 1} of {items.length}
      </p>
    </section>
  );
};

export default TestimonialsCarousel;
