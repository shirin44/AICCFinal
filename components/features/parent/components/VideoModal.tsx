import React, { useEffect, useRef } from "react";

interface VideoModalProps {
  url: string;
  onClose: () => void;
  title?: string;

  // i18n-friendly labels – pass from your translation files
  closeAriaLabel?: string;
  comingSoonLabel?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  url,
  onClose,
  title = "Testimonial",
  closeAriaLabel = "Close video",
  comingSoonLabel = "Video coming soon…",
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Move initial focus to close button for accessibility
  useEffect(() => {
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, []);

  const titleId = "video-modal-title";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        ref={dialogRef}
        role="document"
        className="max-w-3xl w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-transform duration-200 ease-out animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3
            id={titleId}
            className="font-display text-lg font-semibold text-foreground"
          >
            {title}
          </h3>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground transition hover:bg-muted/80 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={closeAriaLabel}
            type="button"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="aspect-video bg-black">
          {url ? (
            <iframe
              className="h-full w-full"
              src={url}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="grid h-full w-full place-items-center px-4 text-center text-sm text-white/80">
              {comingSoonLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;