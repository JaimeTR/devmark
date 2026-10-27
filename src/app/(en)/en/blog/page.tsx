import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { PageHero } from '@/components/site/page-hero';
import { BlogIndex } from '@/components/landing/blog-index';
import { getPosts } from '@/data/blog-posts';

export default async function BlogPage() {
  // Solo resumenes: el contenido de cada articulo no viaja al navegador.
  const posts = (await getPosts('en')).map(({ slug, title, description, date, image, tags }) => ({ slug, title, description, date, image, tags }));
  return (
    <div className="bg-paper">
      <Header lang="en" contactButton="Contact" aiAssistant="AI Assistant" aiAssistantTooltip="Hi! I'm your AI assistant." />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <PageHero title={['Ideas and guides', { em: 'to grow online' }]} description="Articles on web development, software, SEO and the latest tech trends for businesses." />
        <BlogIndex posts={posts} lang="en" />
      </main>
      <Footer lang="en" copyright="DEVMARK. All rights reserved." />
    </div>
  );
}
