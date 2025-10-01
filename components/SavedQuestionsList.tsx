import React from "react";

type SavedQuestion = { q: string; savedAt: number };

const SavedQuestionsList: React.FC<{
  saved: SavedQuestion[];
  onPractice: (q: string) => void;
  onRemove: (q: string) => void;
}> = ({ saved, onPractice, onRemove }) => {
  if (saved.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Saved Questions</h3>
      <div className="space-y-3">
        {saved.map(({ q, savedAt }) => (
          <div key={q} className="p-4 bg-white border border-slate-300 rounded-lg flex items-start justify-between gap-3">
            <div>
              <p className="text-slate-900">{q}</p>
              <p className="text-xs text-slate-600 mt-1">Saved {new Date(savedAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onPractice(q)}
                className="px-3 py-2 text-sm bg-slate-900 text-white rounded hover:bg-black"
              >
                Practice
              </button>
              <button
                onClick={() => onRemove(q)}
                className="px-3 py-2 text-sm bg-white border border-slate-300 text-slate-900 rounded hover:bg-slate-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedQuestionsList;
