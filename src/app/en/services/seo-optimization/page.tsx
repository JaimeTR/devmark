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
  title: 'SEO & Web Optimization to Rank Higher in Peru',
  description: "We increase your visibility in search engines, attract quality organic traffic, and improve your website's conversion rate across Peru and beyond.",
  alternates: {
    canonical: 'https://devmarkpe.com/en/services/seo-optimization',
    languages: {
      es: 'https://devmarkpe.com/servicios/seo-optimizacion',
      en: 'https://devmarkpe.com/en/services/seo-optimization',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/services/seo-optimization',
    title: 'SEO & Web Optimization | Devmark Peru',
    description: 'We increase your visibility in search engines and improve your conversion rate.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'SEO and web optimization - DEVMARK' }],
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
  badge: "Positioning and performance",
  title: "SEO and web optimization",
  description: "We increase your visibility in search engines, attract quality organic traffic, and improve your website's conversion rate.",
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
  title: 'Our SEO and optimization methodology',
  subtitle: 'A structured process to improve your search rankings.',
  steps: [
    { title: 'SEO audit and strategy', description: "We conduct a complete analysis of your website and competition to define a keyword strategy and actions to achieve your goals." },
    { title: 'On-page and content SEO', description: "We optimize your site's structure, tags, content, and internal links to improve your ranking on Google." },
    { title: 'Technical SEO', description: "We improve loading speed (Core Web Vitals), indexing, URL structure, and other critical technical factors for SEO." },
    { title: 'Link building and off-page SEO', description: "We develop quality link-building strategies to increase your domain's authority and improve your online reputation." },
  ],
};

const faqContent = {
  title: "Frequently asked questions",
  items: [
    {
      question: "When will I start to see SEO results?",
      answer: "SEO is a medium- to long-term strategy. Generally, significant results can be seen between 3 and 6 months, although this can vary depending on the competitiveness of your industry."
    },
    {
      question: "Is SEO a one-time investment?",
      answer: "No, SEO is an ongoing process. Search engine algorithms are constantly changing and the competition is always active. We recommend monthly work to maintain and improve results."
    },
    {
      question: "Do you guarantee the first position on Google?",
      answer: "No serious SEO agency can guarantee the first position, as Google's algorithm is complex and beyond our control. What we do guarantee is professional, transparent work focused on sustainably improving your visibility and traffic."
    }
  ]
};

const pricingContent = {
    title: "Plans & pricing",
    subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
    plans: [
      {
        name: "Starter",
        price: "S/ 300",
        description: "Basic local SEO for starting businesses.",
        period: "/month",
        features: [
          "On-page optimization",
          "Google Business Profile",
          "Search Console setup",
          "Basic monthly report",
          "Email support"
        ],
        buttonText: "Get a quote",
        priceId: "price_1..." // Replace with your Stripe Price ID
      },
      {
        name: "Business",
        price: "S/ 600",
        description: "Complete SEO for growing businesses.",
        period: "/month",
        features: [
          "Everything in Starter",
          "Keyword research",
          "2 optimized articles per month",
          "Basic technical SEO",
          "Basic link building",
          "Priority support"
        ],
        buttonText: "Get a quote",
        priceId: "price_2...", // Replace with your Stripe Price ID
        recommended: true
      },
      {
        name: "Enterprise",
        price: "S/ 1200",
        description: "Advanced SEO for competitive markets.",
        period: "/month",
        features: [
          "Everything in Business",
          "4 optimized articles per month",
          "Advanced technical SEO",
          "Quality link building",
          "GEO optimization (AI)",
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

export default function SeoOptimizationPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "SEO and web optimization",
            "description": "We increase your visibility in search engines, attract quality organic traffic, and improve your website",
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
            "url": "https://devmarkpe.com/en/services/seo-optimization",
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
                "name": "When will I start to see SEO results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SEO is a medium- to long-term strategy. Generally, significant results can be seen between 3 and 6 months, although this can vary depending on the competitiveness of your industry."
                }
              },
              {
                "@type": "Question",
                "name": "Is SEO a one-time investment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, SEO is an ongoing process. Search engine algorithms are constantly changing and the competition is always active. We recommend monthly work to maintain and improve results."
                }
              },
              {
                "@type": "Question",
                "name": "Do you guarantee the first position on Google?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No serious SEO agency can guarantee the first position, as Google's algorithm is complex and beyond our control. What we do guarantee is professional, transparent work focused on sustainably improving your visibility and traffic."
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