import type { StarFeedback } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const TIMEOUT_MS = 35_000;

async function post<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  // Merge external signal if provided
  signal?.addEventListener('abort', () => controller.abort());

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(err.error || 'Request failed');
    }
    return res.json();
  } catch (err: any) {
    if (err.name === 'AbortError') throw new Error('Request timed out. Please try again.');
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export const getInterviewFeedback = async (
  question: string,
  answer: string,
  language?: string,
  signal?: AbortSignal
): Promise<StarFeedback> => {
  try {
    return await post<StarFeedback>('/api/interview-feedback', { question, answer, language }, signal);
  } catch (error: any) {
    console.error('Error getting interview feedback:', error.message);
    throw new Error(error.message || 'Failed to get feedback from AI. Please try again.');
  }
};

export const getImprovementSuggestion = async (
  question: string,
  answer: string,
  componentToImprove: 'Situation' | 'Task' | 'Action' | 'Result',
  language?: string,
  signal?: AbortSignal
): Promise<{ suggestion: string }> => {
  try {
    return await post<{ suggestion: string }>('/api/improvement-suggestion', {
      question,
      answer,
      componentToImprove,
      language,
    }, signal);
  } catch (error: any) {
    console.error(`Error getting improvement suggestion for ${componentToImprove}:`, error.message);
    return { suggestion: 'Could not generate a suggestion at this time. Please try again.' };
  }
};

export const cleanInterviewQuestion = async (
  question: string,
  signal?: AbortSignal
): Promise<{ cleanedQuestion: string; score: number; reasoning: string }> => {
  try {
    return await post<{ cleanedQuestion: string; score: number; reasoning: string }>(
      '/api/clean-question',
      { question },
      signal
    );
  } catch (error: any) {
    console.error('Error cleaning interview question:', error.message);
    throw new Error(error.message || 'Failed to clean question with AI. Please try again.');
  }
};

export const getStoryFeedback = async (
  userSelections: Record<number, string[]>,
  story: any,
  language: string,
  signal?: AbortSignal
): Promise<{ feedback: string }> => {
  try {
    return await post<{ feedback: string }>('/api/story-feedback', {
      userSelections,
      story,
      language,
    }, signal);
  } catch (error: any) {
    console.error('Error getting story feedback:', error.message);
    return { feedback: '' };
  }
};
