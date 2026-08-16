import { createClient } from '@supabase/supabase-js';

// Separate Supabase project shared with jaimetr.dev — this is the single
// source of truth for portfolio projects, consumed by both sites with
// their own designs/pages.
const projectsSupabaseUrl = process.env.NEXT_PUBLIC_PROJECTS_SUPABASE_URL;
const projectsSupabaseKey = process.env.NEXT_PUBLIC_PROJECTS_SUPABASE_KEY;

if (!projectsSupabaseUrl || !projectsSupabaseKey) {
  console.warn('⚠️ Shared projects Supabase credentials not found. Portfolio will be empty.');
}

export const supabaseProjects = projectsSupabaseUrl && projectsSupabaseKey
  ? createClient(projectsSupabaseUrl, projectsSupabaseKey)
  : null;

// Row shape of the shared "projects" table (jaimetr.dev schema).
export interface ProjectRow {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  category: string | null;
  rubro: string | null;
  technologies: string[] | null;
  link_url: string | null;
  github_url: string | null;
  is_featured: boolean;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  slug: string;
  title_es: string | null;
  title_en: string | null;
  description_es: string | null;
  description_en: string | null;
  short_description_es: string | null;
  short_description_en: string | null;
  demo_url: string | null;
  company_name: string | null;
  brand_name: string | null;
  logo_url: string | null;
  cover_url: string | null;
  tags: string[] | null;
  status: string | null;
  client_name: string | null;
  website_url: string | null;
}
