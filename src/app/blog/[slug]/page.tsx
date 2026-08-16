
import { getPostBySlug, getPosts, getTranslatedSlug } from '@/data/blog-posts';
import { notFound } from 'next/navigation';
import { AnimatedBackground } from '@/components/home/animated-background';
import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'es');

  if (!post) {
    return {};
  }

  const canonicalUrl = `https://devmarkpe.com/blog/${slug}`;
  const enSlug = getTranslatedSlug(slug, 'es');

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages: enSlug
        ? {
            es: canonicalUrl,
            en: `https://devmarkpe.com/en/blog/${enSlug}`,
          }
        : undefined,
    },
    openGraph: {
      type: 'article',
      locale: 'es_PE',
      url: canonicalUrl,
      title: post.title,
      description: post.description,
      siteName: 'Devmark',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

const headerContent = {
  lang: 'es' as const,
  navLinks: [
    { href: '/', label: 'Inicio' },
    { href: '/#services', label: 'Servicios' },
    { href: '/#portfolio', label: 'Portafolio' },
    { href: '/#hosting', label: 'Hosting' },
    { href: '/#testimonials', label: 'Reseñas' },
    { href: '/blog', label: 'Blog' },
    { href: '#contact', label: 'Contacto' },
  ],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const footerContent = {
  copyright: 'DEVMARK. Todos los derechos reservados.',
};

const servicios = [
  { label: 'Desarrollo web', href: '/servicios/desarrollo-web-a-medida' },
  { label: 'Software a medida', href: '/servicios/desarrollo-software' },
  { label: 'SEO / Posicionamiento', href: '/servicios/seo-optimizacion' },
  { label: 'Automatización', href: '/servicios/automatizacion-procesos' },
  { label: 'Chatbots IA', href: '/servicios/chatbots-ia' },
  { label: 'Diseño UI/UX', href: '/servicios/diseno-ui-ux' },
  { label: 'Marketing digital', href: '/servicios/marketing-digital' },
];

export async function generateStaticParams() {
  const posts = getPosts('es');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug, 'es');

  if (!post) {
    notFound();
  }

  const allPosts = getPosts('es');
  const recentPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  const canonicalUrl = `https://devmarkpe.com/blog/${resolvedParams.slug}`;
  const absoluteImage = post.image.startsWith('http') ? post.image : `https://devmarkpe.com${post.image}`;

  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: [absoluteImage],
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'es-PE',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
            },
            author: {
              '@type': 'Person',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Devmark',
              url: 'https://devmarkpe.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://devmarkpe.com/og-image.svg',
              },
            },
          }),
        }}
      />
      <Header {...headerContent} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
        <div className="mb-4">
          {post.tags?.map(tag => (
            <Badge key={tag} variant="outline" className="border-brand-navy/30 text-brand-navy mx-1">{tag}</Badge>
          ))}
        </div>

        <h1 className="font-medium text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-6 tracking-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-slate-600 text-sm mb-10">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>
              {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}
            </time>
          </div>
        </div>

        <div className="aspect-video w-full relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-brand-light via-brand-lavender/40 to-white">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-contain p-8 sm:p-12"
            data-ai-hint={post.imageHint}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <article className="lg:w-[70%] max-w-3xl">
            <div
              className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-headings:font-bold prose-p:text-slate-700 prose-li:text-slate-700 prose-a:text-brand-blue prose-strong:text-slate-800 prose-table:text-slate-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <aside className="lg:w-[30%]">
            <div className="sticky top-24">
              <div className="mb-8">
                <h3 className="font-bold text-lg text-brand-navy mb-4">Entradas recientes</h3>
                <div className="space-y-4">
                  {recentPosts.map((rp) => (
                    <Link key={rp.slug} href={`/blog/${rp.slug}`} className="block group">
                      <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-brand-light to-brand-lavender/40">
                          <Image src={rp.image} alt={rp.title} fill className="object-contain p-1.5" data-ai-hint={rp.imageHint} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                            {rp.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(rp.date), "d MMM, yyyy", { locale: es })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-brand-light rounded-2xl p-6">
                <h3 className="font-bold text-lg text-brand-navy mb-4">Conoce nuestros servicios</h3>
                <ul className="space-y-2">
                  {servicios.map((s) => (
                    <li key={s.label}>
                      <Link href={s.href} className="flex items-center gap-2 text-slate-600 hover:text-brand-blue transition-colors text-sm group">
                        {s.label}
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <section className="mt-16 bg-brand-navy py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
            ¿Listo para llevar tu negocio al siguiente nivel?
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 h-[52px] px-8 bg-white border-2 border-brand-blue text-brand-blue font-bold rounded-2xl hover:bg-transparent transition-colors text-lg"
          >
            Programar reunión
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
