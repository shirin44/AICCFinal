

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { AppContext } from '../App';
import { NARRATORS, LOCALIZED_CONTENT, STORY_CONTENT, DIALOGUE } from '../constants';
import { AppMode } from '../types';

interface ModeCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  titleColorClass: string;
  isRecommended?: boolean;
  isDimmed?: boolean;
}

const ModeCard: React.FC<ModeCardProps> = ({ title, description, buttonText, onClick, titleColorClass, isRecommended, isDimmed }) => {
    const { language } = useContext(AppContext);
    return (
        <div className={`relative bg-card rounded-2xl shadow-lg p-16 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 border border-border ${isDimmed ? 'opacity-75' : ''}`}>
            {isRecommended && (
                <div className="absolute top-0 -translate-y-1/2 px-4 py-1 bg-accent text-accent-foreground font-bold text-sm rounded-full shadow-md">
                    {LOCALIZED_CONTENT.recommended[language]}
                </div>
            )}
            <h3 className={`font-display text-5xl font-bold ${titleColorClass}`}>{title}</h3>
            <p className="mt-6 text-xl text-muted-foreground flex-grow">{description}</p>
            <button
                onClick={onClick}
                className="mt-10 w-full px-8 py-5 bg-foreground text-background font-bold rounded-full text-2xl hover:bg-foreground/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
                {buttonText}
            </button>
        </div>
    );
};

const ModeSelectionPage: React.FC = () => {
    const { narratorRole, language, setMode, setNarratorDialogue, setNarratorState } = useContext(AppContext);
    const navigate = useNavigate();
    const [hasCompletedStory, setHasCompletedStory] = useState(false);

    useEffect(() => {
        if (!narratorRole) {
            navigate('/');
        } else {
            const completed = localStorage.getItem(`neuropilot_story_completed_${narratorRole}`) === 'true';
            setHasCompletedStory(completed);

            if (completed) {
                setNarratorDialogue(DIALOGUE.modeSelectionReturn[language]);
                setNarratorState('idle');
            } else {
                setNarratorDialogue(DIALOGUE.modeSelectionPrompt[narratorRole][language]);
                setNarratorState('pointing');
            }
        }
    }, [narratorRole, navigate, setNarratorDialogue, setNarratorState, language]);

    if (!narratorRole) {
        return null;
    }

    const narrator = NARRATORS[narratorRole];
    const story = STORY_CONTENT[narratorRole];

    const handleSelectMode = (mode: AppMode) => {
        setMode(mode);
        navigate('/dashboard');
    };
    
    return (
        <Layout>
            <div className="text-center">
                <div className="flex justify-center items-center flex-col">
                    <img src={narrator.avatars.happy} alt={narrator.name[language]} className="w-32 h-32 rounded-full border-4 border-card shadow-xl object-cover bg-muted" />
                    <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold text-foreground">
                        {narrator.name[language]}
                    </h1>
                     <p className="mt-2 text-lg text-foreground/80">{LOCALIZED_CONTENT.chooseYourMode[language]}</p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
                    <ModeCard
                        title={story.title[language]}
                        description={story.description[language]}
                        buttonText={LOCALIZED_CONTENT.startStory[language]}
                        onClick={() => handleSelectMode('story')}
                        titleColorClass="text-accent"
                        isRecommended={!hasCompletedStory}
                    />
                     <ModeCard
                        title={LOCALIZED_CONTENT.practiceMode[language]}
                        description={LOCALIZED_CONTENT.practiceModeDescription[language]}
                        buttonText={LOCALIZED_CONTENT.startPractice[language]}
                        onClick={() => handleSelectMode('practice')}
                        titleColorClass="text-primary"
                        isDimmed={!hasCompletedStory}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default ModeSelectionPage;