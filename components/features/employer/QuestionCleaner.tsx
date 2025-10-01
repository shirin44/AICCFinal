import React, { useState, useContext, useEffect } from 'react';
import { cleanInterviewQuestion } from '../../../services/geminiService';
import { AppContext } from '../../../App';
import { DIALOGUE } from '@/constants';
import VoiceInputButton from '../../VoiceInputButton';
import Tooltip from '../../Tooltip';
import CleanIcon from '../../icons/CleanIcon';

interface CleanedResult {
  cleanedQuestion: string;
  score: number;
  reasoning: string;
}

const MAX_QUESTION_LENGTH = 500;

const ScoreIndicator: React.FC<{ score: number }> = ({ score }) => {
  const getColor = () => {
    if (score >= 85) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div
      className="w-full bg-muted rounded-full h-4"
      role="progressbar"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${score} out of 100`}
      aria-label="Inclusivity Score"
    >
      <div
        className={`h-4 rounded-full transition-all duration-500 ${getColor()}`}
        style={{ width: `${score}%` }}
      ></div>
    </div>
  );
};

const QuestionCleaner: React.FC = () => {
  const { language, setNarratorDialogue, setNarratorState } = useContext(AppContext);
  const [originalQuestion, setOriginalQuestion] = useState('');
  const [result, setResult] = useState<CleanedResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setNarratorDialogue(DIALOGUE.employerIntro[language]);
    setNarratorState('explaining');
    return () => { setNarratorState('idle') }; // Reset on unmount
  }, [language, setNarratorDialogue, setNarratorState]);

  useEffect(() => {
    if (isLoading) {
      setNarratorState('thinking');
    } else if (result) {
      setNarratorState('explaining');
    } else {
      setNarratorState('idle');
    }
  }, [isLoading, result, setNarratorState]);

  const handleVoiceInput = (text: string) => {
    setOriginalQuestion(prev => (prev ? prev.trim() + ' ' : '') + text);
  };

  const handleSubmit = async () => {
    if (!originalQuestion.trim()) {
      setError('Please enter a question to analyze.');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await cleanInterviewQuestion(originalQuestion);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-4">Question Cleaner</h2>
      <p className="mb-6 text-muted-foreground">
        Enter an interview question to get an AI-powered suggestion that is clearer, more inclusive, and less likely to cause anxiety for neurodivergent candidates.
      </p>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="originalQuestion" className="block text-lg font-medium text-muted-foreground">Original Question:</label>
            <VoiceInputButton onTextReceived={handleVoiceInput} />
          </div>
          <textarea
            id="originalQuestion"
            rows={6}
            value={originalQuestion}
            onChange={(e) => setOriginalQuestion(e.target.value)}
            placeholder="Type or use the microphone to speak your question..."
            className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-card text-card-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
            maxLength={MAX_QUESTION_LENGTH}
          />
          <div className={`text-right text-sm mt-1 ${originalQuestion.length > MAX_QUESTION_LENGTH - 50 ? 'text-red-600' : 'text-muted-foreground'}`}>
            {originalQuestion.length} / {MAX_QUESTION_LENGTH}
          </div>
        </div>
        
        {error && <p className="text-red-600">{error}</p>}
        
        <Tooltip tip="Let AI suggest a more inclusive version of your question.">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-8 py-4 text-lg bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md disabled:bg-muted"
            >
              <CleanIcon className="w-5 h-5 mr-2" />
              {isLoading ? 'Analyzing...' : 'Clean Question'}
            </button>
        </Tooltip>
      </div>

      {isLoading && <div className="mt-6 text-center">Getting suggestion...</div>}

      {result && (
        <div className="mt-8 p-8 bg-card border border-border rounded-lg shadow-inner animate-fadeIn">
          <h3 className="font-display text-xl font-bold mb-4">Suggestion</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-muted-foreground">Suggested Question:</label>
              <p className="mt-1 p-4 bg-accent/10 text-accent/90 rounded-lg text-lg">
                {result.cleanedQuestion}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground">Inclusivity Score: {result.score}/100</label>
              <ScoreIndicator score={result.score} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground">Reasoning:</label>
              <p className="mt-1 p-4 bg-muted text-secondary-foreground rounded-lg">
                {result.reasoning}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCleaner;