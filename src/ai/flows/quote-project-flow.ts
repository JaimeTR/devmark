// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview An AI agent that generates project proposals and quotes using Groq.
 *
 * - quoteProject - A function that generates a project quote based on user input.
 * - QuoteProjectInput - The input type for the quoteProject function.
 * - QuoteProjectOutput - The return type for the quoteProject function.
 */

import { groq, GROQ_MODEL } from '@/ai/groq';
import { z } from 'zod';

const QuoteProjectInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectType: z
    .enum([
      'landing-page',
      'corporate-website',
      'ecommerce',
      'custom-software',
      'pwa',
      'other',
    ])
    .describe('The type of project.'),
  features: z
    .array(z.string())
    .describe('A list of key features the project should include.'),
  design: z
    .enum(['no-design', 'have-idea', 'have-design'])
    .describe('The current status of the project design.'),
  additionalInfo: z.string().optional().describe('Any other relevant information about the project.'),
  contactEmail: z.string().email().describe('The contact email for the client.'),
  lang: z.enum(['es', 'en']).describe('The language for the response.'),
});
export type QuoteProjectInput = z.infer<typeof QuoteProjectInputSchema>;

const QuoteProjectOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the project proposal.'),
  scope: z.array(z.string()).describe('A list of the main deliverables and scope of the project.'),
  price: z.string().describe('The estimated total price in USD (e.g., "$1,500 - $2,500 USD").'),
  recommendations: z.string().describe('AI-powered recommendations for the project.'),
  paymentMethods: z.string().describe('A summary of the accepted payment methods.'),
});
export type QuoteProjectOutput = z.infer<typeof QuoteProjectOutputSchema>;

const QUOTE_PROMPT = `You are an expert project manager at a web development agency called DevMark. Your task is to generate a project proposal based on the client's requirements.

The response must be in the language specified by the 'lang' parameter (es or en).
You MUST respond with a valid JSON object matching exactly this schema:
{
  "summary": "string - A brief summary of the project proposal",
  "scope": ["string - A list of the main deliverables and scope of the project"],
  "price": "string - The estimated total price in USD (e.g., \\"$1,500 - $2,500 USD\\")",
  "recommendations": "string - AI-powered recommendations for the project",
  "paymentMethods": "string - A summary of the accepted payment methods"
}

The client has provided the following information:
- Project Name: {{projectName}}
- Project Type: {{projectType}}
- Key Features: {{features}}
- Design Status: {{design}}
- Additional Information: {{additionalInfo}}
- Contact Email: {{contactEmail}}
- Language: {{lang}}

Based on this, generate the following in the specified language:
1.  **Summary**: Write a brief, friendly summary of the project.
2.  **Scope**: Create a bulleted list of the main deliverables. Be specific.
3.  **Price**: Provide an estimated price range in USD (or PEN if the client is from Peru). The price should be realistic based on the complexity. Use the following as a base (in PEN / equivalent USD using ~3.39 PEN = 1 USD): Landing Page (S/ 1,200 - S/ 2,500), Corporate Website (S/ 2,500 - S/ 4,000), E-commerce (S/ 3,200 - S/ 6,000), Custom Software (S/ 3,000 - S/ 6,500+). Add costs for extra features like user accounts (+S/ 800), payment integration (+S/ 1,200), admin dashboard (+S/ 1,500), AI chatbot (+S/ 1,800). A full design service adds 30% to the total.
4.  **Recommendations**: Provide a paragraph with AI-powered recommendations to improve the project. Suggest technologies, features, or strategies.
5.  **Payment Methods**: List the accepted payment methods. Be friendly and clear.

If lang is 'es', use these payment methods:
- Para Perú: PLIN, YAPE, Tarjeta de Crédito/Débito.
- Para clientes internacionales: PayPal, Payoneer, Mercado Pago.
- También aceptamos criptomonedas.

If lang is 'en', use these payment methods:
- For Peru: PLIN, YAPE, Credit/Debit Card.
- For international clients: PayPal, Payoneer, Mercado Pago.
- We also accept cryptocurrencies.

Output ONLY the JSON object, no markdown, no extra text.`;

export async function quoteProject(
  input: QuoteProjectInput
): Promise<QuoteProjectOutput> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('xxxxx')) {
    throw new Error('GROQ_API_KEY no configurada. Por favor configura tu API key de Groq en .env.local');
  }

  const userContent = QUOTE_PROMPT
    .replace('{{projectName}}', input.projectName)
    .replace('{{projectType}}', input.projectType)
    .replace('{{features}}', input.features.join(', '))
    .replace('{{design}}', input.design)
    .replace('{{additionalInfo}}', input.additionalInfo ?? '(sin información adicional)')
    .replace('{{contactEmail}}', input.contactEmail)
    .replace('{{lang}}', input.lang);

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      { role: 'system', content: 'You are an expert project manager at DevMark. Respond only with valid JSON.' },
      { role: 'user', content: userContent },
    ],
    temperature: 0.7,
    max_tokens: 1024,
    response_format: { type: 'json_object' },
  });

  const raw = completion.choices?.[0]?.message?.content?.trim();
  if (!raw) {
    throw new Error('Groq devolvió una respuesta vacía en el cotizador');
  }

  const parsed = QuoteProjectOutputSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    // Intenta extraer JSON embebido si el modelo devolvió texto extra
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const retry = QuoteProjectOutputSchema.safeParse(JSON.parse(jsonMatch[0]));
      if (retry.success) return retry.data;
    }
    throw new Error('La respuesta de Groq no cumplió el esquema de cotización');
  }

  return parsed.data;
}