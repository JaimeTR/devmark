import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { AiChatbot } from '@/components/ai/ai-chatbot';

const headerContent = {
  lang: 'es' as const,
  navLinks: [
    { href: '/#hero', label: 'Inicio' },
    { href: '/#services', label: 'Servicios' },
    { href: '/portfolio', label: 'Portafolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
  ],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const chatbotContent = {
    badge: "ASISTENTE VIRTUAL",
    title: "DEVMARKAI",
    subtitle: "Chatea con nuestra IA",
    description: "Hazme cualquier pregunta sobre nuestros servicios, precios o cualquier otra consulta que tengas.",
    inputPlaceholder: "Escribe tu pregunta aquí...",
    submitButton: "Enviar",
    loadingMessage: "Pensando...",
    initialMessage: "¡Hola! Soy DEVMARKAI. Puedes preguntarme sobre nuestros servicios, planes, precios o cualquier otra duda que tengas. ¡Estoy aquí para ayudarte!",
    lang: 'es' as const,
}


const footerContent = {
  copyright: 'DEVMARK. Todos los derechos reservados.',
};

export default function AiAssistantPage() {
  return (
    <div className="bg-paper">
      <Header {...headerContent} />
      <main id="main-content">
        <section className="panel-mist mt-2 pb-16 pt-28 sm:mt-3 sm:pt-36">
          <div className="panel-inner">
          <div className="text-center mb-8">
            <Link href="/quote" className="btn-ink">
              <span className="btn-tile">
                <Calculator className="h-5 w-5" />
              </span>
              Cotizar mi proyecto con IA
            </Link>
          </div>
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 lg:gap-40">
            <AiChatbot {...chatbotContent} />
          </div>
          </div>
        </section>
      </main>
      <Footer lang="es" copyright={footerContent.copyright} />
    </div>
  );
}
