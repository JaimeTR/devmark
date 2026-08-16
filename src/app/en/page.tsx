import { Suspense } from 'react';
import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Hero } from '@/components/home/hero';
import { ClientLogos } from '@/components/home/client-logos';
import { Strategy } from '@/components/home/strategy';
import { Services } from '@/components/home/services';
import { Advantages } from '@/components/home/advantages';
import { Process } from '@/components/home/process';
import { Testimonials } from '@/components/home/testimonials';
import { Contact } from '@/components/home/contact';
import { Footer } from '@/components/home/footer';
import { AdditionalServices } from '@/components/home/additional-services';
import { Hosting } from '@/components/home/hosting';
import { FeaturedProjectsCarousel } from '@/components/home/featured-projects-carousel';
import { ScrollReveal } from '@/components/home/scroll-reveal';
import { ProjectsSkeleton } from '@/components/home/projects-skeleton';
import { getProjects } from '@/data/projects';


const content = {
  lang: 'en' as const,
  header: {
    lang: 'en' as const,
    navLinks: [
      { href: '#hero', label: 'Home' },
      { href: '/en/about', label: 'About' },
      { href: '/en/services', label: 'Services' },
      { href: '/en/portfolio', label: 'Portfolio' },
      { href: '/en/hosting', label: 'Hosting' },
      { href: '/en/contact', label: 'Contact' },
    ],
    contactButton: 'Contact us',
    aiAssistant: 'AI Assistant',
    aiAssistantTooltip: 'Hello! I am your AI assistant.',
  },
  hero: {
    badgeMessages: ['DEVMARK, your digital partner', "Let's talk about your project"],
    title: 'Web and software development agency',
    description: 'We create websites, online stores, custom software, automations, AI chatbots, and SEO strategies in Lima, Peru. We empower Peruvian businesses into the digital world.',
    servicesButton: 'Services',
    servicesHref: '/en/services',
    contactButton: 'Book a meeting',
    stats: [
      { value: '100+', label: 'Happy clients' },
      { value: '6', label: 'Partner brands' },
      { value: '91%', label: 'Faster execution' },
    ],
    clients: [
      'ADLIM', 'JOPCO', 'TAKLAB', 'LUCE INMOBILIARIA', 'MEMORANDUM', 'MM TECH',
      'DETALZONE', 'SUPERPROFE', 'NEWDENIM', 'OFFROADPERU', 'BREEZLINGO', 'AS ABOGADOS',
    ],
    overlayItems: [
      '+100 projects delivered for businesses in Peru.',
      '91% faster execution times.',
    ],
  },
  strategy: {
    headerText: 'We believe every brand has a unique story. That\'s why we combine strategy, design and technology to help businesses grow with clarity.',
    headerTitle: 'DEVMARK merges strategy and design to create impactful brands',
    overlayText: 'We drive your business with purpose and clear direction.',
    cardTitle: 'Strategic thinking that drives results',
    cardDescription: 'We develop customized solutions aligned with your goals, ensuring every decision is backed by data and purpose. Our approach focuses on measurable results.',
    ctaPrimary: 'Start growing',
  },
  services: {
    lang: 'en' as const,
    title: 'Main services',
    subtitle: 'Comprehensive solutions to take your business to the next level.',
    detailsButton: 'View details',
    quoteButton: 'Get a quote',
    fromLabel: 'From',
    items: [
      {
        icon: 'CodeXml',
        title: "Custom web development",
        description: "Custom websites programmed from scratch for corporate sites, landing pages, and PWAs with 100% responsive design.",
        tags: ["Corporate websites", "Landing pages", "PWAs"],
        href: '/en/services/custom-web-development'
      },
      {
        icon: 'Palette',
        title: "CMS & platform development",
        description: "Websites and online stores with WordPress, Shopify, etc. E-commerce with payment and shipping integrations.",
        tags: ["WordPress", "Shopify", "E-commerce"],
        href: '/en/services/cms-development'
      },
      {
        icon: 'ServerCog',
        title: "Custom software development",
        description: "Internal systems (ERP, CRM), SaaS, and APIs. Integrations to unify data and processes.",
        tags: ["ERP/CRM", "SaaS", "APIs"],
        href: '/en/services/custom-software-development'
      },
      {
        icon: 'Zap',
        title: "Process automation",
        description: "Automatic flows with Zapier/Make/APIs for leads, sales, reports, notifications, and back-office tasks.",
        tags: ["Zapier", "Make", "Lead automation"],
        href: '/en/services/process-automation'
      },
      {
        icon: 'Bot',
        title: "AI chatbots",
        description: "Chatbots for web, e-commerce, and social media, trained with your knowledge base for 24/7 support and sales.",
        tags: ["Web chatbots", "Social media", "24/7 support"],
        href: '/en/services/ai-chatbots'
      },
      {
        icon: 'LineChart',
        title: "SEO & web optimization",
        description: "Strategy, technical and content SEO, Core Web Vitals, and e-commerce. Increase organic traffic and conversions.",
        tags: ["SEO strategy", "Core Web Vitals", "Traffic growth"],
        href: '/en/services/seo-optimization'
      }
    ]
  },
  additionalServices: {
    lang: 'en' as const,
    title: 'Complementary services',
    subtitle: 'Services that enhance the main technological development',
    detailsButton: 'View details',
    quoteButton: 'Get a quote',
    fromLabel: 'From',
    items: [
      {
        icon: 'DraftingCompass',
        title: 'UI/UX design',
        description: 'User-centered design. Interactive prototyping and wireframes. Modern, clean, and responsive interfaces.',
        href: '/en/services/ui-ux-design'
      },
      {
        icon: 'Megaphone',
        title: 'Digital marketing',
        description: 'Growth strategies and customer acquisition. Advertising campaigns (Google Ads, Meta Ads). Email marketing and sales automation.',
        href: '/en/services/digital-marketing'
      },
      {
        icon: 'Wrench',
        title: 'Support and maintenance',
        description: 'Periodic security and plugin updates. Performance monitoring and backups. Incident resolution and continuous technical support.',
        href: '/en/services/support-maintenance'
      },
      {
        icon: 'Lightbulb',
        title: 'Technology consulting',
        description: 'Advisory for process digitalization. Selection of appropriate platforms for each business. Scalability and security strategies.',
        href: '/en/services/tech-consulting'
      },
    ],
  },
  hosting: {
    badge: "HOSTINGER PARTNER",
    title: "Hosting as dynamic as your business",
    subtitle: "As official Hostinger partners, we offer you the best technology to host your project. Use our coupon to get an additional 20% discount on top of their promotions. Plus, as an added service, we will configure your professional emails and SSL certificate for free.",
    features: [
      "Free domain and website migration",
      "Run WordPress or any other CMS",
      "Fully managed web hosting",
      "Live support in English 24/7",
    ],
    guaranteeText: "30-day money-back guarantee",
    ctaButton: "Get discount",
    couponCode: "DEVMARK",
    copyButton: "Copy code",
    copiedButton: "Code copied!",
    discountText: "20% discount",
    referralLink: "https://hostinger.com?REFERRALCODE=JAIMETRDEV"
  },
  advantages: {
    badge: 'Our projects',
    title: 'The solutions that make us different',
    description: 'We combine creativity with rigorous technological testing to verify every component before deployment, ensuring high-performing results in every project.',
    stats: [
      { value: 'Regional', label: 'Total reach' },
      { value: 'Thousands+', label: 'Conversions' },
    ],
    clients: [
      { name: 'WordPress', icon: 'Globe' },
      { name: 'Next.js', icon: 'Layers' },
      { name: 'React', icon: 'Sparkles' },
      { name: 'Tailwind', icon: 'Compass' },
    ],
  },
  process: {
    badge: 'How we work',
    title: 'When you work with us',
    subtitle: 'A structured 7-step process to take your project from idea to launch.',
    steps: [
      { number: '01', title: 'Book a meeting', description: 'We coordinate a meeting to understand your business, your goals, and the type of website you need.' },
      { number: '02', title: 'Define your goals', description: 'We analyze your company, your services, and the audience you want to reach to build a website aligned with your goals.' },
      { number: '03', title: 'Design the structure', description: 'We organize content into clear sections and intuitive navigation to improve the user experience.' },
      { number: '04', title: 'Create the visual design', description: 'We develop an attractive, modern, and professional interface that represents your brand identity.' },
      { number: '05', title: 'Build your website', description: 'We build each page with a strategic focus, using calls to action designed to capture attention.' },
      { number: '06', title: 'Review and optimize', description: 'We validate each section, optimize loading speed, and verify correct display on all devices.' },
      { number: '07', title: 'Launch your site', description: 'We publish your website and get it ready for you to start receiving visitors and potential clients.' },
    ],
  },
  testimonials: {
    badge: 'TESTIMONIALS',
    title: 'What our clients say',
    subtitle: 'The trust of companies from all over the world is our greatest achievement.',
    items: [
      {
        name: "Carlos Rodriguez",
        company: "Inka Corp, Peru",
        avatar: "CR",
        image: "/testimonials/uifaces-human-avatar.jpg",
        hint: "man portrait",
        quote: "DEVMARK transformed our online presence. Their knowledge of the international market is unmatched. Highly recommended!"
      },
      {
        name: "John Smith",
        company: "USA Tech, USA",
        avatar: "JS",
        image: "/testimonials/uifaces-human-avatar (1).jpg",
        hint: "woman portrait",
        quote: "The software development team exceeded our expectations. They delivered a robust and timely product for our global operations."
      },
      {
        name: "Luis Torres",
        company: "Andes Adventures, Bolivia",
        avatar: "LT",
        image: "/testimonials/uifaces-human-avatar (2).jpg",
        hint: "man smiling",
        quote: "Thanks to their SEO strategy, our online bookings increased by 70% worldwide. They are true experts."
      },
      {
        name: "Ana García",
        company: "Soluciones Digitales, Spain",
        avatar: "AG",
        image: "/testimonials/uifaces-human-avatar (3).jpg",
        hint: "woman professional",
        quote: "An exceptional team that understands the nuances of different markets. They helped us expand into Latin America successfully."
      },
      {
        name: 'Sophie Dubois',
        company: 'Chic Boutique, France',
        avatar: 'SD',
        image: '/testimonials/uifaces-human-avatar (4).jpg',
        hint: 'woman stylish',
        quote: 'The AI chatbot they developed for us has revolutionized our customer service. It is intelligent, fast and has increased our sales.'
      },
      {
        name: 'David Chen',
        company: 'Innovate Start-up, Canada',
        avatar: 'DC',
        image: '/testimonials/uifaces-popular-avatar.jpg',
        hint: 'man thinking',
        quote: 'The process automation saved us hundreds of hours. Their ability to understand our needs and implement effective solutions is incredible.'
      },
      {
        name: 'Fatima Al-Jamil',
        company: 'Global Exports, UAE',
        avatar: 'FA',
        image: '/testimonials/uifaces-popular-avatar (1).jpg',
        hint: 'woman smiling',
        quote: 'We commissioned a custom CRM and the result was perfect. It fits our workflow and has significantly improved our team\'s efficiency.'
      },
      {
        name: 'Liam Murphy',
        company: 'Creative Agency, Ireland',
        avatar: 'LM',
        image: '/testimonials/uifaces-popular-avatar (2).jpg',
        hint: 'man creative',
        quote: 'The design and user experience of our new website is simply spectacular. They have captured the essence of our brand perfectly.'
      },
      {
        name: 'Yuki Tanaka',
        company: 'Tokyo Games, Japan',
        avatar: 'YT',
        image: '/testimonials/uifaces-popular-avatar (3).jpg',
        hint: 'man gaming',
        quote: 'Their technical support and maintenance service gives us the peace of mind we need. They are always available and solve any problem quickly.'
      },
      {
        name: 'Maria Rossi',
        company: 'Gastronomía Italiana, Italy',
        avatar: 'MR',
        image: '/testimonials/uifaces-popular-avatar (4).jpg',
        hint: 'woman cooking',
        quote: 'The technology consulting was key to our digital transformation. They guided us step by step in choosing the best tools for our business.'
      }
    ]
  },
  contact: {
    lang: 'en',
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
    quoteButton: "Quote with our AI"
  },
  footer: {
    copyright: "DEVMARK. All rights reserved."
  }
} as const;


