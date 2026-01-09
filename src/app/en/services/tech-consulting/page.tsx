
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Pricing } from '@/components/landing/sections/pricing';
import { Contact } from '@/components/landing/sections/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Rocket, BarChart, ShieldCheck } from 'lucide-react';

const headerContent = {
  lang: 'en' as const,
  navLinks: [],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const serviceDetails = {
    title: "Technology Consulting",
    description: "We guide you in the digital transformation of your business, helping you choose the right tools, optimize processes, and build a solid and scalable technology strategy.",
    badge: "Strategy and Growth",
    features: [
        {
            icon: Rocket,
            title: "Process Digitalization",
            description: "We analyze your operations and propose a plan to digitize and automate tasks, increasing efficiency and reducing costs."
        },
        {
            icon: BarChart,
            title: "Platform Selection",
            description: "We help you choose the platforms (CRM, ERP, CMS) that best suit your needs and budget, ensuring successful implementation."
        },
        {
            icon: ShieldCheck,
            title: "Scalability Strategies",
            description: "We plan the architecture of your software and systems so they can grow with your business in a sustainable and secure way."
        },
        {
            icon: Lightbulb,
            title: "Innovation and New Technologies",
            description: "We keep you at the forefront, exploring how new technologies like AI can add value and a competitive advantage to your company."
        }
    ]
};

const faqContent = {
  title: "Frequently Asked Questions",
  items: [
    {
      question: "Is my company too small for a consultancy?",
      answer: "No, technology consulting is valuable for companies of all sizes. For SMEs, it can be key to establishing a solid technological foundation that allows for future growth without problems."
    },
    {
      question: "How do I know which technology is right for me?",
      answer: "That's our job. We conduct a thorough analysis of your business, your goals, and your budget to recommend customized solutions that truly solve your problems."
    },
    {
      question: "Does the consultancy include implementation?",
      answer: "The consultancy focuses on strategy and planning. However, as a development agency, we can offer you a comprehensive service that covers everything from consulting to implementation and support."
    }
  ]
};

const pricingContent = {
    title: "Plans & Pricing",
    subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
    plans: [
      {
        name: "Basic",
        price: "S/ 600",
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
        price: "S/ 1200",
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

export default function TechConsultingPage() {
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
