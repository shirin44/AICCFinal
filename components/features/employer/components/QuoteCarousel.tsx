import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EMPLOYER_CONTENT, EmployerViewMode } from "@/constants/Employer";
import { Language } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const QuoteCarousel: React.FC<{ lang: Language; mode: EmployerViewMode }> = ({ lang, mode }) => {
  const t = EMPLOYER_CONTENT.quotes;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center" });
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

  if (!t.items.length) return null;

  const it = t.items[selectedIndex];
  const text = mode === "calm" ? it.textCalm[lang] : it.textResearch[lang];

  return (
    <section className="p-4 sm:p-5 rounded-2xl border border-border bg-card space-y-3">
      {/* Avatar + name row */}
      <div className="flex items-center gap-3">
        <img
          src={it.avatar}
          alt=""
          className="w-12 h-12 rounded-full object-cover border border-border"
        />
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{it.name[lang]}</div>
          <div className="text-xs text-muted-foreground truncate">{it.title[lang]}</div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="w-8 h-8 inline-flex items-center justify-center border border-border rounded-full hover:bg-muted transition disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Previous person"
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="text-xs text-muted-foreground tabular-nums">
            {selectedIndex + 1}/{t.items.length}
          </span>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="w-8 h-8 inline-flex items-center justify-center border border-border rounded-full hover:bg-muted transition disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Next person"
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Hidden Embla track — drives selectedIndex state only */}
      <div style={{ overflow: "hidden", height: 0, visibility: "hidden" }} ref={emblaRef}>
        <div style={{ display: "flex" }}>
          {t.items.map((item) => (
            <div key={item.name[lang]} style={{ flex: "0 0 100%", minWidth: 0 }} />
          ))}
        </div>
      </div>

      {/* Quote text */}
      <p className="text-sm text-foreground leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>
    </section>
  );
};

export default QuoteCarousel;
