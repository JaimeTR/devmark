
'use client';

import { useState } from 'react';
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getProjects } from '@/data/projects';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { TechStack } from '@/components/landing/sections/tech-stack';

const PROJECTS_PER_PAGE = 4;

const headerContent = {
  lang: 'en' as const,
  navLinks: [
    { href: '/en', label: 'Home' },
    { href: '/en/portfolio', label: 'Portfolio' },
    { href: '/en/blog', label: 'Blog' },
    { href: '/en#contact', label: 'Contact' },
  ],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const techStackContent = {
    title: "Our Technology Stack",
    subtitle: "We use cutting-edge technologies to build modern, fast, and scalable solutions.",
}

const footerContent = {
  copyright: 'DevMark. All rights reserved.',
};

const curatedTags = ['E-commerce', 'AI Chatbot', 'Custom Software', 'Web Development', 'SEO', 'UI/UX Design'];


export default function PortfolioPage() {
  const projects = getProjects('en');
  
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS_PER_PAGE);

  const filteredProjects = selectedTag
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects;

  const projectsToShow = filteredProjects.slice(0, visibleProjects);

  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <header className="text-center mb-16">
            <Badge variant="outline" className="text-primary border-primary/50 mb-4">Our Work</Badge>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-gradient">
              Featured Projects
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
              A selection of our work that showcases our commitment to excellence and innovation.
            </p>
          </header>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedTag(null)
                setVisibleProjects(PROJECTS_PER_PAGE);
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
                    setSelectedTag(tag);
                    setVisibleProjects(PROJECTS_PER_PAGE);
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsToShow.map((project, index) => (
              <Card key={index} className="overflow-hidden bg-primary/5 backdrop-blur-sm border-primary/10 group transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
                <CardContent className="p-0">
                  <div className="relative h-60 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={project.hint}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-headline text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                     {project.link && (
                      <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                        <Link href={project.link} target="_blank">
                          <Eye className="mr-2 h-4 w-4"/> View Project
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

           {visibleProjects < filteredProjects.length && (
            <div className="mt-12 text-center">
              <Button onClick={() => setVisibleProjects(prev => prev + PROJECTS_PER_PAGE)}>
                Load More
              </Button>
            </div>
          )}

          <div className="pt-16 sm:pt-24">
            <TechStack {...techStackContent} />
          </div>

        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
