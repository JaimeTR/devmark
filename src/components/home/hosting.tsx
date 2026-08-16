
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { LiquidGroup, LiquidCard } from '@/components/liquid/LiquidGroup';

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
      <section id="hosting" className="py-16 md:py-24">
           <Card className="bg-brand-light rounded-3xl border border-slate-100 shadow-sm animate-fade-in-up">
              <CardHeader className="items-center text-center">
                  <Image src="/hostinger-logo.svg" alt="Hostinger" width={147} height={30} className="h-6 w-auto mb-4 animate-fade-in-up" />
                  <Badge variant="outline" className="mb-4 text-brand-navy border-brand-lavender bg-brand-lavender/50 text-xs font-extrabold tracking-widest uppercase animate-fade-in-up">{props.badge}</Badge>
                  <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight pt-4 text-brand-navy animate-fade-in-up stagger-1">{props.title}</h2>
                  <CardDescription className="max-w-2xl text-slate-600 leading-relaxed animate-fade-in-up stagger-2">{props.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-slate-600 animate-fade-in-up stagger-3">
                      {props.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                      </li>
                      ))}
                  </ul>
                  <div className="text-center space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button asChild className="w-full sm:w-auto btn-gradient text-white rounded-full font-semibold shadow-lg shadow-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/30 hover:-translate-y-1 transition-all duration-300">
                          <Link href={props.referralLink} target="_blank" rel="noopener noreferrer">
                              <Ticket className="mr-2 h-4 w-4" />
                              {props.ctaButton}
                          </Link>
                      </Button>
                      <LiquidGroup
                        k={isCopied ? 26 : 6}
                        cardRadius={20}
                        cell={4}
                        smooth={2}
                        fill={isCopied ? '#22C55E' : '#EFF3FE'}
                        className="h-11 w-[228px] transition-[filter] duration-300"
                        style={{ filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.06))' }}
                      >
                        <LiquidCard id="code" x={0} y={4} w={168} h={32} radius={16}>
                          <div className={`flex h-full w-full items-center gap-2 pl-4 transition-colors duration-300 ${isCopied ? 'text-white' : ''}`}>
                            <span className={`font-extrabold ${isCopied ? 'text-white' : 'text-brand-blue'}`}>{props.couponCode}</span>
                            <span className={isCopied ? 'text-white/80 text-sm' : 'text-sm text-slate-500'}>{`(${props.discountText})`}</span>
                          </div>
                        </LiquidCard>
                        <LiquidCard id="copy" x={184} y={0} w={40} h={40} radius={20}>
                          <button
                            onClick={handleCopy}
                            className="flex h-full w-full items-center justify-center"
                            aria-label={isCopied ? props.copiedButton : props.copyButton}
                          >
                            {isCopied ? (
                              <Check className="h-4 w-4 text-white" />
                            ) : (
                              <Copy className="h-4 w-4 text-brand-navy" />
                            )}
                          </button>
                        </LiquidCard>
                      </LiquidGroup>
                    </div>
                    <p className="text-sm text-slate-500 mt-4">{isCopied ? props.copiedButton : props.guaranteeText}</p>
                  </div>
              </CardContent>
          </Card>
      </section>
  )
}
