import React from "react";

const TestimonialCard: React.FC<{
  name: string;
  role: string;
  quote: string;
  thumbnail?: string;
  onPlay: () => void;
  ctaLabel?: string;
}> = ({ name, role, quote, thumbnail, onPlay, ctaLabel = "Watch" }) => {
  const thumb =
    thumbnail && thumbnail.length > 0
      ? thumbnail
      : "https://via.placeholder.com/640x360/101827/ffffff?text=Video+Placeholder";
  return (
    <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
      <div className="relative aspect-video bg-muted/60">
        <img src={thumb} alt={`${name} video placeholder`} className="w-full h-full object-cover" loading="lazy" />
        <button onClick={onPlay} className="absolute inset-0 flex items-center justify-center group" aria-label="Play testimonial video">
          <div className="w-16 h-16 rounded-full bg-background/80 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-foreground ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
            </svg>
          </div>
        </button>
        <span className="absolute bottom-3 right-3 text-xs font-semibold text-white/90 bg-black/40 px-2 py-1 rounded">
          {ctaLabel}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
        <p className="mt-3 text-sm text-foreground/90 italic leading-relaxed">“{quote}”</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
