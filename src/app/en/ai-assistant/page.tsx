import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { AnimatedBackground } from '@/components/home/animated-background';
import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { AiChatbot } from '@/components/ai/ai-chatbot';
import { SeoOptimizer } from '@/components/ai/seo-optimizer';

const headerContent = {
  lang: 'en' as const,
  navLinks: [],
  contactButton: 'Contact',
  aiAssistant: 'AI assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const seoOptimizerContent = {
  badge: 'DIGITAL TOOL',
  title: 'AI content optimizer',
  subtitle:
    'Power up your marketing with our AI. Enter your text and relevant keywords to get a version optimized for SEO and clarity.',
  contentLabel: 'Content to optimize',
  contentPlaceholder:
    "E.g.: 'Our company sells the best shoes in the world...'",
  keywordsLabel: 'Keywords (comma-separated)',
  keywordsPlaceholder:
    "E.g.: 'leather shoes', 'online shoe store', 'footwear'",
  submitButton: 'Optimize content',
  submitButtonPending: 'Optimizing...',
  resultsTitle: 'Optimization results',
  resultsDescription:
    'The improved content and suggestions will appear here.',
  optimizedContentLabel: 'Optimized content',
  suggestionsLabel: 'Suggestions',
  placeholder: 'The magic of AI will appear here.',
};

const chatbotContent = {
    badge: "VIRTUAL ASSISTANT",
    title: "DEVMARKAI",
    subtitle: "Chat with our AI",
    description: "Ask me any questions about our services, prices, or any other inquiries you may have.",
    inputPlaceholder: "Type your question here...",
    submitButton: "Send",
    loadingMessage: "Thinking...",
    initialMessage: "Hello! I am DEVMARKAI. You can ask me about our services, plans, prices, or any other questions you may have. I'm here to help!",
    lang: 'en' as const,
}


const footerContent = {
  copyright: 'DEVMARK. All rights reserved.',
};

export default function AiAssistantPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 lg:gap-40">
            <div className="flex flex-col gap-6">
              <AiChatbot {...chatbotContent} />
              <div className="text-center">
                <Link
                  href="/en/quote"
                  className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-2xl bg-white border-2 border-brand-blue text-brand-blue hover:bg-transparent font-semibold text-sm transition-all duration-300"
                >
                  Quote my project with AI
                  <Calculator className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <SeoOptimizer {...seoOptimizerContent} />
          </div>
        </div>
      </main>
      <Footer lang="en" copyright={footerContent.copyright} />
    </div>
  );
}
