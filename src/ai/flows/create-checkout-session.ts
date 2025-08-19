
'use server';

import Stripe from 'stripe';
import {z} from 'zod';
import {ai} from '@/ai/genkit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export const createCheckoutSessionFlow = ai.defineFlow(
  {
    name: 'createCheckoutSessionFlow',
    inputSchema: z.string(),
    outputSchema: z.object({
      sessionId: z.string(),
    }),
  },
  async priceId => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
    });

    return {
      sessionId: session.id,
    };
  }
);

export async function createCheckoutSession(priceId: string) {
  return await createCheckoutSessionFlow(priceId);
}
