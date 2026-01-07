import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Assistant - DevMark | Chat with AI',
  description: 'Chat with our AI assistant to answer questions about our web development and software services.',
  keywords: 'AI assistant, chatbot, support, help, web development, software',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/en/ai-assistant',
  },
};

export default function EnAIAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
