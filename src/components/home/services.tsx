'use client';

import { useState } from 'react';
import { CodeXml, Palette, ServerCog, Zap, Bot, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { LiquidGroup, LiquidCard } from '@/components/liquid/LiquidGroup';

interface Service {
  icon: string;
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
}

interface ServicesProps {
  title: string;
  subtitle: string;
  items: readonly Service[];
  moreInfoButton: string;
}

const icons: Record<string, React.ReactNode> = {
  CodeXml: <CodeXml className="h-5 w-5" />,
  Palette: <Palette className="h-5 w-5" />,
  ServerCog: <ServerCog className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Bot: <Bot className="h-5 w-5" />,
  LineChart: <LineChart className="h-5 w-5" />,
};

// Rotating accent per card so the grid isn't a single flat color; CTAs stay brand-blue everywhere else.
const accentVars = ['--primary', '--chart-4', '--chart-2', '--chart-5', '--chart-6', '--chart-3'];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accentVar = accentVars[index % accentVars.length];
  const accentStyle = { '--accent': `var(${accentVar})` } as unknown as React.CSSProperties;

  return (
    <Link
      href={service.href}
      style={accentStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group bg-brand-light p-8 rounded-3xl border border-slate-100 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[360px] relative overflow-hidden"
    >
      {/* Gradient wash, revealed on hover only */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent))]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Soft illustration: a loose cluster of blurred blobs in the card's own accent */}
      <div className="absolute -bottom-16 -right-10 w-56 h-56 rounded-full bg-[hsl(var(--accent))]/10 blur-3xl group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500" />
      <div className="absolute -top-10 -left-8 w-36 h-36 rounded-full bg-[hsl(var(--accent))]/[0.07] blur-2xl group-hover:bg-white/[0.08] transition-all duration-500" />
      <div className="absolute top-1/3 right-6 w-20 h-20 rounded-full bg-[hsl(var(--accent))]/[0.06] blur-2xl group-hover:bg-white/[0.06] transition-all duration-500" />

      {/* Decorative corner circle */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[hsl(var(--accent))]/5 group-hover:bg-white/10 rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-all duration-500" />

      <div className="space-y-5 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[hsl(var(--accent))] group-hover:bg-white/15 group-hover:backdrop-blur-md group-hover:border-white/30 group-hover:text-white transition-all duration-300">
          {icons[service.icon]}
        </div>
        <div className="space-y-2">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-[hsl(var(--accent))]/80 group-hover:text-white group-hover:bg-white/15 group-hover:backdrop-blur-sm group-hover:px-2.5 group-hover:py-1 group-hover:rounded-full transition-all duration-300">
            {service.tags[0]}
          </span>
          <h3 className="font-semibold text-xl text-brand-navy group-hover:text-white transition-colors duration-200">
            {service.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 group-hover:text-white/85 transition-colors duration-200">
            {service.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-end border-t border-slate-200/50 group-hover:border-white/20 pt-6 transition-colors duration-300">
        <span className="sr-only">{String(index + 1).padStart(2, '0')} / Services</span>
        {/* Number + arrow fused into one liquid chip, in the card's own accent */}
        <LiquidGroup
          k={hovered ? 22 : 4}
          cardRadius={16}
          cell={4}
          smooth={2}
          fill={hovered ? 'rgba(255,255,255,0.22)' : '#ffffff'}
          className="h-9 w-[92px]"
        >
          <LiquidCard id="index" x={0} y={6} w={44} h={24} radius={12}>
            <div className={`flex h-full w-full items-center justify-center text-xs font-bold transition-colors duration-300 ${hovered ? 'text-white' : 'text-[hsl(var(--accent))]'}`}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </LiquidCard>
          <LiquidCard id="arrow" x={56} y={0} w={36} h={36} radius={18}>
            <div className="flex h-full w-full items-center justify-center">
              <ArrowRight className={`w-4 h-4 transition-all duration-300 ${hovered ? 'text-white translate-x-0.5' : 'text-brand-navy'}`} />
            </div>
          </LiquidCard>
        </LiquidGroup>
      </div>
    </Link>
  );
}

export function Services({ title, subtitle, items, moreInfoButton }: ServicesProps) {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-headline font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight text-brand-navy animate-fade-in-up">{title}</h2>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed animate-fade-in-up stagger-1">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Link
          href="/servicios"
          className="group px-8 py-4 rounded-full bg-brand-navy hover:bg-brand-navy-dark text-white font-bold flex items-center gap-2 shadow-lg transition-colors"
        >
          {moreInfoButton}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
