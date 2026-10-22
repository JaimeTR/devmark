import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { ServiceFaq } from '@/components/home/service-faq';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Process Automation with Zapier, Make & APIs',
  description: 'We optimize your workflows and eliminate repetitive tasks with custom automations using Zapier, Make, or APIs, saving you time and reducing errors.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/services/process-automation',
    languages: {
      es: 'https://devmarkpe.com/servicios/automatizacion-procesos',
      en: 'https://devmarkpe.com/en/services/process-automation',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/services/process-automation',
    title: 'Process Automation | Devmark Peru',
    description: 'We optimize your workflows and eliminate repetitive tasks through automation.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Process automation - DEVMARK' }],
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
  badge: "Efficiency and productivity",
  title: "Process automation",
  description: "We optimize your workflows and eliminate repetitive tasks through automation with tools like Zapier, Make, or custom APIs.",
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
      buttonText: "Contact us",
      priceId: ""
    }
  ]
};

const contactContent = {
  lang: 'en' as const,
  title: "Let's talk about your project",
  description: "Ready to take your business to the next level? Complete the form or schedule a meeting and our team will contact you shortly.",
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
  scheduleButton: 'Book a video call',
  quoteButton: "Quote your project with our AI"
};

const footerContent = {
  copyright: "DEVMARK. All rights reserved."
};

export default function ProcessAutomationPage() {
  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Process automation",
            "description": "We optimize your workflows and eliminate repetitive tasks through automation with tools like Zapier, Make, or custom APIs.",
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
            "url": "https://devmarkpe.com/en/services/process-automation",
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
                "name": "Which of my company's processes can be automated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Virtually any repetitive, rule-based digital task can be automated. From marketing and sales to finance and human resources. We analyze your processes and propose the best solutions."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need technical knowledge to manage the automations?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. We use intuitive platforms like Zapier or Make that allow you to visualize and understand the workflows. We also offer training and support so you can manage them yourself."
                }
              },
              {
                "@type": "Question",
                "name": "What is the return on investment for automation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The ROI is reflected in time savings, reduction of human errors, increased productivity, and the ability of your team to focus on higher-value strategic tasks."
                }
              }
            ]
          }),
        }}
      />
      <Header {...headerContent} />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
          <ServiceHero {...heroContent} />

          <Pricing {...pricingContent} />

          <ServiceMethodology {...methodologyContent} />

        <ServiceFaq title={faqContent.title} items={faqContent.items} />

          <Contact {...contactContent} />
      </main>
      <Footer lang="en" copyright={footerContent.copyright} />
    </div>
  );
}