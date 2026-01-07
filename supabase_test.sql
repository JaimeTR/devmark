-- ==========================================
-- 🧪 SCRIPT DE PRUEBA - Supabase
-- ==========================================
-- Ejecuta este script después de crear la tabla quotes
-- para verificar que todo funciona correctamente
-- ==========================================

-- 1. Verificar que la tabla existe
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'quotes'
) AS table_exists;

-- 2. Ver la estructura de la tabla
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'quotes'
ORDER BY ordinal_position;

-- 3. Verificar políticas de RLS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'quotes';

-- 4. Insertar un registro de prueba
INSERT INTO quotes (
    project_name,
    project_type,
    features,
    design,
    additional_info,
    contact_email,
    lang,
    summary,
    scope,
    price,
    recommendations,
    payment_methods
) VALUES (
    'Proyecto de Prueba',
    'landing-page',
    ARRAY['responsive', 'seo', 'analytics'],
    'have-idea',
    'Este es un registro de prueba para verificar la conexión',
    'test@devmarkpe.com',
    'es',
    'Resumen de prueba generado',
    ARRAY['Diseño responsivo', 'Optimización SEO', 'Integración Analytics'],
    '$500 - $800 USD',
    'Recomendaciones de prueba',
    'PLIN, YAPE, PayPal'
);

-- 5. Verificar que se insertó correctamente
SELECT 
    id,
    created_at,
    project_name,
    contact_email,
    project_type,
    lang
FROM quotes
ORDER BY created_at DESC
LIMIT 5;

-- 6. Contar total de registros
SELECT COUNT(*) as total_quotes FROM quotes;

-- ==========================================
-- 🧹 LIMPIAR (OPCIONAL)
-- ==========================================
-- Si quieres borrar el registro de prueba:
-- DELETE FROM quotes WHERE contact_email = 'test@devmarkpe.com';
