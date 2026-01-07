# 🗄️ Configuración de Supabase - Sistema de Cotizaciones

## 📋 Requisitos Previos

1. Tener una cuenta en [Supabase](https://supabase.com/)
2. Crear un nuevo proyecto en Supabase (o usar uno existente)

## 🚀 Pasos para Configurar

### 1️⃣ Obtener las Credenciales de Supabase

1. Ir a tu [Dashboard de Supabase](https://app.supabase.com/)
2. Seleccionar tu proyecto
3. En el menú lateral, ir a **Settings** → **API**
4. Copiar las siguientes credenciales:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon public** key

### 2️⃣ Configurar Variables de Entorno

1. Crear un archivo `.env.local` en la raíz del proyecto (si no existe)
2. Agregar las siguientes variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

> ⚠️ **Importante:** El archivo `.env.local` ya está en `.gitignore` para proteger tus credenciales

### 3️⃣ Crear la Tabla en Supabase

1. En tu proyecto de Supabase, ir a **SQL Editor**
2. Copiar todo el contenido del archivo `supabase_schema.sql`
3. Pegar en el editor SQL
4. Hacer clic en **Run** para ejecutar el script

Esto creará:
- ✅ La tabla `quotes` con todas las columnas necesarias
- ✅ Índices para mejorar el rendimiento
- ✅ Políticas de seguridad (Row Level Security)

### 4️⃣ Verificar la Configuración

Ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

Cuando generes una cotización, deberías ver en la consola:
- ✅ `Quote saved to Supabase successfully` - Si todo funciona
- ⚠️ `Supabase not configured...` - Si faltan las variables de entorno

## 🔍 Verificar que las Cotizaciones se Guardan

### Opción 1: Desde el Dashboard de Supabase

1. Ir a **Table Editor** en tu proyecto
2. Seleccionar la tabla `quotes`
3. Ver los registros guardados

### Opción 2: Usando el SQL Editor

```sql
-- Ver todas las cotizaciones
SELECT * FROM quotes ORDER BY created_at DESC;

-- Ver solo las últimas 10
SELECT * FROM quotes ORDER BY created_at DESC LIMIT 10;

-- Contar cotizaciones por tipo
SELECT project_type, COUNT(*) as total 
FROM quotes 
GROUP BY project_type;
```

## 📊 Estructura de la Tabla

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | ID único autogenerado |
| `created_at` | TIMESTAMP | Fecha de creación automática |
| `project_name` | TEXT | Nombre del proyecto |
| `project_type` | TEXT | Tipo: landing-page, ecommerce, etc. |
| `features` | TEXT[] | Array de características |
| `design` | TEXT | Estado del diseño |
| `additional_info` | TEXT | Información adicional |
| `contact_email` | TEXT | Email del cliente |
| `lang` | TEXT | Idioma (es/en) |
| `summary` | TEXT | Resumen generado por IA |
| `scope` | TEXT[] | Alcance del proyecto |
| `price` | TEXT | Precio estimado |
| `recommendations` | TEXT | Recomendaciones de IA |
| `payment_methods` | TEXT | Métodos de pago |

## 🔒 Seguridad (Row Level Security)

El esquema incluye políticas de seguridad:

- **INSERT**: Permitido para usuarios anónimos (necesario para que el formulario funcione)
- **SELECT**: Solo para usuarios autenticados (protege la privacidad de los clientes)

### Acceder a los Datos como Admin

Si necesitas ver las cotizaciones como administrador:

1. Crear un usuario en **Authentication** → **Users**
2. Usar ese usuario para hacer login
3. O desactivar RLS temporalmente (⚠️ solo en desarrollo):

```sql
ALTER TABLE quotes DISABLE ROW LEVEL SECURITY;
```

## ❌ Solución de Problemas

### Error: "relation quotes does not exist"
→ Ejecutar el script SQL completo en el SQL Editor

### Error: "new row violates row-level security policy"
→ Verificar que las políticas RLS estén configuradas correctamente

### Las cotizaciones no se guardan pero no hay error
→ Verificar que las variables de entorno estén bien configuradas en `.env.local`

### Verificar conexión a Supabase
Agregar esto temporalmente en tu código:

```typescript
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

console.log('Supabase configured:', isSupabaseConfigured());
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
```

## 📱 Próximos Pasos (Opcional)

- [ ] Implementar dashboard para ver cotizaciones
- [ ] Agregar autenticación para admin
- [ ] Exportar cotizaciones a CSV
- [ ] Enviar notificaciones por email cuando llegue una cotización
- [ ] Agregar filtros y búsqueda en el dashboard

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas:
1. Verificar la consola del navegador (F12)
2. Verificar los logs del servidor
3. Revisar los logs en Supabase Dashboard → **Logs**

---

✨ **¡Listo!** Tu sistema de cotizaciones ahora guarda todos los datos en Supabase.
