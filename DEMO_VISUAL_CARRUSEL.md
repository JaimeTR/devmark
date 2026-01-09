# 🎬 DEMO VISUAL - CARRUSEL DE PROYECTOS

## 📐 Layout del Carrusel

```
┌─────────────────────────────────────────────────────────┐
│                  PÁGINA DE INICIO                        │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─ Hero Section                                      ─┐  │
│  │  "Impulsa Tu Negocio con Tecnología de Punta"     │  │
│  └─────────────────────────────────────────────────────┘  │
│                          ↓                                │
│  ┌──────────────────────────────────────────────────────┐ │
│  │        🎪 PROYECTOS DESTACADOS (NUEVO)             │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │                                                      │ │
│  │   ◀  ┌──────────────────────────────┐  ▶           │ │
│  │      │                              │              │ │
│  │      │    [Imagen Proyecto #2]      │              │ │
│  │      │    Autoplay: 4.2s restantes  │              │ │
│  │      │                              │              │ │
│  │      │  Chatbot de Atención al      │              │ │
│  │      │  Cliente con IA               │              │ │
│  │      │  Tags: Chatbot, IA, 24/7     │              │ │
│  │      └──────────────────────────────┘              │ │
│  │                  🔵 ⚪ ⚪                            │ │
│  │                                                      │ │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐      │ │
│  │  │ E-commerce │ │  CHATBOT   │ │   CRM      │      │ │
│  │  │            │ │   (actual) │ │            │      │ │
│  │  └────────────┘ └────────────┘ └────────────┘      │ │
│  │                                                      │ │
│  │     [Ver Portafolio Completo →]                    │ │
│  └──────────────────────────────────────────────────────┘ │
│                          ↓                                │
│  ┌─ Servicios Principales                            ─┐  │
│  │  • Desarrollo Web a Medida                         │  │
│  │  • Desarrollo con CMS                              │  │
│  │  • Chatbots con IA                                 │  │
│  │  ... y más                                         │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Estados del Carrusel

### Estado 1: E-commerce Global (Inicio)
```
Imagen: ecommerce-global.jpg ✓
Título: "Plataforma E-commerce Global"
Descripción: "Una solución de comercio electrónico completa..."
Tags: E-commerce, Shopify, Diseño UI/UX
Indicador: 🔵 ⚪ ⚪
Autoplay: Activo (5s)
```

### Estado 2: Chatbot IA (Después de 5s)
```
Imagen: chatbot-ia.jpg ✓
Título: "Chatbot de Atención al Cliente con IA"
Descripción: "Un chatbot inteligente para una empresa..."
Tags: Chatbot con IA, Genkit, Servicio al Cliente
Indicador: ⚪ 🔵 ⚪
Autoplay: Activo (5s)
```

### Estado 3: CRM Inmobiliaria (Después de 5s)
```
Imagen: crm-inmobiliaria.jpg ✓
Título: "CRM a Medida para Inmobiliaria"
Descripción: "Un CRM desarrollado desde cero para..."
Tags: Software a Medida, CRM, SaaS
Indicador: ⚪ ⚪ 🔵
Autoplay: Activo (5s)
→ Vuelve a E-commerce y repite...
```

## 🎮 Interacciones Disponibles

### 1. Hacer Clic en Botón Siguiente (▶)
```
Estado Actual: E-commerce
       ↓
  [Usuario hace clic ▶]
       ↓
Autoplay: PAUSA
       ↓
Estado Nuevo: Chatbot
       ↓
Indicador: ⚪ 🔵 ⚪
```

### 2. Hacer Clic en Punto Indicador
```
Indicadores: 🔵 ⚪ ⚪
[Usuario hace clic en ⚪ (tercero)]
       ↓
Autoplay: PAUSA
       ↓
Estado Nuevo: CRM
       ↓
Indicador: ⚪ ⚪ 🔵
```

### 3. Hacer Clic en Tarjeta Preview
```
Tarjetas:
[E-commerce] [Chatbot] [CRM]
[Usuario hace clic en Tarjeta E-commerce]
       ↓
Autoplay: PAUSA
       ↓
Estado Nuevo: E-commerce (si no estaba)
       ↓
Indicador: 🔵 ⚪ ⚪
```

### 4. Esperar sin Interactuar
```
Usuario entra a página
       ↓
[Espera 5 segundos sin hacer clic]
       ↓
Autoplay: CONTINÚA
       ↓
Cambio automático al siguiente proyecto
```

### 5. Hacer Clic en "Ver Portafolio Completo"
```
[Usuario hace clic en botón]
       ↓
Navegación: /portfolio (o /en/portfolio si es inglés)
       ↓
Se abre la página de portafolio completa con 8 proyectos
```

## 📱 Responsive Behavior

### Móvil (< 640px)
```
Altura carrusel: 400px
Preview cards: 1 columna
Botones nav: 4px (radio)
Textos: Más pequeños
Padding: 6px/8px
```

### Tablet (640px - 1024px)
```
Altura carrusel: 450px
Preview cards: 3 columnas
Botones nav: 5px (radio)
Textos: Medianos
Padding: 8px
```

### Desktop (> 1024px)
```
Altura carrusel: 500px
Preview cards: 3 columnas
Botones nav: 6px (radio)
Textos: Grandes
Padding: 8px
```

## 🌍 Idiomas Soportados

### Español (/)
```
Título: "Proyectos Destacados"
Subtítulo: "Conoce algunos de nuestros mejores trabajos"
Botón: "Ver Portafolio Completo"
```

### Inglés (/en)
```
Título: "Featured Projects"
Subtítulo: "Discover some of our best work"
Botón: "View Full Portfolio"
```

## 📊 Métricas de Rendimiento

```
Tamaño componente: ~190 líneas
Imágenes mostradas: 3 × ~100KB = ~300KB
Animaciones: GPU-aceleradas (smooth)
Carga inicial: 0s (preload)
Transiciones: 500ms
Autoplay: 5000ms (configurable)
```

## 🎨 Colores y Temas

```
Fondo imagen: Degradado negro (from-black/80)
Overlay: Transparencia dinámica
Texto: Blanco (#FFFFFF)
Tags: Blanco con fondo semi-transparente
Botón nav: Blanco con opacidad 20/30%
Indicador activo: Ancho de 8px
Indicador inactivo: 3px
Botón CTA: Color primario del tema
```

## ✨ Efectos Visuales

```
1. Al pasar mouse sobre imagen:
   Efecto zoom 105% suave en 500ms

2. Al pasar mouse sobre botón nav:
   De blanco/20% a blanco/30%

3. Al hacer clic en tarjeta preview:
   Scale 105% + ring-2 ring-primary

4. Transición entre proyectos:
   Fade suave de imagen
   Cambio de contenido sincronizado

5. Hover en botón "Ver Portafolio":
   Darkening ligero del color primario
```

---

**Esta visualización te ayuda a entender:**
- ✅ Dónde está el carrusel en la página
- ✅ Cómo se ve en diferentes tamaños
- ✅ Qué proyectos muestra
- ✅ Cómo interactúan los usuarios
- ✅ Qué sucede en cada estado
