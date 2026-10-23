import { getPosts } from '@/data/blog-posts';
import { blogOgImage, ogSize } from '@/lib/blog-og';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'DEVMARK blog';

export function generateStaticParams() {
  return getPosts('en').map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return blogOgImage(slug, 'en');
}
