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
  badge: "Popular Platforms",
  title: "CMS & platform development",
  description: "We create and customize websites and online stores using the most popular platforms like WordPress and Shopify, ensuring easy content management and powerful e-commerce capabilities.",
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
  title: 'Our CMS development methodology',
  subtitle: 'A streamlined process to build your platform from design to launch.',
  steps: [
    { title: 'Custom design', description: "We adapt premium templates or create designs from scratch that reflect your brand and optimize the user experience in WordPress, Shopify, and other CMSs." },
    { title: 'Powerful e-commerce', description: "We set up your online store with payment gateway integrations (Stripe, PayPal) and shipping systems, ready to sell globally." },
    { title: '100% responsive', description: "We ensure your site looks and works perfectly on all devices, from mobile phones to desktop computers." },
    { title: 'Plugin integration', description: "We extend your site's functionality with plugins for SEO, security, marketing, and more, ensuring optimal performance." },
  ],
};

const faqContent = {
  title: "Frequently asked questions",
  items: [
    {
      question: "Which CMS platform is best for my business?",
      answer: "The choice depends on your needs. WordPress is ideal for content-rich sites and blogs, while Shopify is a robust and scalable solution for e-commerce. We advise you to make the best decision."
    },
    {
      question: "Can you migrate my existing site to WordPress or Shopify?",
      answer: "Yes, we offer complete migration services to move your content, products, and customer data to a new platform safely and efficiently."
    },
    {
      question: "Will my online store be secure for accepting payments?",
      answer: "Absolutely. We implement the best security practices and set up recognized and secure payment gateways to protect your customers' transactions."
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
        description: "CMS-managed website.",
        features: [
          "Administration dashboard",
          "3 custom pages",
          "Content editing panel",
          "Responsive design",
          "Email support"
        ],
        buttonText: "Get a quote",
        priceId: "price_1..." // Replace with your Stripe Price ID
      },
      {
        name: "Business",
        price: "S/ 3200",
        description: "Advanced CMS with blog and integrations.",
        features: [
          "Everything in Starter",
          "Up to 10 pages",
          "Blog and user management",
          "Third-party integrations",
          "SEO optimization",
          "Priority support"
        ],
        buttonText: "Get a quote",
        priceId: "price_2...", // Replace with your Stripe Price ID
        recommended: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Custom corporate CMS platform.",
        features: [
          "Everything in Business",
          "Unlimited pages",
          "Advanced roles and permissions",
          "Multiuser",
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

export default function CMSDevelopmentPage() {
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