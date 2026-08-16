import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chatbots for Websites and Online Stores in Peru',
  description: 'Intelligent chatbots for your website, online store, or social media, trained with your own information to provide 24/7 support and boost sales.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/services/ai-chatbots',
    languages: {
      es: 'https://devmarkpe.com/servicios/chatbots-ia',
      en: 'https://devmarkpe.com/en/services/ai-chatbots',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/services/ai-chatbots',
    title: 'AI Chatbots | Devmark Peru',
    description: 'Intelligent chatbots trained with your own information for 24/7 support and more sales.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AI chatbots - DEVMARK' }],
  },
};

const headerContent = {
  lang: 'en' as const,
  navLinks: [],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const heroContent = {
  badge: "Virtual assistants",
  title: "Chatbots with artificial intelligence",
  description: "We implement intelligent chatbots on your website, e-commerce, or social media, trained with your own information to provide 24/7 support and boost your sales.",
  lang: 'en' as const,
  form: {
    title: 'Tell us about your project',
    firstNameLabel: 'First name',
    firstNamePlaceholder: 'Your first name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    phoneLabel: 'Phone',
    phonePlaceholder: 'Your phone number',
    messageLabel: 'Message',
    messagePlaceholder: 'Tell us what you need for your project...',
    submitButton: 'Request information',
    successMessage: 'Message sent! An advisor will contact you soon.',
    errorMessage: 'Something went wrong. Please try again.',
  },
};

const methodologyContent = {
  badge: 'Our methodology',
  title: 'From training to deployment',
  subtitle: 'A four-step process to launch your intelligent assistant.',
  steps: [
    { title: "Custom training", description: "We train the chatbot with your knowledge base (documents, website, FAQs) so it responds accurately and consistently with your brand." },
    { title: "24/7 support", description: "Your chatbot will handle inquiries, resolve doubts, and guide users at any time, improving customer satisfaction." },
    { title: "Sales assistant", description: "The chatbot can recommend products, answer questions about them, and guide customers through the purchase process, increasing conversions." },
    { title: "Multichannel integration", description: "We deploy your chatbot on your website, WhatsApp, Messenger, and other platforms to be where your customers are." },
  ],
};

const faqContent = {
  title: "Frequently asked questions",
  items: [
    {
      question: "Can the chatbot understand complex questions?",
      answer: "Yes, we use advanced language models that allow the chatbot to understand the context, intent, and variations in user questions to provide coherent and useful answers."
    },
    {
      question: "What happens if the chatbot doesn't know the answer?",
      answer: "We set up an escalation system so that if the chatbot cannot resolve a query, it can seamlessly transfer the conversation to a human agent."
    },
    {
      question: "Can I see the conversations the chatbot has?",
      answer: "Yes, you will have access to a dashboard where you can review conversations, analyze the most frequent questions, and gain valuable insights into your customers' needs."
    }
  ]
};

const pricingContent = {
  title: "Plans & pricing",
  subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
  plans: [
    {
      name: "Starter",
      price: "S/ 1200",
      description: "Flow-based chatbot on WhatsApp or your website.",
      features: [
        "Base conversational chatbot",
        "Predefined flows and menus",
        "WhatsApp integration",
        "Initial training",
        "Email support"
      ],
      buttonText: "Get a quote",
      priceId: "price_1..." // Replace with your Stripe Price ID
    },
    {
      name: "Business",
      price: "S/ 2500",
      description: "AI chatbot trained on your business.",
      features: [
        "Everything in Starter",
        "Personalized generative AI",
        "Training with your info",
        "Multichannel integration",
        "Conversation dashboard",
        "Priority support"
      ],
      buttonText: "Get a quote",
      priceId: "price_2...", // Replace with your Stripe Price ID
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "AI assistant integrated with your operations.",
      features: [
        "Everything in Business",
        "CRM/ERP integration",
        "Sales assistant",
        "Order automation",
        "24/7 support"
      ],
      buttonText: "Contact us",
      priceId: ""
    }
  ]
};

const contactContent = {
  lang: 'en' as const,
  title: "Let's talk about your project",
  description: "Ready to take your business to the next level? Complete the form or schedule a meeting and our global team will contact you shortly.",
  contactSubtitle: "Contact us now",
  emailLabel: "Email:",
  email: "contacto@devmarkpe.com",
  phoneLabel: "Phone:",
  phone: "+51 975 646 074",
  timeZoneLabel: "Schedule:",
  formTitle: "Contact form",
  formDescription: "Send us a message and let's start building something amazing together.",
  firstNameLabel: "First name",
  firstNamePlaceholder: "Your first name",
  lastNameLabel: "Last name",
  lastNamePlaceholder: "Your last name",
  emailFormLabel: "Email address",
  emailPlaceholder: "your@email.com",
  phoneFormLabel: "Phone",
  phonePlaceholder: "Your phone number",
  messageLabel: "Message",
  messagePlaceholder: "Tell us about your project...",
  submitButton: "Send message",
  scheduleButton: "Schedule a meeting with Meet",
  quoteButton: "Quote your project with our AI"
};

const footerContent = {
  copyright: "DEVMARK. All rights reserved."
};

export default function AIChatbotsPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Chatbots with artificial intelligence",
            "description": "We implement intelligent chatbots on your website, e-commerce, or social media, trained with your own information to provide 24/7 support and boost your sales.",
            "provider": {
              "@type": "Organization",
              "name": "Devmark",
              "url": "https://devmarkpe.com"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Lima"
              },
              {
                "@type": "Country",
                "name": "Peru"
              }
            ],
            "url": "https://devmarkpe.com/en/services/ai-chatbots",
            "inLanguage": "en-US"
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can the chatbot understand complex questions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we use advanced language models that allow the chatbot to understand the context, intent, and variations in user questions to provide coherent and useful answers."
                }
              },
              {
                "@type": "Question",
                "name": "What happens if the chatbot doesn't know the answer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We set up an escalation system so that if the chatbot cannot resolve a query, it can seamlessly transfer the conversation to a human agent."
                }
              },
              {
                "@type": "Question",
                "name": "Can I see the conversations the chatbot has?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you will have access to a dashboard where you can review conversations, analyze the most frequent questions, and gain valuable insights into your customers' needs."
                }
              }
            ]
          }),
        }}
      />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <ServiceHero {...heroContent} />

          <Pricing {...pricingContent} />

          <ServiceMethodology {...methodologyContent} />

          <section id="faq" className="py-12 md:py-20 max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl sm:text-4xl text-center font-semibold tracking-tight mb-8">{faqContent.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqContent.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <Contact {...contactContent} />
        </div>
      </main>
      <Footer lang="en" copyright={footerContent.copyright} />
    </div>
  );
}