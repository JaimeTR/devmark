
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
import { getProjects } from '@/data/projects';


const content = {
  lang: 'en' as const,
  header: {
    navLinks: [
      { href: '#hero', label: 'Home' },
      { href: '/en/services', label: 'Services' },
      { href: '/en/portfolio', label: 'Portfolio' },
      { href: '/en/hosting', label: 'Hosting' },
      { href: '/en/contact', label: 'Contact' },
    ],
    contactButton: 'Contact Us',
    aiAssistant: 'AI Assistant',
    aiAssistantTooltip: 'Hello! I am your AI assistant.',
  },
  hero: {
    badgeMessages: ['DEVMARK, YOUR DIGITAL PARTNER', "Let's talk about your project today"],
    title: 'Web and software development agency',
    description: 'We create websites, online stores, custom software, automations, AI chatbots, and SEO strategies in Lima, Peru. We empower Peruvian businesses into the digital world.',
    servicesButton: 'Services',
    contactButton: 'Book a meeting',
    stats: [
      { value: '100+', label: 'Happy Clients' },
      { value: '6', label: 'Partner Brands' },
      { value: '91%', label: 'Faster Execution' },
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
    headerTitle: 'Devmark merges strategy and design to create impactful brands',
    overlayText: 'We drive your business with purpose and clear direction.',
    cardTitle: 'Strategic thinking that drives results',
    cardDescription: 'We develop customized solutions aligned with your goals, ensuring every decision is backed by data and purpose. Our approach focuses on measurable results.',
    ctaPrimary: 'Start growing',
  },
  services: {
    title: 'Main Services',
    subtitle: 'Comprehensive solutions to take your business to the next level.',
    moreInfoButton: 'More Info',
    items: [
      {
        icon: 'CodeXml',
        title: "Custom Web Development",
        description: "Custom websites programmed from scratch for corporate sites, landing pages, and PWAs with 100% responsive design.",
        tags: ["Corporate Websites", "Landing Pages", "PWAs"],
        href: '/en/services/custom-web-development'
      },
      {
        icon: 'Palette',
        title: "CMS & Platform Development",
        description: "Websites and online stores with WordPress, Shopify, etc. E-commerce with payment and shipping integrations.",
        tags: ["WordPress", "Shopify", "E-commerce"],
        href: '/en/services/cms-development'
      },
      {
        icon: 'ServerCog',
        title: "Custom Software Development",
        description: "Internal systems (ERP, CRM), SaaS, and APIs. Integrations to unify data and processes.",
        tags: ["ERP/CRM", "SaaS", "APIs"],
        href: '/en/services/custom-software-development'
      },
      {
        icon: 'Zap',
        title: "Process Automation",
        description: "Automatic flows with Zapier/Make/APIs for leads, sales, reports, notifications, and back-office tasks.",
        tags: ["Zapier", "Make", "Lead Automation"],
        href: '/en/services/process-automation'
      },
      {
        icon: 'Bot',
        title: "AI Chatbots",
        description: "Chatbots for web, e-commerce, and social media, trained with your knowledge base for 24/7 support and sales.",
        tags: ["Web Chatbots", "Social Media", "24/7 Support"],
        href: '/en/services/ai-chatbots'
      },
      {
        icon: 'LineChart',
        title: "SEO & Web Optimization",
        description: "Strategy, technical and content SEO, Core Web Vitals, and e-commerce. Increase organic traffic and conversions.",
        tags: ["SEO Strategy", "Core Web Vitals", "Traffic Growth"],
        href: '/en/services/seo-optimization'
      }
    ]
  },
  additionalServices: {
    title: 'Complementary Services',
    subtitle: 'Services that enhance the main technological development',
    moreInfoButton: 'More Info',
    items: [
      {
        icon: 'DraftingCompass',
        title: 'UI/UX Design',
        description: 'User-centered design. Interactive prototyping and wireframes. Modern, clean, and responsive interfaces.',
        href: '/en/services/ui-ux-design'
      },
      {
        icon: 'Megaphone',
        title: 'Digital Marketing',
        description: 'Growth strategies and customer acquisition. Advertising campaigns (Google Ads, Meta Ads). Email marketing and sales automation.',
        href: '/en/services/digital-marketing'
      },
      {
        icon: 'Wrench',
        title: 'Support and Maintenance',
        description: 'Periodic security and plugin updates. Performance monitoring and backups. Incident resolution and continuous technical support.',
        href: '/en/services/support-maintenance'
      },
      {
        icon: 'Lightbulb',
        title: 'Technology Consulting',
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
    ctaButton: "Get Discount",
    couponCode: "DEVMARK",
    copyButton: "Copy Code",
    copiedButton: "Copied!",
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
    title: 'What Our Clients Say',
    subtitle: 'The trust of companies from all over the world is our greatest achievement.',
    items: [
      {
        name: "Carlos Rodriguez",
        company: "Inka Corp, Peru",
        avatar: "CR",
        image: "/testimonials/uifaces-human-avatar.jpg",
        hint: "man portrait",
        quote: "DevMark transformed our online presence. Their knowledge of the international market is unmatched. Highly recommended!"
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
  },
  footer: {
    copyright: "DevMark. All rights reserved."
  }
} as const;


export default function Home() {
  const projects = getProjects('en');
  
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...content.header} />
      <main>
        <Hero {...content.hero} />
        <ClientLogos stats={content.hero.stats} clients={content.hero.clients} />
        <Strategy {...content.strategy} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-0 pt-0">
              <Services {...content.services} />
              <div>
                <Advantages {...content.advantages} />
                <FeaturedProjectsCarousel 
                  projects={projects}
                  lang="en"
                  title="Featured projects"
                  subtitle="Discover some of our best work"
                  viewMoreText="View more projects"
                  statsLabel="PROJECTS"
                  statsDescription="Continuous experience in personal projects, agencies and as a freelance developer."
                />
              </div>
              <AdditionalServices {...content.additionalServices} />
              <Hosting {...content.hosting} />
              <Testimonials {...content.testimonials} />
              <Process {...content.process} />
              <Contact {...content.contact} />
            </div>
        </div>
      </main>
      <Footer copyright={content.footer.copyright} />
    </div>
  );
}
