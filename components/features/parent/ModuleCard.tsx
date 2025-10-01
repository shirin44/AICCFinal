import React from 'react';

interface ModuleCardProps {
    title: string;
    time: string;
    isCompleted: boolean;
    onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, time, isCompleted, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-6 border rounded-xl transition-all duration-200 shadow-sm
                ${isCompleted
                    ? 'bg-accent/10 border-accent/30 hover:bg-accent/20 hover:shadow-md'
                    : 'bg-card hover:bg-primary/10 border-border hover:shadow-md hover:border-primary/50'
                }`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className={`font-display text-xl font-bold ${isCompleted ? 'text-accent' : 'text-foreground'}`}>{title}</h3>
                    <p className={`text-sm mt-1 ${isCompleted ? 'text-accent/80' : 'text-muted-foreground'}`}>{time}</p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-accent' : 'bg-muted'}`}>
                    {isCompleted ? (
                        <svg className="w-5 h-5 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                        <div className="w-3 h-3 bg-card rounded-full"></div>
                    )}
                </div>
            </div>
        </button>
    );
};

export default ModuleCard;