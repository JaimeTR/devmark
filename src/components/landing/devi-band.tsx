import { ArrowUpRight, Check, Gamepad2 } from 'lucide-react';
import { homeContent, type Lang } from '@/content/home';
import { whatsappHref } from '@/lib/contact';
import { DeviImg } from '@/components/site/devi-img';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

/** La web de Devi (devi.devmarkpe.com): galeria, estados, playground y la pagina del servicio. */
const DEVI_URL = 'https://devi.devmarkpe.com';
const DEVI_SERVICIO = `${DEVI_URL}/mascota-para-tu-negocio/`;
const DEVI_ESTADOS = `${DEVI_URL}/estados/`;

const estados = ['saludo', 'pensando', 'escribiendo', 'exito'] as const;

/** Devi, la mascota de DEVMARK, como muestra del servicio de mascotas de marca. */
export function DeviBand({ lang }: { lang: Lang }) {
  const t = homeContent[lang].devi;
  return (
    <section id="mascota" className="panel-paper py-20 sm:py-28">
      <div className="panel-inner grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="text-sm font-medium text-ink/60">{t.eyebrow}</p>
          <h2 className="headline reveal mt-3 text-[clamp(2.1rem,4.6vw,4rem)]">
            <TitleText parts={t.title} />
          </h2>
          <p className="reveal mt-5 max-w-[50ch] text-[17px] leading-relaxed text-ink/70">{t.text}</p>
          <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[15px]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-band text-ink">
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-2">
            <a href={whatsappHref(t.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-ink btn-sm">
              <span className="btn-tile">
                <WhatsAppIcon className="h-4 w-4" />
              </span>
              {t.cta}
            </a>
            <a href={DEVI_URL} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
              <span className="btn-tile">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              {t.meet}
            </a>
          </div>
          <a href={DEVI_SERVICIO} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline">
            {t.service}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="reveal rounded-2xl bg-mist p-6 sm:p-8">
          <a href={DEVI_URL} target="_blank" rel="noopener noreferrer" className="lift flex justify-center rounded-xl bg-white py-8">
            <DeviImg version="completo" estado="saludo" tamano={220} alt={t.cardAlt} />
          </a>
          <p className="mt-6 text-sm font-medium text-ink/60">{t.states}</p>
          <ul className="mt-3 grid grid-cols-4 gap-2">
            {estados.map((e) => (
              <li key={e}>
                <a href={DEVI_ESTADOS} target="_blank" rel="noopener noreferrer" className="lift flex flex-col items-center gap-2 rounded-xl bg-white px-1 py-3 text-center">
                  <DeviImg estado={e} tamano={48} />
                  <span className="text-xs text-ink/70">{t.stateNames[e]}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={DEVI_ESTADOS} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm mt-4 w-full justify-center bg-white">
            <span className="btn-tile">
              <Gamepad2 className="h-4 w-4" />
            </span>
            {t.play}
          </a>
        </div>
      </div>
    </section>
  );
}
