
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { ProjectQuoter } from '@/components/ai/project-quoter';

const headerContent = {
  lang: 'en' as const,
  navLinks: [],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const quoterContent = {
  lang: 'en' as const,
  title: 'AI Project Quoter',
  description:
    "Tell us about your idea, and our AI will generate a preliminary proposal with scope, estimated price, and recommendations. Let's build something amazing together!",
  form: {
    projectName: {
      label: 'What is the name of your project?',
      placeholder: 'e.g., My Awesome E-commerce',
    },
    projectType: {
      label: 'What type of project do you need?',
      items: [
        { value: 'landing-page', label: 'Landing Page' },
        { value: 'corporate-website', label: 'Corporate Website' },
        { value: 'ecommerce', label: 'E-commerce / Online Store' },
        { value: 'custom-software', label: 'Custom Software (CRM, ERP, etc.)' },
        { value: 'pwa', label: 'Progressive Web App (PWA)' },
        { value: 'other', label: 'Other' },
      ],
    },
    features: {
      label: 'What key features should it include?',
      description: 'Select all that apply. You can leave this blank if not applicable.',
      items: [
        { id: 'blog', label: 'Blog Section' },
        { id: 'user-accounts', label: 'User Accounts and Login' },
        { id: 'online-payments', label: 'Online Payments' },
        { id: 'booking-system', label: 'Booking/Appointment System' },
        { id: 'admin-dashboard', label: 'Admin Dashboard' },
        { id: 'ai-chatbot', label: 'AI Chatbot Integration' },
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
    additionalInfo: {
      label: 'Is there anything else we should know?',
      placeholder:
        'Describe other features, target audience, specific integrations, etc.',
    },
    contactEmail: {
      label: 'Your Email Address',
      placeholder: 'your@email.com',
    },
    submitButton: 'Quote My Project',
    submitButtonPending: 'Analyzing Project...',
  },
  results: {
    title: 'Proposal for',
    downloadButton: 'Download as PDF',
    contactButton: 'Chat with an Advisor',
    summaryLabel: 'Project Summary',
    scopeLabel: 'Proposed Scope',
    priceLabel: 'Estimated Price (USD)',
    recommendationsLabel: 'AI Recommendations',
    paymentMethodsLabel: 'Payment Methods',
    placeholder: 'Your project proposal will appear here...',
  },
};

const footerContent = {
  copyright: 'DevMark. All rights reserved.',
};

export default function QuotePage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <ProjectQuoter content={quoterContent} />
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
