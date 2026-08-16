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
  badge: "Efficiency and Productivity",
  title: "Process automation",
  description: "We optimize your workflows and eliminate repetitive tasks through automation with tools like Zapier, Make, or custom APIs.",
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
  title: 'Automation that works for you',
  subtitle: 'A four-step approach to freeing up your team.',
  steps: [
    { title: "Marketing and sales automation", description: "We create flows for lead capture, contact nurturing, and sales follow-up, integrating your CRM with other tools." },
    { title: "Report generation", description: "We automate data collection and the generation of periodic reports so you always have key business information at hand." },
    { title: "Back-office tasks", description: "We free up your team from administrative tasks such as data entry, notifications, and file synchronization between platforms." },
    { title: "Custom integrations", description: "If standard tools are not enough, we develop custom integrations using APIs to connect any service." },
  ],
};

const faqContent = {
  title: "Frequently asked questions",
  items: [
    {
      question: "Which of my company's processes can be automated?",
      answer: "Virtually any repetitive, rule-based digital task can be automated. From marketing and sales to finance and human resources. We analyze your processes and propose the best solutions."
    },
    {
      question: "Do I need technical knowledge to manage the automations?",
      answer: "No. We use intuitive platforms like Zapier or Make that allow you to visualize and understand the workflows. We also offer training and support so you can manage them yourself."
    },
    {
      question: "What is the return on investment for automation?",
      answer: "The ROI is reflected in time savings, reduction of human errors, increased productivity, and the ability of your team to focus on higher-value strategic tasks."
    }
  ]
};

const pricingContent = {
  title: "Plans & pricing",
  subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
  plans: [
    {
      name: "Starter",
      price: "S/ 1500",
      description: "Automation of a simple process.",
      features: [
        "Process analysis",
        "1 automated flow",
        "Tool integrations",
        "Documentation",
        "Email support"
      ],
      buttonText: "Get a quote",
      priceId: "price_1..." // Replace with your Stripe Price ID
    },
    {
      name: "Business",
      price: "S/ 3500",
      description: "Automation of multiple processes.",
      features: [
        "Everything in Starter",
        "Up to 3 automated flows",
        "CRM/ERP integration",
        "Control panel",
        "Training included",
        "Priority support"
      ],
      buttonText: "Get a quote",
      priceId: "price_2...", // Replace with your Stripe Price ID
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Complete operations automation.",
      features: [
        "Everything in Business",
        "Unlimited flows",
        "Advanced integrations",
        "Robotic automation (RPA)",
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

export default function ProcessAutomationPage() {
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