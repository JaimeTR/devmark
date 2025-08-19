
'use server';

import {createCheckoutSession as createCheckoutSessionFlow} from '@/ai/flows/create-checkout-session';

export async function createCheckoutSession(priceId: string) {
  const session = await createCheckoutSessionFlow(priceId);
  return session;
}
