
import { getPostBySlug, getPosts } from '@/data/blog-posts';
import { notFound } from 'next/navigation';
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, User } from 'lucide-react';

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

export async function generateStaticParams() {
  const posts = getPosts('es');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, 'es');

  if (!post) {
    notFound();
  }

  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <div className="mb-4">
              {post.tags?.map(tag => (
                <Badge key={tag} variant="outline" className="text-primary border-primary/50 mx-1">{tag}</Badge>
              ))}
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-gradient mb-4">
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
                        {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}
                    </time>
                </div>
            </div>
          </header>
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post.imageHint}
            />
          </div>
          <div
            className="prose prose-invert prose-lg max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
