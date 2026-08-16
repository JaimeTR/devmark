-- Migración: reemplaza la columna "scope" (text[]) por "items" (jsonb)
-- en la tabla "quotes" del proyecto Supabase de DEVMARK.
-- El cotizador ahora guarda cada ítem con título, descripción y precio
-- individual en vez de una lista plana de strings.
--
-- Correr en el SQL Editor de Supabase del proyecto de DEVMARK
-- (no el proyecto compartido con jaimetr.dev).

alter table quotes add column if not exists items jsonb;
alter table quotes add column if not exists timeline text;
alter table quotes add column if not exists responsible_name text;
alter table quotes add column if not exists company_name text;
alter table quotes add column if not exists currency text;
alter table quotes add column if not exists project_type_other text;
alter table quotes add column if not exists currency_other text;

-- Si la columna "scope" existía y tenía datos, se puede migrar a items
-- envolviendo cada string como { "title": <texto>, "description": "", "price": "" }.
-- Descomenta la siguiente línea solo si quieres conservar el histórico:
-- update quotes set items = (select jsonb_agg(jsonb_build_object('title', s, 'description', '', 'price', '')) from unnest(scope) as s) where scope is not null;

alter table quotes drop column if exists scope;
