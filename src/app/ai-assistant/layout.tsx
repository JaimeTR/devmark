import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asistente IA para Resolver tus Dudas al Instante',
  description: 'Conversa con nuestro asistente de inteligencia artificial y resuelve tus dudas sobre desarrollo web, software a medida y demás servicios de Devmark.',
  keywords: 'asistente IA, chatbot, soporte, ayuda, desarrollo web, software',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/ai-assistant',
    languages: {
      es: 'https://devmarkpe.com/ai-assistant',
      en: 'https://devmarkpe.com/en/ai-assistant',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/ai-assistant',
    title: 'Asistente IA - Devmark | Chat con IA',
    description: 'Conversa con nuestro asistente de IA para resolver dudas sobre nuestros servicios de desarrollo web y software.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Asistente IA - DEVMARK' }],
  },
};

export default function AIAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
