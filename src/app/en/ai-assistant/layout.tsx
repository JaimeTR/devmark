import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Assistant to Answer Your Questions Instantly',
  description: 'Chat with our AI assistant to get instant answers about our web development, custom software, and other digital services in Peru, free of charge.',
  keywords: 'AI assistant, chatbot, support, help, web development, software',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/en/ai-assistant',
    languages: {
      es: 'https://devmarkpe.com/ai-assistant',
      en: 'https://devmarkpe.com/en/ai-assistant',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/ai-assistant',
    title: 'AI Assistant - Devmark | Chat with AI',
    description: 'Chat with our AI assistant to answer questions about our web development and software services.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'DEVMARK AI assistant' }],
  },
};

export default function EnAIAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
