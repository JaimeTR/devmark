

'use client';

import {useMemo, useState} from 'react';
import { useClientValue } from '@/hooks/use-client-value';
import {loadStripe} from '@stripe/stripe-js/pure';
import {usePathname} from 'next/navigation';
import {CheckCircle, Star} from 'lucide-react';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import {createCheckoutSession} from '@/app/actions/stripe';
import {cn} from '@/lib/utils';
import {
  convertPenToCurrency,
  convertUsdToPen,
  detectCurrency,
  formatCurrency,
  type CurrencyCode,
} from '@/lib/currency';

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Stripe.js se descarga solo al pagar y solo si hay clave: cargarlo al abrir la
// pagina fallaba en cada visita (sin clave o bloqueado) y pesaba sin usarse.
let stripePromise: ReturnType<typeof loadStripe> | null = null;
function getStripe() {
  if (!STRIPE_KEY) return null;
  stripePromise ??= loadStripe(STRIPE_KEY);
  return stripePromise;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  priceId: string;
  pricePen?: number;
  priceUsd?: number;
  period?: string;
  recommended?: boolean;
}

interface PricingProps {
  title: string;
  subtitle: string;
  plans: Plan[];
  lang?: 'es' | 'en';
  baseCurrency?: CurrencyCode;
  whatsappNumber?: string;
}

function parsePrice(raw?: string): number | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[^0-9.,-]/g, '');
  const match = cleaned.match(/-?\d+(?:[.,]\d+)?/);
  if (!match) return null;
  const normalized = match[0].replace(',', '.');
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : null;
}

export function Pricing({title, subtitle, plans, lang, baseCurrency = 'PEN', whatsappNumber = '+51975646074'}: PricingProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState<string | null>(null);

  const inferredLang = useMemo<'es' | 'en'>(() => {
    if (lang) return lang;
    if (pathname?.startsWith('/en')) return 'en';
    return 'es';
  }, [lang, pathname]);

  // La moneda depende del navegador (zona horaria e idioma): en el servidor se
  // usa la del idioma de la pagina y al hidratar se ajusta.
  const currency = useClientValue<CurrencyCode>(
    () => detectCurrency(inferredLang),
    inferredLang === 'es' ? 'PEN' : 'USD',
  );

  const openWhatsApp = (plan: Plan, priceLabel: string) => {
    const number = whatsappNumber.replace(/[^0-9]/g, '');
    const messageEs = `Hola, quiero cotizar el servicio "${title}" en el plan "${plan.name}". Precio mostrado: ${priceLabel}. Detalles: ${plan.description}`;
    const messageEn = `Hi, I want to get a quote for the service "${title}" - plan "${plan.name}". Shown price: ${priceLabel}. Details: ${plan.description}`;
    const message = inferredLang === 'es' ? messageEs : messageEn;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCheckout = async (plan: Plan, priceLabel: string) => {
    const hasValidStripe = Boolean(STRIPE_KEY) && plan.priceId && !plan.priceId.includes('...');
    if (!hasValidStripe) {
      openWhatsApp(plan, priceLabel);
      return;
    }

    setLoading(plan.priceId || null);
    try {
      const {sessionId} = await createCheckoutSession(plan.priceId);
      const stripe = await getStripe();
      if (stripe) {
        await stripe.redirectToCheckout({sessionId});
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      openWhatsApp(plan, priceLabel);
    } finally {
      setLoading(null);
    }
  };

  const resolvePriceLabel = (plan: Plan) => {
    const parsedFromString = parsePrice(plan.price);
    const penAmount = (() => {
      if (typeof plan.pricePen === 'number') return plan.pricePen;
      if (typeof plan.priceUsd === 'number') return convertUsdToPen(plan.priceUsd);
      if (parsedFromString === null) return null;
      if (baseCurrency === 'USD') return convertUsdToPen(parsedFromString);
      return parsedFromString;
    })();

    if (penAmount === null) return plan.price;
    const converted = convertPenToCurrency(penAmount, currency);
    const prefix = inferredLang === 'es' ? 'Desde ' : 'From ';
    const formatted = formatCurrency(converted, currency);
    const suffix = plan.period ? ` ${plan.period}` : '';
    return `${prefix}${formatted}${suffix}`;
  };

  const currencyLabel: Record<CurrencyCode, {es: string; en: string}> = {
    PEN: {es: 'soles (PEN)', en: 'soles (PEN)'},
    USD: {es: 'dólares (USD)', en: 'US dollars (USD)'},
    EUR: {es: 'euros (EUR)', en: 'euros (EUR)'},
    MXN: {es: 'pesos mexicanos (MXN)', en: 'Mexican pesos (MXN)'},
    COP: {es: 'pesos colombianos (COP)', en: 'Colombian pesos (COP)'},
    CLP: {es: 'pesos chilenos (CLP)', en: 'Chilean pesos (CLP)'},
    ARS: {es: 'pesos argentinos (ARS)', en: 'Argentine pesos (ARS)'},
    VES: {es: 'bolívares (VES)', en: 'bolívares (VES)'},
    BOB: {es: 'bolivianos (BOB)', en: 'bolivianos (BOB)'},
  };

  const currencyNote = inferredLang === 'es'
    ? `Mostramos precios en ${currencyLabel[currency]?.es ?? currency} según tu idioma o región. Base de cálculo: soles (PEN).`
    : `Showing prices in ${currencyLabel[currency]?.en ?? currency} based on your language or region. Base currency: soles (PEN).`;

  return (
    <section id="pricing" className="panel-paper py-20 sm:py-28">
      <div className="panel-inner">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="headline reveal text-[clamp(2rem,4.2vw,3.5rem)]">{title}</h2>
          <div className="reveal">
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink/70">{subtitle}</p>
            <p className="mt-2 text-sm text-ink/50">{currencyNote}</p>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 items-stretch gap-3 md:grid-cols-3">
          {plans.map((plan, index) => {
            const featured = index === 1;
            const priceLabel = resolvePriceLabel(plan);
            const busy = loading === plan.priceId && !!plan.priceId;
            return (
              <div
                key={plan.name}
                className={cn('reveal flex flex-col rounded-2xl p-7', featured ? 'bg-ink text-white' : 'bg-mist text-ink')}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="headline text-2xl">{plan.name}</h3>
                  {(plan.recommended || featured) && (
                    <span className="chip glass-dark py-1 pl-1.5 text-xs text-white">
                      <span className="chip-tile h-6 w-6 bg-white/10">
                        <Star className="h-3 w-3 fill-current" />
                      </span>
                      {inferredLang === 'es' ? 'Recomendado' : 'Recommended'}
                    </span>
                  )}
                </div>
                <p className="headline mt-6 text-[clamp(2rem,3.4vw,2.75rem)] tabular-nums">{priceLabel}</p>
                <p className={cn('mt-3 text-[15px] leading-relaxed', featured ? 'text-ink-muted' : 'text-ink/65')}>{plan.description}</p>
                <ul className={cn('mt-6 space-y-3 border-t pt-6', featured ? 'border-white/10' : 'border-ink/10')}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[15px]">
                      <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded', featured ? 'bg-white/10 text-periwinkle' : 'bg-white text-ink')}>
                        <CheckCircle className="h-3.5 w-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handleCheckout(plan, priceLabel)}
                  disabled={busy}
                  className={cn('mt-auto w-full disabled:opacity-60', featured ? 'btn-light' : 'btn-ink', 'mt-8')}
                >
                  <span className="btn-tile">
                    <WhatsAppIcon />
                  </span>
                  {busy ? (inferredLang === 'es' ? 'Redirigiendo…' : 'Redirecting…') : plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
