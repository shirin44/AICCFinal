import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const FEEDBACK_MODEL = 'gpt-4o';
const UTILITY_MODEL  = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const TIMEOUT_MS = 30_000;

const openai = new OpenAI({ apiKey: process.env.API_KEY, timeout: TIMEOUT_MS });

const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
  .split(',').map(o => o.trim()).filter(Boolean);

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: ${origin} not allowed`));
  },
}));
app.use(express.json());

async function chat(systemPrompt, userContent, { model = UTILITY_MODEL, temperature = 0.5 } = {}) {
  const completion = await openai.chat.completions.create({
    model,
    temperature,
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
  const { question, answer, language } = req.body;
  if (!question || !answer) return res.status(400).json({ error: 'question and answer are required' });

  const langInstruction = language === 'vi'
    ? 'Write ALL feedback, strengths, and the revisedAnswer in Vietnamese.'
    : 'Write ALL feedback, strengths, and the revisedAnswer in English.';

  try {
    const result = await chat(
      `You are a warm, supportive interview coach helping neurodivergent job seekers (especially autistic people) build confidence.
${langInstruction}

Analyze the candidate's answer using the STAR method (Situation, Task, Action, Result).

SCORING RUBRIC (use this consistently):
- 1 = Missing or very unclear — the element is not present
- 2 = Weak — present but vague or hard to follow
- 3 = Adequate — present and understandable, but could be stronger
- 4 = Good — clear, relevant, and mostly complete
- 5 = Excellent — clear, specific, compelling, and well-structured

TONE RULES:
- Use plain, simple language. Avoid jargon.
- Be specific and kind. Lead with what they did well before suggesting improvements.
- Use gentle phrases: "Consider adding...", "Try including...", "One thing that could help..."
- Never say "you should" or "you must" — always suggest, never command.
- Keep each feedback string under 80 words.
- Keep each strength bullet under 15 words.

Return ONLY valid JSON matching this exact shape — no extra keys, no markdown:
{
  "situation": { "score": 1-5, "feedback": "string (≤80 words)", "strengths": ["string (≤15 words)", "string (≤15 words)"] },
  "task":      { "score": 1-5, "feedback": "string (≤80 words)", "strengths": ["string", "string"] },
  "action":    { "score": 1-5, "feedback": "string (≤80 words)", "strengths": ["string", "string"] },
  "result":    { "score": 1-5, "feedback": "string (≤80 words)", "strengths": ["string", "string"] },
  "overall":   { "score": 1-5, "feedback": "string (≤60 words, encouraging summary)", "strengths": ["string", "string", "string"], "revisedAnswer": "string (5-7 sentences, rewritten STAR answer in first person, warm and natural-sounding)" }
}`,
      `INTERVIEW QUESTION: "${question}"\n\nCANDIDATE'S ANSWER: "${answer}"`,
      { model: FEEDBACK_MODEL, temperature: 0.3 }
    );
    res.json(result);
  } catch (err) {
    console.error('interview-feedback error:', err?.message);
    res.status(500).json({ error: 'Failed to get feedback. Please try again.' });
  }
});

// POST /api/improvement-suggestion
app.post('/api/improvement-suggestion', async (req, res) => {
  const { question, answer, componentToImprove, language } = req.body;
  if (!question || !answer || !componentToImprove)
    return res.status(400).json({ error: 'question, answer, and componentToImprove are required' });

  const langInstruction = language === 'vi'
    ? 'Write the suggestion in Vietnamese.'
    : 'Write the suggestion in English.';

  try {
    const result = await chat(
      `You are a warm interview coach helping a neurodivergent job seeker improve one specific part of their STAR answer.
${langInstruction}

Write a 1–2 sentence example that improves only the "${componentToImprove}" part.
- Stay closely tied to the context of their original answer (same job/situation).
- Sound natural and human — not corporate or stiff.
- Be encouraging in tone.
- Do NOT rewrite the entire answer — only the ${componentToImprove} part.

Return ONLY valid JSON: { "suggestion": "string" }`,
      `Interview question: "${question}"\nCandidate's answer: "${answer}"\nImprove only the ${componentToImprove} section.`,
      { model: FEEDBACK_MODEL, temperature: 0.5 }
    );
    res.json(result);
  } catch (err) {
    console.error('improvement-suggestion error:', err?.message);
    res.json({ suggestion: 'Could not generate a suggestion right now. Please try again.' });
  }
});

