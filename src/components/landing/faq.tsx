import { Plus } from 'lucide-react';
import { homeContent, type Lang } from '@/content/home';
import { EMAIL, WHATSAPP_GREETING, whatsappHref } from '@/lib/contact';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

/** Preguntas frecuentes con <details> nativo (funciona sin JavaScript) y su JSON-LD. */
export function Faq({ lang }: { lang: Lang }) {
  const t = homeContent[lang].faq;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
  };

  return (
    <section data-tone="dark" className="panel-ink py-20 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="panel-inner grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <h2 className="headline reveal text-[clamp(2.2rem,4.6vw,4rem)]">
            <TitleText parts={t.title} />
          </h2>
          <div className="glass-dark rounded-2xl p-6 sm:p-7">
            <p className="headline text-2xl">{t.cardTitle}</p>
            <a href={whatsappHref(WHATSAPP_GREETING[lang])} target="_blank" rel="noopener noreferrer" className="btn-light mt-6 w-full">
              <span className="btn-tile">
                <WhatsAppIcon />
              </span>
              {t.cardCta}
            </a>
            <p className="mt-4 text-sm text-ink-muted">
              {t.orEmail}{' '}
              <a href={`mailto:${EMAIL}`} className="text-white underline underline-offset-4 hover:text-periwinkle">
                {EMAIL}
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-white/10">
          {t.items.map((it) => (
            <details key={it.q} className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span className="headline text-[1.35rem] sm:text-2xl">{it.q}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/15 transition-transform duration-300 group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-[16px] leading-relaxed text-ink-muted">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
