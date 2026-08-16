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
  title: 'Web Support & Maintenance Plans for Peace of Mind',
  description: "We keep your website or application running optimally, securely, and up to date, with flexible maintenance plans that fit your budget and needs.",
  alternates: {
    canonical: 'https://devmarkpe.com/en/services/support-maintenance',
    languages: {
      es: 'https://devmarkpe.com/servicios/soporte-mantenimiento',
      en: 'https://devmarkpe.com/en/services/support-maintenance',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/services/support-maintenance',
    title: 'Web Support & Maintenance | Devmark Peru',
    description: 'We ensure your website or app runs optimally, securely, and up to date.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Web support and maintenance - DEVMARK' }],
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
  badge: "Peace of mind and confidence",
  title: "Support and maintenance",
  description: "We ensure your website or application runs optimally, securely, and up-to-date. We offer flexible maintenance plans so you don't have to worry about the technical aspects.",
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
  title: 'Our support and maintenance methodology',
  subtitle: 'Continuous care to keep your platform running smoothly.',
  steps: [
    { title: 'Updates and security', description: "We keep your platform (WordPress, plugins, etc.) updated and apply security patches to protect you from vulnerabilities." },
    { title: 'Performance monitoring', description: "We monitor your site's performance 24/7 to detect and resolve speed or availability issues before they affect your users." },
    { title: 'Backups', description: "We perform regular backups of your site and database so your information is always safe from any unforeseen events." },
    { title: 'Technical support', description: "We resolve incidents and offer you continuous technical support for any questions or problems you may have with your digital platform." },
  ],
};

const faqContent = {
  title: "Frequently asked questions",
  items: [
    {
      question: "Why is web maintenance important?",
      answer: "Regular maintenance is crucial for security, performance (loading speed), user experience, and SEO ranking. An outdated site is vulnerable to attacks and can run slowly, negatively affecting your business."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer support via email, phone, and a ticketing system to resolve your queries. The priority level and response times depend on the maintenance plan you choose."
    },
    {
      question: "Can you maintain a site you didn't develop?",
      answer: "Yes. Before we start, we conduct a full audit of the site to assess its current state, the technology used, and potential vulnerabilities, in order to offer you the best possible service."
    }
  ]
};

const pricingContent = {
    title: "Plans & pricing",
    subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
    plans: [
      {
        name: "Basic",
        price: "S/ 60",
        description: "Essential monthly maintenance for your website.",
        period: "/month",
        features: [
          "Security updates",
          "Backups",
          "Uptime monitoring",
          "1 hour of tech support",
          "Email support"
        ],
        buttonText: "Get a quote",
        priceId: "price_1..." // Replace with your Stripe Price ID
      },
      {
        name: "Professional",
        price: "S/ 150",
        description: "Complete maintenance with proactive support.",
        period: "/month",
        features: [
          "Everything in Basic",
          "4 support hours per month",
          "Minor content changes",
          "Speed optimization",
          "Monthly status report",
          "Priority support"
        ],
        buttonText: "Get a quote",
        priceId: "price_2...", // Replace with your Stripe Price ID
        recommended: true
      },
      {
        name: "Enterprise",
        price: "S/ 300",
        description: "Full maintenance for critical websites.",
        period: "/month",
        features: [
          "Everything in Professional",
          "8 support hours per month",
          "24/7 monitoring",
          "Immediate response",
          "Phone support",
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

export default function MaintenancePage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Support and maintenance",
            "description": "We ensure your website or application runs optimally, securely, and up-to-date. We offer flexible maintenance plans so you don",
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
            "url": "https://devmarkpe.com/en/services/support-maintenance",
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
                "name": "Why is web maintenance important?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Regular maintenance is crucial for security, performance (loading speed), user experience, and SEO ranking. An outdated site is vulnerable to attacks and can run slowly, negatively affecting your business."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of support do you offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer support via email, phone, and a ticketing system to resolve your queries. The priority level and response times depend on the maintenance plan you choose."
                }
              },
              {
                "@type": "Question",
                "name": "Can you maintain a site you didn't develop?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Before we start, we conduct a full audit of the site to assess its current state, the technology used, and potential vulnerabilities, in order to offer you the best possible service."
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