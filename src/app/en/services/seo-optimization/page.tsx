import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { ServiceFaq } from '@/components/home/service-faq';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO & GEO: rank on Google and in AI answers',
  description: 'We rank your website on Google (SEO) and in ChatGPT, Gemini and Perplexity (GEO) to bring you more customers.',
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
    title: 'SEO & GEO | DEVMARK Peru',
    description: 'Get found on Google and recommended by ChatGPT, Gemini and Perplexity.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SEO & GEO - DEVMARK' }],
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
  badge: "Google and AI search",
  title: "SEO & GEO",
  description: "We rank you on Google (SEO) and prepare your website so ChatGPT, Gemini, Perplexity and Google's AI Overviews recommend you (GEO). More quality visits and more customers.",
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
  title: 'How we improve your visibility',
  subtitle: 'A clear, measurable process so people find you on Google and in AI answers.',
  steps: [
    { title: 'SEO audit and strategy', description: "We conduct a complete analysis of your website and competition to define a keyword strategy and actions to achieve your goals." },
    { title: 'On-page and content SEO', description: "We optimize your site's structure, tags, content, and internal links to improve your ranking on Google." },
    { title: 'Technical SEO', description: "We improve loading speed (Core Web Vitals), indexing, URL structure, and other critical technical factors for SEO." },
    { title: 'Authority and GEO', description: "We build quality links and reputation, and structure your content so AI search engines understand it and cite you as a source." },
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
      question: "What is GEO and why do I need it?",
      answer: "GEO (Generative Engine Optimization) means optimizing your website so AI search engines such as ChatGPT, Gemini, Perplexity and Google's AI Overviews understand it and cite it when someone asks about what you sell. More and more people search this way, so we work on it together with SEO."
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

export default function SeoOptimizationPage() {
  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "SEO & GEO",
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
            "mainEntity": faqContent.items.map((it) => ({
              "@type": "Question",
              "name": it.question,
              "acceptedAnswer": { "@type": "Answer", "text": it.answer },
            }))
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