import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { whatsappHref } from '@/lib/contact';
import { topicOf } from '@/data/blog-topics';
import { BlogCover, TOPIC_ICON } from '@/components/blog/blog-cover';
import { Live } from '@/components/site/live';

interface PostLike {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  content: string;
  tags: string[];
}

const copy = {
  es: {
    base: '/blog',
    back: 'Blog',
    recent: 'Entradas recientes',
    servicesTitle: 'Conoce nuestros servicios',
    services: [
      { label: 'Desarrollo web', href: '/servicios/desarrollo-web-a-medida' },
      { label: 'Software a medida', href: '/servicios/desarrollo-software' },
      { label: 'Tiendas y CMS', href: '/servicios/desarrollo-cms' },
      { label: 'Chatbots con IA', href: '/servicios/chatbots-ia' },
      { label: 'SEO', href: '/servicios/seo-optimizacion' },
    ],
    ctaTitle: ['¿Listo para llevar tu negocio', 'al siguiente nivel?'],
    cta: 'Hablemos por WhatsApp',
    message: (title: string) => `Hola DEVMARK, leí el artículo "${title}" y quiero conversar sobre mi proyecto.`,
    date: "d 'de' MMMM, yyyy",
    locale: es,
  },
  en: {
    base: '/en/blog',
    back: 'Blog',
    recent: 'Recent posts',
    servicesTitle: 'Explore our services',
    services: [
      { label: 'Web development', href: '/en/services/custom-web-development' },
      { label: 'Custom software', href: '/en/services/custom-software-development' },
      { label: 'Stores & CMS', href: '/en/services/cms-development' },
      { label: 'AI chatbots', href: '/en/services/ai-chatbots' },
      { label: 'SEO', href: '/en/services/seo-optimization' },
    ],
    ctaTitle: ['Ready to take your business', 'to the next level?'],
    cta: "Let's talk on WhatsApp",
    message: (title: string) => `Hi DEVMARK, I read "${title}" and would like to talk about my project.`,
    date: 'MMMM d, yyyy',
    locale: enUS,
  },
} as const;

/** Articulo del blog: cabecera tinta, lectura en papel con columna lateral y cierre con WhatsApp. */
export function BlogArticle({ post, recent, lang }: { post: PostLike; recent: PostLike[]; lang: 'es' | 'en' }) {
  const t = copy[lang];
  const fmt = (d: string) => format(parseISO(d), t.date, { locale: t.locale });

  return (
    <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
      <section data-tone="dark" className="panel-ink mt-2 sm:mt-3">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full bg-primary/35 blur-[130px]" />
        <div className="panel-inner relative grid grid-cols-1 items-end gap-10 pb-14 pt-32 lg:grid-cols-[1.4fr_1fr] lg:pb-16 lg:pt-40">
          <div className="hero-in">
            <Link href={t.base} className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-white">
              <ArrowUpRight className="h-4 w-4 -rotate-90" />
              {t.back}
            </Link>
            <h1 className="display mt-6 text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.02]">{post.title}</h1>
            <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-ink-muted">{post.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ink-muted">
              <span>{post.author}</span>
              <time dateTime={post.date}>{fmt(post.date)}</time>
              <span className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-white/10 px-2.5 py-1 text-xs text-white">
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          </div>
          <Live className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 lg:block">
            <BlogCover topic={topicOf(post)} lang={lang} />
          </Live>
        </div>
      </section>

      <section className="panel-paper py-14 sm:py-20">
        <div className="panel-inner grid gap-14 lg:grid-cols-[minmax(0,68ch)_1fr] lg:justify-between">
          <article className="article" dangerouslySetInnerHTML={{ __html: post.content }} />
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="headline text-xl">{t.recent}</h2>
            <ul className="mt-4 space-y-3">
              {recent.map((rp) => (
                <li key={rp.slug}>
                  <Link href={`${t.base}/${rp.slug}`} className="group grid grid-cols-[64px_1fr] items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-mist">
                    <span className="grid h-16 w-16 place-items-center rounded-lg bg-ink text-periwinkle">
                      <TopicIcon topic={topicOf(rp)} />
                    </span>
                    <span>
                      <span className="line-clamp-2 text-[15px] font-medium leading-snug group-hover:text-primary">{rp.title}</span>
                      <span className="mt-1 block text-xs text-ink/50">{fmt(rp.date)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-mist p-5">
              <h2 className="headline text-xl">{t.servicesTitle}</h2>
              <ul className="mt-3 space-y-1">
                {t.services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="group flex items-center justify-between rounded-lg px-2 py-2 text-[15px] hover:bg-white">
                      {s.label}
                      <ArrowUpRight className="h-4 w-4 text-ink/40 group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section data-tone="dark" className="panel-ink py-20 sm:py-24">
        <div className="panel-inner flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="headline reveal max-w-[20ch] text-[clamp(2.2rem,4.6vw,4rem)]">
            {t.ctaTitle[0]} <em>{t.ctaTitle[1]}</em>
          </h2>
          <a href={whatsappHref(t.message(post.title))} target="_blank" rel="noopener noreferrer" className="btn-light">
            <span className="btn-tile">
              <WhatsAppIcon />
            </span>
            {t.cta}
          </a>
        </div>
      </section>
    </main>
  );
}

function TopicIcon({ topic }: { topic: ReturnType<typeof topicOf> }) {
  const Icon = TOPIC_ICON[topic];
  return <Icon className="icon-tilt h-6 w-6" />;
}
