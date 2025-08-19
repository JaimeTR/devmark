
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Pricing } from '@/components/landing/sections/pricing';
import { Contact } from '@/components/landing/sections/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { LineChart, Search, FileText, ArrowUpCircle } from 'lucide-react';

const headerContent = {
  lang: 'en' as const,
  navLinks: [],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const serviceDetails = {
    title: "SEO and Web Optimization",
    description: "We increase your visibility in search engines, attract quality organic traffic, and improve your website's conversion rate.",
    badge: "Positioning and Performance",
    features: [
        {
            icon: Search,
            title: "SEO Audit and Strategy",
            description: "We conduct a complete analysis of your website and competition to define a keyword strategy and actions to achieve your goals."
        },
        {
            icon: FileText,
            title: "On-Page and Content SEO",
            description: "We optimize your site's structure, tags, content, and internal links to improve your ranking on Google."
        },
        {
            icon: LineChart,
            title: "Technical SEO",
            description: "We improve loading speed (Core Web Vitals), indexing, URL structure, and other critical technical factors for SEO."
        },
        {
            icon: ArrowUpCircle,
            title: "Link Building and Off-Page SEO",
            description: "We develop quality link-building strategies to increase your domain's authority and improve your online reputation."
        }
    ]
};

const faqContent = {
  title: "Frequently Asked Questions",
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
    title: "Plans & Pricing",
    subtitle: "Solutions tailored to your business. Choose the plan that best suits your needs and budget.",
    plans: [
      {
        name: "Basic",
        price: "$499",
        description: "Ideal for startups and personal projects.",
        features: [
          "Responsive web design",
          "3 custom pages",
          "Basic SEO optimization",
          "Email support"
        ],
        buttonText: "Buy Now",
        priceId: "price_1..." // Replace with your Stripe Price ID
      },
      {
        name: "Professional",
        price: "$999",
        description: "Perfect for growing businesses.",
        features: [
          "Everything in Basic",
          "Up to 10 pages",
          "CMS integration",
          "Priority support"
        ],
        buttonText: "Buy Now",
        priceId: "price_2..." // Replace with your Stripe Price ID
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Complete solutions for large corporations.",
        features: [
          "Everything in Professional",
          "Unlimited pages",
          "E-commerce functionality",
          "24/7 support"
        ],
        buttonText: "Contact Us",
        priceId: ""
      }
    ]
  };

const contactContent = {
    lang: 'en' as const,
    title: "Let's Talk About Your Project",
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

export default function SeoOptimizationPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
            <section id="service-hero" className="py-12 md:py-20 text-center">
                <Badge variant="outline" className="mb-4 text-primary border-primary/50">{serviceDetails.badge}</Badge>
                <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-gradient">{serviceDetails.title}</h1>
                <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">{serviceDetails.description}</p>
            </section>
            
            <section id="features" className="py-12 md:py-20">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {serviceDetails.features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-primary/5">
                            <feature.icon className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            <section id="faq" className="py-12 md:py-20 max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl sm:text-4xl text-center font-bold tracking-tighter mb-8">{faqContent.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqContent.items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
            
            <Pricing {...pricingContent} />
            <Contact {...contactContent} />
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
