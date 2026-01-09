
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Pricing } from '@/components/landing/sections/pricing';
import { Contact } from '@/components/landing/sections/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, BrainCircuit, ShoppingCart } from 'lucide-react';

const headerContent = {
  lang: 'en' as const,
  navLinks: [],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const serviceDetails = {
    title: "Chatbots with Artificial Intelligence",
    description: "We implement intelligent chatbots on your website, e-commerce, or social media, trained with your own information to provide 24/7 support and boost your sales.",
    badge: "Virtual Assistants",
    features: [
        {
            icon: BrainCircuit,
            title: "Custom Training",
            description: "We train the chatbot with your knowledge base (documents, website, FAQs) so it responds accurately and consistently with your brand."
        },
        {
            icon: MessageSquare,
            title: "24/7 Support",
            description: "Your chatbot will handle inquiries, resolve doubts, and guide users at any time, improving customer satisfaction."
        },
        {
            icon: ShoppingCart,
            title: "Sales Assistant",
            description: "The chatbot can recommend products, answer questions about them, and guide customers through the purchase process, increasing conversions."
        },
        {
            icon: Bot,
            title: "Multichannel Integration",
            description: "We deploy your chatbot on your website, WhatsApp, Messenger, and other platforms to be where your customers are."
        }
    ]
};

const faqContent = {
  title: "Frequently Asked Questions",
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
    title: "Plans & Pricing",
    subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
    plans: [
      {
        name: "Basic",
        price: "S/ 1600",
        description: "Ideal for startups and personal projects.",
        features: [
          "Responsive web design",
          "3 custom pages",
          "Basic SEO optimization",
          "Email support"
        ],
        buttonText: "Get a quote",
        priceId: "price_1..." // Replace with your Stripe Price ID
      },
      {
        name: "Professional",
        price: "S/ 2800",
        description: "Perfect for growing businesses.",
        features: [
          "Everything in Basic",
          "Up to 10 pages",
          "CMS integration",
          "Priority support"
        ],
        buttonText: "Get a quote",
        priceId: "price_2..." // Replace with your Stripe Price ID
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Complete solutions for large corporations.",
        features: [
          "Everything in Professional",
          "Unlimited pages",
          "E-commerce functionality",
          "24/7 support"
        ],
        buttonText: "Contact Us",
        priceId: ""
      }
    ]
  };

const contactContent = {
    lang: 'en' as const,
    title: "Let's Talk About Your Project",
    description: "Ready to take your business to the next level? Complete the form or schedule a meeting and our global team will contact you shortly.",
    contactSubtitle: "Contact us now",
    emailLabel: "Email:",
    email: "contacto@devmarkpe.com",
    phoneLabel: "Phone:",
    phone: "+51 975 646 074",
    timeZoneLabel: "Schedule:",
    formTitle: "Contact Form",
    formDescription: "Send us a message and let's start building something amazing together.",
    firstNameLabel: "First Name",
    firstNamePlaceholder: "Your first name",
    lastNameLabel: "Last Name",
    lastNamePlaceholder: "Your last name",
    emailFormLabel: "Email Address",
    emailPlaceholder: "your@email.com",
    phoneFormLabel: "Phone",
    phonePlaceholder: "Your phone number",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your project...",
    submitButton: "Send Message",
    scheduleButton: "Schedule a meeting with Meet",
    quoteButton: "Quote your Project with our AI"
};

const footerContent = {
    copyright: "DevMark. All rights reserved."
};

export default function AIChatbotsPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
            <section id="service-hero" className="py-12 md:py-20 text-center">
                <Badge variant="outline" className="mb-4 text-primary border-primary/50">{serviceDetails.badge}</Badge>
                <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-gradient">{serviceDetails.title}</h1>
                <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">{serviceDetails.description}</p>
            </section>
            
            <section id="features" className="py-12 md:py-20">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {serviceDetails.features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-primary/5">
                            <feature.icon className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            <section id="faq" className="py-12 md:py-20 max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl sm:text-4xl text-center font-bold tracking-tighter mb-8">{faqContent.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqContent.items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
            
            <Pricing {...pricingContent} />
            <Contact {...contactContent} />
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
