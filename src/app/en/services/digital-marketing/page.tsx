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
  title: 'Digital Marketing Strategies to Grow Your Sales',
  description: 'Comprehensive digital marketing strategies to increase your online visibility, attract potential customers, and boost your sales across Peru.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/services/digital-marketing',
    languages: {
      es: 'https://devmarkpe.com/servicios/marketing-digital',
      en: 'https://devmarkpe.com/en/services/digital-marketing',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/services/digital-marketing',
    title: 'Digital Marketing | Devmark Peru',
    description: 'Comprehensive digital marketing strategies to boost your visibility and online sales.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Digital marketing - DEVMARK' }],
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
  badge: "Growth and acquisition",
  title: "Digital marketing",
  description: "We design and implement comprehensive digital marketing strategies to increase your visibility, attract potential customers, and boost your online sales.",
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
  title: 'Our digital marketing methodology',
  subtitle: 'A proven process to grow your online presence.',
  steps: [
    { title: 'Growth strategy', description: "We define a customized action plan to achieve your business goals, identifying the most effective channels and tactics for your brand." },
    { title: 'Advertising campaigns', description: "We manage campaigns on Google Ads and Meta Ads (Facebook, Instagram) to generate qualified traffic and maximize your return on investment." },
    { title: 'Analytics and reporting', description: "We measure and analyze the performance of all actions to continuously optimize the strategy and present you with clear and understandable results." },
    { title: 'Email marketing and automation', description: "We create automated communication flows and email marketing campaigns to nurture leads and retain your current customers." },
  ],
};

const faqContent = {
  title: "Frequently asked questions",
  items: [
    {
      question: "How much should I invest in online advertising?",
      answer: "The investment depends on your goals, your industry, and the competition. We can start with a modest budget to validate channels and then scale the campaigns that show the best performance."
    },
    {
      question: "How soon will I see results?",
      answer: "Advertising campaigns can generate short-term results (days or weeks), while other strategies like SEO or content marketing require a medium- to long-term vision to consolidate."
    },
    {
      question: "What metrics do you use to measure success?",
      answer: "We focus on the metrics that really matter to your business, such as Customer Acquisition Cost (CAC), Return on Advertising Spend (ROAS), conversion rate, and customer lifetime value (LTV)."
    }
  ]
};

const pricingContent = {
    title: "Plans & pricing",
    subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
    plans: [
      {
        name: "Starter",
        price: "S/ 700",
        description: "Basic social media management.",
        period: "/month",
        features: [
          "8 posts per month",
          "Manage 1 social network",
          "Social media focus",
          "Basic monthly report",
          "Email support"
        ],
        buttonText: "Get a quote",
        priceId: "price_1..." // Replace with your Stripe Price ID
      },
      {
        name: "Business",
        price: "S/ 1500",
        description: "Digital marketing with content and ads.",
        period: "/month",
        features: [
          "Everything in Starter",
          "16 posts per month",
          "Manage 2 social networks",
          "Meta/Google advertising",
          "Design pieces",
          "Priority support"
        ],
        buttonText: "Get a quote",
        priceId: "price_2...", // Replace with your Stripe Price ID
        recommended: true
      },
      {
        name: "Enterprise",
        price: "S/ 3000",
        description: "Complete digital marketing strategy.",
        period: "/month",
        features: [
          "Everything in Business",
          "Multichannel campaigns",
          "Email marketing",
          "Conversion optimization",
          "Advanced analytics",
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

export default function DigitalMarketingPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Digital marketing",
            "description": "We design and implement comprehensive digital marketing strategies to increase your visibility, attract potential customers, and boost your online sales.",
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
            "url": "https://devmarkpe.com/en/services/digital-marketing",
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
                "name": "How much should I invest in online advertising?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The investment depends on your goals, your industry, and the competition. We can start with a modest budget to validate channels and then scale the campaigns that show the best performance."
                }
              },
              {
                "@type": "Question",
                "name": "How soon will I see results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Advertising campaigns can generate short-term results (days or weeks), while other strategies like SEO or content marketing require a medium- to long-term vision to consolidate."
                }
              },
              {
                "@type": "Question",
                "name": "What metrics do you use to measure success?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We focus on the metrics that really matter to your business, such as Customer Acquisition Cost (CAC), Return on Advertising Spend (ROAS), conversion rate, and customer lifetime value (LTV)."
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