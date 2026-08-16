import { supabaseProjects, type ProjectRow } from '@/lib/supabase-projects';

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
  const description = (lang === 'en' ? row.description_en : row.description_es) || row.description;
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

// Shared with jaimetr.dev: both sites read the same "projects" table in
// Supabase (different design/pages per site), so this fetches live instead
// of shipping its own copy of the data.
export async function getProjects(lang: 'es' | 'en'): Promise<Project[]> {
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
