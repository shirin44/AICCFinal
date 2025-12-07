import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentId] = useState(
    () => `accordion-content-${Math.random().toString(36).substr(2, 9)}`
  );

  return (
    <div className="rounded-2xl border border-border/70 bg-card/80 shadow-sm transition hover:shadow-md">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`
          flex w-full items-center justify-between gap-3 px-4 py-3 text-left
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background
        `}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            ?
          </span>
          <span className="font-medium text-foreground">{title}</span>
        </div>

        <div
          className={`
            flex h-7 w-7 items-center justify-center rounded-full border border-border bg-muted/60
            text-muted-foreground transition
            ${isOpen ? "rotate-180 bg-primary/10 text-primary" : "hover:bg-muted"}
          `}
          aria-hidden="true"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div
          id={contentId}
          className="px-4 pb-4 pt-0 text-sm text-muted-foreground"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;