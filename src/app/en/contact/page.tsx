import { AnimatedBackground } from '@/components/landing/animated-background';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { Contact } from '@/components/landing/sections/contact';

const headerContent = {
  lang: 'en' as const,
  navLinks: [
    { href: '/en#hero', label: 'Home' },
    { href: '/en#services', label: 'Services' },
    { href: '/en/portfolio', label: 'Portfolio' },
    { href: '/en/hosting', label: 'Hosting' },
    { href: '/en/contact', label: 'Contact' },
  ],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hi! I am your AI assistant.',
};

const contactContent = {
  lang: 'en' as const,
  title: 'Contact Us',
  description:
    'Ready to take your business to the next level? Fill out the form or schedule a meeting and our global team will get in touch with you.',
  contactSubtitle: 'Contact us now',
  emailLabel: 'Email:',
  email: 'contacto@devmarkpe.com',
  phoneLabel: 'Phone:',
  phone: '+51 930 414 494',
  timeZoneLabel: 'Local Time:',
  formTitle: 'Contact Form',
  formDescription: 'Fill out the form and we will get in touch with you.',
  firstNameLabel: 'First Name',
  firstNamePlaceholder: 'John',
  lastNameLabel: 'Last Name',
  lastNamePlaceholder: 'Doe',
  emailFormLabel: 'Email',
  emailPlaceholder: 'your@email.com',
  phoneFormLabel: 'Phone',
  phonePlaceholder: '+1 999 999 9999',
  messageLabel: 'Message',
  messagePlaceholder: 'Tell us about your project...',
  submitButton: 'Send Message',
  scheduleButton: 'Schedule Meeting',
  quoteButton: 'Get a Quote',
};

const footerContent = {
  copyright: 'DevMark. All rights reserved.',
};

export default function ContactPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main id="main-content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <Contact {...contactContent} />
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
