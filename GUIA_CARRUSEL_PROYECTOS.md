# 📖 Guía de Uso del Carrusel de Proyectos Destacados

## 🎯 Descripción General

El carrusel de proyectos destacados es un componente interactivo que muestra los 3 primeros proyectos (con `hasCover: true`) en la página de inicio, justo después de la sección Hero.

## 🎮 Funcionalidades

### Para Visitantes
1. **Autoplay Automático**: El carrusel cambia automáticamente cada 5 segundos
2. **Navegación Manual**:
   - Botones ◀ ▶ a los lados de la imagen principal
   - Puntos indicadores en la parte inferior central
   - Tarjetas de preview hacen clic para saltar a ese proyecto

3. **Visualización Responsiva**:
   - Imagen principal se adapta a cualquier pantalla
   - En móvil: altura 400px, en desktop: 500px
   - Cards preview visibles en grid 1x1 (móvil) o 3x1 (desktop)

4. **Botón "Ver Portafolio Completo"**: Redirige a `/portfolio` o `/en/portfolio`

## 🛠️ Personalización

### Cambiar Cantidad de Proyectos Mostrados

En [src/components/landing/sections/featured-projects-carousel.tsx](src/components/landing/sections/featured-projects-carousel.tsx):

```typescript
// Línea ~25
const displayProjects = projects.slice(0, 3); // Cambiar 3 por la cantidad deseada
```

### Cambiar Intervalo de Autoplay

```typescript
// Línea ~39
}, 5000); // Cambiar 5000ms (5 segundos) por el tiempo deseado
```

### Cambiar Textos

En [src/app/page.tsx](src/app/page.tsx) (español):
```jsx
<FeaturedProjectsCarousel 
  projects={projects}
  lang="es"
  title="Proyectos Destacados"           // Editar aquí
  subtitle="Conoce algunos de nuestros mejores trabajos"  // O aquí
  viewMoreText="Ver Portafolio Completo" // O aquí
/>
```

En [src/app/en/page.tsx](src/app/en/page.tsx) (inglés):
```jsx
<FeaturedProjectsCarousel 
  projects={projects}
  lang="en"
  title="Featured Projects"              // Editar aquí
  subtitle="Discover some of our best work"  // O aquí
  viewMoreText="View Full Portfolio"     // O aquí
/>
```

## 📊 Cómo Funciona la Selección de Proyectos

El carrusel muestra automáticamente los primeros 3 proyectos de la lista devuelta por `getProjects()`.

La función `getProjects()` en [src/data/projects.ts](src/data/projects.ts) ordena los proyectos así:

```typescript
projects[lang]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Por fecha (más recientes primero)
  .sort((a, b) => Number(b.hasCover) - Number(a.hasCover));              // Por hasCover: true (se superponen)
```

**Resultado:** Los proyectos con `hasCover: true` aparecen primero (ordenados por fecha), luego los otros.

### Para Cambiar Cuáles Proyectos se Muestran

1. **Opción A**: Editar `hasCover` en [src/data/projects.ts](src/data/projects.ts)
   - Cambiar a `hasCover: true` los proyectos que quieras en el carrusel
   - Cambiar a `hasCover: false` los que no quieras

2. **Opción B**: Editar el `slice(0, 3)` en [src/components/landing/sections/featured-projects-carousel.tsx](src/components/landing/sections/featured-projects-carousel.tsx)
   - Pero no es recomendado, es mejor usar `hasCover`

## 🎨 Estilos y Colores

El componente usa las clases Tailwind del proyecto. Si quieres cambiar los estilos:

| Elemento | Clase | Ubicación |
|----------|-------|-----------|
| Contenedor principal | `py-16 md:py-24` | línea ~60 |
| Título | `text-3xl md:text-4xl font-bold` | línea ~68 |
| Imagen principal | `group-hover:scale-105` | línea ~86 |
| Overlay | `bg-gradient-to-t from-black/80` | línea ~88 |
| Botones navegación | `bg-white/20 hover:bg-white/30` | línea ~110 |
| Puntos indicadores | `bg-white/20` | línea ~126 |
| Botón "Ver Portafolio" | `bg-primary text-primary-foreground` | línea ~151 |

## 🚀 Deploy

Después de cambios, ejecuta:

```bash
npm run build   # Compilar
npm run dev     # Ver cambios en vivo (localhost:9002)
```

O para producción:
```bash
npm run build
npm start
```

## 📱 Pruebas Recomendadas

- [ ] Probar en móvil (375px)
- [ ] Probar en tablet (768px)
- [ ] Probar en desktop (1024px+)
- [ ] Probar clickeando botones de navegación
- [ ] Dejar autoplay 10 segundos sin interactuar
- [ ] Verificar enlace "Ver Portafolio Completo"
- [ ] Probar en español e inglés

---

**Última actualización:** 8 de enero de 2026
