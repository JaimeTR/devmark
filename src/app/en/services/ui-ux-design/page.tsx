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
  badge: "User Experience",
  title: "UI/UX design",
  description: "We create intuitive and attractive user-centered interfaces. From initial research to interactive prototypes and final visual design, we ensure your product is easy to use and visually impactful.",
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

export default function UiUxDesignPage() {
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