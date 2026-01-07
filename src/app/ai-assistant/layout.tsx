import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asistente IA - DevMark | Chat con IA',
  description: 'Conversa con nuestro asistente de IA para resolver dudas sobre nuestros servicios de desarrollo web y software.',
  keywords: 'asistente IA, chatbot, soporte, ayuda, desarrollo web, software',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/ai-assistant',
  },
};

export default function AIAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
