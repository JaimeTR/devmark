
import { getPostBySlug, getPosts } from '@/data/blog-posts';
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
  copyright: 'DevMark. Todos los derechos reservados.',
};

const servicios = [
  { label: 'Desarrollo Web', href: '/servicios/desarrollo-web-a-medida' },
  { label: 'Software a Medida', href: '/servicios/desarrollo-software' },
  { label: 'SEO / Posicionamiento', href: '/servicios/seo-optimizacion' },
  { label: 'Automatización', href: '/servicios/automatizacion-procesos' },
  { label: 'Chatbots IA', href: '/servicios/chatbots-ia' },
  { label: 'Diseño UI/UX', href: '/servicios/diseno-ui-ux' },
  { label: 'Marketing Digital', href: '/servicios/marketing-digital' },
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

  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
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

        <div className="aspect-video w-full relative rounded-2xl overflow-hidden mb-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
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
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={rp.image} alt={rp.title} fill className="object-cover" data-ai-hint={rp.imageHint} />
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
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        {s.label}
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-navy font-bold rounded-full hover:bg-brand-light transition-colors text-lg"
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
