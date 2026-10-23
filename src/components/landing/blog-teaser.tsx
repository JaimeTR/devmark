import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { ArrowUpRight } from 'lucide-react';
import { getPosts } from '@/data/blog-posts';
import { topicOf } from '@/data/blog-topics';
import { BlogCover } from '@/components/blog/blog-cover';
import { homeContent, type Lang } from '@/content/home';
import { Btn } from '@/components/site/btn';
import { TitleText } from '@/components/site/title-text';

/** Ultimos articulos del blog: uno destacado y dos en lista. */
export async function BlogTeaser({ lang }: { lang: Lang }) {
  const t = homeContent[lang].blog;
  const [first, ...rest] = (await getPosts(lang)).slice(0, 3);
  if (!first) return null;
  const date = (d: string) => format(parseISO(d), lang === 'en' ? 'MMM d, yyyy' : "d 'de' MMM, yyyy", { locale: lang === 'en' ? enUS : es });

  return (
    <section className="panel-mist py-20 sm:py-28">
      <div className="panel-inner">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="headline reveal max-w-[20ch] text-[clamp(2.1rem,4.6vw,4rem)]">
            <TitleText parts={t.title} />
          </h2>
          <Btn href={t.href} icon={<ArrowUpRight className="h-5 w-5" />} variant="ink">
            {t.cta}
          </Btn>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <Link href={`${t.postBase}/${first.slug}`} className="reveal lift group flex flex-col overflow-hidden rounded-2xl bg-white">
            <div className="relative aspect-[16/9]">
              <BlogCover topic={topicOf(first)} lang={lang} />
            </div>
            <div className="flex flex-1 items-end justify-between gap-6 p-6 sm:p-7">
              <div>
                <p className="text-sm text-ink/50">{date(first.date)}</p>
                <h3 className="headline mt-2 text-[clamp(1.6rem,2.6vw,2.25rem)]">
                  <span className="title-link">{first.title}</span>
                </h3>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ink text-white transition-colors group-hover:bg-primary">
                <ArrowUpRight className="icon-nudge h-5 w-5" />
              </span>
            </div>
          </Link>
          <div className="flex flex-col gap-4">
            {rest.map((p) => (
              <Link key={p.slug} href={`${t.postBase}/${p.slug}`} className="reveal lift group grid flex-1 grid-cols-[132px_1fr] gap-5 rounded-2xl bg-white p-4 sm:grid-cols-[168px_1fr]">
                <div className="relative min-h-[120px] overflow-hidden rounded-xl">
                  <BlogCover topic={topicOf(p)} lang={lang} label={false} />
                </div>
                <div className="flex flex-col py-1">
                  <p className="text-sm text-ink/50">{date(p.date)}</p>
                  <h3 className="headline mt-2 text-xl leading-tight">
                    <span className="title-link">{p.title}</span>
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-ink/70 group-hover:text-primary">
                    {t.read}
                    <ArrowUpRight className="icon-nudge h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
