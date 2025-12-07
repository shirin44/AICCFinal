import React from "react";
import { GlobeAltIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ResourceCardProps {
  name: string;
  desc: string;
  url: string;

  // i18n-friendly labels (pass from translation files)
  ctaLabel?: string;          // e.g. "Visit website"
  externalTagLabel?: string;  // e.g. "Trusted resource"
  ariaLabelPrefix?: string;   // e.g. "Open resource"
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  name,
  desc,
  url,
  ctaLabel = "Visit resource",
  externalTagLabel = "External link",
  ariaLabelPrefix = "Open resource",
}) => {
  const isExternal = url && /^https?:\/\//i.test(url);

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
          <GlobeAltIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-foreground truncate">
            {name}
          </h3>
          {isExternal && (
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              <ArrowTopRightOnSquareIcon className="h-3 w-3" aria-hidden="true" />
              <span>{externalTagLabel}</span>
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {desc}
      </p>

      {/* Link */}
      <div className="mt-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${ariaLabelPrefix}: ${name}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/5"
        >
          <span>{ctaLabel}</span>
          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};

export default ResourceCard;