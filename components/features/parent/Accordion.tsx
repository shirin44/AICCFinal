import React, { useState } from 'react';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contentId] = useState(() => `accordion-content-${Math.random().toString(36).substr(2, 9)}`);

    return (
        <div className="border border-primary/30 rounded-lg bg-primary/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-primary"
                aria-expanded={isOpen}
                aria-controls={contentId}
            >
                <span>{title}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div id={contentId} className="p-4 pt-0 text-primary/80">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;