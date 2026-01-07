# Páginas de Agradecimiento y Confirmación

## 📍 Ubicación

- **Español:** `/gracias`
- **Inglés:** `/en/thank-you`

## 🎯 Propósito

Páginas flexibles de confirmación y agradecimiento que se utilizan después de completar acciones importantes en el sitio web, como:

- ✉️ Enviar formulario de contacto
- 📅 Agendar reunión por Google Meet
- 💰 Solicitar cotización
- ✅ Cualquier otra acción que requiera confirmación

## 🚀 Características

### ✨ Diseño Moderno
- Fondo animado con partículas
- Iconos animados con efecto bounce y pulse
- Tarjetas con efecto glassmorphism
- Gradientes vibrantes
- Responsive design completo

### ⏱️ Contador de Redirección
- Redirección automática después de 10 segundos
- Barra de progreso visual
- El usuario puede cancelar haciendo clic en los botones CTA

### 🎨 Mensajes Personalizados
Soporta 4 tipos predefinidos de mensajes:

1. **contact** - Formulario de contacto
2. **meeting** - Reunión agendada
3. **quote** - Cotización solicitada
4. **default** - Mensaje genérico

## 📖 Uso

### Redirección Básica

```typescript
// Español
router.push('/gracias?type=contact');

// Inglés
router.push('/en/thank-you?type=meeting');
```

### Con Parámetros Personalizados

```typescript
// Mensaje completamente personalizado
const url = `/gracias?type=default&title=${encodeURIComponent('¡Pago exitoso!')}&message=${encodeURIComponent('Tu pedido ha sido procesado correctamente')}`;
router.push(url);
```

### Parámetros de URL Disponibles

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `type` | string | Tipo de mensaje predefinido | `contact`, `meeting`, `quote`, `default` |
| `title` | string (opcional) | Título personalizado que sobrescribe el predefinido | `¡Registro exitoso!` |
| `message` | string (opcional) | Mensaje personalizado que sobrescribe el predefinido | `Tu cuenta ha sido creada` |

## 💡 Ejemplos de Implementación

### Ejemplo 1: Desde Server Action

```typescript
'use server';

export async function submitForm(formData: FormData) {
  // Procesar formulario...
  
  if (success) {
    redirect('/gracias?type=contact');
  }
}
```

### Ejemplo 2: Desde Componente Cliente

```typescript
'use client';

import { useRouter } from 'next/navigation';

export function MyForm() {
  const router = useRouter();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Procesar formulario...
    const success = await sendData();
    
    if (success) {
      router.push('/gracias?type=contact');
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Ejemplo 3: Agendamiento de Reunión

```typescript
'use client';

export function ScheduleMeeting() {
  const handleSchedule = () => {
    // Abrir Google Calendar
    const calendarUrl = `https://calendar.google.com/calendar/...`;
    window.open(calendarUrl, '_blank');
    
    // Redirigir a página de confirmación
    setTimeout(() => {
      router.push('/gracias?type=meeting');
    }, 1000);
  };
  
  return <Button onClick={handleSchedule}>Agendar Reunión</Button>;
}
```

### Ejemplo 4: Mensaje Completamente Personalizado

```typescript
const customUrl = `/gracias?` + new URLSearchParams({
  type: 'default',
  title: '¡Suscripción exitosa! 🎉',
  message: 'Ahora recibirás nuestro boletín mensual con las últimas novedades.'
}).toString();

router.push(customUrl);
```

## 🎨 Personalización de Mensajes

Los mensajes predefinidos se encuentran en el objeto `messages` dentro de cada página:

```typescript
const messages: Record<MessageType, MessageConfig> = {
  contact: {
    icon: <MessageCircle className="w-16 h-16" />,
    title: '¡Gracias por contactarnos! 🎉',
    description: 'Hemos recibido tu mensaje exitosamente',
    subtitle: 'Nuestro equipo lo está revisando...',
    ctaText: 'Volver al Inicio',
    ctaLink: '/',
  },
  // ... más tipos
};
```

## 🔧 Integración Actual

### Formulario de Contacto

El componente de contacto ya está integrado y redirige automáticamente:

```typescript
// src/components/landing/sections/contact.tsx

useEffect(() => {
  if (state?.success) {
    const thankYouUrl = props.lang === 'en' 
      ? '/en/thank-you?type=contact'
      : '/gracias?type=contact';
    
    setTimeout(() => {
      router.push(thankYouUrl);
    }, 2000);
  }
}, [state?.success, props.lang, router]);
```

## 📱 Secciones de la Página

1. **Hero Section**
   - Icono animado
   - Título principal
   - Descripción
   - Mensaje personalizado

2. **Tarjetas de Valor**
   - Respuesta rápida (24h)
   - Atención personalizada
   - Soluciones innovadoras

3. **Botones de Acción**
   - CTA principal (volver a home/servicios/etc.)
   - CTA secundario (Asistente IA)

4. **Contador de Redirección**
   - Tiempo restante
   - Barra de progreso visual

5. **Próximos Pasos**
   - Explorar servicios
   - Ver portafolio

## 🎯 Mejores Prácticas

1. **Siempre usar `type` apropiado** para mantener consistencia
2. **Personalizar solo cuando sea necesario** - los mensajes predefinidos cubren la mayoría de casos
3. **Codificar URL** al usar parámetros personalizados: `encodeURIComponent()`
4. **Considerar el idioma** del usuario al redirigir
5. **Dar feedback visual** antes de redirigir (ej: mostrar éxito por 2 segundos)

## 🔮 Casos de Uso Futuros

Estas páginas se pueden usar para:

- ✅ Confirmación de registro
- ✅ Pago exitoso
- ✅ Descarga de recursos
- ✅ Suscripción a newsletter
- ✅ Reserva de demostración
- ✅ Cualquier acción que requiera confirmación

## 🛠️ Mantenimiento

### Agregar Nuevo Tipo de Mensaje

1. Actualizar el tipo `MessageType`:
```typescript
type MessageType = 'contact' | 'meeting' | 'quote' | 'default' | 'nuevo-tipo';
```

2. Agregar configuración en el objeto `messages`:
```typescript
'nuevo-tipo': {
  icon: <YourIcon className="w-16 h-16" />,
  title: 'Tu título',
  description: 'Tu descripción',
  subtitle: 'Tu subtítulo',
  ctaText: 'Texto del botón',
  ctaLink: '/tu-link',
},
```

3. Replicar en ambas versiones (ES e EN)

## 📊 SEO y Metadata

Las páginas incluyen:
- Título dinámico basado en el tipo
- Meta description apropiada
- No-index para evitar indexación (son páginas transitorias)

## 🌐 Soporte de Idiomas

- ✅ Español (`/gracias`)
- ✅ Inglés (`/en/thank-you`)

Cada versión tiene sus propios textos completamente traducidos.

---

**Última actualización:** 6 de enero de 2026
**Versión:** 1.0.0
