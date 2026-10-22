'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ProjectDetailModal } from '@/components/portfolio/project-detail-modal';
import { PageHero } from '@/components/site/page-hero';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import type { Project } from '@/data/projects';
import { whatsappHref } from '@/lib/contact';
import { cn } from '@/lib/utils';

const copy = {
  es: {
    title: ['Nuestro', { em: 'portafolio' }] as const,
    description: 'Webs, tiendas, sistemas y automatizaciones que ya están trabajando para negocios en Perú y fuera del país.',
    whatsapp: 'Quiero un proyecto así',
    message: 'Hola DEVMARK, vi su portafolio y quiero un proyecto parecido.',
    categories: { all: 'Todos', webs: 'Webs', ecommerce: 'E-commerce', software: 'Software a medida', ia: 'IA', automatizacion: 'Automatización', landing: 'Landing pages', otros: 'Otros' },
    empty: 'No hay proyectos en esta categoría aún.',
    detail: 'Ver detalle',
    visit: 'Visitar página',
    more: 'más',
    contactHref: '/contacto',
    quoteBase: '/quote',
    filter: 'Filtrar por categoría',
    header: { contactButton: 'Contactar', aiAssistant: 'Asistente IA', aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.' },
    copyright: 'DEVMARK. Todos los derechos reservados.',
  },
  en: {
    title: ['Our', { em: 'portfolio' }] as const,
    description: 'Websites, stores, systems and automations already at work for businesses in Peru and abroad.',
    whatsapp: 'I want a project like this',
    message: 'Hi DEVMARK, I saw your portfolio and want a similar project.',
    categories: { all: 'All', webs: 'Webs', ecommerce: 'E-commerce', software: 'Custom software', ia: 'AI', automatizacion: 'Automation', landing: 'Landing pages', otros: 'Other' },
    empty: 'No projects in this category yet.',
    detail: 'View details',
    visit: 'Visit site',
    more: 'more',
    contactHref: '/en/contact',
    quoteBase: '/en/quote',
    filter: 'Filter by category',
    header: { contactButton: 'Contact', aiAssistant: 'AI Assistant', aiAssistantTooltip: "Hi! I'm your AI assistant." },
    copyright: 'DEVMARK. All rights reserved.',
  },
} as const;

type CategoryKey = keyof (typeof copy)['es']['categories'];

const categoryToProjectType: Record<string, string> = {
  webs: 'corporate-website',
  landing: 'landing-page',
  ecommerce: 'ecommerce',
  software: 'custom-software',
  ia: 'custom-software',
  automatizacion: 'custom-software',
};

/** Portafolio con filtros por categoria; cada proyecto abre su detalle. */
export function PortfolioPage({ projects, lang }: { projects: Project[]; lang: 'es' | 'en' }) {
  const t = copy[lang];
  const [active, setActive] = useState<CategoryKey>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);
  const label = (cat: string) => (t.categories as Record<string, string>)[cat] ?? cat;
  const quoteHref = (cat: string) => (categoryToProjectType[cat] ? `${t.quoteBase}?type=${categoryToProjectType[cat]}` : t.quoteBase);

  return (
    <div className="bg-paper">
      <Header lang={lang} {...t.header} />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <PageHero
          title={t.title}
          description={t.description}
          actions={
            <a href={whatsappHref(t.message)} target="_blank" rel="noopener noreferrer" className="btn-light">
              <span className="btn-tile">
                <WhatsAppIcon />
              </span>
              {t.whatsapp}
            </a>
          }
        />
        <section className="panel-paper py-12 sm:py-16">
          <div className="panel-inner">
            <div role="group" aria-label={t.filter} className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-hide">
              {(Object.keys(t.categories) as CategoryKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActive(key)}
                  aria-pressed={active === key}
                  className={cn(
                    'h-10 shrink-0 rounded-lg px-4 text-[15px] font-medium transition-colors',
                    active === key ? 'bg-ink text-white' : 'bg-mist text-ink/70 hover:text-ink',
                  )}
                >
                  {t.categories[key]}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <article key={`${p.title}-${i}`} className="lift group flex flex-col overflow-hidden rounded-2xl bg-mist">
                  <button type="button" onClick={() => setSelected(p)} className="relative aspect-[16/10] overflow-hidden bg-ink text-left" aria-label={`${t.detail}: ${p.title}`}>
                    {p.hasCover && p.image ? (
                      <Image src={p.image} alt={p.hint} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#3D34BC,#110C29_70%)]">
                        <span className="headline text-6xl text-white/30">{p.title.charAt(0)}</span>
                      </div>
                    )}
                    <span className="chip glass-dark absolute left-3 top-3 py-1.5 pl-3 text-xs text-white">{label(p.category)}</span>
                  </button>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="headline text-2xl">
                      <span className="title-link">{p.title}</span>
                    </h2>
                    <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink/70">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag rounded-md bg-white px-2.5 py-1 text-xs text-ink/60">
                          {tag}
                        </span>
                      ))}
                      {p.tags.length > 3 && <span className="px-1 py-1 text-xs text-ink/50">+{p.tags.length - 3} {t.more}</span>}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      <button type="button" onClick={() => setSelected(p)} className="btn-outline btn-sm bg-white">
                        <span className="btn-tile">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                        {t.detail}
                      </button>
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ink btn-sm">
                          <span className="btn-tile">
                            <ExternalLink className="h-4 w-4" />
                          </span>
                          {t.visit}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length === 0 && <p className="rounded-2xl bg-mist p-12 text-center text-ink/60">{t.empty}</p>}
          </div>
        </section>
      </main>
      <Footer lang={lang} copyright={t.copyright} />
      <ProjectDetailModal
        project={selected}
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
        lang={lang}
        categoryLabel={selected ? label(selected.category) : undefined}
        contactHref={t.contactHref}
        quoteHref={quoteHref(selected?.category ?? '')}
      />
    </div>
  );
}
