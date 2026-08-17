-- ==========================================
-- 📚 Base de conocimiento del chatbot - DEVMARK
-- ==========================================
-- Contexto adicional que la IA del chat (src/ai/chat-shared.ts) consulta
-- para responder con precisión sobre políticas, procesos y dudas frecuentes
-- que no están cubiertas por los datos de servicios/precios (esos ya se
-- inyectan directo desde src/data/services.ts, no hace falta duplicarlos aquí).
--
-- Instrucciones:
-- 1. Ir al proyecto de Supabase de DEVMARK (el propio, NO el compartido con jaimetr.dev)
-- 2. Abrir el SQL Editor
-- 3. Copiar y ejecutar este archivo completo
-- ==========================================

CREATE TABLE IF NOT EXISTS knowledge_docs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  lang TEXT NOT NULL CHECK (lang IN ('es', 'en')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_knowledge_docs_lang ON knowledge_docs(lang);
CREATE INDEX IF NOT EXISTS idx_knowledge_docs_lang_title ON knowledge_docs(lang, title);
CREATE INDEX IF NOT EXISTS idx_knowledge_docs_lang_created_at ON knowledge_docs(lang, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_docs_tags ON knowledge_docs USING gin (tags);
CREATE INDEX IF NOT EXISTS idx_knowledge_docs_content ON knowledge_docs USING gin (to_tsvector('spanish', content));

ALTER TABLE knowledge_docs ENABLE ROW LEVEL SECURITY;

-- Lectura pública (la IA consulta esta tabla con la anon key desde el servidor).
CREATE POLICY "Enable read access for everyone"
ON knowledge_docs FOR SELECT
TO anon, authenticated
USING (true);

-- Solo usuarios autenticados (admin) pueden escribir/editar contenido.
CREATE POLICY "Enable write access for authenticated users only"
ON knowledge_docs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

COMMENT ON TABLE knowledge_docs IS 'Base de conocimiento consultada por el chat con IA para dar respuestas más precisas';
COMMENT ON COLUMN knowledge_docs.lang IS 'Idioma del documento (es/en)';
COMMENT ON COLUMN knowledge_docs.title IS 'Título corto del documento, se muestra como contexto a la IA';
COMMENT ON COLUMN knowledge_docs.content IS 'Contenido del documento, en texto plano';
COMMENT ON COLUMN knowledge_docs.tags IS 'Etiquetas para facilitar búsqueda por palabra clave';

-- ==========================================
-- 🌱 Contenido inicial curado
-- ==========================================

INSERT INTO knowledge_docs (lang, title, content, tags) VALUES
('es', 'Tiempos de entrega',
 'Los tiempos de entrega varían según el proyecto: una landing page toma entre 1 y 2 semanas, un sitio corporativo de 2 a 4 semanas, un e-commerce de 3 a 6 semanas, y software a medida de 6 a 12 semanas dependiendo del alcance. Siempre se define un cronograma específico durante la primera reunión.',
 ARRAY['tiempos', 'entrega', 'plazos', 'duracion']),
('en', 'Delivery times',
 'Delivery times vary by project: a landing page takes 1-2 weeks, a corporate site 2-4 weeks, an e-commerce 3-6 weeks, and custom software 6-12 weeks depending on scope. A specific timeline is always defined during the first meeting.',
 ARRAY['timeline', 'delivery', 'duration']),

('es', 'Métodos de pago',
 'Aceptamos pagos por transferencia bancaria, Yape, Plin y tarjeta de crédito/débito a través de pasarelas como Stripe o PayPal para clientes internacionales. Normalmente se solicita un adelanto del 50% para iniciar el proyecto y el saldo restante contra entrega.',
 ARRAY['pago', 'metodos de pago', 'adelanto', 'factura']),
('en', 'Payment methods',
 'We accept bank transfer, Yape, Plin, and credit/debit card via Stripe or PayPal for international clients. We typically request a 50% deposit to start the project and the remaining balance upon delivery.',
 ARRAY['payment', 'deposit', 'invoice']),

('es', 'Garantía y soporte post-entrega',
 'Todo proyecto incluye 30 días de soporte gratuito post-lanzamiento para corregir errores. Después de ese periodo, ofrecemos planes de soporte y mantenimiento mensual (ver servicio de Soporte y mantenimiento) para actualizaciones, monitoreo y cambios continuos.',
 ARRAY['garantia', 'soporte', 'mantenimiento', 'postventa']),
('en', 'Warranty and post-launch support',
 'Every project includes 30 days of free post-launch support to fix bugs. After that period, we offer monthly support and maintenance plans (see Support and maintenance service) for updates, monitoring, and ongoing changes.',
 ARRAY['warranty', 'support', 'maintenance']),

('es', 'Zona de trabajo y clientes',
 'DEVMARK es una agencia con base en Lima, Perú, y trabaja 100% remoto con clientes en todo Perú y también internacionalmente (Latinoamérica, España, Estados Unidos). Todas las reuniones se coordinan por videollamada.',
 ARRAY['ubicacion', 'lima', 'peru', 'remoto', 'internacional']),
('en', 'Work area and clients',
 'DEVMARK is an agency based in Lima, Peru, working 100% remotely with clients across Peru and internationally (Latin America, Spain, United States). All meetings are coordinated via video call.',
 ARRAY['location', 'lima', 'peru', 'remote', 'international']),

('es', 'Proceso de trabajo',
 'El proceso típico tiene 7 pasos: 1) reunión inicial para entender el negocio, 2) definición de objetivos, 3) diseño de la estructura/arquitectura, 4) diseño visual, 5) desarrollo del sitio o software, 6) revisión y optimización, 7) lanzamiento. El cliente recibe actualizaciones en cada etapa.',
 ARRAY['proceso', 'metodologia', 'pasos', 'como trabajan']),
('en', 'Work process',
 'The typical process has 7 steps: 1) initial meeting to understand the business, 2) goal definition, 3) structure/architecture design, 4) visual design, 5) development of the site or software, 6) review and optimization, 7) launch. The client receives updates at every stage.',
 ARRAY['process', 'methodology', 'steps', 'how they work'])
ON CONFLICT DO NOTHING;

-- ==========================================
-- 🔍 Consultas útiles para testing
-- ==========================================

-- Ver todos los documentos
-- SELECT title, lang, tags FROM knowledge_docs ORDER BY created_at DESC;

-- Buscar por palabra clave
-- SELECT * FROM knowledge_docs WHERE lang = 'es' AND content ILIKE '%garantia%';
