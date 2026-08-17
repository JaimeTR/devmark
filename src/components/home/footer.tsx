'use client';

import { Github, Linkedin, Instagram, Facebook, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface FooterProps {
  lang?: 'es' | 'en';
  copyright: string;
}

const socials = [
  { href: 'https://www.instagram.com/devmark.pe/', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.facebook.com/devmark.pe/', label: 'Facebook', Icon: Facebook },
  { href: 'https://github.com/JaimeTR', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/company/devmarkpe/', label: 'LinkedIn', Icon: Linkedin },
];

const copy = {
  es: {
    tagline: 'Agencia de desarrollo web y software en Lima, Perú.',
    linksTitle: 'Enlaces',
    links: [
      { href: '/nosotros', label: 'Nosotros' },
      { href: '/servicios', label: 'Servicios' },
      { href: '/portfolio', label: 'Portafolio' },
      { href: '/hosting', label: 'Hosting' },
    ],
    salesLabel: 'Contacto',
    supportLabel: 'Soporte',
  },
  en: {
    tagline: 'Web and software development agency in Lima, Peru.',
    linksTitle: 'Links',
    links: [
      { href: '/en/about', label: 'About' },
      { href: '/en/services', label: 'Services' },
      { href: '/en/portfolio', label: 'Portfolio' },
      { href: '/en/hosting', label: 'Hosting' },
    ],
    salesLabel: 'Contact',
    supportLabel: 'Support',
  },
};

export function Footer({ lang = 'es', copyright }: FooterProps) {
  const [year, setYear] = useState(new Date().getFullYear());
  const t = copy[lang];

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative mt-16 sm:mt-20 md:mt-24 bg-brand-navy-dark text-white/80">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={lang === 'en' ? '/en' : '/'} className="inline-flex items-center gap-2">
              <Image src="/logo-mark-white.svg" alt="" role="presentation" width={32} height={32} className="w-8 h-8" />
              <span className="font-logo text-lg tracking-wider text-white">DEVMARK</span>
            </Link>
            <p className="text-sm text-white/80 max-w-xs leading-relaxed">{t.tagline}</p>
            <div className="flex items-center gap-1 -ml-2">
              {socials.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} - ${lang === 'en' ? 'opens in a new tab' : 'abre en una nueva ventana'}`}
                  className="flex items-center justify-center h-10 w-10 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-4.5 w-4.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white/80">{t.linksTitle}</h3>
            <ul className="space-y-2.5">
              {t.links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-white/80">{t.salesLabel}</h3>
              <a href="mailto:contacto@devmarkpe.com" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                <Mail className="h-4 w-4 shrink-0 text-brand-lavender" />
                contacto@devmarkpe.com
              </a>
              <a href="tel:+51965312386" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0 text-brand-lavender" />
                +51 965 312 386
              </a>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-white/80">{t.supportLabel}</h3>
              <a href="mailto:soporte@devmarkpe.com" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                <Mail className="h-4 w-4 shrink-0 text-brand-lavender" />
                soporte@devmarkpe.com
              </a>
              <a href="tel:+51975646074" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0 text-brand-lavender" />
                +51 975 646 074
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-center">
          <p className="text-xs text-white/80">&copy; {year} {copyright}</p>
          <p className="text-xs text-white/80">
            {lang === 'en' ? 'Built by' : 'Desarrollado por'}{' '}
            <a
              href="https://www.jaimetr.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 underline decoration-white/40 underline-offset-2 hover:text-white transition-colors"
            >
              Jaime Tarazona
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