// POST /api/clean-question
app.post('/api/clean-question', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'question is required' });

  try {
    const result = await chat(
      `You are an expert in inclusive hiring and neurodiversity. Analyze interview questions for clarity, inclusivity, and anxiety reduction.

SCORING RUBRIC for inclusivity (0–100):
- 0–40: Poor — vague, anxiety-inducing, or excludes neurodivergent candidates (e.g. "Where do you see yourself in 5 years?", "What's your biggest weakness?")
- 41–70: Average — somewhat clear but could be more direct or less ambiguous
- 71–90: Good — clear and reasonably inclusive, minor improvements possible
- 91–100: Excellent — specific, direct, behaviorally-focused, accessible to all candidates

REWRITE RULES:
- Replace vague phrases with specific, behavioral ones ("Tell me about a time when...")
- Remove trick questions or questions that reward social masking
- Prefer concrete over abstract
- Keep the intent of the original question
- Keep the rewritten question under 30 words

Return ONLY valid JSON: { "cleanedQuestion": "string", "score": integer 0-100, "reasoning": "string (2-3 sentences explaining the score and key changes)" }`,
      `Analyze and rewrite this interview question: "${question}"`
    );
    res.json(result);
  } catch (err) {
    console.error('clean-question error:', err?.message);
    res.status(500).json({ error: 'Failed to analyze the question. Please try again.' });
  }
});

// POST /api/story-feedback
app.post('/api/story-feedback', async (req, res) => {
  const { userSelections, story, language } = req.body;
  if (!userSelections || !story || !language)
    return res.status(400).json({ error: 'userSelections, story, and language are required' });

  try {
    const sceneSummary = story.scenes
      .map((s, idx) => {
        const title = s.title?.[language] || s.title?.en || `Scene ${idx + 1}`;
        const choices = userSelections[idx]?.join(', ') || 'No choice made';
        return `Scene ${idx + 1}: ${title}\nChoices: ${choices}`;
      })
      .join('\n\n');

    const storyTitle = story.title?.[language] || story.title?.en || 'the story';

    const result = await chat(
      `You are a warm, encouraging mentor helping a neurodivergent person reflect on what they learned from an interactive story.

Write personalised feedback in ${language === 'vi' ? 'Vietnamese' : 'English'}.

RULES:
- Open with one specific strength you noticed from their choices (be concrete, not generic)
- Acknowledge the journey and effort, not just outcomes
- Give 1–2 gentle, practical growth tips framed as possibilities ("You might try...", "One thing that could help...")
- Keep the total under 180 words
- Use plain bullet points with "-" — no HTML, no markdown headers, no bold/italic formatting
- Do NOT mention AI, this system, or that this is automated feedback
- Sound human, warm, and specific to their actual choices

Return ONLY valid JSON: { "feedback": "string" }`,
      `Story: "${storyTitle}"\n\nUser's journey:\n${sceneSummary}`
    );

    result.feedback = result.feedback
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/\*\*|__|\*|_/g, '')
      .replace(/\n\s*\n/g, '\n')
      .trim();

    res.json(result);
  } catch (err) {
    console.error('story-feedback error:', err?.message);
    res.json({ feedback: '' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT} (feedback: ${FEEDBACK_MODEL}, utility: ${UTILITY_MODEL})`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Kill the existing process or set a different PORT in .env.`);
    process.exit(1);
  } else {
    throw err;
  }
});
