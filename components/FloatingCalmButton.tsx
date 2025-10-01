import React, { useContext } from 'react';
import { AppContext } from '../App';
import Tooltip from './Tooltip';
import calmIcon from './icons/calm.png'; // or .png if not animated

const FloatingCalmButton: React.FC = () => {
  const { setIsBreathingGuideVisible } = useContext(AppContext);

  return (
    <div className="fixed bottom-6 right-6 z-50"> {/* move fixed here */}
      <Tooltip tip="Feeling stressed? Open a guided breathing exercise." position="top">
        <button
          onClick={() => setIsBreathingGuideVisible(true)}
          className="w-20 h-20 bg-primary rounded-full shadow-xl
                     flex items-center justify-center text-primary-foreground
                     transition-all duration-300 ease-in-out hover:shadow-2xl
                     hover:bg-primary/90 transform hover:-translate-y-1 animate-pulse-calm"
          aria-label="Open breathing exercise"
        >
          <img src={calmIcon} alt="Calm" className="w-10 h-10" />
        </button>
      </Tooltip>
    </div>
  );
};

export default FloatingCalmButton;
