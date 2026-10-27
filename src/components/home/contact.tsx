import { Mail, Phone, Video } from 'lucide-react';
import { BOOKING_URL, WHATSAPP_GREETING, whatsappHref } from '@/lib/contact';
import { cn } from '@/lib/utils';
import type { TitleParts } from '@/content/home';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { ContactForm } from './contact-form';

interface ContactProps {
  lang: 'es' | 'en';
  title: string;
  description: string;
  contactSubtitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  timeZoneLabel: string;
  formTitle: string;
  formDescription: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  emailFormLabel: string;
  emailPlaceholder: string;
  phoneFormLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitButton: string;
  scheduleButton: string;
  quoteButton: string;
  /** Titular con la frase en cursiva; si falta se usa `title`. */
  heading?: TitleParts;
  /** Es el primer panel de la pagina: deja sitio a la barra fija. */
  first?: boolean;
}

const detailCard = 'lift group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.07]';
const detailTile = 'grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-periwinkle';

/** Panel oscuro de contacto: WhatsApp primero, formulario al lado. */
export function Contact(props: ContactProps) {
  const es = props.lang === 'es';

  return (
    <section id="contact" data-tone="dark" className={cn('panel-ink py-20 sm:py-28', props.first && 'mt-2 pt-32 sm:mt-3 sm:pt-40')}>
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="panel-inner relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="flex flex-col">
          {(() => {
            const Tag = props.first ? 'h1' : 'h2';
            return <Tag className={cn('headline text-[clamp(2.2rem,4.6vw,4rem)]', !props.first && 'reveal')}>{props.heading ? <TitleText parts={props.heading} /> : props.title}</Tag>;
          })()}
          <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink-muted">{props.description}</p>

          <div className="mt-9 grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            <a href={whatsappHref(WHATSAPP_GREETING[props.lang])} target="_blank" rel="noopener noreferrer" className="btn-light" aria-label={es ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp'}>
              <span className="btn-tile">
                <WhatsAppIcon />
              </span>
              {es ? 'Escríbenos' : 'Message us'}
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-glass">
              <span className="btn-tile">
                <Video className="h-5 w-5" />
              </span>
              <span className="sm:hidden">{es ? 'Agendar' : 'Book'}</span>
              <span className="hidden sm:inline">{props.scheduleButton}</span>
            </a>
          </div>

          <div className="mt-auto grid gap-2.5 pt-12">
            <a href={`mailto:${props.email}`} className={detailCard}>
              <span className={detailTile}>
                <Mail className="icon-tilt h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-ink-muted">{props.emailLabel.replace(':', '')}</span>
                <span className="block truncate text-[15px]">{props.email}</span>
              </span>
            </a>
            <a href={`tel:${props.phone.replace(/\s/g, '')}`} className={detailCard}>
              <span className={detailTile}>
                <Phone className="icon-tilt h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-ink-muted">{props.phoneLabel.replace(':', '')}</span>
                <span className="block text-[15px]">{props.phone}</span>
              </span>
            </a>
          </div>
        </div>

        <ContactForm lang={props.lang} copy={props} />
      </div>
    </section>
  );
}
