import { AnimatedBackground } from '@/components/landing/animated-background';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { AiChatbot } from '@/components/ai/ai-chatbot';
import { SeoOptimizer } from '@/components/ai/seo-optimizer';

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

const seoOptimizerContent = {
  badge: 'HERRAMIENTA DIGITAL',
  title: 'Optimizador de Contenido con IA',
  subtitle:
    'Potencia tu marketing con nuestra IA. Ingresa tu texto y palabras clave relevantes para obtener una versión optimizada para SEO y claridad.',
  contentLabel: 'Contenido a Optimizar',
  contentPlaceholder:
    "Ej: 'Nuestra empresa vende los mejores zapatos del mundo...'",
  keywordsLabel: 'Palabras Clave (separadas por coma)',
  keywordsPlaceholder:
    "Ej: 'zapatos de cuero', 'tienda de zapatos online', 'calzado'",
  submitButton: 'Optimizar Contenido',
  submitButtonPending: 'Optimizando...',
  resultsTitle: 'Resultados de la Optimización',
  resultsDescription:
    'El contenido mejorado y las sugerencias aparecerán aquí.',
  optimizedContentLabel: 'Contenido Optimizado',
  suggestionsLabel: 'Sugerencias',
  placeholder: 'La magia de la IA aparecerá aquí.',
};

const chatbotContent = {
    badge: "DEVMARKAI",
    title: "Asistente Virtual DevMark",
    subtitle: "Chatea con nuestra IA",
    description: "Hazme cualquier pregunta sobre nuestros servicios, precios o cualquier otra consulta que tengas.",
    inputPlaceholder: "Escribe tu pregunta aquí...",
    submitButton: "Enviar",
    loadingMessage: "Pensando...",
    initialMessage: "¡Hola! Soy el asistente virtual de DevMark. Puedes preguntarme sobre nuestros servicios, planes, precios o cualquier otra duda que tengas. ¡Estoy aquí para ayudarte!",
}


const footerContent = {
  copyright: 'DevMark. Todos los derechos reservados.',
};

export default function AiAssistantPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 lg:gap-40">
            <AiChatbot {...chatbotContent} />
            <SeoOptimizer {...seoOptimizerContent} />
          </div>
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
