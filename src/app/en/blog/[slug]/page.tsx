
import { getPostBySlug, getPosts, getTranslatedSlug } from '@/data/blog-posts';
import { notFound } from 'next/navigation';
import { AnimatedBackground } from '@/components/home/animated-background';
import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en');

  if (!post) {
    return {};
  }

  const canonicalUrl = `https://devmarkpe.com/en/blog/${slug}`;
  const esSlug = getTranslatedSlug(slug, 'en');

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages: esSlug
        ? {
            es: `https://devmarkpe.com/blog/${esSlug}`,
            en: canonicalUrl,
          }
        : undefined,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
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
  lang: 'en' as const,
  navLinks: [
    { href: '/en', label: 'Home' },
    { href: '/en#services', label: 'Services' },
    { href: '/en#portfolio', label: 'Portfolio' },
    { href: '/en#hosting', label: 'Hosting' },
    { href: '/en#testimonials', label: 'Reviews' },
    { href: '/en/blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const footerContent = {
  copyright: 'DEVMARK. All rights reserved.',
};

export async function generateStaticParams() {
  const posts = getPosts('en');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug, 'en');

  if (!post) {
    notFound();
  }

  const canonicalUrl = `https://devmarkpe.com/en/blog/${resolvedParams.slug}`;
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
            inLanguage: 'en-US',
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
        <article className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
             <div className="mb-4">
              {post.tags?.map(tag => (
                <Badge key={tag} variant="outline" className="text-primary border-primary/50 mx-1">{tag}</Badge>
              ))}
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-gradient mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                        {format(new Date(post.date), "MMMM d, yyyy", { locale: enUS })}
                    </time>
                </div>
            </div>
          </header>
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8 bg-gradient-to-br from-brand-light via-brand-lavender/40 to-white">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-contain p-8 sm:p-12"
              data-ai-hint={post.imageHint}
            />
          </div>
          <div
            className="prose prose-invert prose-lg max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer lang="en" copyright={footerContent.copyright} />
    </div>
  );
}
