import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { ServiceFaq } from '@/components/home/service-faq';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Web Development Services for Your Business',
  description: 'We create unique, high-performance websites tailored to your business in Peru. From concept to launch, we guide you through every step of the project.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/services/custom-web-development',
    languages: {
      es: 'https://devmarkpe.com/servicios/desarrollo-web-a-medida',
      en: 'https://devmarkpe.com/en/services/custom-web-development',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/services/custom-web-development',
    title: 'Custom Web Development | Devmark Peru',
    description: 'We create unique, high-performance websites tailored to your business.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Custom web development - DEVMARK' }],
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
  badge: "Our process",
  title: "Custom web development",
  description: "We create unique, high-performance websites that are perfectly tailored to your business needs. From concept to launch, we accompany you every step of the way.",
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
      price: "S/ 800",
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

export default function CustomWebDevelopmentPage() {
  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Custom web development",
            "description": "We create unique, high-performance websites that are perfectly tailored to your business needs. From concept to launch, we accompany you every step of the way.",
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
            "url": "https://devmarkpe.com/en/services/custom-web-development",
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
                "name": "How long does it take to develop a custom website?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Development time varies depending on the complexity of the project, but generally ranges from 4 to 12 weeks. We will provide you with a detailed timeline at the beginning of the project."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of support do you offer after launch?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer ongoing maintenance and support plans to ensure your website stays up-to-date, secure, and performing optimally."
                }
              },
              {
                "@type": "Question",
                "name": "Can you integrate my site with other platforms?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Of course! We specialize in integrating with a wide variety of systems, including CRMs, ERPs, payment systems, and more, to centralize your operations."
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