
'use client';

import { useState } from 'react';
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getPosts } from '@/data/blog-posts';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const POSTS_PER_PAGE = 9;

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
  copyright: 'DevMark. All rights reserved.',
};

const curatedTags = ['Web Development', 'Custom Software', 'SEO', 'UI/UX Design', 'Digital Marketing', 'Automation'];


export default function BlogPage() {
  const posts = getPosts('en');
  
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <header className="text-center mb-16">
            <Badge variant="outline" className="text-primary border-primary/50 mb-4">Our Latest Blogs</Badge>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-gradient">
              DevMark Blog
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
              Explore our articles on web development, software, SEO, and the latest tech trends.
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
                "border-primary/50 text-primary hover:bg-primary/10",
                !selectedTag ? "bg-primary/20" : ""
              )}
            >
              All
            </Button>
            {curatedTags.map(tag => (
              <Button
                key={tag}
                variant="outline"
                onClick={() => {
                  setSelectedTag(tag)
                  setVisiblePosts(POSTS_PER_PAGE);
                }}
                className={cn(
                  "border-primary/50 text-primary hover:bg-primary/10",
                  selectedTag === tag ? "bg-primary/20" : ""
                )}
              >
                {tag}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToShow.map((post) => (
              <Link key={post.slug} href={`/en/blog/${post.slug}`} className="group">
                <Card className="overflow-hidden h-full flex flex-col bg-primary/5 backdrop-blur-sm border-primary/10 transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
                  <div className="relative h-52 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={post.imageHint}
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-2">
                        {format(new Date(post.date), "MMMM d, yyyy", { locale: enUS })}
                      </p>
                      <h2 className="font-headline text-xl font-bold mb-2 text-gradient-blue">{post.title}</h2>
                      <p className="text-muted-foreground line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                       <span className="text-sm font-medium text-primary">Read more</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
           {visiblePosts < filteredPosts.length && (
            <div className="mt-12 text-center">
              <Button onClick={() => setVisiblePosts(prev => prev + POSTS_PER_PAGE)}>
                Load More
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
