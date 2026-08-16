import Link from 'next/link';
import { Sparkles, Target, ArrowUpRight } from 'lucide-react';

interface StrategyProps {
  headerText: string;
  headerTitle: string;
  overlayText: string;
  cardTitle: string;
  cardDescription: string;
  ctaPrimary: string;
}

export function Strategy({
  headerText,
  headerTitle,
  overlayText,
  cardTitle,
  cardDescription,
  ctaPrimary,
}: StrategyProps) {
  return (
    <section id="about" className="relative py-16 md:py-24 overflow-hidden">
      {/* Soft color glows, same motif as the hero and client-logos band */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-brand-blue/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-lavender/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-5">
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-md">
              {headerText}
            </p>
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-brand-navy leading-tight">
              {headerTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-xl shadow-brand-blue/15">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-brand-blue shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-brand-navy font-semibold leading-relaxed self-center">
              {overlayText}
            </p>
          </div>

          <div className="flex items-start gap-4 bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-xl shadow-brand-blue/15">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-brand-blue shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-brand-navy">{cardTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{cardDescription}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2.5 h-[52px] px-8 rounded-full bg-brand-lavender hover:bg-brand-blue/10 text-brand-navy font-semibold shadow-xl shadow-brand-blue/10 hover:shadow-brand-blue/20 transition-all duration-300 hover:-translate-y-1 group"
          >
            {ctaPrimary}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
