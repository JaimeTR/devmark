// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview An AI agent that optimizes text content for clarity, readability, and SEO using Groq.
 *
 * - optimizeContentForSeo - A function that optimizes content for SEO.
 * - OptimizeContentInput - The input type for the optimizeContentForSeo function.
 * - OptimizeContentOutput - The return type for the optimizeContentForSeo function.
 */

import { groq, GROQ_MODEL } from '@/ai/groq';
import { z } from 'zod';

const OptimizeContentInputSchema = z.object({
  content: z.string().describe('The text content to be optimized.'),
  keywords: z
    .string()
    .describe(
      'A comma-separated list of keywords relevant to the target audience.'
    ),
});
export type OptimizeContentInput = z.infer<typeof OptimizeContentInputSchema>;

const OptimizeContentOutputSchema = z.object({
  optimizedContent: z
    .string()
    .describe('The optimized text content for clarity, readability, and SEO.'),
  suggestions: z
    .string()
    .describe('Suggestions for further improvement of the content.'),
});
export type OptimizeContentOutput = z.infer<typeof OptimizeContentOutputSchema>;

const SEO_PROMPT = `You are an expert SEO optimizer. Your goal is to optimize the given text content for clarity, readability, and SEO.

You MUST respond with a valid JSON object matching exactly this schema:
{
  "optimizedContent": "string - The optimized text content for clarity, readability, and SEO",
  "suggestions": "string - Suggestions for further improvement of the content"
}

Consider the following keywords: {{keywords}}

Here is the content to be optimized:
{{content}}

Please provide the optimized content and suggestions for further improvement.
Ensure that the optimized content is clear, readable, and relevant to the provided keywords.

Output ONLY the JSON object, no markdown, no extra text.`;

export async function optimizeContentForSeo(
  input: OptimizeContentInput
): Promise<OptimizeContentOutput> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('xxxxx')) {
    throw new Error('GROQ_API_KEY no configurada. Por favor configura tu API key de Groq en .env.local');
  }

  const userContent = SEO_PROMPT
    .replace('{{keywords}}', input.keywords)
    .replace('{{content}}', input.content);

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      { role: 'system', content: 'You are an expert SEO optimizer. Respond only with valid JSON.' },
      { role: 'user', content: userContent },
    ],
    temperature: 0.5,
    max_tokens: 1024,
    response_format: { type: 'json_object' },
  });

  const raw = completion.choices?.[0]?.message?.content?.trim();
  if (!raw) {
    throw new Error('Groq devolvió una respuesta vacía en el optimizador SEO');
  }

  const parsed = OptimizeContentOutputSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const retry = OptimizeContentOutputSchema.safeParse(JSON.parse(jsonMatch[0]));
      if (retry.success) return retry.data;
    }
    throw new Error('La respuesta de Groq no cumplió el esquema SEO');
  }

  return parsed.data;
}