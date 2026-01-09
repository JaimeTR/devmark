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
  USD: 0.27, // 1 sol ≈ 0.27 USD
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

const regionCurrencyMap: Record<string, CurrencyCode> = {
  PE: 'PEN',
  US: 'USD',
  CA: 'USD',
  AU: 'USD',
  NZ: 'USD',
  GB: 'USD',
  IE: 'EUR',
  ES: 'EUR',
  FR: 'EUR',
  DE: 'EUR',
  IT: 'EUR',
  PT: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  MX: 'MXN',
  CO: 'COP',
  CL: 'CLP',
  AR: 'ARS',
  VE: 'VES',
  BO: 'BOB',
};

function rateFromEnvOrFallback(code: CurrencyCode): number {
  const envKey = envRateKey[code];
  if (envKey) {
    const envRate = Number(process.env[envKey]);
    if (Number.isFinite(envRate) && envRate > 0) return envRate;
  }
  return fallbackRatesFromPen[code];
}

export function detectCurrency(preferredLang: 'es' | 'en' = 'es'): CurrencyCode {
  if (typeof navigator !== 'undefined') {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && tz.toLowerCase().includes('lima')) {
        return 'PEN';
      }
    } catch (_) {
      // ignore
    }

    const locale = navigator.language || navigator.languages?.[0];
    const region = locale?.split('-')[1]?.toUpperCase();
    if (region && regionCurrencyMap[region]) {
      return regionCurrencyMap[region];
    }
  }

  return preferredLang === 'es' ? 'PEN' : 'USD';
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
