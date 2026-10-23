'use server';

import {createCheckoutSession as createCheckoutSessionFlow} from '@/ai/flows/create-checkout-session';

// Solo se cobran los precios de Stripe que DEVMARK publica: la accion la puede
// llamar cualquiera desde el navegador, asi que el priceId no se acepta a ciegas.
// Lista separada por comas en STRIPE_ALLOWED_PRICE_IDS (vacia = Stripe apagado).
function preciosPermitidos(): Set<string> {
  return new Set(
    (process.env.STRIPE_ALLOWED_PRICE_IDS || '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean),
  );
}

export async function createCheckoutSession(priceId: string) {
  if (typeof priceId !== 'string' || !preciosPermitidos().has(priceId)) {
    throw new Error('Precio no disponible');
  }
  const session = await createCheckoutSessionFlow(priceId);
  return session;
}
