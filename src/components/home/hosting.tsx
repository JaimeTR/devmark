
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Copy, Ticket, Globe, ServerCog, ShieldCheck, Headset } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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

// Un ícono por widget flotante, en el orden en que llegan las features.
const widgetIcons = [Globe, ServerCog, ShieldCheck, Headset];
// Posiciones e inclinaciones dispares (no una grilla pareja) para que los
// widgets se sientan esparcidos sobre la ilustración, no alineados en cruz.
const widgetLayout = [
  { pos: 'top-[2%] left-[-6%]', rotate: '-rotate-2', width: 'w-[48%]' },
  { pos: 'top-[26%] right-[-8%]', rotate: 'rotate-3', width: 'w-[46%]' },
  { pos: 'bottom-[24%] left-[-8%]', rotate: 'rotate-2', width: 'w-[46%]' },
  { pos: 'bottom-[0%] right-[-6%]', rotate: '-rotate-3', width: 'w-[48%]' },
];

// Solo la marca "H" de Hostinger (sin el wordmark, que ya queda cubierto por
// el texto del badge), en currentColor para pintarla con nuestro color de marca.
function HostingerMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 30" fill="currentColor" className={className} role="img" aria-label="Hostinger">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.8175.798V9.5274l7.0525 4.1246V4.3928zM0 .7984V14.4969h22.9367l-6.9786-3.8357-9.0909-.0044V4.485zm17.8175 25.4719v-6.1186l-9.161-.0064-7.0944-3.8969 23.3078.1101V30zM0 17.3187V26.2703l6.8675 3.5946v-8.5192z" />
    </svg>
  );
}

export function Hosting(props: HostingProps) {
  const [isCopied, setIsCopied] = useState(false);
  const floatingFeatures = props.features.slice(0, 4);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.couponCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
      <section id="hosting" className="py-16 md:py-24">
           <Card className="relative bg-brand-light rounded-3xl border border-slate-100 shadow-sm animate-fade-in-up overflow-hidden">
              {/* Resplandores decorativos detrás de todo el card */}
              <div className="absolute -top-16 -left-16 w-72 h-72 bg-brand-blue/10 rounded-full blur-[110px] pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-brand-lavender/30 rounded-full blur-[100px] pointer-events-none" />

              <CardContent className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 sm:p-10 lg:p-14">
                {/* Izquierda: ilustración + widgets flotantes con las features */}
                <div className="relative order-2 lg:order-1">
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    <div className="absolute top-6 right-6 w-40 h-40 bg-brand-blue/15 rounded-full blur-3xl" />
                    <div className="absolute bottom-6 left-6 w-32 h-32 bg-brand-lavender/40 rounded-full blur-3xl" />

                    <div className="absolute inset-8 rounded-3xl bg-white flex items-center justify-center overflow-hidden">
                      <Image
                        src="/undraw_device-sync_d9ei.svg"
                        alt="Hosting"
                        fill
                        className="object-contain p-8"
                      />
                    </div>

                    {/* Widgets flotantes, dispares sobre la ilustración, no en cruz */}
                    {floatingFeatures.map((feature, i) => {
                      const Icon = widgetIcons[i % widgetIcons.length];
                      const { pos, rotate, width } = widgetLayout[i % widgetLayout.length];
                      return (
                        <div
                          key={i}
                          className={`hidden sm:flex absolute ${pos} ${rotate} hover:rotate-0 ${width} items-start gap-2.5 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-xl shadow-brand-blue/20 z-10 transition-transform duration-300`}
                        >
                          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-brand-blue shrink-0">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <p className="text-slate-700 text-[11px] leading-snug font-medium">
                            {feature}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Derecha: info, features, CTAs */}
                <div className="order-1 lg:order-2 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-2xl border border-brand-lavender bg-brand-lavender/50 animate-fade-in-up">
                    <HostingerMark className="h-4 w-auto text-brand-navy shrink-0" />
                    <span className="text-xs font-extrabold tracking-widest uppercase text-brand-navy">{props.badge}</span>
                  </div>
                  <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight text-brand-navy animate-fade-in-up stagger-1">{props.title}</h2>
                  <p className="mt-4 text-slate-600 leading-relaxed animate-fade-in-up stagger-2">{props.subtitle}</p>

                  <div className="mt-8 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                      <Button asChild className="w-full sm:w-auto h-[52px] border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white rounded-2xl font-semibold shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 hover:-translate-y-1 transition-all duration-300">
                          <Link href={props.referralLink} target="_blank" rel="noopener noreferrer">
                              {props.ctaButton}
                              <Ticket className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                      <div className="flex items-center gap-2.5">
                        <LiquidGroup
                          k={isCopied ? 26 : 6}
                          cardRadius={12}
                          cell={4}
                          smooth={2}
                          fill={isCopied ? '#22C55E' : '#FFFFFF'}
                          className="h-[52px] w-[184px] transition-[filter] duration-300"
                          style={{ filter: 'drop-shadow(0 1px 3px rgb(0 0 0 / 0.1))' }}
                          fillStyle={{ stroke: '#E2E8F0', strokeWidth: 1.5 }}
                        >
                          <LiquidCard id="code" x={0} y={8} w={124} h={36} radius={9}>
                            <div className={`flex h-full w-full items-center pl-4 transition-colors duration-300 ${isCopied ? 'text-white' : ''}`}>
                              <span className={`font-mono font-bold tracking-tight ${isCopied ? 'text-white' : 'text-brand-blue'}`}>
                                {props.couponCode}
                              </span>
                            </div>
                          </LiquidCard>
                          <LiquidCard id="copy" x={132} y={4} w={44} h={44} radius={11}>
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
                        <span className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${isCopied ? 'text-green-600' : 'text-slate-500'}`}>
                          {isCopied ? props.copiedButton : `(${props.discountText})`}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">{props.guaranteeText}</p>
                  </div>
                </div>
              </CardContent>
          </Card>
      </section>
  )
}
