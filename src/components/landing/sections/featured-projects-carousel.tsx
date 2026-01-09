'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  hasCover: boolean;
  hint: string;
  tags: string[];
  date: string;
}

interface FeaturedProjectsCarouselProps {
  projects: Project[];
  lang?: 'es' | 'en';
  title?: string;
  subtitle?: string;
  viewMoreText?: string;
}

export function FeaturedProjectsCarousel({
  projects,
  lang = 'es',
  title = 'Proyectos Destacados',
  subtitle = 'Conoce algunos de nuestros mejores trabajos',
  viewMoreText = 'Ver Portafolio Completo'
}: FeaturedProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Mostrar solo los primeros 3 proyectos
  const displayProjects = projects.slice(0, 3);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayProjects.length);
    }, 5000); // Cambiar cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlay, displayProjects.length]);

  const goToPrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => 
      prev === 0 ? displayProjects.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % displayProjects.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  const currentProject = displayProjects[currentIndex];

  return (
    <section id="featured-projects" className="py-16 md:py-24">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      </div>

      {/* Carrusel Principal */}
      <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden group">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <Image
            src={currentProject.image}
            alt={currentProject.hint}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Contenido del proyecto */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {currentProject.title}
          </h3>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mb-4 line-clamp-2">
            {currentProject.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {currentProject.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Controles de navegación */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="Anterior proyecto"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="Siguiente proyecto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicadores de puntos */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {displayProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/40 w-3 hover:bg-white/60'
              }`}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tarjetas de preview debajo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">
        {displayProjects.map((project, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-32 md:h-40 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer group ${
              index === currentIndex ? 'ring-2 ring-primary scale-105' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Image
              src={project.image}
              alt={project.hint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            <p className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center px-2 text-sm line-clamp-2">
              {project.title}
            </p>
          </button>
        ))}
      </div>

      {/* Botón Ver Portafolio Completo */}
      <div className="flex justify-center">
        <Link href="/portfolio">
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-semibold">
            {viewMoreText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </section>
  );
}
