import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

// Load .env from the project root (one level up from server/)
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const openai = new OpenAI({ apiKey: process.env.API_KEY });

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
}));
app.use(express.json());

async function chat(systemPrompt, userContent) {
  const completion = await openai.chat.completions.create({
    model: MODEL,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ],
  });
  return JSON.parse(completion.choices[0].message.content);
}

// POST /api/interview-feedback
app.post('/api/interview-feedback', async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) return res.status(400).json({ error: 'question and answer are required' });

  try {
    const result = await chat(
      `You are a supportive interview coach. Analyze answers using the STAR method (Situation, Task, Action, Result).
Tone: specific, kind, plain English. Use gentle suggestions like "Consider..." or "Try...".
The candidate is a high-functioning autistic person — keep feedback encouraging, concise, and not overwhelming.

Return ONLY valid JSON with this exact shape:
{
  "situation": { "score": 1-5, "feedback": "string", "strengths": ["string", "string"] },
  "task":      { "score": 1-5, "feedback": "string", "strengths": ["string", "string"] },
  "action":    { "score": 1-5, "feedback": "string", "strengths": ["string", "string"] },
  "result":    { "score": 1-5, "feedback": "string", "strengths": ["string", "string"] },
  "overall":   { "score": 1-5, "feedback": "string", "strengths": ["string"], "revisedAnswer": "string" }
}`,
      `QUESTION: "${question}"\nCANDIDATE ANSWER: "${answer}"`
    );
    res.json(result);
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
    const result = await chat(
      `You are an interview coach. Return ONLY valid JSON: { "suggestion": "string" }`,
      `Interview question: "${question}"
Candidate's answer: "${answer}"
The "${componentToImprove}" part of their STAR answer was weak.
Provide a concise 1–2 sentence improved example for ONLY the ${componentToImprove} part. Keep it human and directly related to their context.`
    );
    res.json(result);
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
    const result = await chat(
      `You analyze interview questions for inclusivity and clarity. Return ONLY valid JSON:
{ "cleanedQuestion": "string", "score": 1-100, "reasoning": "string" }`,
      `Analyze this interview question for inclusivity, clarity, and anxiety triggers: "${question}"
Rewrite it to be more direct and unambiguous. Give it an inclusivity score (1–100) and a brief reasoning.`
    );
    res.json(result);
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

    const result = await chat(
      `You are a supportive mentor. Write in ${language}. Be kind, specific, and encouraging.
Recognize strengths. Give 1–2 gentle growth tips. Keep it under 200 words.
Do NOT mention "AI" or "system". Use plain text bullet points ("-" or "•"), no HTML.
Return ONLY valid JSON: { "feedback": "string" }`,
      `The user completed the interactive story: "${story.title[language]}"\n\n${sceneSummary}`
    );

    result.feedback = result.feedback
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/\n\s*\n/g, '\n')
      .trim();

    res.json(result);
  } catch (err) {
    console.error('story-feedback error:', err);
    res.json({ feedback: '' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT} (model: ${MODEL})`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Kill the existing process or set a different PORT in .env.`);
    process.exit(1);
  } else {
    throw err;
  }
});
