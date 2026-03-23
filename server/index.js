import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from '@google/genai';

// Load .env from the project root (one level up from server/)
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
}));
app.use(express.json());

// POST /api/interview-feedback
app.post('/api/interview-feedback', async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) return res.status(400).json({ error: 'question and answer are required' });

  try {
    const prompt = `
You are a supportive interview coach. Analyze the candidate's answer using STAR (Situation, Task, Action, Result).

QUESTION: "${question}"
CANDIDATE ANSWER: "${answer}"

Tone guidelines:
- Be specific, kind, and practical. Use plain, simple English.
- Prefer gentle suggestions like "Consider..." or "Try..." instead of "You should...".
- Frame feedback constructively (e.g., "could be clearer", "can be strengthened by…").
- The candidate is a high-functioning autistic person, so keep feedback encouraging, concise, and not overwhelming. Also dont expect too much.

Output format (JSON only):
- For each STAR element: { score 1–5, feedback (2–4 supportive sentences), strengths (2 short bullet points) }.
- Overall: { score 1–5, feedback (1–2 sentence encouraging summary), strengths (2–4 short bullets), revisedAnswer (5–7 sentence STAR rewrite that is supportive, concise, and easy to follow) }.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            situation: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, feedback: { type: Type.STRING }, strengths: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ['score', 'feedback'] },
            task: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, feedback: { type: Type.STRING }, strengths: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ['score', 'feedback'] },
            action: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, feedback: { type: Type.STRING }, strengths: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ['score', 'feedback'] },
            result: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, feedback: { type: Type.STRING }, strengths: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ['score', 'feedback'] },
            overall: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, feedback: { type: Type.STRING }, strengths: { type: Type.ARRAY, items: { type: Type.STRING } }, revisedAnswer: { type: Type.STRING } }, required: ['score', 'feedback', 'strengths', 'revisedAnswer'] }
          },
          required: ['situation', 'task', 'action', 'result', 'overall']
        }
      }
    });

    res.json(JSON.parse(response.text.trim()));
  } catch (err) {
    console.error('interview-feedback error:', err);
    res.status(500).json({ error: 'Failed to get feedback from AI.' });
  }
});

// POST /api/improvement-suggestion
app.post('/api/improvement-suggestion', async (req, res) => {
  const { question, answer, componentToImprove } = req.body;
  if (!question || !answer || !componentToImprove) return res.status(400).json({ error: 'question, answer, and componentToImprove are required' });

  try {
    const prompt = `
An interview candidate was asked: "${question}"
Their answer was: "${answer}"

Their response for the "${componentToImprove}" part of the STAR method was weak.

Provide a concise, improved example for ONLY the "${componentToImprove}" part of their answer.
Keep it to 1–2 sentences and directly related to their context.
Keep the improved example human like.

Return JSON ONLY.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: { suggestion: { type: Type.STRING, description: `Improved example for the ${componentToImprove} section.` } },
          required: ['suggestion']
        }
      }
    });

    res.json(JSON.parse(response.text.trim()));
  } catch (err) {
    console.error('improvement-suggestion error:', err);
    res.json({ suggestion: 'Could not generate a suggestion at this time. Please try again.' });
  }
});

// POST /api/clean-question
app.post('/api/clean-question', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'question is required' });

  try {
    const prompt = `
Analyze this interview question for inclusivity, clarity, and anxiety triggers: "${question}"
Rewrite it to be more direct and unambiguous.
Provide:
- "cleanedQuestion" (the revised version),
- "score" (1–100 inclusivity score),
- "reasoning" (brief explanation).

Return JSON ONLY.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cleanedQuestion: { type: Type.STRING },
            score: { type: Type.INTEGER },
            reasoning: { type: Type.STRING }
          },
          required: ['cleanedQuestion', 'score', 'reasoning']
        }
      }
    });

    res.json(JSON.parse(response.text.trim()));
  } catch (err) {
    console.error('clean-question error:', err);
    res.status(500).json({ error: 'Failed to clean question with AI.' });
  }
});

// POST /api/story-feedback
app.post('/api/story-feedback', async (req, res) => {
  const { userSelections, story, language } = req.body;
  if (!userSelections || !story || !language) return res.status(400).json({ error: 'userSelections, story, and language are required' });

  try {
    const sceneSummary = story.scenes
      .map((s, idx) => {
        const choices = userSelections[idx]?.join(', ') || 'No choice';
        return `Scene: ${s.title[language]}\nUser choices: ${choices}`;
      })
      .join('\n\n');

    const prompt = `
You are a supportive mentor. A user has completed the interactive story: "${story.title[language]}".

Here are the scenes and their choices:
${sceneSummary}

Tone rules:
- Write in ${language}.
- Be kind, specific, humanlike, and encouraging.
- Recognize strengths and journey.
- Give 1–2 gentle growth tips.
- Keep it under 200 words.
- Do NOT mention "AI" or "system".
- Format feedback as plain text bullet points (using "-" or "•"), NOT HTML.
- Return JSON ONLY, matching the schema exactly.

Output schema:
{
  "feedback": "string"
}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: { feedback: { type: Type.STRING } },
          required: ['feedback']
        }
      }
    });

    const parsed = JSON.parse(response.text.trim());
    parsed.feedback = parsed.feedback
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/\n\s*\n/g, '\n')
      .trim();

    res.json(parsed);
  } catch (err) {
    console.error('story-feedback error:', err);
    res.json({ feedback: '' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Kill the existing process or set a different PORT in .env.`);
    process.exit(1);
  } else {
    throw err;
  }
});
