// App.tsx (root)
import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import ModeSelectionPage from "./pages/ModeSelectionPage";
import OurStoryPage from "./pages/OurStoryPage";

import { Language, NarratorRole, AppMode, NarratorAppEmotion } from "./types";
import CalmBreathingGuide from "./components/CalmBreathingGuide";
import { NARRATORS } from "./constants"; // <-- fine: you have constants.ts at root
import "./index.css"; // <-- you have index.css at root

export const AppContext = React.createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  narratorRole: NarratorRole | null;
  setNarratorRole: (role: NarratorRole | null) => void;
  mode: AppMode | null;
  setMode: (mode: AppMode | null) => void;
  isBreathingGuideVisible: boolean;
  setIsBreathingGuideVisible: (visible: boolean) => void;
  narratorDialogue: string;
  setNarratorDialogue: (dialogue: string) => void;
  narratorState: NarratorAppEmotion;
  setNarratorState: (state: NarratorAppEmotion) => void;
}>({
  language: Language.EN,
  setLanguage: () => {},
  narratorRole: null,
  setNarratorRole: () => {},
  mode: null,
  setMode: () => {},
  isBreathingGuideVisible: false,
  setIsBreathingGuideVisible: () => {},
  narratorDialogue: "",
  setNarratorDialogue: () => {},
  narratorState: "neutral",
  setNarratorState: () => {},
});

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [narratorRole, setNarratorRole] = useState<NarratorRole | null>(null);
  const [mode, setMode] = useState<AppMode | null>(null);
  const [isBreathingGuideVisible, setIsBreathingGuideVisible] = useState(false);
  const [narratorDialogue, setNarratorDialogue] = useState("");
  const [narratorState, setNarratorState] = useState<NarratorAppEmotion>("neutral");

  useEffect(() => {
    // Apply theme class based on narrator role
    const body = document.body;
    body.classList.remove("theme-blue", "theme-red", "theme-purple", "theme-green");
    if (narratorRole) {
      const theme = NARRATORS[narratorRole].theme;
      body.classList.add(`theme-${theme}`);
    }
  }, [narratorRole]);

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      narratorRole,
      setNarratorRole,
      mode,
      setMode,
      isBreathingGuideVisible,
      setIsBreathingGuideVisible,
      narratorDialogue,
      setNarratorDialogue,
      narratorState,
      setNarratorState,
    }),
    [language, narratorRole, mode, isBreathingGuideVisible, narratorDialogue, narratorState]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {isBreathingGuideVisible && <CalmBreathingGuide />}

      {/* NOTE: BrowserRouter lives in index.tsx, not here */}
      <Routes>
        {/* index = "/" under the basename */}
        <Route index element={<HomePage />} />
        {/* relative paths (no leading slash) honor basename automatically */}
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="mode-selection" element={<ModeSelectionPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="ourStory" element={<OurStoryPage />} />

        {/* Catch-all to home (or swap for a 404 page) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
