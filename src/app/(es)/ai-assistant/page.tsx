import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { AiHero } from '@/components/ai/ai-hero';
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
    title: "Devi",
    subtitle: "Chatea con nuestra IA",
    description: "Hazme cualquier pregunta sobre nuestros servicios, precios o cualquier otra consulta que tengas.",
    inputPlaceholder: "Escribe tu pregunta aquí...",
    submitButton: "Enviar",
    loadingMessage: "Pensando...",
    initialMessage: "¡Hola! Soy Devi, el asistente virtual de DEVMARK. Puedes preguntarme sobre nuestros servicios, planes, precios o cualquier otra duda que tengas. ¡Estoy aquí para ayudarte!",
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
        <AiHero lang="es" kind="assistant" />
        <section className="panel-mist mt-2 py-14 sm:mt-3 sm:py-20">
          <div className="panel-inner">
            <AiChatbot {...chatbotContent} />
          </div>
        </section>
      </main>
      <Footer lang="es" copyright={footerContent.copyright} />
    </div>
  );
}
