'use client';

import { useState } from 'react';
import { getProjects } from '@/data/projects';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  { key: 'all', label: 'Todos' },
  { key: 'webs', label: 'Webs' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'software', label: 'Software a medida' },
  { key: 'ia', label: 'IA' },
  { key: 'automatizacion', label: 'Automatización' },
  { key: 'landing', label: 'Landing Pages' },
];

function getCategoryLabel(category: string) {
  const cat = categories.find(c => c.key === category);
  return cat ? cat.label : category;
}

const headerContent = {
  lang: 'es' as const,
  navLinks: [
    { href: '/#hero', label: 'Inicio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/portfolio', label: 'Portafolio' },
    { href: '/hosting', label: 'Hosting' },
    { href: '/#contact', label: 'Contacto' },
  ],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const footerContent = {
  copyright: 'DevMark. Todos los derechos reservados.',
};

export default function PortfolioPage() {
  const projects = getProjects('es');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header {...headerContent} />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-b from-brand-light/80 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-medium text-4xl sm:text-5xl md:text-6xl text-brand-navy tracking-tight">
              Nuestro portafolio
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Proyectos que reflejan nuestra experiencia y compromiso con la calidad
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat.key
                      ? 'bg-brand-navy text-white shadow-md'
                      : 'bg-brand-light text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <article
                  key={index}
                  className="group bg-brand-light rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-brand-navy/10 via-brand-blue/10 to-brand-lavender/20">
                    {project.hasCover && project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={project.hint}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-extrabold text-brand-navy/20">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-navy-dark/50 to-transparent" />
                    <span className="absolute top-3 left-3 inline-block text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-semibold text-xl text-brand-navy mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-slate-500 bg-white rounded-full px-3 py-1 border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.url && (
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-blue transition-colors group mt-auto"
                      >
                        Ver proyecto
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No hay proyectos en esta categoría aún.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
