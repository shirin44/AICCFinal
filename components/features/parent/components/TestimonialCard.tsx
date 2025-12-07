import React from "react";
import { PlayCircleIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  thumbnail?: string;
  onPlay: () => void;
  ctaLabel?: string;

  // i18n-friendly labels (pass from translation files if you like)
  playAriaLabel?: string;          // e.g. "Play testimonial video"
  thumbnailAltPrefix?: string;     // e.g. "Video placeholder for"
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  quote,
  thumbnail,
  onPlay,
  ctaLabel = "Watch",
  playAriaLabel = "Play testimonial video",
  thumbnailAltPrefix = "Video placeholder for",
}) => {
  const thumb =
    thumbnail && thumbnail.length > 0
      ? thumbnail
      : "https://via.placeholder.com/640x360/101827/ffffff?text=Video+Placeholder";

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Media area */}
      <div className="relative aspect-video bg-muted/60">
        <img
          src={thumb}
          alt={`${thumbnailAltPrefix} ${name}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Play button */}
        <button
          type="button"
          onClick={onPlay}
          className="group absolute inset-0 flex items-center justify-center focus:outline-none"
          aria-label={playAriaLabel}
        >
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background/90 shadow-xl ring-1 ring-border transition group-hover:scale-110">
            <PlayCircleIcon className="h-9 w-9 text-primary" aria-hidden="true" />
          </span>
        </button>

        {/* CTA pill */}
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white/90">
          <PlayCircleIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{ctaLabel}</span>
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Name + role */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/20">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-sm font-semibold text-foreground">
              {name}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{role}</p>
          </div>
        </div>

        {/* Quote */}
        <div className="relative mt-1 flex flex-1 flex-col justify-between">
          <div className="flex items-start gap-2">
            <ChatBubbleLeftRightIcon className="mt-0.5 h-4 w-4 text-primary/70" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-foreground/90">
              “{quote}”
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;