import { createClient } from '@supabase/supabase-js';

// Variables de entorno para Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Database features will be disabled.');
}

// Crear cliente de Supabase (puede ser null si no hay credenciales)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Tipos para la base de datos
export interface QuoteRecord {
  id?: string;
  created_at?: string;
  project_name: string;
  project_type: string;
  features: string[];
  design: string;
  additional_info?: string;
  contact_email: string;
  lang: string;
  summary: string;
  scope: string[];
  price: string;
  recommendations: string;
  payment_methods: string;
}

// Helper para verificar si Supabase está disponible
export const isSupabaseConfigured = (): boolean => {
  return supabase !== null;
};
