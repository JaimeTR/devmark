import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { Contact } from '@/components/home/contact';
import { Faq } from '@/components/landing/faq';
import { homeContent } from '@/content/home';

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
  title: 'Contact us',
  description:
    'Ready to take your business to the next level? Fill out the form or schedule a meeting and our global team will get in touch with you.',
  contactSubtitle: 'Contact us now',
  emailLabel: 'Email:',
  email: 'contacto@devmarkpe.com',
  phoneLabel: 'Phone:',
  phone: '+51 975 646 074',
  timeZoneLabel: 'Local Time:',
  formTitle: 'Contact form',
  formDescription: 'Fill out the form and we will get in touch with you.',
  firstNameLabel: 'First name',
  firstNamePlaceholder: 'John',
  lastNameLabel: 'Last name',
  lastNamePlaceholder: 'Doe',
  emailFormLabel: 'Email',
  emailPlaceholder: 'your@email.com',
  phoneFormLabel: 'Phone',
  phonePlaceholder: '+1 999 999 9999',
  messageLabel: 'Message',
  messagePlaceholder: 'Tell us about your project...',
  submitButton: 'Send message',
  scheduleButton: 'Schedule Meeting',
  quoteButton: 'Get a Quote',
};

const footerContent = {
  copyright: 'DEVMARK. All rights reserved.',
};

export default function ContactPage() {
  return (
    <div className="bg-paper">
      <Header {...headerContent} />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <Contact {...contactContent} heading={homeContent.en.contact.title} first />
        <Faq lang="en" />
      </main>
      <Footer lang="en" copyright={footerContent.copyright} />
    </div>
  );
}

