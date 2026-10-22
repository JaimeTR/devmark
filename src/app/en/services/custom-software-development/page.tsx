import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { ServiceFaq } from '@/components/home/service-faq';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Software Development: ERP, CRM & SaaS',
  description: 'We build robust, scalable, and secure applications: ERP and CRM systems, SaaS platforms, and custom APIs to automate your business operations.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/services/custom-software-development',
    languages: {
      es: 'https://devmarkpe.com/servicios/desarrollo-software',
      en: 'https://devmarkpe.com/en/services/custom-software-development',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/services/custom-software-development',
    title: 'Custom Software Development | Devmark Peru',
    description: 'Robust, scalable, and secure applications: ERP, CRM, SaaS, and custom APIs.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Custom software development - DEVMARK' }],
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
  badge: "Enterprise solutions",
  title: "Custom software development",
  description: "We build robust, scalable, and secure applications, from internal management systems (ERP, CRM) to complex SaaS platforms and APIs.",
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
  title: 'Built to scale from day one',
  subtitle: 'A proven four-step approach to enterprise-grade software.',
  steps: [
    { title: "Custom systems (ERP/CRM)", description: "We develop management systems that adapt to your processes, centralizing information and improving decision-making." },
    { title: "SaaS platforms", description: "We create Software as a Service (SaaS) products from conceptualization to cloud deployment, ready to scale." },
    { title: "API development", description: "We design and build RESTful and GraphQL APIs to connect your applications, services, and data securely and efficiently." },
    { title: "Security and scalability", description: "We apply the best security practices and scalable architectures to ensure your software is reliable and ready for growth." },
  ],
};

const faqContent = {
  title: "Frequently asked questions",
  items: [
    {
      question: "How do you ensure software quality?",
      answer: "We follow agile methodologies, perform exhaustive testing (unit, integration, and user), and maintain constant communication with you to ensure the final product meets the highest quality standards."
    },
    {
      question: "Do we own the source code at the end of the project?",
      answer: "Yes, upon project completion and full payment, we deliver the entire source code and documentation. You are the sole owner of your software."
    },
    {
      question: "What technologies do you use for development?",
      answer: "We use a modern and proven technology stack that includes, among others, Node.js, React, Next.js, Python, and databases like PostgreSQL and MongoDB, always choosing the best tool for each project."
    }
  ]
};

const pricingContent = {
  title: "Plans & pricing",
  subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
  plans: [
    {
      name: "Starter",
      price: "S/ 3000",
      description: "MVP or basic system to validate your idea.",
      features: [
        "MVP or main module",
        "Administration panel",
        "Database included",
        "Responsive development",
        "Email support"
      ],
      buttonText: "Get a quote",
      priceId: "price_1..." // Replace with your Stripe Price ID
    },
    {
      name: "Business",
      price: "S/ 6500",
      description: "Custom system with 2 to 4 modules.",
      features: [
        "Everything in Starter",
        "2 to 4 functional modules",
        "User and role management",
        "Basic reporting and analytics",
        "API integrations",
        "Priority support"
      ],
      buttonText: "Get a quote",
      priceId: "price_2...", // Replace with your Stripe Price ID
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "ERP, CRM or complex platform.",
      features: [
        "Everything in Business",
        "Unlimited modules",
        "Advanced integrations",
        "Security and scalability",
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

export default function CustomSoftwarePage() {
  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Custom software development",
            "description": "We build robust, scalable, and secure applications, from internal management systems (ERP, CRM) to complex SaaS platforms and APIs.",
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
            "url": "https://devmarkpe.com/en/services/custom-software-development",
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
                "name": "How do you ensure software quality?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We follow agile methodologies, perform exhaustive testing (unit, integration, and user), and maintain constant communication with you to ensure the final product meets the highest quality standards."
                }
              },
              {
                "@type": "Question",
                "name": "Do we own the source code at the end of the project?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, upon project completion and full payment, we deliver the entire source code and documentation. You are the sole owner of your software."
                }
              },
              {
                "@type": "Question",
                "name": "What technologies do you use for development?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We use a modern and proven technology stack that includes, among others, Node.js, React, Next.js, Python, and databases like PostgreSQL and MongoDB, always choosing the best tool for each project."
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