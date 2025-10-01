import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { AppContext } from '../App';
import { NarratorRole } from '../types';
import { NARRATORS, LOCALIZED_CONTENT, STORY_CONTENT } from '@/constants';

import InterviewPractice from '../components/features/jobseeker/InterviewPractice';
import SessionHistory from '../components/features/jobseeker/SessionHistory';
import SpeakerIcon from '../components/icons/SpeakerIcon';
import ParentGuidance from '../components/features/parent/ParentGuidance';
import StoryPlayer from '../components/features/common/StoryPlayer';
import PracticeIcon from '../components/icons/PracticeIcon';
import HistoryIcon from '../components/icons/HistoryIcon';
import Tooltip from '../components/Tooltip';
import VolunteerPractice from '../components/features/volunteer/VolunteerPractice';

// ✅ Lazy-load EmployerGuide for faster initial load
const EmployerGuide = lazy(() => import('../components/features/employer/EmployerGuide'));

const DashboardPage: React.FC = () => {
  const { narratorRole, mode, language, setNarratorDialogue, setNarratorState } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'practice' | 'history'>('practice');

  useEffect(() => {
    if (!narratorRole) {
      navigate('/');
      return;
    }
    if (!mode) {
      navigate('/mode-selection');
      return;
    }
    if (mode === 'practice') {
      const narrator = NARRATORS[narratorRole];
      setNarratorDialogue(narrator.intro[language]);
      setNarratorState('intro');
      const t = setTimeout(() => setNarratorState('idle'), 4000);
      return () => clearTimeout(t);
    }
  }, [narratorRole, mode, navigate, language, setNarratorDialogue, setNarratorState]);

  if (!narratorRole || !mode) return null;

  const narrator = NARRATORS[narratorRole];

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = language === 'en' ? 'en-US' : 'vi-VN';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  const renderPracticeContent = () => {
    switch (narratorRole) {
      case NarratorRole.Jobseeker:
        return (
          <div>
            {/* Tabs */}
            <div role="tablist" aria-label="Practice options" className="mb-6">
              <nav className="flex gap-2">
                <button
                  role="tab"
                  id="practice-tab"
                  aria-controls="practice-panel"
                  aria-selected={activeTab === 'practice'}
                  onClick={() => setActiveTab('practice')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                              transition-colors
                              ${activeTab === 'practice'
                                ? 'bg-slate-900 text-white'
                                : 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50'}`}
                >
                  <PracticeIcon className="w-5 h-5" />
                  {LOCALIZED_CONTENT.practice[language]}
                </button>

                <button
                  role="tab"
                  id="history-tab"
                  aria-controls="history-panel"
                  aria-selected={activeTab === 'history'}
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                              transition-colors
                              ${activeTab === 'history'
                                ? 'bg-slate-900 text-white'
                                : 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50'}`}
                >
                  <HistoryIcon className="w-5 h-5" />
                  {LOCALIZED_CONTENT.history[language]}
                </button>
              </nav>
            </div>

            {/* Panels */}
            {activeTab === 'practice' && (
              <div
                id="practice-panel"
                role="tabpanel"
                tabIndex={0}
                aria-labelledby="practice-tab"
                className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm"
              >
                <InterviewPractice />
              </div>
            )}

            {activeTab === 'history' && (
              <div
                id="history-panel"
                role="tabpanel"
                tabIndex={0}
                aria-labelledby="history-tab"
                className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm"
              >
                <SessionHistory />
              </div>
            )}
          </div>
        );

      case NarratorRole.Employer:
        // ✅ Now goes to the full Employer guide (welcome → overview → modules)
        return (
          <Suspense fallback={<div className="p-6">Loading…</div>}>
            <EmployerGuide />
          </Suspense>
        );

      case NarratorRole.CareGiver:
        return <ParentGuidance />;

      case NarratorRole.Volunteer:
        return <VolunteerPractice />;

      default:
        return <p className="text-slate-900">No content available for this role.</p>;
    }
  };

  const renderContent = () => {
    if (mode === 'practice') return renderPracticeContent();
    if (mode === 'story') {
      const story = STORY_CONTENT[narratorRole];
      return <StoryPlayer story={story} />;
    }
    return null;
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header — dark, high-contrast, bold */}
        {mode === 'practice' && (
          <header className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex items-center gap-5">
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
              <span aria-hidden className="absolute -inset-1 rounded-full ring-2 ring-white/30" />
              <div className="w-full h-full rounded-full bg-white overflow-hidden">
                <img
                  src={narrator.avatars.neutral}
                  alt={narrator.name[language]}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Welcome!
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-lg text-white/90">
                  Your <span className="font-bold underline decoration-blue-300">{narrator.name[language]}</span> is here to guide you.
                </p>
                <Tooltip tip="Read introduction aloud">
                  <button
                    onClick={() => handleSpeak(narrator.intro[language])}
                    className="pointer-events-auto p-1 rounded-full text-white hover:bg-white/15
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    aria-label="Read introduction aloud"
                  >
                    <SpeakerIcon className="w-6 h-6" />
                  </button>
                </Tooltip>
              </div>
            </div>
          </header>
        )}

        {/* Content */}
        <div>{renderContent()}</div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
