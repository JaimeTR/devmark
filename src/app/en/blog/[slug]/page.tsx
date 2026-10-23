
import { getPostBySlug, getPosts, getTranslatedSlug } from '@/data/blog-posts';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { BlogArticle } from '@/components/landing/blog-article';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'en');

  if (!post) {
    return {};
  }

  const canonicalUrl = `https://devmarkpe.com/en/blog/${slug}`;
  const esSlug = await getTranslatedSlug(slug, 'en');

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
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
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
  const posts = await getPosts('en');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug, 'en');

  if (!post) {
    notFound();
  }

  const recentPosts = (await getPosts('en')).filter((p) => p.slug !== post.slug).slice(0, 3);
  const canonicalUrl = `https://devmarkpe.com/en/blog/${resolvedParams.slug}`;
  const absoluteImage = `https://devmarkpe.com/en/blog/${post.slug}/opengraph-image`;

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
                url: 'https://devmarkpe.com/og-image.png',
              },
            },
          }),
        }}
      />
      <Header {...headerContent} />
      <BlogArticle post={post} recent={recentPosts} lang="en" />
      <Footer lang="en" copyright={footerContent.copyright} />
    </div>
  );
}
