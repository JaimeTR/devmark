'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight, Briefcase } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  hasCover: boolean;
  hint: string;
  tags: string[];
  date: string;
  category?: string;
  rubro?: string;
  url?: string;
}

interface FeaturedProjectsCarouselProps {
  projects: Project[];
  lang?: 'es' | 'en';
  title?: string;
  subtitle?: string;
  viewMoreText?: string;
  statsLabel?: string;
  statsDescription?: string;
}

const categoryLabels: Record<string, string> = {
  webs: 'Webs',
  ecommerce: 'E-commerce',
  software: 'Software a medida',
  ia: 'Inteligencia artificial',
  automatizacion: 'Automatizaciones',
  landing: 'Landing pages',
};

function getCategoryLabel(cat: string) {
  return categoryLabels[cat] || cat;
}

export function FeaturedProjectsCarousel({
  projects,
  lang = 'es',
  title = 'Proyectos',
  subtitle = '',
  viewMoreText = 'Ver mas proyectos',
  statsLabel = 'PROYECTOS',
  statsDescription = '',
}: FeaturedProjectsCarouselProps) {
  const displayProjects = projects.slice(0, 5);

  return (
    <div className="pt-8 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, index) => (
            <Link
              key={index}
              href={project.url || (lang === 'en' ? '/en/portfolio' : '/portfolio')}
              target={project.url ? '_blank' : '_self'}
              rel={project.url ? 'noopener noreferrer' : undefined}
              className="group relative h-[380px] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden block"
            >
              {project.hasCover ? (
                <Image
                  src={project.image}
                  alt={project.hint}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy-dark" />
              )}

              {/* Brand-tinted gradient so text stays readable over any photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy/70 to-brand-navy/10 group-hover:from-brand-navy-dark group-hover:via-brand-navy/80 transition-all duration-300" />

              <div className="absolute top-4 left-4 right-4 flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-white/15 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full">
                  {getCategoryLabel(project.category || 'webs')}
                </span>
                {project.rubro && (
                  <span className="text-[10px] text-white/80 font-medium bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full">{project.rubro}</span>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-semibold text-lg text-white mb-2 text-balance">{project.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold text-white/90 bg-white/10 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-md">{tag}</span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] font-semibold text-brand-lavender">+{project.tags.length - 3} mas</span>
                  )}
                </div>
                <span className="inline-flex items-center gap-1.5 text-white font-semibold text-xs uppercase tracking-wider">
                  {lang === 'es' ? 'Ver proyecto' : 'View project'}
                  {project.url ? (
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </span>
              </div>
            </Link>
          ))}

          <div className="relative group/cardstack h-[380px]">
            <div className="absolute inset-0 bg-brand-navy/60 rounded-2xl rotate-[5deg] scale-[0.94] origin-center group-hover/cardstack:rotate-[10deg] group-hover/cardstack:translate-x-3 group-hover/cardstack:scale-[0.90] transition-all duration-500 ease-out" />
            <div className="absolute inset-0 bg-brand-navy/80 rounded-2xl rotate-[2deg] scale-[0.97] origin-center group-hover/cardstack:rotate-[5deg] group-hover/cardstack:translate-x-1.5 group-hover/cardstack:scale-[0.94] transition-all duration-400 ease-out" />
            <div className="relative bg-brand-navy text-white rounded-2xl overflow-hidden shadow-lg flex flex-col justify-center p-8 h-full hover:-translate-y-1.5 hover:shadow-xl transition-all duration-400 z-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-brand-lavender" />
                  <span className="text-xs font-extrabold tracking-widest text-brand-lavender uppercase">Developer Background</span>
                </div>
                <div className="space-y-2">
                  <span className="font-extrabold text-6xl text-brand-lavender">{lang === 'es' ? 'Cientos+' : 'Hundreds+'}</span>
                  <p className="text-xs font-extrabold tracking-widest uppercase text-slate-300">{statsLabel}</p>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{statsDescription}</p>
                <Link
                  href={lang === 'en' ? '/en/portfolio' : '/portfolio'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-lg transition-colors"
                >
                  {viewMoreText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
