import Link from 'next/link';
import { Calculator } from 'lucide-react';
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
    <div className="bg-paper">
      <Header {...headerContent} />
      <main id="main-content">
        <section className="panel-mist mt-2 pb-16 pt-28 sm:mt-3 sm:pt-36">
          <div className="panel-inner">
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 lg:gap-40">
            <div className="flex flex-col gap-6">
              <AiChatbot {...chatbotContent} />
              <div className="text-center">
                <Link href="/en/quote" className="btn-ink">
                  <span className="btn-tile">
                    <Calculator className="h-5 w-5" />
                  </span>
                  Quote my project with AI
                </Link>
              </div>
            </div>
            <SeoOptimizer {...seoOptimizerContent} />
          </div>
          </div>
        </section>
      </main>
      <Footer lang="en" copyright={footerContent.copyright} />
    </div>
  );
}
