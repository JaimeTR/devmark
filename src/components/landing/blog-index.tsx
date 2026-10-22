'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
}

const PER_PAGE = 9;

const copy = {
  es: { all: 'Todos', more: 'Ver más artículos', read: 'Leer artículo', filter: 'Filtrar por tema', base: '/blog', tags: ['Desarrollo Web', 'Software a Medida', 'SEO', 'Diseño UI/UX', 'Marketing Digital', 'Automatización'] },
  en: { all: 'All', more: 'More articles', read: 'Read article', filter: 'Filter by topic', base: '/en/blog', tags: ['Web Development', 'Custom Software', 'SEO', 'UI/UX Design', 'Digital Marketing', 'Automation'] },
} as const;

/** Lista del blog con filtro por tema. Recibe solo resumenes (sin el contenido de cada articulo). */
export function BlogIndex({ posts, lang }: { posts: PostSummary[]; lang: 'es' | 'en' }) {
  const t = copy[lang];
  const [tag, setTag] = useState<string | null>(null);
  const [visible, setVisible] = useState(PER_PAGE);
  const filtered = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;
  const shown = filtered.slice(0, visible);
  const date = (d: string) => format(parseISO(d), lang === 'en' ? 'MMM d, yyyy' : "d 'de' MMM, yyyy", { locale: lang === 'en' ? enUS : es });
  const choose = (next: string | null) => {
    setTag(next);
    setVisible(PER_PAGE);
  };

  return (
    <section className="panel-paper py-12 sm:py-16">
      <div className="panel-inner">
        <div role="group" aria-label={t.filter} className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-hide">
          {[null, ...t.tags].map((x) => (
            <button
              key={x ?? 'all'}
              type="button"
              onClick={() => choose(x)}
              aria-pressed={tag === x}
              className={cn('h-10 shrink-0 rounded-lg px-4 text-[15px] font-medium transition-colors', tag === x ? 'bg-ink text-white' : 'bg-mist text-ink/70 hover:text-ink')}
            >
              {x ?? t.all}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Link
              key={p.slug}
              href={`${t.base}/${p.slug}`}
              className={cn('group flex flex-col overflow-hidden rounded-2xl bg-mist', i === 0 && !tag && 'md:col-span-2 lg:row-span-2')}
            >
              <div className={cn('relative bg-band', i === 0 && !tag ? 'aspect-[16/10] lg:aspect-auto lg:flex-1' : 'aspect-[16/10]')}>
                <Image src={p.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-8 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm text-ink/50">{date(p.date)}</p>
                <h2 className={cn('headline mt-2', i === 0 && !tag ? 'text-[clamp(1.75rem,2.8vw,2.5rem)]' : 'text-2xl')}>{p.title}</h2>
                <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-ink/70">{p.description}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((x) => (
                      <span key={x} className="rounded-md bg-white px-2.5 py-1 text-xs text-ink/60">
                        {x}
                      </span>
                    ))}
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink text-white transition-colors group-hover:bg-primary">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="sr-only">{t.read}</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {visible < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setVisible((v) => v + PER_PAGE)} className="btn-ink">
              <span className="btn-tile">
                <ArrowUpRight className="h-5 w-5 rotate-90" />
              </span>
              {t.more}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
