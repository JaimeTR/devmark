export type CurrencyCode =
  | 'PEN'
  | 'USD'
  | 'EUR'
  | 'MXN'
  | 'COP'
  | 'CLP'
  | 'ARS'
  | 'VES'
  | 'BOB';

const fallbackRatesFromPen: Record<CurrencyCode, number> = {
  PEN: 1,
  USD: 0.294, // 1 sol ≈ 0.294 USD (tipo de cambio 3.4; se ajusta con NEXT_PUBLIC_PEN_TO_USD_RATE)
  EUR: 0.25, // 1 sol ≈ 0.25 EUR
  MXN: 4.6,  // 1 sol ≈ 4.6 MXN
  COP: 1100, // 1 sol ≈ 1100 COP
  CLP: 250,  // 1 sol ≈ 250 CLP
  ARS: 220,  // 1 sol ≈ 220 ARS (referencial)
  VES: 9.5,  // 1 sol ≈ 9.5 VES (referencial)
  BOB: 1.9,  // 1 sol ≈ 1.9 BOB
};

const envRateKey: Partial<Record<CurrencyCode, string>> = {
  USD: 'NEXT_PUBLIC_PEN_TO_USD_RATE',
  EUR: 'NEXT_PUBLIC_PEN_TO_EUR_RATE',
  MXN: 'NEXT_PUBLIC_PEN_TO_MXN_RATE',
  COP: 'NEXT_PUBLIC_PEN_TO_COP_RATE',
  CLP: 'NEXT_PUBLIC_PEN_TO_CLP_RATE',
  ARS: 'NEXT_PUBLIC_PEN_TO_ARS_RATE',
  VES: 'NEXT_PUBLIC_PEN_TO_VES_RATE',
  BOB: 'NEXT_PUBLIC_PEN_TO_BOB_RATE',
};

function rateFromEnvOrFallback(code: CurrencyCode): number {
  const envKey = envRateKey[code];
  if (envKey) {
    const envRate = Number(process.env[envKey]);
    if (Number.isFinite(envRate) && envRate > 0) return envRate;
  }
  return fallbackRatesFromPen[code];
}

/** Solo dos monedas: soles para quien visita desde Perú, dólares para el resto. El visitante puede cambiarla a mano. */
export const SELECTABLE_CURRENCIES: CurrencyCode[] = ['PEN', 'USD'];

export function detectCurrency(preferredLang: 'es' | 'en' = 'es'): CurrencyCode {
  if (typeof navigator !== 'undefined') {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && tz.toLowerCase().includes('lima')) {
        return 'PEN';
      }
    } catch {
      // ignore
    }

    const locale = navigator.language || navigator.languages?.[0];
    const region = locale?.split('-')[1]?.toUpperCase();
    if (region) return region === 'PE' ? 'PEN' : 'USD';
  }

  return preferredLang === 'es' ? 'PEN' : 'USD';
}

/** Precio de lista: sin centavos raros al convertir (US$ 235 en vez de US$ 235.29). */
export function roundPrice(amount: number): number {
  return amount >= 100 ? Math.round(amount / 5) * 5 : Math.round(amount);
}

export function convertPenToCurrency(amountPen: number, currency: CurrencyCode): number {
  if (!Number.isFinite(amountPen)) return 0;
  const rate = rateFromEnvOrFallback(currency);
  return amountPen * rate;
}

export function convertUsdToPen(amountUsd: number): number {
  if (!Number.isFinite(amountUsd)) return 0;
  const usdRate = rateFromEnvOrFallback('USD');
  return amountUsd / usdRate;
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const localeMap: Record<CurrencyCode, string> = {
    PEN: 'es-PE',
    USD: 'en-US',
    EUR: 'es-ES',
    MXN: 'es-MX',
    COP: 'es-CO',
    CLP: 'es-CL',
    ARS: 'es-AR',
    VES: 'es-VE',
    BOB: 'es-BO',
  };

  const locale = localeMap[currency] || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
