
import { Suspense } from 'react';
import { AnimatedBackground } from '@/components/home/animated-background';
import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { ProjectQuoter } from '@/components/ai/project-quoter';

const headerContent = {
  lang: 'en' as const,
  navLinks: [],
  contactButton: 'Contact',
  aiAssistant: 'AI assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const quoterContent = {
  lang: 'en' as const,
  badgeLabel: 'DEVMARKAI Quoter',
  title: 'AI project quoter',
  description:
    "Tell us about your idea, and our AI will generate a preliminary proposal with scope, estimated price, and recommendations. Let's build something amazing together!",
  form: {
    responsibleName: {
      label: 'What is your name?',
      placeholder: 'e.g., Maria Torres',
    },
    companyName: {
      label: 'Do you have a company? (optional)',
      placeholder: 'e.g., Torres Studio',
    },
    projectName: {
      label: 'What is the name of your project?',
      placeholder: 'e.g., My awesome e-commerce',
    },
    projectType: {
      label: 'What type of project do you need?',
      items: [
        { value: 'landing-page', label: 'Landing page' },
        { value: 'corporate-website', label: 'Corporate website' },
        { value: 'ecommerce', label: 'E-commerce / online store' },
        { value: 'custom-software', label: 'Custom software (CRM, ERP, etc.)' },
        { value: 'pwa', label: 'Progressive web app (PWA)' },
        { value: 'other', label: 'Other' },
      ],
      otherLabel: 'Tell us what type of project you need',
      otherPlaceholder: 'e.g., Mobile app, booking system, custom integration...',
    },
    features: {
      label: 'What key features should it include?',
      description: 'Select all that apply. You can leave this blank if not applicable.',
      items: [
        { id: 'blog', label: 'Blog section' },
        { id: 'user-accounts', label: 'User accounts and login' },
        { id: 'online-payments', label: 'Online payments' },
        { id: 'booking-system', label: 'Booking/appointment system' },
        { id: 'admin-dashboard', label: 'Admin dashboard' },
        { id: 'ai-chatbot', label: 'AI chatbot integration' },
      ],
    },
    design: {
      label: 'What is the design status?',
      items: [
        { value: 'no-design', label: 'I need a complete design (UI/UX)' },
        { value: 'have-idea', label: 'I have a basic idea or wireframes' },
        { value: 'have-design', label: 'I have a complete design ready' },
      ],
    },
    timeline: {
      label: 'When do you need the project delivered?',
      items: [
        { value: 'urgent', label: 'As soon as possible (urgent)' },
        { value: '1-2-months', label: 'In 1 to 2 months' },
        { value: 'flexible', label: 'No rush, I am flexible' },
      ],
    },
    currency: {
      label: 'Which currency do you want the quote in?',
      items: [
        { value: 'PEN', label: 'Peruvian soles (S/)' },
        { value: 'USD', label: 'US dollars ($)' },
        { value: 'other', label: 'Another currency' },
      ],
      otherLabel: 'Which currency?',
      otherPlaceholder: 'e.g., Euros, Mexican pesos...',
    },
    additionalInfo: {
      label: 'Is there anything else we should know?',
      placeholder:
        'Describe other features, target audience, specific integrations, etc.',
    },
    contactEmail: {
      label: 'Your email address',
      placeholder: 'your@email.com',
    },
    nextButton: 'Next',
    backButton: 'Back',
    editStepButton: 'Edit',
    editButton: 'Edit answers',
    submitButton: 'Quote my project',
    submitButtonPending: 'Analyzing project...',
  },
  results: {
    title: 'Proposal for',
    downloadButton: 'Download as PDF',
    contactButton: 'Chat with an advisor',
    whatsappButton: 'Validate on WhatsApp',
    disclaimer: 'This price is approximate. To confirm it, send us your proposal or details by email or WhatsApp and we\'ll validate it with you now.',
    summaryLabel: 'Project summary',
    scopeLabel: 'Project detail and scope',
    priceLabel: 'Estimated price (USD)',
    recommendationsLabel: 'AI recommendations',
    paymentMethodsLabel: 'Payment methods',
    qrCaption: 'Scan to pay with Yape / Plin',
    placeholder: 'Your project proposal will appear here...',
    generatedLabel: 'Generated on',
    validUntilLabel: 'Valid until',
    documentTitle: 'Project proposal',
    projectLabel: 'Project',
    contactLabel: 'Contact',
    preparedForLabel: 'Prepared for',
    totalLabel: 'Estimated total',
    signatureRepName: 'Jaime Tarazona',
    signatureRepRole: 'Founder · DEVMARK',
    signatureAiRole: 'DEVMARK AI · Quoter',
    signatureNote: 'Proposal generated automatically by DEVMARK AI, pending confirmation from the team.',
  },
};

const footerContent = {
  copyright: 'DEVMARK. All rights reserved.',
};

export default function QuotePage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <Suspense fallback={null}>
            <ProjectQuoter content={quoterContent} />
          </Suspense>
        </div>
      </main>
      <Footer lang="en" copyright={footerContent.copyright} />
    </div>
  );
}
