import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactElement;
  tip: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, tip, position = 'top', className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const id = `tt-${Math.random().toString(36).slice(2, 10)}`;

  const pos: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <span
      className={`relative inline-flex items-center ${className ?? ''}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {React.cloneElement(children, { 'aria-describedby': isVisible ? id : undefined })}
      {isVisible && (
        <span
          id={id}
          role="tooltip"
          className={`absolute z-[9999] px-3 py-2 text-sm font-medium text-white bg-black rounded-md shadow-lg ${pos[position]} pointer-events-none`}
        >
          {tip}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
