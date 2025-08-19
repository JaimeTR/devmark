// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview An AI agent that generates project proposals and quotes.
 *
 * - quoteProject - A function that generates a project quote based on user input.
 * - QuoteProjectInput - The input type for the quoteProject function.
 * - QuoteProjectOutput - The return type for the quoteProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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


const prompt = ai.definePrompt({
  name: 'quoteProjectPrompt',
  input: {schema: QuoteProjectInputSchema},
  output: {schema: QuoteProjectOutputSchema},
  prompt: `You are an expert project manager at a web development agency called DevMark. Your task is to generate a project proposal based on the client's requirements.

The response must be in the language specified by the 'lang' parameter (es or en).

The client has provided the following information:
- Project Name: {{{projectName}}}
- Project Type: {{{projectType}}}
- Key Features: {{#each features}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Design Status: {{{design}}}
- Additional Information: {{{additionalInfo}}}
- Contact Email: {{{contactEmail}}}
- Language: {{{lang}}}

Based on this, generate the following in the specified language:
1.  **Summary**: Write a brief, friendly summary of the project.
2.  **Scope**: Create a bulleted list of the main deliverables. Be specific.
3.  **Price**: Provide an estimated price range in USD. The price should be realistic based on the complexity. Use the following as a base: Landing Page ($500), Corporate Website ($1000), E-commerce ($2000), Custom Software ($5000+). Add costs for extra features like user accounts (+$500), payment integration (+$750), admin dashboard (+$1200), AI chatbot (+$1500). A full design service adds 30% to the total.
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

Generate the response in the requested JSON format.
`,
});

const quoteProjectFlow = ai.defineFlow(
  {
    name: 'quoteProjectFlow',
    inputSchema: QuoteProjectInputSchema,
    outputSchema: QuoteProjectOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);


export async function quoteProject(
  input: QuoteProjectInput
): Promise<QuoteProjectOutput> {
  return await quoteProjectFlow(input);
}
