'use client';

import { useState } from 'react';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Briefcase } from 'lucide-react';
import { ProjectDetailModal } from '@/components/portfolio/project-detail-modal';
import type { Project } from '@/data/projects';

const categories = [
  { key: 'all', label: 'Todos' },
  { key: 'webs', label: 'Webs' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'software', label: 'Software a medida' },
  { key: 'ia', label: 'IA' },
  { key: 'automatizacion', label: 'Automatización' },
  { key: 'landing', label: 'Landing pages' },
  { key: 'otros', label: 'Otros' },
];

function getCategoryLabel(category: string) {
  const cat = categories.find(c => c.key === category);
  return cat ? cat.label : category;
}

// Categoría del portafolio -> tipo de proyecto del cotizador, para
// preseleccionarlo al llegar desde "Cotizar proyecto" en el modal.
const categoryToProjectType: Record<string, string> = {
  webs: 'corporate-website',
  landing: 'landing-page',
  ecommerce: 'ecommerce',
  software: 'custom-software',
  ia: 'custom-software',
  automatizacion: 'custom-software',
};

function getQuoteHref(category: string) {
  const type = categoryToProjectType[category];
  return type ? `/quote?type=${type}` : '/quote';
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
  copyright: 'DEVMARK. Todos los derechos reservados.',
};

export function PortfolioClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const openDetail = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header {...headerContent} />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-b from-brand-light/80 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-5 rounded-2xl bg-brand-lavender/80 backdrop-blur-md text-brand-navy border border-brand-lavender/50 shadow-lg shadow-brand-blue/15 animate-fade-in-up">
              <Briefcase className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">Nuestro trabajo</span>
            </div>
            <h1 className="font-medium text-4xl sm:text-5xl md:text-6xl text-brand-navy tracking-tight animate-fade-in-up stagger-1">
              Nuestro portafolio
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 animate-fade-in-up stagger-2">
              Proyectos que reflejan nuestra experiencia y compromiso con la calidad
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
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
                  <button
                    type="button"
                    onClick={() => openDetail(project)}
                    className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-brand-navy/10 via-brand-blue/10 to-brand-lavender/20 text-left"
                  >
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
                  </button>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-semibold text-xl text-brand-navy mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-nowrap items-center gap-2 mb-4 overflow-hidden">
                      {project.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="shrink-0 text-xs font-medium text-slate-500 bg-white rounded-full px-3 py-1 border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="shrink-0 text-xs font-semibold text-brand-blue">
                          +{project.tags.length - 3} más
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      <button
                        type="button"
                        onClick={() => openDetail(project)}
                        className="inline-flex items-center justify-center gap-1.5 h-[52px] px-5 rounded-2xl bg-white border-2 border-brand-blue text-brand-blue hover:bg-transparent font-semibold text-sm transition-all duration-300"
                      >
                        Ver detalle
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 h-[52px] px-5 rounded-2xl border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white font-semibold text-sm shadow-md shadow-brand-blue/20 transition-all duration-300"
                        >
                          Visitar página
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No hay proyectos en esta categoría aún.</p>
              </div>
            )}

            <ProjectDetailModal
              project={selectedProject}
              open={modalOpen}
              onOpenChange={setModalOpen}
              lang="es"
              categoryLabel={selectedProject ? getCategoryLabel(selectedProject.category) : undefined}
              contactHref="/contacto"
              quoteHref={selectedProject ? getQuoteHref(selectedProject.category) : '/quote'}
            />
          </div>
        </section>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
