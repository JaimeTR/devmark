// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview An AI agent that optimizes text content for clarity, readability, and SEO.
 *
 * - optimizeContentForSeo - A function that optimizes content for SEO.
 * - OptimizeContentInput - The input type for the optimizeContentForSeo function.
 * - OptimizeContentOutput - The return type for the optimizeContentForSeo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

export async function optimizeContentForSeo(
  input: OptimizeContentInput
): Promise<OptimizeContentOutput> {
  return optimizeContentForSeoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeContentPrompt',
  input: {schema: OptimizeContentInputSchema},
  output: {schema: OptimizeContentOutputSchema},
  prompt: `You are an expert SEO optimizer. Your goal is to optimize the given text content for clarity, readability, and SEO.

  Consider the following keywords: {{{keywords}}}

  Here is the content to be optimized:
  {{content}}

  Please provide the optimized content and suggestions for further improvement.
  Ensure that the optimized content is clear, readable, and relevant to the provided keywords.
`,
});

const optimizeContentForSeoFlow = ai.defineFlow(
  {
    name: 'optimizeContentForSeoFlow',
    inputSchema: OptimizeContentInputSchema,
    outputSchema: OptimizeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
