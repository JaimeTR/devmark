import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Github, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { EMAIL, HOURS, PHONE_DISPLAY, SUPPORT_EMAIL, WHATSAPP_GREETING, WHATSAPP_NUMBER, whatsappHref } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

interface FooterProps {
  lang?: 'es' | 'en';
  copyright: string;
}

const socials = [
  { href: 'https://www.instagram.com/devmark.pe/', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.facebook.com/devmark.pe/', label: 'Facebook', Icon: Facebook },
  { href: 'https://www.linkedin.com/company/devmark.pe/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://github.com/JaimeTR', label: 'GitHub', Icon: Github },
];

const copy = {
  es: {
    tagline: 'Agencia de desarrollo web y software en Lima, Perú. Webs, tiendas, sistemas e IA para negocios que quieren vender más en internet.',
    follow: 'Síguenos',
    whatsapp: 'Escríbenos por WhatsApp',
    nav: 'Navegación',
    links: [
      { href: '/nosotros', label: 'Nosotros' },
      { href: '/servicios', label: 'Servicios' },
      { href: '/portfolio', label: 'Portafolio' },
      { href: '/hosting', label: 'Hosting' },
      { href: '/blog', label: 'Blog' },
      { href: '/contacto', label: 'Contacto' },
    ],
    servicesTitle: 'Servicios',
    services: [
      { href: '/servicios/desarrollo-web-a-medida', label: 'Desarrollo web' },
      { href: '/servicios/desarrollo-cms', label: 'Tiendas y CMS' },
      { href: '/servicios/desarrollo-software', label: 'Software a medida' },
      { href: '/servicios/chatbots-ia', label: 'Chatbots con IA' },
      { href: '/servicios/seo-optimizacion', label: 'SEO y GEO' },
    ],
    contactTitle: 'Contacto',
    sales: 'Ventas',
    support: 'Soporte',
    place: 'Lima, Perú · atención online',
    built: 'Desarrollado por',
  },
  en: {
    tagline: 'Web and software development agency in Lima, Peru. Websites, stores, systems and AI for businesses that want to sell more online.',
    follow: 'Follow us',
    whatsapp: 'Message us on WhatsApp',
    nav: 'Navigation',
    links: [
      { href: '/en/about', label: 'About' },
      { href: '/en/services', label: 'Services' },
      { href: '/en/portfolio', label: 'Portfolio' },
      { href: '/en/hosting', label: 'Hosting' },
      { href: '/en/blog', label: 'Blog' },
      { href: '/en/contact', label: 'Contact' },
    ],
    servicesTitle: 'Services',
    services: [
      { href: '/en/services/custom-web-development', label: 'Web development' },
      { href: '/en/services/cms-development', label: 'Stores & CMS' },
      { href: '/en/services/custom-software-development', label: 'Custom software' },
      { href: '/en/services/ai-chatbots', label: 'AI chatbots' },
      { href: '/en/services/seo-optimization', label: 'SEO & GEO' },
    ],
    contactTitle: 'Contact',
    sales: 'Sales',
    support: 'Support',
    place: 'Lima, Peru · online service',
    built: 'Built by',
  },
};

/** Pie en dos paneles: marca y redes (niebla) y navegacion con contacto (tinta). */
export function Footer({ lang = 'es', copyright }: FooterProps) {
  const year = new Date().getFullYear();
  const t = copy[lang];

  return (
    <footer className="mx-2 mb-2 mt-2 grid gap-2 sm:mx-3 sm:mb-3 sm:mt-3 sm:gap-3 lg:grid-cols-[1fr_2fr]">
      <div className="flex flex-col rounded-panel bg-mist p-7 text-ink sm:p-9">
        <Link href={lang === 'en' ? '/en' : '/'} className="inline-flex items-center gap-2.5">
          <Image src="/logo-mark.svg" alt="" role="presentation" width={36} height={36} className="h-9 w-9" />
          <span className="font-logo text-xl tracking-wider">DEVMARK</span>
        </Link>
        <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-ink/70">{t.tagline}</p>
        <p className="mt-9 text-sm font-medium text-ink/60">{t.follow}</p>
        <div className="mt-3 flex gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group grid h-11 w-11 place-items-center rounded-lg bg-white text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <Icon className="icon-tilt h-4 w-4" />
            </a>
          ))}
        </div>
        <a href={whatsappHref(WHATSAPP_GREETING[lang])} target="_blank" rel="noopener noreferrer" className="btn-ink btn-sm mt-6 self-start">
          <span className="btn-tile">
            <WhatsAppIcon className="h-4 w-4" />
          </span>
          {t.whatsapp}
        </a>
      </div>

      <div data-tone="dark" className="flex flex-col rounded-panel bg-ink p-7 text-white sm:p-9">
        <div className="grid gap-10 sm:grid-cols-3">
          <nav aria-label={t.nav}>
            <p className="headline text-xl">{t.nav}</p>
            <ul className="mt-4 space-y-2.5">
              {t.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="title-link text-[15px] text-ink-muted transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="headline text-xl">{t.servicesTitle}</p>
            <ul className="mt-4 space-y-2.5">
              {t.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="title-link text-[15px] text-ink-muted transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="headline text-xl">{t.contactTitle}</p>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                <span className="block text-xs text-ink-muted">{t.sales}</span>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-periwinkle">
                  <Mail className="h-4 w-4" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <span className="block text-xs text-ink-muted">{t.support}</span>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-periwinkle">
                  <Mail className="h-4 w-4" />
                  {SUPPORT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-2 hover:text-periwinkle">
                  <Phone className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="text-sm text-ink-muted">{HOURS[lang]}</li>
              <li className="text-sm text-ink-muted">{t.place}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {copyright}
          </p>
          <p>
            {t.built}{' '}
            <a href="https://www.jaimetr.dev" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-periwinkle">
              Jaime Tarazona
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
