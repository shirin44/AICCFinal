import { useEffect, useState } from "react";

export type SavedQuestion = { q: string; savedAt: number };

const SAVED_KEY = "np_saved_questions_v1";

const loadSavedQuestions = (): SavedQuestion[] => {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveQuestion = (q: string) => {
  const cur = loadSavedQuestions();
  if (!cur.find((x) => x.q === q)) {
    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify([{ q, savedAt: Date.now() }, ...cur].slice(0, 50))
    );
  }
};

const removeSavedQuestion = (q: string) => {
  const cur = loadSavedQuestions().filter((x) => x.q !== q);
  localStorage.setItem(SAVED_KEY, JSON.stringify(cur));
};

const isQuestionSaved = (q: string, list: SavedQuestion[]) => list.some((x) => x.q === q);

export function useSavedQuestions() {
  const [saved, setSaved] = useState<SavedQuestion[]>([]);

  useEffect(() => {
    setSaved(loadSavedQuestions());
  }, []);

  const toggle = (q: string) => {
    if (!q) return;
    if (isQuestionSaved(q, saved)) {
      removeSavedQuestion(q);
    } else {
      saveQuestion(q);
    }
    setSaved(loadSavedQuestions());
  };

  const remove = (q: string) => {
    removeSavedQuestion(q);
    setSaved(loadSavedQuestions());
  };

  return {
    saved,
    isSaved: (q: string) => isQuestionSaved(q, saved),
    toggle,
    remove,
  };
}
