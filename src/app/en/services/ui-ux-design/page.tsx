import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { ServiceFaq } from '@/components/home/service-faq';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UI/UX Design for Digital Products People Love',
  description: "Intuitive, attractive user-centered interfaces. We research, prototype, and design digital products that turn visitors into loyal customers.",
  alternates: {
    canonical: 'https://devmarkpe.com/en/services/ui-ux-design',
    languages: {
      es: 'https://devmarkpe.com/servicios/diseno-ui-ux',
      en: 'https://devmarkpe.com/en/services/ui-ux-design',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/services/ui-ux-design',
    title: 'UI/UX Design | Devmark Peru',
    description: 'Intuitive, attractive user-centered interfaces for digital products people love.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'UI/UX design - DEVMARK' }],
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
  badge: "User experience",
  title: "UI/UX design",
  description: "We create intuitive and attractive user-centered interfaces. From initial research to interactive prototypes and final visual design, we ensure your product is easy to use and visually impactful.",
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
  title: 'Our UI/UX design methodology',
  subtitle: 'A user-centered process from research to final design.',
  steps: [
    { title: 'User research', description: "We understand your target audience through interviews, surveys, and analysis to create solutions that truly meet their needs." },
    { title: 'Wireframes and prototyping', description: "We create schematics and interactive prototypes that allow you to visualize and test the structure and flow of the application before development." },
    { title: 'Interface design (UI)', description: "We design modern, clean, and aesthetically pleasing interfaces that reflect your brand identity and guide the user naturally." },
    { title: 'Responsive design', description: "We ensure that the user experience is optimal on any device, whether mobile, tablet, or desktop." },
  ],
};

const faqContent = {
  title: "Frequently asked questions",
  items: [
    {
      question: "What is the difference between UI and UX?",
      answer: "UX (User Experience) focuses on the overall user experience and how they feel when interacting with the product. UI (User Interface) focuses on the visual design and interactive elements of the interface. Both are crucial for a successful product."
    },
    {
      question: "Do you work with existing design systems?",
      answer: "Yes, we can work with your current design system to maintain brand consistency, or we can create a new one from scratch if needed."
    },
    {
      question: "What design tools do you use?",
      answer: "We use industry-standard tools like Figma, Sketch, and Adobe XD for interface design, prototyping, and collaboration with the development team."
    }
  ]
};

const pricingContent = {
    title: "Plans & pricing",
    subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
    plans: [
      {
        name: "Starter",
        price: "S/ 1800",
        description: "UI/UX design of a landing page or basic site.",
        features: [
          "Wireframes and prototype",
          "Custom UI design",
          "Responsive design",
          "Basic style guide",
          "Email support"
        ],
        buttonText: "Get a quote",
        priceId: "price_1..." // Replace with your Stripe Price ID
      },
      {
        name: "Business",
        price: "S/ 3200",
        description: "Full UI/UX design of a corporate website.",
        features: [
          "Everything in Starter",
          "Information architecture",
          "Up to 10 screens",
          "Design system / components",
          "Interactive prototype",
          "Priority support"
        ],
        buttonText: "Get a quote",
        priceId: "price_2...", // Replace with your Stripe Price ID
        recommended: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "UX/UI design of a platform or application.",
        features: [
          "Everything in Business",
          "Unlimited screens",
          "Usability testing",
          "System documentation",
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

export default function UiUxDesignPage() {
  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "UI/UX design",
            "description": "We create intuitive and attractive user-centered interfaces. From initial research to interactive prototypes and final visual design, we ensure your product is easy to use and visually impactful.",
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
            "url": "https://devmarkpe.com/en/services/ui-ux-design",
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
                "name": "What is the difference between UI and UX?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UX (User Experience) focuses on the overall user experience and how they feel when interacting with the product. UI (User Interface) focuses on the visual design and interactive elements of the interface. Both are crucial for a successful product."
                }
              },
              {
                "@type": "Question",
                "name": "Do you work with existing design systems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we can work with your current design system to maintain brand consistency, or we can create a new one from scratch if needed."
                }
              },
              {
                "@type": "Question",
                "name": "What design tools do you use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We use industry-standard tools like Figma, Sketch, and Adobe XD for interface design, prototyping, and collaboration with the development team."
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