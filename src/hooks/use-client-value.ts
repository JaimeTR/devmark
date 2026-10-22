import { useSyncExternalStore } from 'react';

const subscribeNoop = () => () => {};

/**
 * Valor que solo existe en el navegador (zona horaria, historial, idioma...).
 * En el servidor y durante la hidratacion devuelve `serverValue`, asi el HTML
 * coincide; despues toma el valor real sin un setState dentro de un efecto.
 */
export function useClientValue<T>(getClientValue: () => T, serverValue: T): T {
  return useSyncExternalStore(subscribeNoop, getClientValue, () => serverValue);
}
