import React, { useEffect } from "react";

const VideoModal: React.FC<{ url: string; onClose: () => void; title?: string }> = ({
  url,
  onClose,
  title = "Testimonial",
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="bg-card rounded-2xl shadow-2xl border border-border max-w-3xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-display text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 transition grid place-items-center"
            aria-label="Close video"
          >
            <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="aspect-video bg-black">
          {url ? (
            <iframe
              className="w-full h-full"
              src={url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title}
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-white/80 text-sm">
              Video coming soon…
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
