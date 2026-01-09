
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/sections/hero';
import { Services } from '@/components/landing/sections/services';
import { World } from '@/components/landing/sections/world';
import { Testimonials } from '@/components/landing/sections/testimonials';
import { Contact } from '@/components/landing/sections/contact';
import { Footer } from '@/components/landing/footer';
import { AdditionalServices } from '@/components/landing/sections/additional-services';
import { Hosting } from '@/components/landing/sections/hosting';
import { FeaturedProjectsCarousel } from '@/components/landing/sections/featured-projects-carousel';
import { getProjects } from '@/data/projects';


const content = {
  lang: 'en' as const,
  header: {
    navLinks: [
      { href: '#hero', label: 'Home' },
      { href: '#services', label: 'Services' },
      { href: '/en/portfolio', label: 'Portfolio' },
      { href: '#hosting', label: 'Hosting' },
      { href: '#testimonials', label: 'Reviews' },
      // { href: '/en/blog', label: 'Blog' },
      { href: '#contact', label: 'Contact' },
    ],
    contactButton: 'Contact Us',
    aiAssistant: 'AI Assistant',
    aiAssistantTooltip: 'Hello! I am your AI assistant.',
  },
  hero: {
    badge: 'Your Global Digital Partner',
    title: 'Boost Your Business with',
    animatedPhrases: [
      'Cutting-Edge Technology',
      'Customized Solutions',
      'Guaranteed Digital Success',
    ],
    description: 'At DevMark, we create custom web and software solutions, and optimize your online presence for a global audience.',
    servicesButton: 'Our Services',
    contactButton: 'Contact Us',
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
  world: {
    title: 'We develop projects for the whole world',
    subtitle: 'Global Solutions, Local Impact',
    description: 'We are a company with a global reach, providing services to clients in America and Europe. We understand the nuances of different markets and adapt our solutions to meet the specific needs of each region.',
    ctaButton: 'Start your project',
    ctaButton2: 'View Projects',
    ctaButton2Link: 'https://asistente-inoia-tbuk.vercel.app/',
    stats: [
      {
        value: "95%",
        label: "Client Satisfaction",
        description: "Satisfied clients from countries like Peru, USA, Spain, and more."
      },
      {
        value: "+50%",
        label: "Traffic Increase",
        description: "Average growth in organic traffic with our SEO strategies."
      },
      {
        value: "24/7",
        label: "Global Support",
        description: "Continuous support adapted to your time zone."
      },
      {
        value: "100+",
        label: "Successful Projects",
        description: "Launched for companies across America and Europe."
      }
    ]
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
        image: "https://placehold.co/100x100.png",
        hint: "man portrait",
        quote: "DevMark transformed our online presence. Their knowledge of the international market is unmatched. Highly recommended!"
      },
      {
        name: "John Smith",
        company: "USA Tech, USA",
        avatar: "JS",
        image: "https://placehold.co/100x100.png",
        hint: "woman portrait",
        quote: "The software development team exceeded our expectations. They delivered a robust and timely product for our global operations."
      },
      {
        name: "Luis Torres",
        company: "Andes Adventures, Bolivia",
        avatar: "LT",
        image: "https://placehold.co/100x100.png",
        hint: "man smiling",
        quote: "Thanks to their SEO strategy, our online bookings increased by 70% worldwide. They are true experts."
      },
      {
        name: "Ana García",
        company: "Soluciones Digitales, Spain",
        avatar: "AG",
        image: "https://placehold.co/100x100.png",
        hint: "woman professional",
        quote: "An exceptional team that understands the nuances of different markets. They helped us expand into Latin America successfully."
      },
      {
        name: 'Sophie Dubois',
        company: 'Chic Boutique, France',
        avatar: 'SD',
        image: 'https://placehold.co/100x100.png',
        hint: 'woman stylish',
        quote: 'The AI chatbot they developed for us has revolutionized our customer service. It is intelligent, fast and has increased our sales.'
      },
      {
        name: 'David Chen',
        company: 'Innovate Start-up, Canada',
        avatar: 'DC',
        image: 'https://placehold.co/100x100.png',
        hint: 'man thinking',
        quote: 'The process automation saved us hundreds of hours. Their ability to understand our needs and implement effective solutions is incredible.'
      },
      {
        name: 'Fatima Al-Jamil',
        company: 'Global Exports, UAE',
        avatar: 'FA',
        image: 'https://placehold.co/100x100.png',
        hint: 'woman smiling',
        quote: 'We commissioned a custom CRM and the result was perfect. It fits our workflow and has significantly improved our team\'s efficiency.'
      },
      {
        name: 'Liam Murphy',
        company: 'Creative Agency, Ireland',
        avatar: 'LM',
        image: 'https://placehold.co/100x100.png',
        hint: 'man creative',
        quote: 'The design and user experience of our new website is simply spectacular. They have captured the essence of our brand perfectly.'
      },
      {
        name: 'Yuki Tanaka',
        company: 'Tokyo Games, Japan',
        avatar: 'YT',
        image: 'https://placehold.co/100x100.png',
        hint: 'man gaming',
        quote: 'Their technical support and maintenance service gives us the peace of mind we need. They are always available and solve any problem quickly.'
      },
      {
        name: 'Maria Rossi',
        company: 'Gastronomía Italiana, Italy',
        avatar: 'MR',
        image: 'https://placehold.co/100x100.png',
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 lg:gap-40 pt-0">
              <FeaturedProjectsCarousel 
                projects={projects}
                lang="en"
                title="Featured Projects"
                subtitle="Discover some of our best work"
                viewMoreText="View Full Portfolio"
              />
              <Services {...content.services} />
              <World {...content.world} />
              <AdditionalServices {...content.additionalServices} />
              <Hosting {...content.hosting} />
              <Testimonials {...content.testimonials} />
              <Contact {...content.contact} />
            </div>
        </div>
      </main>
      <Footer copyright={content.footer.copyright} />
    </div>
  );
}
