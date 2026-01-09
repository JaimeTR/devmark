
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy, Ticket } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface HostingProps {
  badge: string;
  title: string;
  subtitle: string;
  features: readonly string[];
  guaranteeText: string;
  ctaButton: string;
  couponCode: string;
  copyButton: string;
  copiedButton: string;
  discountText: string;
  referralLink: string;
}

export function Hosting(props: HostingProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.couponCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
      <section id="hosting" className="py-12 md:py-20">
           <Card className="bg-primary/5 backdrop-blur-sm border-primary/10 animate-fade-in-up">
              <CardHeader className="items-center text-center">
                  <Badge variant="outline" className="mb-4 text-primary border-primary/50 animate-fade-in-up">{props.badge}</Badge>
                  <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter pt-4 text-gradient animate-fade-in-up stagger-1">{props.title}</h2>
                  <CardDescription className="max-w-2xl animate-fade-in-up stagger-2">{props.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-muted-foreground animate-fade-in-up stagger-3">
                      {props.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                      </li>
                      ))}
                  </ul>
                  <div className="text-center space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button asChild className="w-full sm:w-auto btn-gradient text-white">
                          <Link href={props.referralLink} target="_blank">
                              <Ticket className="mr-2 h-4 w-4" />
                              {props.ctaButton}
                          </Link>
                      </Button>
                      <div className="flex items-center gap-2 rounded-md border border-dashed border-primary/50 p-2">
                        <span className="text-primary font-bold">{props.couponCode}</span>
                        <span className="text-sm text-muted-foreground">{`(${props.discountText})`}</span>
                        <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">{isCopied ? props.copiedButton : props.copyButton}</span>
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">{isCopied ? props.copiedButton : props.guaranteeText}</p>
                  </div>
              </CardContent>
          </Card>
      </section>
  )
}
