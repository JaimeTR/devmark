import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { AnimatedBackground } from '@/components/home/animated-background';
import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { Button } from '@/components/ui/button';
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
  title: 'Optimizador de contenido con IA',
  subtitle:
    'Potencia tu marketing con nuestra IA. Ingresa tu texto y palabras clave relevantes para obtener una versión optimizada para SEO y claridad.',
  contentLabel: 'Contenido a optimizar',
  contentPlaceholder:
    "Ej: 'Nuestra empresa vende los mejores zapatos del mundo...'",
  keywordsLabel: 'Palabras clave (separadas por coma)',
  keywordsPlaceholder:
    "Ej: 'zapatos de cuero', 'tienda de zapatos online', 'calzado'",
  submitButton: 'Optimizar contenido',
  submitButtonPending: 'Optimizando...',
  resultsTitle: 'Resultados de la optimización',
  resultsDescription:
    'El contenido mejorado y las sugerencias aparecerán aquí.',
  optimizedContentLabel: 'Contenido optimizado',
  suggestionsLabel: 'Sugerencias',
  placeholder: 'La magia de la IA aparecerá aquí.',
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
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <div className="text-center mb-8">
            <Button asChild className="h-[52px] px-8 rounded-2xl font-semibold text-sm border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 hover:-translate-y-1 transition-all duration-300">
              <Link href="/quote">
                Cotizar mi proyecto con IA
                <Calculator className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 lg:gap-40">
            <AiChatbot {...chatbotContent} />
            {/* <SeoOptimizer {...seoOptimizerContent} /> */}
          </div>
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
