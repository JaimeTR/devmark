import 'server-only';
import OpenAI from 'openai';

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('xxxxx')) {
    return null;
  }

  return new OpenAI({ apiKey });
}

export const openai = getOpenAIClient();
