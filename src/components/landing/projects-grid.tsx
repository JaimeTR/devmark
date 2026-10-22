'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ProjectDetailModal } from '@/components/portfolio/project-detail-modal';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

const categoryLabels: Record<'es' | 'en', Record<string, string>> = {
  es: { webs: 'Webs', ecommerce: 'E-commerce', software: 'Software a medida', ia: 'Inteligencia artificial', automatizacion: 'Automatizaciones', landing: 'Landing pages', otros: 'Otros' },
  en: { webs: 'Websites', ecommerce: 'E-commerce', software: 'Custom software', ia: 'Artificial intelligence', automatizacion: 'Automations', landing: 'Landing pages', otros: 'Other' },
};

const categoryToProjectType: Record<string, string> = {
  webs: 'corporate-website',
  landing: 'landing-page',
  ecommerce: 'ecommerce',
  software: 'custom-software',
  ia: 'custom-software',
  automatizacion: 'custom-software',
};

/** Un proyecto grande y el resto en columna; cada tarjeta abre el detalle. */
export function ProjectsGrid({ projects, lang, visit }: { projects: Project[]; lang: 'es' | 'en'; visit: string }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const label = (cat: string) => categoryLabels[lang][cat] || cat;
  const quoteHref = (cat: string) => {
    const base = lang === 'en' ? '/en/quote' : '/quote';
    const type = categoryToProjectType[cat];
    return type ? `${base}?type=${type}` : base;
  };

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        {projects.slice(0, 5).map((p, i) => (
          <button
            key={`${p.title}-${i}`}
            type="button"
            onClick={() => setSelected(p)}
            className={cn(
              'reveal lift group relative overflow-hidden rounded-2xl bg-ink text-left',
              i === 0 ? 'aspect-[4/3] lg:row-span-2 lg:aspect-auto' : 'aspect-[16/9]',
            )}
          >
            {p.hasCover ? (
              <Image
                src={p.image}
                alt={p.hint}
                fill
                sizes={i === 0 ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 100vw, 25vw'}
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#3D34BC,#110C29_70%)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <span className="chip glass-dark absolute left-4 top-4 py-1.5 pl-3 text-xs text-white">{label(p.category || 'webs')}</span>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
              <div>
                <h3 className={cn('headline text-white', i === 0 ? 'text-[clamp(1.75rem,3vw,2.5rem)]' : 'text-2xl')}>
                  <span className="title-link">{p.title}</span>
                </h3>
                {p.rubro && <p className="mt-1.5 text-sm text-white/70">{p.rubro}</p>}
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-ink transition-transform duration-500 group-hover:-rotate-12">
                <ArrowUpRight className="icon-nudge h-5 w-5" />
                <span className="sr-only">{visit}</span>
              </span>
            </div>
          </button>
        ))}
      </div>
      <ProjectDetailModal
        project={selected}
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
        lang={lang}
        categoryLabel={selected ? label(selected.category || 'webs') : undefined}
        contactHref={lang === 'en' ? '/en/contact' : '/contacto'}
        quoteHref={quoteHref(selected?.category || '')}
      />
    </>
  );
}
