'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Building2, Phone, Calculator } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Project } from '@/data/projects';

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang?: 'es' | 'en';
  categoryLabel?: string;
  contactHref: string;
  quoteHref: string;
}

const copy = {
  es: {
    visitButton: 'Visitar página',
    codeButton: 'Ver código',
    contactButton: 'Contactar',
    quoteButton: 'Cotizar proyecto',
    clientLabel: 'Cliente',
  },
  en: {
    visitButton: 'Visit page',
    codeButton: 'View code',
    contactButton: 'Contact',
    quoteButton: 'Quote project',
    clientLabel: 'Client',
  },
};


export function ProjectDetailModal({ project, open, onOpenChange, lang = 'es', categoryLabel, contactHref, quoteHref }: ProjectDetailModalProps) {
  const t = copy[lang];
  if (!project) return null;

  const gallery = [project.image, project.secondaryImage].filter(Boolean) as string[];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-3xl border border-white/60 bg-white/95 backdrop-blur-xl p-0">
        <div className={gallery.length > 1 ? 'grid grid-cols-2 gap-1' : ''}>
          {gallery.length > 0 ? (
            gallery.map((src, i) => (
              <div
                key={i}
                className={`relative w-full bg-gradient-to-br from-brand-light via-brand-lavender/40 to-white overflow-hidden ${
                  gallery.length > 1 ? 'aspect-square' : 'aspect-video rounded-t-3xl'
                }`}
              >
                <Image src={src} alt={`${project.title} ${i + 1}`} fill className="object-cover" />
              </div>
            ))
          ) : (
            <div className="aspect-video w-full bg-gradient-to-br from-brand-navy/10 via-brand-blue/10 to-brand-lavender/20 rounded-t-3xl flex items-center justify-center">
              <span className="text-5xl font-extrabold text-brand-navy/20">{project.title.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <DialogHeader className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              {project.logoUrl && (
                <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-white">
                  <Image src={project.logoUrl} alt={lang === 'en' ? `${project.title} logo` : `Logo de ${project.title}`} fill className="object-contain p-1" />
                </div>
              )}
              {categoryLabel && (
                <span className="text-xs font-semibold text-brand-blue bg-brand-lavender/50 rounded-[7px] px-3 py-1">
                  {categoryLabel}
                </span>
              )}
            </div>
            <DialogTitle className="font-headline text-2xl sm:text-3xl text-brand-navy tracking-tight text-left">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          {(project.companyName || project.clientName) && (
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <Building2 className="h-4 w-4 shrink-0" />
              <span>{project.companyName || `${t.clientLabel}: ${project.clientName}`}</span>
            </div>
          )}

          <p className="text-slate-600 leading-relaxed mb-6">{project.description}</p>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-medium text-slate-600 bg-brand-light rounded-[7px] px-3 py-1 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Link href={quoteHref} className="btn-ink btn-sm">
              <span className="btn-tile">
                <Calculator className="h-4 w-4" />
              </span>
              {t.quoteButton}
            </Link>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                <span className="btn-tile">
                  <ExternalLink className="h-4 w-4" />
                </span>
                {t.visitButton}
              </a>
            )}
            <Link href={contactHref} className="btn-outline btn-sm">
              <span className="btn-tile">
                <Phone className="h-4 w-4" />
              </span>
              {t.contactButton}
            </Link>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                <span className="btn-tile">
                  <Github className="h-4 w-4" />
                </span>
                {t.codeButton}
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
