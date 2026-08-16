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
  badge: "Our Process",
  title: "Custom web development",
  description: "We create unique, high-performance websites that are perfectly tailored to your business needs. From concept to launch, we accompany you every step of the way.",
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
  title: 'From concept to launch',
  subtitle: 'A clear, four-step process to build your perfect website.',
  steps: [
    { title: "Design and prototyping", description: "We start with a user-centered UI/UX design, creating interactive prototypes to visualize the final experience before writing a single line of code." },
    { title: "Frontend and backend development", description: "We use the most modern technologies (Next.js, React, Node.js) to build a fast, secure, and scalable site, with a robust backend that manages your data efficiently." },
    { title: "Integrations and automation", description: "We connect your website with the tools you already use (CRMs, ERPs, payment gateways) and automate processes to improve your business efficiency." },
    { title: "On-page SEO optimization", description: "We implement the best SEO practices from the start to ensure your site has a solid foundation to rank in search engines and attract organic traffic." },
  ],
};

const faqContent = {
  title: "Frequently asked questions",
  items: [
    {
      question: "How long does it take to develop a custom website?",
      answer: "Development time varies depending on the complexity of the project, but generally ranges from 4 to 12 weeks. We will provide you with a detailed timeline at the beginning of the project."
    },
    {
      question: "What kind of support do you offer after launch?",
      answer: "We offer ongoing maintenance and support plans to ensure your website stays up-to-date, secure, and performing optimally."
    },
    {
      question: "Can you integrate my site with other platforms?",
      answer: "Of course! We specialize in integrating with a wide variety of systems, including CRMs, ERPs, payment systems, and more, to centralize your operations."
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
      description: "Basic website with 1 to 3 pages. Great to start.",
      features: [
        "1 to 3 custom pages",
        "Responsive web design",
        "Basic SEO optimization",
        "Contact form",
        "Email support"
      ],
      buttonText: "Get a quote",
      priceId: "price_1..." // Replace with your Stripe Price ID
    },
    {
      name: "Business",
      price: "S/ 2500",
      description: "Corporate website up to 8 pages, growing.",
      features: [
        "Everything in Starter",
        "Up to 8 pages",
        "Blog included",
        "CMS integration",
        "WhatsApp integration",
        "Priority support"
      ],
      buttonText: "Get a quote",
      priceId: "price_2...", // Replace with your Stripe Price ID
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "E-commerce or custom platform.",
      features: [
        "Everything in Business",
        "Unlimited pages",
        "E-commerce functionality",
        "Payment integrations",
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

export default function CustomWebDevelopmentPage() {
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