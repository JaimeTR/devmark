import 'server-only';
import Groq from 'groq-sdk';

export function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('xxxxx')) {
    return null;
  }

  return new Groq({ apiKey });
}

export const groq = getGroqClient();
export const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';