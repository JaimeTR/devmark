import { useSyncExternalStore } from 'react';
import { detectCurrency, SELECTABLE_CURRENCIES, type CurrencyCode } from '@/lib/currency';

const KEY = 'devmark-currency';
const EVENT = 'devmark-currency-change';

const subscribe = (onChange: () => void) => {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
};

function stored(): CurrencyCode | null {
  try {
    const value = localStorage.getItem(KEY);
    return SELECTABLE_CURRENCIES.includes(value as CurrencyCode) ? (value as CurrencyCode) : null;
  } catch {
    return null;
  }
}

/**
 * Moneda con la que se muestran los precios: la que el visitante eligio a mano
 * (se recuerda en su navegador) o, si no eligio, la que sugiere su zona horaria
 * e idioma. En el servidor y al hidratar es la del idioma de la pagina.
 */
export function useCurrency(lang: 'es' | 'en'): CurrencyCode {
  return useSyncExternalStore(
    subscribe,
    () => stored() ?? detectCurrency(lang),
    () => (lang === 'es' ? 'PEN' : 'USD'),
  );
}

export function setCurrency(currency: CurrencyCode) {
  try {
    localStorage.setItem(KEY, currency);
  } catch {
    // sin almacenamiento: el cambio igual se aplica en esta visita
  }
  window.dispatchEvent(new Event(EVENT));
}
