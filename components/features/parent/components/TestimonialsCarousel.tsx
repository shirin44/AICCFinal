import React, { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialsCarousel: React.FC<{
  items: Array<{ id: string; name: string; role: string; quote: string; thumbnail?: string; videoUrl?: string }>;
  onOpenVideo: (url: string, title: string) => void;
  ctaLabel?: string;
}> = ({ items, onOpenVideo, ctaLabel = "Watch" }) => {
  const [index, setIndex] = useState(0);
  const wrap = (i: number) => (i + items.length) % items.length;
  const [paused, setPaused] = useState(false);
  const dragRef = useRef<{ startX: number; delta: number } | null>(null);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const t = setInterval(() => setIndex((i) => wrap(i + 1)), 4000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => wrap(i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => wrap(i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    if (Math.abs(delta) > 60) setIndex((i) => (delta < 0 ? wrap(i + 1) : wrap(i - 1)));
  };

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {[0, 1, 2].map((offset) => {
          const it = items[wrap(index + offset)];
          return (
            <TestimonialCard
              key={`${it.id}-${offset}`}
              name={it.name}
              role={it.role}
              quote={it.quote}
              thumbnail={it.thumbnail}
              ctaLabel={ctaLabel}
              onPlay={() => (it.videoUrl ? onOpenVideo(it.videoUrl!, it.name) : alert("Video coming soon!"))}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3 mt-5">
        <button onClick={() => setIndex((i) => wrap(i - 1))} className="px-3 py-2 rounded-lg bg-card border border-border hover:bg-muted transition" aria-label="Previous">
          ←
        </button>
        <div className="flex gap-1">
          {items.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i === index ? "bg-primary" : "bg-muted-foreground/30"}`} />
          ))}
        </div>
        <button onClick={() => setIndex((i) => wrap(i + 1))} className="px-3 py-2 rounded-lg bg-card border border-border hover:bg-muted transition" aria-label="Next">
          →
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
