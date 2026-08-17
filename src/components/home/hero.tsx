
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Award, Rocket, Calendar, ChevronDown, CodeXml } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCalApi } from "@calcom/embed-react";

interface HeroProps {
  badgeMessages: readonly string[];
  title: string;
  description: string;
  servicesButton: string;
  servicesHref: string;
  contactButton: string;
  overlayItems: readonly string[];
}

// One icon per value widget, in the order overlayItems ships them.
const overlayIcons = [Award, Rocket];

export function Hero({ badgeMessages, title, description, servicesButton, servicesHref, contactButton, overlayItems }: HeroProps) {
  const [badgeIndex, setBadgeIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBadgeIndex((i) => (i + 1) % badgeMessages.length);
    }, 3500);
    return () => clearInterval(id);
  }, [badgeMessages.length]);

  const handleBookNow = async () => {
    const calLink = process.env.NEXT_PUBLIC_CAL_LINK || 'https://app.cal.com';

    try {
      const cal = await getCalApi({ namespace: '30min' });
      if (typeof cal === 'function') {
        cal('ui', {
          theme: 'light',
          layout: 'month_view',
          hideEventTypeDetails: false,
          styles: {
            branding: {
              brandColor: '#3D34BC',
            },
          },
        } as any);
        cal('modal', { calLink });
        return;
      }
    } catch (error) {
      console.warn('Cal.com could not initialize:', error);
    }

    window.open(calLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden pt-32 pb-16 lg:min-h-screen lg:pt-0 lg:pb-0">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">

        {/* Left - Text content */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          <div className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-brand-lavender/80 backdrop-blur-md text-brand-navy border border-brand-lavender/50 shadow-lg shadow-brand-blue/15 hover:bg-brand-lavender hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-blue/25 transition-all duration-300 cursor-default animate-fade-in-up">
            <CodeXml className="w-5 h-5 text-brand-blue group-hover:rotate-12 transition-transform duration-300 shrink-0" />
            <span key={badgeIndex} className="font-medium text-[11px] sm:text-sm tracking-wider uppercase animate-fade-in-up">{badgeMessages[badgeIndex]}</span>
          </div>

          <h1 className="font-medium text-4xl sm:text-6xl lg:text-7xl text-slate-950 leading-tight animate-fade-in-up stagger-1">
            {title}
            <span className="inline-block w-4 h-4 rounded-full bg-brand-blue ml-2 animate-dot-jump" />
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up stagger-2">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 animate-fade-in-up stagger-3">
            <Link href={servicesHref} className="h-[52px] px-8 rounded-2xl border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white font-semibold flex items-center gap-2.5 shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 transition-all duration-300 hover:-translate-y-1 group">
              {servicesButton}
              <Sparkles className="w-4 h-4 text-brand-lavender group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out" />
            </Link>
            <button
              type="button"
              onClick={handleBookNow}
              className="h-[52px] px-8 rounded-2xl border-2 border-brand-blue hover:border-brand-blue-darker hover:bg-transparent bg-white text-brand-blue hover:text-brand-blue-darker font-semibold flex items-center justify-center gap-2 shadow-xl shadow-brand-blue/10 hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              {contactButton}
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-all duration-300 ease-out" />
            </button>
          </div>
        </div>

        {/* Right - Illustration + floating widgets (widgets hidden on mobile, illustration stays) */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full aspect-[800/573] group">
            {/* Soft color glows behind the illustration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-lavender/40 rounded-full blur-[90px] pointer-events-none z-0" />

            {/* Illustration */}
            <Image
              src="/illustrations/programming.svg"
              alt=""
              role="presentation"
              fill
              className="object-contain drop-shadow-xl select-none p-2 sm:p-4"
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Floating glass value widgets, one per overlay item */}
            {overlayItems.map((item, i) => {
              const Icon = overlayIcons[i % overlayIcons.length];
              const position = i === 0
                ? 'top-6 right-0 sm:-right-4'
                : 'bottom-6 left-0 sm:-left-4';
              return (
                <div
                  key={i}
                  className={`hidden lg:flex animate-float-card absolute ${position} w-[62%] sm:w-[54%] items-start gap-3 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-xl shadow-brand-blue/15 z-10`}
                  style={{ animationDelay: `${i * -2.5}s` }}
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-brand-blue shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-slate-700 text-[11px] sm:text-xs leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
          
      </div>

      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5">
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-[scroll-dot_1.5s_ease-in-out_infinite]" />
        </div>
        <ChevronDown className="w-4 h-4 text-slate-300" />
      </div>
    </section>
  );
}