async function FeaturedProjectsSection() {
  const projects = await getProjects('en');
  const featured = projects.filter(p => p.isFeatured);
  const displayProjects = featured.length >= 3 ? featured : projects;
  return (
    <FeaturedProjectsCarousel
      projects={displayProjects}
      lang="en"
      title="Featured projects"
      subtitle="Discover some of our best work"
      viewMoreText="View more projects"
      statsLabel="PROJECTS"
      statsNumber="+140"
      statsDescription="Continuous experience in personal projects, agencies and as a freelance developer."
    />
  );
}

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...content.header} />
      <main>
        <Hero {...content.hero} />
        <ScrollReveal>
          <ClientLogos stats={content.hero.stats} clients={content.hero.clients} />
        </ScrollReveal>
        <ScrollReveal>
          <Strategy {...content.strategy} />
        </ScrollReveal>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-0 pt-0">
              <ScrollReveal>
                <Services {...content.services} />
              </ScrollReveal>
              <div>
                <ScrollReveal>
                  <Advantages {...content.advantages} />
                </ScrollReveal>
                <ScrollReveal>
                  <Suspense fallback={<ProjectsSkeleton />}>
                    <FeaturedProjectsSection />
                  </Suspense>
                </ScrollReveal>
              </div>
              <ScrollReveal>
                <AdditionalServices {...content.additionalServices} />
              </ScrollReveal>
              <ScrollReveal>
                <Hosting {...content.hosting} />
              </ScrollReveal>
              <ScrollReveal>
                <Testimonials {...content.testimonials} />
              </ScrollReveal>
              <ScrollReveal>
                <Process {...content.process} />
              </ScrollReveal>
              <ScrollReveal>
                <Contact {...content.contact} />
              </ScrollReveal>
            </div>
        </div>
      </main>
      <Footer lang="en" copyright={content.footer.copyright} />
    </div>
  );
}
