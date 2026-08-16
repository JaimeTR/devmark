'use client';

import { useState } from 'react';
import { DraftingCompass, Megaphone, Wrench, Lightbulb, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { LiquidGroup, LiquidCard } from '@/components/liquid/LiquidGroup';

interface Service {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface AdditionalServicesProps {
  title: string;
  subtitle: string;
  items: readonly Service[];
  moreInfoButton: string;
}

const icons: Record<string, React.ReactNode> = {
  DraftingCompass: <DraftingCompass className="h-5 w-5" />,
  Megaphone: <Megaphone className="h-5 w-5" />,
  Wrench: <Wrench className="h-5 w-5" />,
  Lightbulb: <Lightbulb className="h-5 w-5" />,
};

// The index badge + arrow button fuse into one liquid blob on hover instead of
// sitting as two static, separate chips.
function MoreLink({ index }: { index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <LiquidGroup
      k={hovered ? 22 : 4}
      cardRadius={16}
      cell={4}
      smooth={2}
      fill={hovered ? 'hsl(var(--primary))' : '#ffffff'}
      className="h-9 w-[104px] transition-[filter] duration-300"
      style={{ filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.08))' }}
    >
      <LiquidCard id="index" x={0} y={6} w={56} h={24} radius={12}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`flex h-full w-full items-center justify-start pl-3 text-xs font-bold transition-colors duration-300 ${hovered ? 'text-white' : 'text-slate-400'}`}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </LiquidCard>
      <LiquidCard id="arrow" x={68} y={0} w={36} h={36} radius={18}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex h-full w-full items-center justify-center"
        >
          <ArrowRight className={`w-4 h-4 transition-all duration-300 ${hovered ? 'text-white translate-x-0.5' : 'text-brand-navy'}`} />
        </div>
      </LiquidCard>
    </LiquidGroup>
  );
}

export function AdditionalServices({ title, subtitle, items, moreInfoButton }: AdditionalServicesProps) {
  return (
    <section id="additional-services" className="py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight text-brand-navy animate-fade-in-up">{title}</h2>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed animate-fade-in-up stagger-1">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((service, index) => (
          <Link
            key={index}
            href={service.href ?? '#'}
            className="group bg-brand-light hover:bg-white p-8 rounded-3xl border border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[340px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />

            <div className="space-y-5 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                {icons[service.icon as keyof typeof icons]}
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl text-brand-navy group-hover:text-brand-blue transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-slate-200/50 pt-6">
              <span className="sr-only">{String(index + 1).padStart(2, '0')} / Services</span>
              <MoreLink index={index} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
