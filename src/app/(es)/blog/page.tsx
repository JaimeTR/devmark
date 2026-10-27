import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { PageHero } from '@/components/site/page-hero';
import { BlogIndex } from '@/components/landing/blog-index';
import { getPosts } from '@/data/blog-posts';

export default async function BlogPage() {
  // Solo resumenes: el contenido de cada articulo no viaja al navegador.
  const posts = (await getPosts('es')).map(({ slug, title, description, date, image, tags }) => ({ slug, title, description, date, image, tags }));
  return (
    <div className="bg-paper">
      <Header lang="es" contactButton="Contactar" aiAssistant="Asistente IA" aiAssistantTooltip="¡Hola! Soy tu asistente de IA." />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <PageHero title={['Ideas y guías', { em: 'para crecer en internet' }]} description="Artículos sobre desarrollo web, software, SEO y las últimas tendencias en tecnología para negocios." />
        <BlogIndex posts={posts} lang="es" />
      </main>
      <Footer lang="es" copyright="DEVMARK. Todos los derechos reservados." />
    </div>
  );
}
