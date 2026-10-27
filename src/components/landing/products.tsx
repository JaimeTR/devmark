import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { homeContent, type Lang } from '@/content/home';
import { whatsappHref } from '@/lib/contact';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

/** Peticion real a la API de DEVMARK AI, como se ve en su documentacion. */
function AiSnippet() {
  return (
    <pre className="overflow-x-auto rounded-xl border border-white/10 bg-ink-soft p-4 text-[12.5px] leading-relaxed text-white/80">
      <code>
        <span className="text-periwinkle">curl</span> https://ai.devmarkpe.com/v1/chat/completions \{'\n'}
        {'  '}-H <span className="text-band">&quot;Authorization: Bearer $DEVMARK_API_KEY&quot;</span> \{'\n'}
        {'  '}-d <span className="text-band">{`'{"messages":[{"role":"user","content":"Hola"}]}'`}</span>
      </code>
    </pre>
  );
}

function Feature({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px]">
      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded ${dark ? 'bg-white/10 text-periwinkle' : 'bg-band text-ink'}`}>
        <Check className="h-3 w-3" />
      </span>
      {children}
    </li>
  );
}

/** Productos propios: DEVMARK AI y DEVMARK ERP, y los que vienen: Academy y Store. */
export function Products({ lang }: { lang: Lang }) {
  const t = homeContent[lang].products;
  return (
    <section id="productos" className="panel-mist py-20 sm:py-28">
      <div className="panel-inner">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="headline reveal text-[clamp(2.1rem,4.6vw,4rem)]">
            <TitleText parts={t.title} />
          </h2>
          <p className="reveal max-w-[46ch] text-[17px] leading-relaxed text-ink/70">{t.text}</p>
        </div>

        <div className="mt-12 grid gap-3 lg:grid-cols-2">
          <article data-tone="dark" className="reveal lift group flex flex-col rounded-2xl bg-ink p-7 text-white sm:p-9">
            <p className="font-logo text-2xl tracking-wider">{t.ai.name}</p>
            <h3 className="headline mt-5 text-[clamp(1.75rem,2.8vw,2.5rem)]">{t.ai.tagline}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{t.ai.description}</p>
            <div className="mt-6">
              <AiSnippet />
            </div>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {t.ai.features.map((f) => (
                <Feature key={f} dark>
                  {f}
                </Feature>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              <a href={t.ai.href} target="_blank" rel="noopener noreferrer" className="btn-light btn-sm">
                <span className="btn-tile">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                {t.ai.cta}
              </a>
              <a href={whatsappHref(t.ai.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-glass btn-sm">
                <span className="btn-tile">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                {t.ai.ask}
              </a>
            </div>
          </article>

          <article className="reveal lift group flex flex-col rounded-2xl bg-white p-7 sm:p-9">
            <p className="font-logo text-2xl tracking-wider">{t.erp.name}</p>
            <h3 className="headline mt-5 text-[clamp(1.75rem,2.8vw,2.5rem)]">{t.erp.tagline}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{t.erp.description}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {t.erp.features.map((f) => (
                <Feature key={f}>{f}</Feature>
              ))}
            </ul>
            <a href={lang === 'es' ? '/quote' : '/en/quote'} className="lift group relative mt-8 flex items-center gap-4 overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-white">
                <Sparkles className="icon-tilt h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium">{t.erp.quote.title}</span>
                <span className="block text-sm text-ink/70">{t.erp.quote.text}</span>
              </span>
              <ArrowUpRight className="icon-nudge h-5 w-5 shrink-0" />
            </a>
            <div className="mt-auto pt-8">
              <a href={whatsappHref(t.erp.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-ink btn-sm">
                <span className="btn-tile">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                {t.erp.cta}
              </a>
            </div>
          </article>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {[t.academia, t.tienda].map((p) => (
            <article key={p.name} className="reveal lift flex flex-col rounded-2xl bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <p className="font-logo text-2xl tracking-wider">{p.name}</p>
                <span className="rounded-full bg-band px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-ink">{p.badge}</span>
              </div>
              <h3 className="headline mt-5 text-[clamp(1.5rem,2.4vw,2.1rem)]">{p.tagline}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{p.description}</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {p.features.map((f) => (
                  <Feature key={f}>{f}</Feature>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a href={whatsappHref(p.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-ink btn-sm">
                  <span className="btn-tile">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  {p.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
