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
  responsibleName: z.string().describe('Name of the person requesting the quote.'),
  companyName: z.string().optional().describe('Company or business name, if any.'),
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
  projectTypeOther: z.string().optional().describe('Free-text description when projectType is "other".'),
  features: z
    .array(z.string())
    .describe('A list of key features the project should include.'),
  design: z
    .enum(['no-design', 'have-idea', 'have-design'])
    .describe('The current status of the project design.'),
  timeline: z
    .enum(['urgent', '1-2-months', 'flexible'])
    .describe('How soon the client needs the project delivered.'),
  currency: z
    .enum(['PEN', 'USD', 'other'])
    .describe('The currency the client wants the quote in.'),
  currencyOther: z.string().optional().describe('Free-text currency name when currency is "other".'),
  additionalInfo: z.string().optional().describe('Any other relevant information about the project.'),
  contactEmail: z.string().email().describe('The contact email for the client.'),
  lang: z.enum(['es', 'en']).describe('The language for the response.'),
});
export type QuoteProjectInput = z.infer<typeof QuoteProjectInputSchema>;

const QuoteItemSchema = z.object({
  title: z.string().describe('Short name of this deliverable (e.g. "Diseño UI/UX").'),
  description: z.string().describe('What this deliverable includes / its scope.'),
  price: z.string().describe('Estimated cost of this single item (e.g. "S/ 800").'),
});
export type QuoteItem = z.infer<typeof QuoteItemSchema>;

const QuoteProjectOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the project proposal.'),
  items: z.array(QuoteItemSchema).describe('Itemized deliverables: title, description/scope and individual price for each.'),
  price: z.string().describe('The estimated total price in USD (e.g., "$1,500 - $2,500 USD").'),
  recommendations: z.string().describe('AI-powered recommendations for the project.'),
  paymentMethods: z.string().describe('A summary of the accepted payment methods.'),
});
export type QuoteProjectOutput = z.infer<typeof QuoteProjectOutputSchema>;

const QUOTE_PROMPT = `You are an expert project manager at a web development agency called DEVMARK. Your task is to generate a project proposal based on the client's requirements.

The response must be in the language specified by the 'lang' parameter (es or en).
You MUST respond with a valid JSON object matching exactly this schema:
{
  "summary": "string - A brief summary of the project proposal",
  "items": [
    { "title": "string - short deliverable name", "description": "string - what it includes / its scope", "price": "string - cost of this single item, in the client's requested currency, e.g. \\"S/ 800\\" or \\"$240\\"" }
  ],
  "price": "string - The estimated total price range, in the client's requested currency, e.g. \\"S/ 3,500 - S/ 6,000\\" or \\"$1,050 - $1,780\\"",
  "recommendations": "string - AI-powered recommendations for the project",
  "paymentMethods": "string - A summary of the accepted payment methods"
}

The client has provided the following information:
- Responsible Name: {{responsibleName}}
- Company: {{companyName}}
- Project Name: {{projectName}}
- Project Type: {{projectType}}
- Key Features: {{features}}
- Design Status: {{design}}
- Desired Timeline: {{timeline}}
- Requested Currency: {{currency}}
- Additional Information: {{additionalInfo}}
- Contact Email: {{contactEmail}}
- Language: {{lang}}

PRICING RULES (follow exactly, this is the most important part):
- The base prices below are ALWAYS in PEN (Peruvian soles, "S/"), matching the real prices listed on DEVMARK's own services page. Use them as the ground truth: Landing Page (S/ 1,200 - S/ 2,500), Corporate Website (S/ 2,500 - S/ 4,000), E-commerce (S/ 3,200 - S/ 6,000), Custom Software (S/ 3,000 - S/ 6,500+). Add costs for extra features like user accounts (+S/ 800), payment integration (+S/ 1,200), admin dashboard (+S/ 1,500), AI chatbot (+S/ 1,800). A full design service adds 30% to the total.
- Compute the total and EVERY item price in PEN first using that table.
- Then convert to the client's Requested Currency using the exchange rate 1 USD = S/ 3.37 (official reference rate, August 2026):
  - If Requested Currency is "PEN": keep everything in soles, format as "S/ 1,200" etc.
  - If Requested Currency is "USD": convert every number using that rate, format as "$355" etc. (no PEN symbols anywhere).
  - If Requested Currency is "other": convert to USD as above, and add a short note in the recommendations that the amount is shown in USD and should be confirmed in their local currency.
- CRITICAL: the "price" field and every single item's "price" field MUST use the exact same currency symbol. Never mix "S/" and "$" in the same response.

Based on this, generate the following in the specified language:
1.  **Summary**: Write a brief, friendly summary of the project, addressing the client by their responsible name (and mentioning their company if provided).
2.  **Items**: Break the project down into 3-6 concrete deliverables (e.g. "Diseño UI/UX", "Desarrollo frontend", "Integración de pagos", "Panel de administración"). For each one give a short title, a 1-2 sentence description of its scope, and an individual price following the PRICING RULES above. The sum of all item prices must equal the total in "price".
3.  **Price**: The estimated total price range, following the PRICING RULES above.
4.  **Recommendations**: Provide a paragraph with AI-powered recommendations to improve the project. Suggest technologies, features, or strategies. If the timeline is 'urgent', briefly note that a rush timeline may need a small priority fee and set realistic expectations; if 'flexible', you can mention it allows a more thorough process.
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

  const projectTypeText = input.projectType === 'other' && input.projectTypeOther
    ? `Other: ${input.projectTypeOther}`
    : input.projectType;
  const currencyText = input.currency === 'other' && input.currencyOther
    ? `Other (${input.currencyOther}) — convert from the USD reference amount`
    : input.currency;

  const userContent = QUOTE_PROMPT
    .replace('{{responsibleName}}', input.responsibleName)
    .replace('{{companyName}}', input.companyName ?? '(sin empresa)')
    .replace('{{projectName}}', input.projectName)
    .replace('{{projectType}}', projectTypeText)
    .replace('{{features}}', input.features.join(', '))
    .replace('{{design}}', input.design)
    .replace('{{timeline}}', input.timeline)
    .replace('{{currency}}', currencyText)
    .replace('{{additionalInfo}}', input.additionalInfo ?? '(sin información adicional)')
    .replace('{{contactEmail}}', input.contactEmail)
    .replace('{{lang}}', input.lang);

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      { role: 'system', content: 'You are an expert project manager at DEVMARK. Respond only with valid JSON.' },
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