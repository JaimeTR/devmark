import { AnimatedBackground } from '@/components/landing/animated-background';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { AiChatbot } from '@/components/ai/ai-chatbot';
import { SeoOptimizer } from '@/components/ai/seo-optimizer';

const headerContent = {
  lang: 'en',
  navLinks: [],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const seoOptimizerContent = {
  badge: 'DIGITAL TOOL',
  title: 'AI Content Optimizer',
  subtitle:
    'Power up your marketing with our AI. Enter your text and relevant keywords to get a version optimized for SEO and clarity.',
  contentLabel: 'Content to Optimize',
  contentPlaceholder:
    "E.g.: 'Our company sells the best shoes in the world...'",
  keywordsLabel: 'Keywords (comma-separated)',
  keywordsPlaceholder:
    "E.g.: 'leather shoes', 'online shoe store', 'footwear'",
  submitButton: 'Optimize Content',
  submitButtonPending: 'Optimizing...',
  resultsTitle: 'Optimization Results',
  resultsDescription:
    'The improved content and suggestions will appear here.',
  optimizedContentLabel: 'Optimized Content',
  suggestionsLabel: 'Suggestions',
  placeholder: 'The magic of AI will appear here.',
};

const chatbotContent = {
    badge: "DEVMARKAI",
    title: "DevMark Virtual Assistant",
    subtitle: "Chat with our AI",
    description: "Ask me any questions about our services, prices, or any other inquiries you may have.",
    inputPlaceholder: "Type your question here...",
    submitButton: "Send",
    loadingMessage: "Thinking...",
    initialMessage: "Hello! I am the DevMark virtual assistant. You can ask me about our services, plans, prices, or any other questions you may have. I'm here to help!",
}


const footerContent = {
  copyright: 'DevMark. All rights reserved.',
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
