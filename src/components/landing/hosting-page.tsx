import { ArrowUpRight, Check, Globe, HardDrive, Lock, Mail, Server, Zap } from 'lucide-react';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { Contact } from '@/components/home/contact';
import { PageHero } from '@/components/site/page-hero';
import { contactContent } from '@/content/home-data';
import { hostingFeatures, hostingPlans } from '@/content/hosting';
import type { Lang } from '@/content/home';
import { cn } from '@/lib/utils';
import { CouponCopy } from './coupon-copy';

const REFERRAL = 'https://hostinger.com?REFERRALCODE=JAIMETRDEV';
const icons = { server: Server, globe: Globe, mail: Mail, lock: Lock, zap: Zap, harddrive: HardDrive } as const;

const copy = {
  es: {
    title: ['Hosting profesional', { em: 'para tu negocio' }] as const,
    description: 'Somos socios directos de Hostinger: con el código DEVMARK tienes descuento en hosting, VPS, dominios y correos corporativos, y configuramos gratis tus correos y el certificado SSL.',
    cta: 'Obtener 20% de descuento',
    coupon: 'Cupón',
    copy: 'Copiar',
    copied: '¡Copiado!',
    perks: ['Descuento en hosting, VPS, dominios y correos', 'Migración de dominio y sitio gratis', 'Soporte 24/7 en español', 'Garantía de reembolso de 30 días'],
    featuresTitle: ['Todo lo que necesitas', { em: 'para estar en línea' }] as const,
    plansTitle: ['Planes', { em: 'de hosting' }] as const,
    plansText: 'Todos los planes incluyen configuración gratuita de correos corporativos y certificado SSL por parte de nuestro equipo.',
    popular: 'Más popular',
    hire: 'Contratar ahora',
    includedTitle: ['Servicios', { em: 'incluidos' }] as const,
    included: [
      { title: 'Configuración de correos corporativos', text: 'Configuramos tus cuentas de correo profesionales (contacto@tuempresa.com, ventas@tuempresa.com, etc.) sin costo adicional.' },
      { title: 'Instalación de certificado SSL', text: 'Instalamos y configuramos tu certificado SSL gratuito para que tu sitio sea seguro (HTTPS) desde el primer día.' },
      { title: 'Migración gratuita', text: 'Migramos tu sitio web y dominio desde tu proveedor actual sin costo y sin tiempo de inactividad.' },
      { title: 'Optimización de rendimiento', text: 'Configuramos caché, compresión y otras optimizaciones para que tu sitio cargue lo más rápido posible.' },
    ],
    domainsTitle: ['Dominios y', { em: 'correos corporativos' }] as const,
    domains: [
      { title: 'Registro de dominio', text: 'Registra tu dominio .com, .pe o .net con gestión y renovación automática.', items: ['.com, .pe, .net, .org', 'Protección de privacidad incluida', 'DNS administrado', 'Al comprar un dominio recibes 10 correos corporativos de 1 GB gratis'] },
      { title: 'Correos corporativos', text: 'Cada correo incluye 1 GB de espacio. Contrata a tu medida, sin mínimos.', items: ['1 GB de espacio por cuenta', 'tu@tuempresa.com profesional', 'Webmail y soporte IMAP/SMTP', 'Protección anti-spam', '10 correos gratis de 1 GB al comprar un dominio'] },
    ],
    contactTitle: ['¿Necesitas ayuda', { em: 'para elegir tu plan?' }] as const,
    header: { contactButton: 'Contactar', aiAssistant: 'Asistente IA', aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.' },
    copyright: 'DEVMARK. Todos los derechos reservados.',
  },
  en: {
    title: ['Professional hosting', { em: 'for your business' }] as const,
    description: 'We are direct Hostinger partners: with the DEVMARK code you get a discount on hosting, VPS, domains and professional email, and we set up your email and SSL certificate for free.',
    cta: 'Get 20% off',
    coupon: 'Coupon',
    copy: 'Copy',
    copied: 'Copied!',
    perks: ['Discount on hosting, VPS, domains and email', 'Free domain and site migration', '24/7 support', '30-day money-back guarantee'],
    featuresTitle: ['Everything you need', { em: 'to be online' }] as const,
    plansTitle: ['Hosting', { em: 'plans' }] as const,
    plansText: 'Every plan includes free setup of your professional email and SSL certificate by our team.',
    popular: 'Most popular',
    hire: 'Get it now',
    includedTitle: ['Services', { em: 'included' }] as const,
    included: [
      { title: 'Professional email setup', text: 'We set up your professional email accounts (contact@yourcompany.com, sales@yourcompany.com, etc.) at no extra cost.' },
      { title: 'SSL certificate installation', text: 'We install and configure your free SSL certificate so your site is secure (HTTPS) from day one.' },
      { title: 'Free migration', text: 'We move your website and domain from your current provider at no cost and with no downtime.' },
      { title: 'Performance tuning', text: 'We configure caching, compression and other optimizations so your site loads as fast as possible.' },
    ],
    domainsTitle: ['Domains and', { em: 'professional email' }] as const,
    domains: [
      { title: 'Domain registration', text: 'Register your .com, .pe or .net domain with management and automatic renewal.', items: ['.com, .pe, .net, .org', 'Privacy protection included', 'Managed DNS', 'Buy a domain and get 10 free 1 GB email accounts'] },
      { title: 'Professional email', text: 'Each mailbox includes 1 GB of space. Get exactly what you need, no minimums.', items: ['1 GB per account', 'you@yourcompany.com', 'Webmail and IMAP/SMTP', 'Anti-spam protection', '10 free 1 GB mailboxes when you buy a domain'] },
    ],
    contactTitle: ['Need help', { em: 'choosing a plan?' }] as const,
    header: { contactButton: 'Contact', aiAssistant: 'AI Assistant', aiAssistantTooltip: "Hi! I'm your AI assistant." },
    copyright: 'DEVMARK. All rights reserved.',
  },
} as const;

const Title = ({ parts }: { parts: readonly [string, { readonly em: string }] }) => (
  <>
    {parts[0]} <em>{parts[1].em}</em>
  </>
);

/** Hosting: cupon de Hostinger, caracteristicas, planes, servicios incluidos y dominios. */
export function HostingPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <div className="bg-paper">
      <Header lang={lang} {...t.header} />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <PageHero
          title={t.title}
          description={t.description}
          actions={
            <>
              <a href={REFERRAL} target="_blank" rel="noopener noreferrer" className="btn-light">
                <span className="btn-tile">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                {t.cta}
              </a>
              <CouponCopy code="DEVMARK" label={t.coupon} copyLabel={t.copy} copiedLabel={t.copied} />
            </>
          }
        >
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            {t.perks.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-periwinkle" />
                {p}
              </li>
            ))}
          </ul>
        </PageHero>

        <section className="panel-mist py-20 sm:py-28">
          <div className="panel-inner">
            <h2 className="headline reveal max-w-[18ch] text-[clamp(2rem,4.2vw,3.5rem)]">
              <Title parts={t.featuresTitle} />
            </h2>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {hostingFeatures[lang].map((f) => {
                const Icon = icons[f.icon as keyof typeof icons];
                return (
                  <div key={f.title} className="reveal rounded-2xl bg-white p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-mist text-ink">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="headline mt-8 text-2xl">{f.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{f.description}</p>
                    <ul className="mt-5 space-y-2 border-t border-ink/10 pt-5">
                      {f.features.map((x) => (
                        <li key={x} className="flex items-center gap-2.5 text-[15px]">
                          <Check className="h-4 w-4 shrink-0 text-primary" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="panel-paper py-20 sm:py-28">
          <div className="panel-inner">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <h2 className="headline reveal text-[clamp(2rem,4.2vw,3.5rem)]">
                <Title parts={t.plansTitle} />
              </h2>
              <p className="reveal max-w-[46ch] text-[17px] text-ink/70">{t.plansText}</p>
            </div>
            <div className="mt-12 grid gap-3 md:grid-cols-3">
              {hostingPlans[lang].map((plan) => (
                <div key={plan.name} className={cn('reveal flex flex-col rounded-2xl p-7', plan.recommended ? 'bg-ink text-white' : 'bg-mist')}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="headline text-2xl">{plan.name}</h3>
                    {plan.recommended && <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs">{t.popular}</span>}
                  </div>
                  <p className="headline mt-6 text-[clamp(2rem,3.4vw,2.75rem)]">{plan.price}</p>
                  <p className={cn('mt-3 text-[15px]', plan.recommended ? 'text-ink-muted' : 'text-ink/65')}>{plan.description}</p>
                  <ul className={cn('mt-6 space-y-2.5 border-t pt-6', plan.recommended ? 'border-white/10' : 'border-ink/10')}>
                    {plan.features.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-[15px]">
                        <Check className={cn('mt-0.5 h-4 w-4 shrink-0', plan.recommended ? 'text-periwinkle' : 'text-primary')} />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <a href={REFERRAL} target="_blank" rel="noopener noreferrer" className={cn('mt-8', plan.recommended ? 'btn-light' : 'btn-ink')}>
                    <span className="btn-tile">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                    {t.hire}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel bg-band py-20 text-ink sm:py-28">
          <div className="panel-inner grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="headline reveal text-[clamp(2rem,4.2vw,3.5rem)]">
                <Title parts={t.includedTitle} />
              </h2>
              <dl className="mt-10 grid gap-3 sm:grid-cols-2">
                {t.included.map((x) => (
                  <div key={x.title} className="reveal rounded-2xl bg-white/70 p-5">
                    <dt className="headline text-xl">{x.title}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-ink/70">{x.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="headline reveal text-[clamp(2rem,4.2vw,3.5rem)]">
                <Title parts={t.domainsTitle} />
              </h2>
              <div className="mt-10 space-y-3">
                {t.domains.map((d) => (
                  <div key={d.title} className="reveal rounded-2xl bg-white p-6">
                    <h3 className="headline text-2xl">{d.title}</h3>
                    <p className="mt-2 text-[15px] text-ink/70">{d.text}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {d.items.map((x) => (
                        <li key={x} className="flex items-start gap-2 text-[15px]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Contact {...contactContent[lang]} heading={t.contactTitle} />
      </main>
      <Footer lang={lang} copyright={t.copyright} />
    </div>
  );
}
