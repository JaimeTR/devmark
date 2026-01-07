-- ==========================================
-- 📊 Schema de Base de Datos - DevMark
-- ==========================================
-- Este archivo contiene el SQL necesario para crear
-- la tabla de cotizaciones en Supabase
--
-- Instrucciones:
-- 1. Ir a tu proyecto de Supabase
-- 2. Abrir el SQL Editor
-- 3. Copiar y ejecutar este código
-- ==========================================

-- Crear la tabla de cotizaciones
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Información del proyecto
  project_name TEXT NOT NULL,
  project_type TEXT NOT NULL,
  features TEXT[] NOT NULL,
  design TEXT NOT NULL,
  additional_info TEXT,
  contact_email TEXT NOT NULL,
  lang TEXT NOT NULL CHECK (lang IN ('es', 'en')),
  
  -- Resultados de la cotización
  summary TEXT NOT NULL,
  scope TEXT[] NOT NULL,
  price TEXT NOT NULL,
  recommendations TEXT NOT NULL,
  payment_methods TEXT NOT NULL,
  
  -- Índices para búsquedas rápidas
  CONSTRAINT valid_project_type CHECK (
    project_type IN (
      'landing-page',
      'corporate-website',
      'ecommerce',
      'custom-software',
      'pwa',
      'other'
    )
  ),
  CONSTRAINT valid_design CHECK (
    design IN ('no-design', 'have-idea', 'have-design')
  )
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_contact_email ON quotes(contact_email);
CREATE INDEX IF NOT EXISTS idx_quotes_project_type ON quotes(project_type);
CREATE INDEX IF NOT EXISTS idx_quotes_lang ON quotes(lang);

-- Habilitar Row Level Security (RLS)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT desde el servidor (usando anon key)
-- NOTA: Ajusta esto según tus necesidades de seguridad
CREATE POLICY "Enable insert for authenticated and anon users" 
ON quotes FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Política para permitir SELECT solo a usuarios autenticados (admin)
-- Esto evita que cualquiera pueda leer las cotizaciones
CREATE POLICY "Enable read access for authenticated users only" 
ON quotes FOR SELECT 
TO authenticated
USING (true);

-- Si quieres permitir que el usuario vea solo sus propias cotizaciones
-- (necesitarías implementar autenticación en el frontend):
-- CREATE POLICY "Users can view their own quotes" 
-- ON quotes FOR SELECT 
-- TO authenticated
-- USING (auth.email() = contact_email);

-- Comentarios en las columnas (opcional pero útil)
COMMENT ON TABLE quotes IS 'Almacena las cotizaciones generadas por el sistema de IA';
COMMENT ON COLUMN quotes.id IS 'Identificador único de la cotización';
COMMENT ON COLUMN quotes.created_at IS 'Fecha y hora de creación';
COMMENT ON COLUMN quotes.project_name IS 'Nombre del proyecto del cliente';
COMMENT ON COLUMN quotes.project_type IS 'Tipo de proyecto solicitado';
COMMENT ON COLUMN quotes.features IS 'Array de características seleccionadas';
COMMENT ON COLUMN quotes.design IS 'Estado del diseño del proyecto';
COMMENT ON COLUMN quotes.contact_email IS 'Email de contacto del cliente';
COMMENT ON COLUMN quotes.lang IS 'Idioma de la cotización (es/en)';
COMMENT ON COLUMN quotes.summary IS 'Resumen generado por IA';
COMMENT ON COLUMN quotes.scope IS 'Alcance del proyecto';
COMMENT ON COLUMN quotes.price IS 'Precio estimado';
COMMENT ON COLUMN quotes.recommendations IS 'Recomendaciones de IA';

-- ==========================================
-- 🔍 Consultas útiles para testing
-- ==========================================

-- Ver todas las cotizaciones (solo para admin)
-- SELECT * FROM quotes ORDER BY created_at DESC;

-- Ver cotizaciones por tipo de proyecto
-- SELECT project_type, COUNT(*) as total 
-- FROM quotes 
-- GROUP BY project_type 
-- ORDER BY total DESC;

-- Ver cotizaciones recientes (últimos 7 días)
-- SELECT * FROM quotes 
-- WHERE created_at > NOW() - INTERVAL '7 days'
-- ORDER BY created_at DESC;
