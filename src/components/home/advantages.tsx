'use client';

import { Globe, Compass, Layers, Sparkles } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
}

interface Client {
  name: string;
  icon: string;
}

interface AdvantagesProps {
  badge: string;
  title: string;
  description: string;
  stats: readonly Stat[];
  clients: readonly Client[];
}

export function Advantages({ badge, title, description, stats, clients }: AdvantagesProps) {
  return (
    <div className="pt-16 md:pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase">{badge}</span>
            <h2 className="font-semibold text-4xl sm:text-5xl text-brand-navy leading-snug">
              {title}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {description}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="relative p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-white group bg-brand-navy rounded-3xl">
              
              <div className="absolute top-0 left-0 w-64 h-64 bg-brand-blue/15 rounded-full blur-[80px] z-0 pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-slate-300 text-xs uppercase tracking-wider font-semibold">{stat.label}</span>
                    <h3 className="font-extrabold text-4xl sm:text-5xl text-brand-lavender">{stat.value}</h3>
                  </div>
                ))}
              </div>

              <div className="w-full md:w-auto relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-4 shrink-0">
                <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Stack tecnológico</span>
                <div className="grid grid-cols-2 gap-4">
                  {clients.map((client) => (
                    <div 
                      key={client.name}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <span className="w-4 h-4 text-brand-lavender">
                        {client.icon === 'Globe' && <Globe className="w-4 h-4" />}
                        {client.icon === 'Compass' && <Compass className="w-4 h-4" />}
                        {client.icon === 'Layers' && <Layers className="w-4 h-4" />}
                        {client.icon === 'Sparkles' && <Sparkles className="w-4 h-4" />}
                      </span>
                      <span className="text-xs font-semibold text-white">{client.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
