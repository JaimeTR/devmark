
'use client';

import {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {CheckCircle, XCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {createCheckoutSession} from '@/app/actions/stripe';
import {cn} from '@/lib/utils';

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
}

interface PricingProps {
  title: string;
  subtitle: string;
  plans: Plan[];
}

export function Pricing({title, subtitle, plans}: PricingProps) {
  const [loading, setLoading] = useState('');

  const handleCheckout = async (priceId: string) => {
    if (!priceId) {
      document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
      return;
    }
    setLoading(priceId);
    try {
      const {sessionId} = await createCheckoutSession(priceId);
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({sessionId});
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading('');
    }
  };

  return (
    <section id="pricing" className="py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
          {title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={cn(
              'flex flex-col bg-primary/5 backdrop-blur-sm border-primary/10 transition-all duration-300',
              index === 1 ? 'border-primary/50 shadow-2xl' : ''
            )}
          >
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-4xl font-bold text-primary">{plan.price}</CardDescription>
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
                  onClick={() => handleCheckout(plan.priceId)}
                  disabled={loading === plan.priceId}
                  className={cn(
                    'w-full btn-gradient text-white',
                    index !== 1 && 'bg-primary/50'
                  )}
                >
                  {loading === plan.priceId ? 'Redirecting...' : plan.buttonText}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
