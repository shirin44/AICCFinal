export type SavedQuestion = { q: string; savedAt: number };

const SAVED_KEY = "np_saved_questions_v1";

export const loadSavedQuestions = (): SavedQuestion[] => {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveQuestion = (q: string) => {
  const cur = loadSavedQuestions();
  if (!cur.find((x) => x.q === q)) {
    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify([{ q, savedAt: Date.now() }, ...cur].slice(0, 50))
    );
  }
};

export const removeSavedQuestion = (q: string) => {
  const cur = loadSavedQuestions().filter((x) => x.q !== q);
  localStorage.setItem(SAVED_KEY, JSON.stringify(cur));
};

export const isQuestionSaved = (q: string, savedList: SavedQuestion[]) =>
  savedList.some((x) => x.q === q);
