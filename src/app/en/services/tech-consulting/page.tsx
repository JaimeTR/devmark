import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const headerContent = {
  lang: 'en' as const,
  navLinks: [],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const heroContent = {
  badge: "Strategy and Growth",
  title: "Technology consulting",
  description: "We guide you in the digital transformation of your business, helping you choose the right tools, optimize processes, and build a solid and scalable technology strategy.",
  lang: 'en' as const,
  form: {
    title: 'Tell us about your project',
    firstNameLabel: 'First Name',
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
  title: 'Strategy that drives growth',
  subtitle: 'A four-step plan to transform your business digitally.',
  steps: [
    { title: "Process digitalization", description: "We analyze your operations and propose a plan to digitize and automate tasks, increasing efficiency and reducing costs." },
    { title: "Platform selection", description: "We help you choose the platforms (CRM, ERP, CMS) that best suit your needs and budget, ensuring successful implementation." },
    { title: "Scalability strategies", description: "We plan the architecture of your software and systems so they can grow with your business in a sustainable and secure way." },
    { title: "Innovation and new technologies", description: "We keep you at the forefront, exploring how new technologies like AI can add value and a competitive advantage to your company." },
  ],
};

const faqContent = {
  title: "Frequently asked questions",
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
  title: "Plans & pricing",
  subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
  plans: [
    {
      name: "Starter",
      price: "S/ 30",
      description: "On-demand consulting, pay only for hours used.",
      period: "/hour",
      features: [
        "On-demand tech consulting",
        "Analysis of your need",
        "Actionable recommendations",
        "No commitment"
      ],
      buttonText: "Get a quote",
      priceId: "price_1..." // Replace with your Stripe Price ID
    },
    {
      name: "Business",
      price: "S/ 450",
      description: "15-hour consulting pack for your project.",
      features: [
        "Everything in Starter",
        "15 consulting hours",
        "Tech improvement plan",
        "Priority attention"
      ],
      buttonText: "Get a quote",
      priceId: "price_2...", // Replace with your Stripe Price ID
      recommended: true
    },
    {
      name: "Enterprise",
      price: "S/ 900",
      description: "30-hour strategic consulting pack.",
      features: [
        "Everything in Business",
        "30 consulting hours",
        "Complete tech strategy",
        "Project support",
        "24/7 support"
      ],
      buttonText: "Contact Us",
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
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}