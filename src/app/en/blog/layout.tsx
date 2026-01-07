import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - DevMark | Articles on Web Development and Software',
  description: 'Read our articles and guides on web development, custom software, SEO, technology and digital transformation for your business.',
  keywords: 'blog, development guides, technical articles, SEO, web development, software, tutorials, technology',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/en/blog',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/blog',
    title: 'Blog - DevMark | Articles on Web Development and Software',
    description: 'Read our articles and guides on web development, custom software, SEO, technology and digital transformation.',
    siteName: 'DevMark',
  },
};

export default function EnBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
