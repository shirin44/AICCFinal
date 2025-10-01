import React, { useEffect } from "react";

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="px-4 py-2 bg-foreground text-background rounded-full shadow-lg animate-fadeInUp">
        {message}
      </div>
    </div>
  );
};

export default Toast;
