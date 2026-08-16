
'use client';

import { useState } from 'react';
import { AnimatedBackground } from '@/components/home/animated-background';
import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getPosts } from '@/data/blog-posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, ArrowRight, Bot, Code, Globe, Search, Paintbrush, Zap } from 'lucide-react';

const POSTS_PER_PAGE = 9;

const headerContent = {
  lang: 'es' as const,
  navLinks: [
    { href: '/', label: 'Inicio' },
    { href: '/#services', label: 'Servicios' },
    { href: '/portfolio', label: 'Portafolio' },
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

const curatedTags = ['Desarrollo Web', 'Software a Medida', 'SEO', 'Diseño UI/UX', 'Marketing Digital', 'Automatización'];

const TAG_ICONS: Record<string, JSX.Element> = {
  'Desarrollo Web': <Globe className="mr-2 h-4 w-4" aria-hidden="true" />,
  'Software a Medida': <Code className="mr-2 h-4 w-4" aria-hidden="true" />,
  'SEO': <Search className="mr-2 h-4 w-4" aria-hidden="true" />,
  'Diseño UI/UX': <Paintbrush className="mr-2 h-4 w-4" aria-hidden="true" />,
  'Marketing Digital': <Zap className="mr-2 h-4 w-4" aria-hidden="true" />,
  'Automatización': <Bot className="mr-2 h-4 w-4" aria-hidden="true" />,
};

export default function BlogPage() {
  const posts = getPosts('es');
  
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  const postsToShow = filteredPosts.slice(0, visiblePosts);

  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <div className="absolute top-16 right-0 w-72 h-72 bg-brand-blue/15 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute top-64 left-0 w-64 h-64 bg-brand-lavender/40 rounded-full blur-[100px] pointer-events-none" />

          <header className="relative text-center mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-5 rounded-2xl bg-brand-lavender/80 backdrop-blur-md text-brand-navy border border-brand-lavender/50 shadow-lg shadow-brand-blue/15 animate-fade-in-up">
              <Globe className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">Nuestros últimos blogs</span>
            </div>
            <h1 className="font-medium text-4xl sm:text-5xl md:text-6xl text-brand-navy tracking-tight animate-fade-in-up stagger-1">
              Blog de <span className="font-logo">DEVMARK</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-600 animate-fade-in-up stagger-2">
              Explora nuestros artículos sobre desarrollo web, software, SEO y las últimas tendencias en tecnología.
            </p>
          </header>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedTag(null);
                setVisiblePosts(POSTS_PER_PAGE);
              }}
              className={cn(
                "border-brand-navy/30 text-brand-navy hover:bg-brand-light transition-colors",
                !selectedTag ? "bg-brand-light border-brand-navy/50" : ""
              )}
            >
              Todos
            </Button>
            {curatedTags.map(tag => (
              <Button
                key={tag}
                variant="outline"
                onClick={() => {
                  setSelectedTag(tag);
                  setVisiblePosts(POSTS_PER_PAGE);
                }}
                className={cn(
                  "border-brand-navy/30 text-brand-navy hover:bg-brand-light transition-colors",
                  selectedTag === tag ? "bg-brand-light border-brand-navy/50" : ""
                )}
              >
                <span className="inline-flex items-center">
                  {TAG_ICONS[tag]}
                  {tag}
                </span>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToShow.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="overflow-hidden h-full flex flex-col bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl shadow-sm transition-all duration-300 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/15 hover:-translate-y-1">
                  <div className="relative h-52 w-full bg-gradient-to-br from-brand-light via-brand-lavender/40 to-white p-6">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={post.imageHint}
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <p className="text-sm text-slate-500 mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}
                      </p>
                      <h2 className="font-headline text-xl font-bold mb-2 text-brand-navy group-hover:text-brand-blue transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1 mb-3">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs border-slate-200 text-slate-500">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-brand-blue font-medium text-sm">
                      <span>Leer más</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {visiblePosts < filteredPosts.length && (
            <div className="mt-12 text-center">
              <Button onClick={() => setVisiblePosts(prev => prev + POSTS_PER_PAGE)} className="h-[52px] px-8 rounded-2xl bg-brand-blue hover:bg-brand-navy-dark text-white">
                Ver más
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
