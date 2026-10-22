import { Suspense } from 'react';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { Contact } from '@/components/home/contact';
import { homeContent, type Lang } from '@/content/home';
import { contactContent } from '@/content/home-data';
import { Hero } from './hero';
import { ServiceBand } from './service-band';
import { Intro } from './intro';
import { ServicesShowcase } from './services-showcase';
import { Why } from './why';
import { Process } from './process';
import { Projects } from './projects';
import { HostingBand } from './hosting-band';
import { Testimonials } from './testimonials';
import { BlogTeaser } from './blog-teaser';
import { Faq } from './faq';
import { Products } from './products';
import { ClientPortal } from './client-portal';

const headerCopy = {
  es: { contactButton: 'Contactar', aiAssistant: 'Asistente IA', aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.' },
  en: { contactButton: 'Contact', aiAssistant: 'AI Assistant', aiAssistantTooltip: "Hi! I'm your AI assistant." },
} as const;

const copyright = { es: 'DEVMARK. Todos los derechos reservados.', en: 'DEVMARK. All rights reserved.' } as const;

/** La portada: una pila de paneles enmarcados, del hero tinta al pie. */
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <div className="bg-paper">
      <Header lang={lang} {...headerCopy[lang]} />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <div>
          <Hero lang={lang} />
          <ServiceBand lang={lang} />
        </div>
        <Intro lang={lang} />
        <ServicesShowcase lang={lang} />
        <Why lang={lang} />
        <Process lang={lang} />
        <ClientPortal lang={lang} />
        <Suspense fallback={<div className="panel-paper h-[640px]" />}>
          <Projects lang={lang} />
        </Suspense>
        <Products lang={lang} />
        <HostingBand lang={lang} />
        <Testimonials lang={lang} />
        <Contact {...contactContent[lang]} heading={homeContent[lang].contact.title} />
        <BlogTeaser lang={lang} />
        <Faq lang={lang} />
      </main>
      <Footer lang={lang} copyright={copyright[lang]} />
    </div>
  );
}
