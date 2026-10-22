
import { getPostBySlug, getPosts, getTranslatedSlug } from '@/data/blog-posts';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { BlogArticle } from '@/components/landing/blog-article';
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
    <div className="bg-paper">
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
      <BlogArticle post={post} recent={recentPosts} lang="es" />
      <Footer lang="es" copyright={footerContent.copyright} />
    </div>
  );
}
