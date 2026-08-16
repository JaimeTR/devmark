-- ==========================================
-- Schema completo — tabla "quotes" (cotizador con IA)
--
-- DECISIÓN: DEVMARK usa el MISMO proyecto Supabase que jaimetr.dev
-- (epmdauwektgtwujsisdh.supabase.co, el que ya tiene "profile", "projects",
-- "experience", "skills", "posts", "messages", "chat_messages"). No hay
-- colisión de nombres — "quotes" y "knowledge_docs" no existen ahí todavía.
-- NEXT_PUBLIC_SUPABASE_URL/ANON_KEY de DEVMARK deben apuntar a ese mismo
-- proyecto (mismos valores que NEXT_PUBLIC_PROJECTS_SUPABASE_URL/KEY).
--
-- Este script es idempotente: se puede correr en un proyecto Supabase
-- nuevo (crea la tabla completa desde cero) o sobre uno que ya tenga la
-- tabla "quotes" de una versión anterior del cotizador (agrega solo las
-- columnas/políticas que falten, sin borrar cotizaciones ya guardadas) —
-- y sobre el proyecto de jaimetr.dev no toca ninguna de sus tablas
-- existentes, solo agrega las nuevas ("quotes") y una columna opcional
-- en "chat_messages" (ver sección final).
--
-- Instrucciones: Supabase → proyecto epmdauwektgtwujsisdh → SQL Editor →
-- pegar y correr este archivo completo. Se puede volver a correr sin
-- problema si se agregan más campos al cotizador en el futuro.
-- ==========================================

-- 1) Tabla base — si no existe, se crea ya con el esquema final completo.
create table if not exists quotes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Quién cotiza
  responsible_name text not null default '',
  company_name text,

  -- El proyecto
  project_name text not null,
  project_type text not null,
  project_type_other text,
  features text[] not null default '{}',
  design text not null,
  timeline text not null default 'flexible',
  currency text not null default 'PEN',
  currency_other text,
  additional_info text,
  contact_email text not null,
  lang text not null check (lang in ('es', 'en')),

  -- Lo que generó la IA
  summary text not null,
  items jsonb not null default '[]',
  price text not null,
  recommendations text not null,
  payment_methods text not null
);

-- 2) Si la tabla ya existía de una versión anterior, agregar las columnas
-- que falten sin tocar los datos que ya haya.
alter table quotes add column if not exists responsible_name text not null default '';
alter table quotes add column if not exists company_name text;
alter table quotes add column if not exists project_type_other text;
alter table quotes add column if not exists timeline text not null default 'flexible';
alter table quotes add column if not exists currency text not null default 'PEN';
alter table quotes add column if not exists currency_other text;
alter table quotes add column if not exists items jsonb not null default '[]';

-- 3) Columna vieja: "scope" (text[]) quedó reemplazada por "items" (jsonb,
-- guarda título + descripción + precio de cada ítem, no solo texto plano).
alter table quotes drop column if exists scope;

-- 4) Reglas de validación (se recrean para no duplicarlas si ya existían).
alter table quotes drop constraint if exists valid_project_type;
alter table quotes add constraint valid_project_type check (
  project_type in ('landing-page', 'corporate-website', 'ecommerce', 'custom-software', 'pwa', 'other')
);

alter table quotes drop constraint if exists valid_design;
alter table quotes add constraint valid_design check (
  design in ('no-design', 'have-idea', 'have-design')
);

alter table quotes drop constraint if exists valid_timeline;
alter table quotes add constraint valid_timeline check (
  timeline in ('urgent', '1-2-months', 'flexible')
);

alter table quotes drop constraint if exists valid_currency;
alter table quotes add constraint valid_currency check (
  currency in ('PEN', 'USD', 'other')
);

-- 5) Índices para búsquedas rápidas.
create index if not exists idx_quotes_created_at on quotes(created_at desc);
create index if not exists idx_quotes_contact_email on quotes(contact_email);
create index if not exists idx_quotes_project_type on quotes(project_type);
create index if not exists idx_quotes_lang on quotes(lang);

-- 6) Seguridad a nivel de fila (RLS): el sitio inserta cotizaciones con la
-- clave anónima (público), pero solo un usuario autenticado (admin) puede
-- leerlas — así nadie puede ver las cotizaciones de otros desde el sitio.
alter table quotes enable row level security;

drop policy if exists "Enable insert for authenticated and anon users" on quotes;
create policy "Enable insert for authenticated and anon users"
on quotes for insert
to anon, authenticated
with check (true);

drop policy if exists "Enable read access for authenticated users only" on quotes;
create policy "Enable read access for authenticated users only"
on quotes for select
to authenticated
using (true);

comment on table quotes is 'Cotizaciones generadas por el cotizador con IA de DEVMARK';
comment on column quotes.responsible_name is 'Nombre de la persona que cotiza';
comment on column quotes.company_name is 'Empresa del cliente, si aplica';
comment on column quotes.project_type_other is 'Detalle libre cuando project_type = "other"';
comment on column quotes.timeline is 'Plazo deseado: urgent | 1-2-months | flexible';
comment on column quotes.currency is 'Moneda de la cotización: PEN | USD | other';
comment on column quotes.currency_other is 'Nombre de la moneda cuando currency = "other"';
comment on column quotes.items is 'Ítems de la propuesta: [{title, description, price}, ...]';

-- ==========================================
-- Chats del asistente de IA de DEVMARK → misma tabla "chat_messages"
-- que ya usa jaimetr.dev, para verlos juntos desde su admin.
--
-- Solo agrega una columna "source" (no toca ninguna fila ni columna
-- existente de jaimetr.dev). Si "chat_messages" no existe todavía en el
-- proyecto (instalación nueva), la crea con el mismo esquema que ya usa
-- jaimetr.dev más la columna "source".
-- ==========================================

create table if not exists chat_messages (
  id bigint generated by default as identity primary key,
  session_id text not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  language text default 'es',
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

alter table chat_messages add column if not exists source text default 'jaimetr';
comment on column chat_messages.source is 'Sitio de origen del chat: "jaimetr" (portafolio) o "devmark" (asistente IA de la empresa)';

create index if not exists idx_chat_messages_session_id on chat_messages(session_id);
create index if not exists idx_chat_messages_source on chat_messages(source);

alter table chat_messages enable row level security;

drop policy if exists "Enable insert for anon and authenticated" on chat_messages;
create policy "Enable insert for anon and authenticated"
on chat_messages for insert
to anon, authenticated
with check (true);

drop policy if exists "Enable read for authenticated users only" on chat_messages;
create policy "Enable read for authenticated users only"
on chat_messages for select
to authenticated
using (true);

-- ==========================================
-- Consultas útiles para revisar datos
-- ==========================================

-- Ver todas las cotizaciones (solo funciona autenticado como admin en Supabase)
-- select * from quotes order by created_at desc;

-- Cotizaciones por tipo de proyecto
-- select project_type, count(*) as total from quotes group by project_type order by total desc;

-- Cotizaciones recientes (últimos 7 días)
-- select * from quotes where created_at > now() - interval '7 days' order by created_at desc;

-- Chats entrantes del asistente de IA de DEVMARK (excluye los de jaimetr.dev)
-- select * from chat_messages where source = 'devmark' order by created_at desc;
