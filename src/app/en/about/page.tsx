import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import Link from 'next/link';
import { CodeXml, ShieldCheck, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Web & Software Development Agency in Peru',
  description: 'Meet Devmark: a studio in Lima, Peru that fuses strategy, design, and technology to help businesses grow with clarity, focus, and confidence.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/about',
    languages: {
      es: 'https://devmarkpe.com/nosotros',
      en: 'https://devmarkpe.com/en/about',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/about',
    title: 'About Us | Devmark - Web & Software Development Agency in Peru',
    description: 'Meet Devmark: a studio in Lima, Peru that fuses strategy, design, and technology.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'About DEVMARK' }],
  },
};

const content = {
  lang: 'en',
  header: {
    lang: 'en' as const,
    navLinks: [
      { href: '/en#hero', label: 'Home' },
      { href: '/en/about', label: 'About' },
      { href: '/en/services', label: 'Services' },
      { href: '/en/portfolio', label: 'Portfolio' },
      { href: '/en/hosting', label: 'Hosting' },
      { href: '/en#contact', label: 'Contact' },
    ],
    contactButton: 'Contact',
    aiAssistant: 'AI Assistant',
    aiAssistantTooltip: 'Hello! I am your AI assistant.',
  },
  footer: {
    copyright: 'DEVMARK. All rights reserved.',
  },
} as const;

const values = [
  {
    icon: ShieldCheck,
    accentVar: '--primary',
    title: 'Transparency',
    description: 'Clear communication at every stage of the project — no fine print, no surprises on the invoice.',
  },
  {
    icon: CodeXml,
    accentVar: '--chart-4',
    title: 'Technical quality',
    description: 'Clean, scalable code. We build for day 100, not just for launch day.',
  },
  {
    icon: Users,
    accentVar: '--chart-2',
    title: 'Closeness',
    description: 'We work side by side with you, as part of your team, not as just another outside vendor.',
  },
  {
    icon: TrendingUp,
    accentVar: '--chart-5',
    title: 'Measurable results',
    description: 'Every design or development decision is backed by data, not by intuition.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...content.header} />
      <main>
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-lavender/30 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center relative">
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-brand-blue/90 backdrop-blur-md text-white border border-white/20 shadow-lg shadow-brand-blue/25">
              <CodeXml className="w-5 h-5 text-brand-lavender" />
              <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">About DEVMARK</span>
            </div>

            <h1 className="mt-6 font-medium text-4xl sm:text-5xl lg:text-6xl text-slate-950 leading-tight">
              Strategy, design, and technology at one table
            </h1>

            <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              DEVMARK is a web and software development studio based in Lima, Peru. We&apos;re not a template with
              your logo on top: every project starts from business strategy, not just from code.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl shadow-xl shadow-brand-blue/10 p-8 md:p-10 space-y-4">
              <h2 className="font-semibold text-2xl text-brand-navy">How we started</h2>
              <p className="text-slate-600 leading-relaxed">
                DEVMARK started from a simple idea: most Peruvian businesses don&apos;t need another generic
                template, they need a team that understands their industry and turns that into a website or
                software that actually moves the needle. We started working with clinics, real estate agencies,
                and law firms, and today we support e-commerce, healthcare, and tech companies in Peru and abroad.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We stay a small team on purpose: it means whoever designs your project is also the one answering
                your messages, not a lost ticket in a support queue.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-semibold text-3xl sm:text-4xl text-brand-navy">What guides us</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Four principles we don&apos;t negotiate on, project after project.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    style={{ '--accent': `var(${value.accentVar})` } as React.CSSProperties}
                    className="flex items-start gap-4 bg-brand-light p-6 rounded-2xl border border-slate-100"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-[hsl(var(--accent))] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-brand-navy">{value.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-semibold text-3xl sm:text-4xl text-brand-navy">Let&apos;s talk about your project</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Tell us what you need and we&apos;ll tell you, straight up, if we can help.
            </p>
            <div className="mt-8">
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2.5 h-[52px] px-8 rounded-2xl border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white font-semibold shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                Contact us
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" copyright={content.footer.copyright} />
    </div>
  );
}
