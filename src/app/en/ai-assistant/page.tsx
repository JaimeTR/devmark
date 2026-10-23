import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { AiHero } from '@/components/ai/ai-hero';
import { AiChatbot } from '@/components/ai/ai-chatbot';

const headerContent = {
  lang: 'en' as const,
  navLinks: [],
  contactButton: 'Contact',
  aiAssistant: 'AI assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
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
        <AiHero lang="en" kind="assistant" />
        <section className="panel-mist mt-2 py-14 sm:mt-3 sm:py-20">
          <div className="panel-inner">
            <AiChatbot {...chatbotContent} />
          </div>
        </section>
      </main>
      <Footer lang="en" copyright={footerContent.copyright} />
    </div>
  );
}
