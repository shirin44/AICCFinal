import type { StarFeedback } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const getInterviewFeedback = async (
  question: string,
  answer: string
): Promise<StarFeedback> => {
  try {
    return await post<StarFeedback>('/api/interview-feedback', { question, answer });
  } catch (error) {
    console.error('Error getting interview feedback:', error);
    throw new Error('Failed to get feedback from AI. Please try again.');
  }
};

export const getImprovementSuggestion = async (
  question: string,
  answer: string,
  componentToImprove: 'Situation' | 'Task' | 'Action' | 'Result'
): Promise<{ suggestion: string }> => {
  try {
    return await post<{ suggestion: string }>('/api/improvement-suggestion', {
      question,
      answer,
      componentToImprove,
    });
  } catch (error) {
    console.error(`Error getting improvement suggestion for ${componentToImprove}:`, error);
    return { suggestion: 'Could not generate a suggestion at this time. Please try again.' };
  }
};

export const cleanInterviewQuestion = async (
  question: string
): Promise<{ cleanedQuestion: string; score: number; reasoning: string }> => {
  try {
    return await post<{ cleanedQuestion: string; score: number; reasoning: string }>(
      '/api/clean-question',
      { question }
    );
  } catch (error) {
    console.error('Error cleaning interview question:', error);
    throw new Error('Failed to clean question with AI. Please try again.');
  }
};

export const getStoryFeedback = async (
  userSelections: Record<number, string[]>,
  story: any,
  language: string
): Promise<{ feedback: string }> => {
  try {
    return await post<{ feedback: string }>('/api/story-feedback', {
      userSelections,
      story,
      language,
    });
  } catch (error) {
    console.error('Error getting story feedback:', error);
    return { feedback: '' };
  }
};
