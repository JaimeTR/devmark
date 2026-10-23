'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { topicOf } from '@/data/blog-topics';
import { BlogCover } from '@/components/blog/blog-cover';

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
  es: { all: 'Todos', more: 'Ver más artículos', read: 'Leer artículo', latest: 'Último artículo', filter: 'Filtrar por tema', base: '/blog', tags: ['Desarrollo Web', 'Software a Medida', 'SEO', 'Diseño UI/UX', 'Marketing Digital', 'Automatización'] },
  en: { all: 'All', more: 'More articles', read: 'Read article', latest: 'Latest article', filter: 'Filter by topic', base: '/en/blog', tags: ['Web Development', 'Custom Software', 'SEO', 'UI/UX Design', 'Digital Marketing', 'Automation'] },
} as const;

/** Lista del blog con filtro por tema. Recibe solo resumenes (sin el contenido de cada articulo). */
export function BlogIndex({ posts, lang }: { posts: PostSummary[]; lang: 'es' | 'en' }) {
  const t = copy[lang];
  const [tag, setTag] = useState<string | null>(null);
  const [visible, setVisible] = useState(PER_PAGE);
  const filtered = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;
  // Sin filtro, el primero va destacado a todo el ancho y los demas llenan filas de tres.
  const destacado = !tag;
  const shown = filtered.slice(0, visible + (destacado ? 1 : 0));
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
          {shown.map((p, i) =>
            i === 0 && destacado ? (
              <Link key={p.slug} href={`${t.base}/${p.slug}`} className="lift group grid overflow-hidden rounded-2xl bg-mist md:col-span-2 lg:col-span-3 lg:grid-cols-[1.15fr_1fr]">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
                  <BlogCover topic={topicOf(p)} lang={lang} centrado />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/55">
                    <span className="rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-white">{t.latest}</span>
                    {date(p.date)}
                  </p>
                  <h2 className="headline mt-4 text-[clamp(1.75rem,2.8vw,2.6rem)]">
                    <span className="title-link">{p.title}</span>
                  </h2>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink/70">{p.description}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((x) => (
                      <span key={x} className="tag rounded-md bg-white px-2.5 py-1 text-xs text-ink/60">
                        {x}
                      </span>
                    ))}
                  </div>
                  <span className="mt-8 inline-flex items-center gap-3 self-start text-[15px] font-medium">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-white transition-colors group-hover:bg-primary">
                      <ArrowUpRight className="icon-nudge h-5 w-5" />
                    </span>
                    {t.read}
                  </span>
                </div>
              </Link>
            ) : (
            <Link
              key={p.slug}
              href={`${t.base}/${p.slug}`}
              className="lift group flex flex-col overflow-hidden rounded-2xl bg-mist"
            >
              <div className="relative aspect-[16/10]">
                <BlogCover topic={topicOf(p)} lang={lang} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm text-ink/50">{date(p.date)}</p>
                <h2 className="headline mt-2 text-2xl">
                  <span className="title-link">{p.title}</span>
                </h2>
                <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-ink/70">{p.description}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((x) => (
                      <span key={x} className="tag rounded-md bg-white px-2.5 py-1 text-xs text-ink/60">
                        {x}
                      </span>
                    ))}
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink text-white transition-colors group-hover:bg-primary">
                    <ArrowUpRight className="icon-nudge h-4 w-4" />
                    <span className="sr-only">{t.read}</span>
                  </span>
                </div>
              </div>
            </Link>
            ),
          )}
        </div>

        {visible + (destacado ? 1 : 0) < filtered.length && (
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
