import React, { useState, useContext, useEffect } from 'react';
import { cleanInterviewQuestion } from '../../../services/geminiService';
import { AppContext } from '../../../App';
import { DIALOGUE } from '@/constants';
import VoiceInputButton from '../../VoiceInputButton';
import CleanIcon from '../../icons/CleanIcon';

interface CleanedResult {
  cleanedQuestion: string;
  score: number;
  reasoning: string;
}

const MAX_QUESTION_LENGTH = 500;

const Spinner: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24" aria-hidden>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

const ScoreIndicator: React.FC<{ score: number }> = ({ score }) => {
  const color = score >= 85 ? 'bg-success' : score >= 60 ? 'bg-warning' : 'bg-danger';
  const label = score >= 85 ? 'Great' : score >= 60 ? 'Needs improvement' : 'Needs significant revision';
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-muted-foreground">
          Inclusivity Score: <span className="text-foreground">{score}/100</span>
        </span>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div
        className="w-full bg-muted rounded-full h-4"
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${score} out of 100 — ${label}`}
        aria-label="Inclusivity Score"
      >
        <div
          className={`h-4 rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

const QuestionCleaner: React.FC = () => {
  const { language, setNarratorDialogue, setNarratorState } = useContext(AppContext);
  const [originalQuestion, setOriginalQuestion] = useState('');
  const [result, setResult] = useState<CleanedResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setNarratorDialogue(DIALOGUE.employerIntro[language]);
    setNarratorState('explaining');
    return () => { setNarratorState('idle'); };
  }, [language, setNarratorDialogue, setNarratorState]);

  useEffect(() => {
    if (isLoading) setNarratorState('thinking');
    else if (result) setNarratorState('explaining');
    else setNarratorState('idle');
  }, [isLoading, result, setNarratorState]);

  const handleVoiceInput = (text: string) => {
    setOriginalQuestion(prev => (prev ? prev.trim() + ' ' : '') + text);
  };

  const handleSubmit = async () => {
    if (!originalQuestion.trim()) {
      setError(language === 'en' ? 'Please enter a question to analyze.' : 'Vui lòng nhập câu hỏi để phân tích.');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);
    setCopied(false);
    try {
      const res = await cleanInterviewQuestion(originalQuestion);
      setResult(res);
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Something went wrong. Please try again.' : 'Đã xảy ra lỗi. Vui lòng thử lại.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.cleanedQuestion) return;
    try {
      await navigator.clipboard.writeText(result.cleanedQuestion);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">
        {language === 'en' ? 'Question Cleaner' : 'Làm Sạch Câu Hỏi'}
      </h2>
      <p className="mb-6 text-muted-foreground">
        {language === 'en'
          ? 'Enter an interview question to get a clearer, more inclusive version that is less likely to cause anxiety for neurodivergent candidates.'
          : 'Nhập câu hỏi phỏng vấn để nhận phiên bản rõ ràng, toàn diện hơn, ít gây lo lắng cho ứng viên thần kinh dị biệt.'}
      </p>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="originalQuestion" className="block text-lg font-medium text-muted-foreground">
              {language === 'en' ? 'Original Question:' : 'Câu hỏi gốc:'}
            </label>
            <VoiceInputButton onTextReceived={handleVoiceInput} />
          </div>
          <textarea
            id="originalQuestion"
            rows={5}
            value={originalQuestion}
            onChange={(e) => setOriginalQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === 'en' ? 'Type or speak your question…' : 'Nhập hoặc nói câu hỏi của bạn…'}
            className="w-full p-3 border border-border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-card text-card-foreground placeholder:text-muted-foreground resize-none"
            disabled={isLoading}
            maxLength={MAX_QUESTION_LENGTH}
            aria-describedby="char-count"
          />
          <div
            id="char-count"
            className={`text-right text-sm mt-1 ${originalQuestion.length > MAX_QUESTION_LENGTH - 50 ? 'text-red-600' : 'text-muted-foreground'}`}
          >
            {originalQuestion.length} / {MAX_QUESTION_LENGTH}
          </div>
        </div>

        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading || !originalQuestion.trim()}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 text-lg bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner />
              {language === 'en' ? 'Analyzing…' : 'Đang phân tích…'}
            </>
          ) : (
            <>
              <CleanIcon className="w-5 h-5" />
              {language === 'en' ? 'Clean Question' : 'Làm sạch câu hỏi'}
            </>
          )}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          {language === 'en' ? 'Tip: Press Ctrl+Enter (or ⌘+Enter) to submit' : 'Mẹo: Nhấn Ctrl+Enter để gửi'}
        </p>
      </div>

      {result && !isLoading && (
        <div className="mt-8 p-6 bg-card border border-border rounded-xl shadow-sm space-y-6 animate-fadeInUp">
          <h3 className="font-display text-xl font-bold">
            {language === 'en' ? 'Suggestion' : 'Gợi ý'}
          </h3>

          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-1">
              {language === 'en' ? 'Suggested Question:' : 'Câu hỏi đề xuất:'}
            </label>
            <div className="relative group">
              <p className="p-4 bg-accent/10 text-accent-foreground rounded-lg text-lg leading-relaxed pr-20">
                {result.cleanedQuestion}
              </p>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 px-2 py-1 text-xs rounded bg-white border border-border text-muted-foreground hover:bg-muted transition-colors"
                aria-label="Copy suggested question"
              >
                {copied ? (language === 'en' ? '✓ Copied' : '✓ Đã sao') : (language === 'en' ? 'Copy' : 'Sao chép')}
              </button>
            </div>
          </div>

          <ScoreIndicator score={result.score} />

          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-1">
              {language === 'en' ? 'Why this change:' : 'Lý do thay đổi:'}
            </label>
            <p className="p-4 bg-muted text-secondary-foreground rounded-lg text-sm leading-relaxed">
              {result.reasoning}
            </p>
          </div>

          <button
            onClick={() => { setResult(null); setOriginalQuestion(''); }}
            className="text-sm text-muted-foreground underline hover:text-foreground"
          >
            {language === 'en' ? 'Analyze another question' : 'Phân tích câu hỏi khác'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCleaner;
