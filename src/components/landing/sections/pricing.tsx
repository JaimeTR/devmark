

'use client';

import {useEffect, useMemo, useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {usePathname} from 'next/navigation';
import {CheckCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {createCheckoutSession} from '@/app/actions/stripe';
import {cn} from '@/lib/utils';
import {
  convertPenToCurrency,
  convertUsdToPen,
  detectCurrency,
  formatCurrency,
  type CurrencyCode,
} from '@/lib/currency';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  priceId: string;
  pricePen?: number;
  priceUsd?: number;
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const inferredLang = useMemo<'es' | 'en'>(() => {
    if (lang) return lang;
    if (pathname?.startsWith('/en')) return 'en';
    return 'es';
  }, [lang, pathname]);

  const [currency, setCurrency] = useState<CurrencyCode>(() => detectCurrency(inferredLang));

  useEffect(() => {
    setCurrency(detectCurrency(inferredLang));
  }, [inferredLang]);

  const openWhatsApp = (plan: Plan, priceLabel: string) => {
    const number = whatsappNumber.replace(/[^0-9]/g, '');
    const messageEs = `Hola, quiero cotizar el servicio "${title}" en el plan "${plan.name}". Precio mostrado: ${priceLabel}. Detalles: ${plan.description}`;
    const messageEn = `Hi, I want to get a quote for the service "${title}" - plan "${plan.name}". Shown price: ${priceLabel}. Details: ${plan.description}`;
    const message = inferredLang === 'es' ? messageEs : messageEn;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCheckout = async (plan: Plan, priceLabel: string) => {
    const hasValidStripe = plan.priceId && !plan.priceId.includes('...');
    if (!hasValidStripe) {
      openWhatsApp(plan, priceLabel);
      return;
    }

    setLoading(plan.priceId || null);
    try {
      const {sessionId} = await createCheckoutSession(plan.priceId);
      const stripe = await stripePromise;
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
    return formatCurrency(converted, currency);
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
    <section id="pricing" className="py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter animate-fade-in-up">
          {title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up stagger-1">{subtitle}</p>
        <p className="mt-2 text-sm text-muted-foreground animate-fade-in-up stagger-2">{currencyNote}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={cn(
              'flex flex-col bg-primary/3 backdrop-blur-sm border-primary/10 transition-all duration-300 animate-fade-in-up',
              index === 1 ? 'border-primary/50 shadow-2xl' : '',
              hoveredIndex === index && 'gradient-border-hover pricing-card-hover'
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{animationDelay: `${index * 0.15}s`}}
          >
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-4xl font-bold text-primary">{resolvePriceLabel(plan)}</CardDescription>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  onClick={() => handleCheckout(plan, resolvePriceLabel(plan))}
                  disabled={loading === plan.priceId && !!plan.priceId}
                  className={cn(
                    'w-full btn-gradient text-white',
                    index !== 1 && 'bg-primary/50'
                  )}
                >
                  {loading === plan.priceId && !!plan.priceId ? 'Redirecting...' : plan.buttonText}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
