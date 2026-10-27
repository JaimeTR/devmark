import { supabaseProjects, type ProjectRow } from '@/lib/supabase-projects';
import { DESCRIPCIONES_EN } from '@/data/projects-en';
import { erpLeer } from '@/lib/erp-sitio';

export interface Project {
  title: string;
  description: string;
  image: string;
  hasCover: boolean;
  hint: string;
  tags: string[];
  link?: string;
  url?: string;
  category: string;
  rubro?: string;
  date: string;
  isFeatured: boolean;
  // Campos extra para el modal de detalle del portafolio (galería, marca,
  // cliente) — no siempre presentes según lo cargado en Supabase.
  logoUrl?: string;
  secondaryImage?: string;
  githubUrl?: string;
  clientName?: string;
  companyName?: string;
}

// La tabla compartida tiene categorías con variantes de escritura distintas
// (mayúsculas, singular/plural, con o sin guion) — normalizamos todas a las
// mismas 7 claves que usan los filtros del portafolio, así ningún proyecto
// se queda huérfano de filtro.
const CATEGORY_ALIASES: Record<string, string> = {
  'webs': 'webs',
  'sistemas web': 'webs',
  'sistemas-web': 'webs',
  'ecommerce': 'ecommerce',
  'e-commerce': 'ecommerce',
  'software a medida': 'software',
  'software-a-medida': 'software',
  'inteligencia artificial': 'ia',
  'ia': 'ia',
  'automatizaciones': 'automatizacion',
  'automatizacion': 'automatizacion',
  'landing pages': 'landing',
  'landing-pages': 'landing',
  'landing': 'landing',
};

function normalizeCategory(raw: string | null): string {
  const slug = (raw || '').toLowerCase().trim();
  return CATEGORY_ALIASES[slug] || (slug ? slug.replace(/\s+/g, '-') : 'otros');
}

function mapRow(row: ProjectRow, lang: 'es' | 'en'): Project {
  const title = (lang === 'en' ? row.title_en : row.title_es) || row.title;
  const description = (lang === 'en' ? row.description_en || DESCRIPCIONES_EN[Number(row.id)] : row.description_es) || row.description;
  const image = row.cover_url || row.image_url || '';
  const externalLink = row.link_url || row.website_url || row.demo_url || undefined;
  // Segunda imagen para la galería del modal, solo si es distinta de la principal.
  const secondaryImage = row.image_url && row.image_url !== image ? row.image_url : undefined;

  return {
    title,
    description,
    image,
    hasCover: Boolean(image),
    hint: row.rubro || row.category || title,
    tags: row.technologies ?? [],
    link: row.link_url || undefined,
    url: externalLink,
    category: normalizeCategory(row.category),
    rubro: row.rubro || undefined,
    date: row.created_at,
    isFeatured: Boolean(row.is_featured),
    logoUrl: row.logo_url || undefined,
    secondaryImage,
    githubUrl: row.github_url || undefined,
    clientName: row.client_name || undefined,
    companyName: row.company_name || row.brand_name || undefined,
  };
}

type ProyectoErp = {
  titulo: string; tituloEn: string | null; descripcion: string; descripcionEn: string | null; categoria: string; rubro: string | null; tecnologias: string[];
  portada: string | null; imagen: string | null; logo: string | null; enlace: string | null; github: string | null; cliente: string | null; marca: string | null; destacado: boolean; fecha: string;
};

function desdeErp(p: ProyectoErp, lang: 'es' | 'en'): Project {
  const title = (lang === 'en' ? p.tituloEn : null) || p.titulo;
  const image = p.portada || p.imagen || '';
  return {
    title,
    description: (lang === 'en' ? p.descripcionEn : null) || p.descripcion,
    image,
    hasCover: Boolean(image),
    hint: p.rubro || p.categoria || title,
    tags: p.tecnologias,
    link: p.enlace || undefined,
    url: p.enlace || undefined,
    category: normalizeCategory(p.categoria),
    rubro: p.rubro || undefined,
    date: p.fecha,
    isFeatured: p.destacado,
    logoUrl: p.logo || undefined,
    secondaryImage: p.imagen && p.imagen !== image ? p.imagen : undefined,
    githubUrl: p.github || undefined,
    clientName: p.cliente || undefined,
    companyName: p.marca || undefined,
  };
}

// El portafolio se administra en el ERP (Sitios > Portafolio), en el orden que se fije alla. Si el ERP no
// esta conectado o aun no tiene proyectos, se lee la tabla "projects" del Supabase compartido con
// jaimetr.dev, como antes.
export async function getProjects(lang: 'es' | 'en'): Promise<Project[]> {
  const erp = await erpLeer<{ proyectos: ProyectoErp[] }>('/portafolio');
  if (erp && erp.proyectos.length > 0) return erp.proyectos.map((p) => desdeErp(p, lang));

  if (!supabaseProjects) {
    return [];
  }

  const { data, error } = await supabaseProjects
    .from('projects')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching projects from Supabase:', error.message);
    return [];
  }

  return (data ?? [])
    .map((row) => mapRow(row as ProjectRow, lang))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .sort((a, b) => Number(b.hasCover) - Number(a.hasCover));
}
