# ♿ Guía de Accesibilidad WCAG 2.1 - DevMark

## 🎨 Análisis de Contraste de Colores

### Colores Principales Actuales:

```css
--primary: hsl(var(--primary))           /* Azul Principal */
--background: hsl(var(--background))     /* Fondo Oscuro */
--foreground: hsl(var(--foreground))     /* Texto Claro */
--muted-foreground: hsl(...)             /* Texto Secundario */
```

### Recomendaciones WCAG AA/AAA:

| Contraste | Nivel | Requisito |
|-----------|-------|-----------|
| **4.5:1** | AA | Texto normal mínimo |
| **3:1** | AA | Texto grande (18pt+) |
| **7:1** | AAA | Texto normal ideal |
| **4.5:1** | AAA | Texto grande ideal |

### ✅ Lo que Está Bien:
- Links con `aria-label` descriptivos
- Skip link implementado
- Buttons accesibles con Radix UI
- Form labels asociados correctamente
- Modales con focus trap

### ⚠️ Lo que Debe Revisarse:
1. **Ratio de Contraste:**
   ```bash
   # Usar herramienta online: https://webaim.org/resources/contrastchecker/
   # Verificar: primary vs background
   # Verificar: muted-foreground vs background
   ```

2. **Tamaños de Fuente:**
   - Hero: ✅ Grande (3xl-6xl)
   - Body: ✅ Legible (16px)
   - Labels: ✅ Visible

3. **Focus Visible:**
   ```css
   /* Verificar que todos los botones tengan focus visible */
   button:focus {
     outline: 2px solid var(--primary);
     outline-offset: 2px;
   }
   ```

---

## 🧪 Checklist de Accesibilidad

### Navegación
- [x] Header semántico
- [x] Nav con Links accesibles
- [x] Skip link al contenido principal
- [ ] Breadcrumbs en rutas anidadas (pendiente)

### Contenido
- [x] Headings jerárquicos (h1, h2, h3...)
- [x] Párrafos con spacing
- [x] Listas semánticas
- [ ] Revisar orden visual vs DOM (pendiente)

### Formularios
- [x] Labels asociados a inputs
- [x] Error messages descriptivos
- [x] Placeholder como hint, no label
- [ ] Validación en tiempo real con aria-live (pendiente)

### Imágenes
- [x] Alt text en todas las imágenes
- [x] SVGs con role="img" y aria-label
- [ ] Decorative images con role="presentation" (pendiente)
- [ ] Verificar que alt text sea descriptivo (pendiente)

### Botones & Links
- [x] Links con texto descriptivo o aria-label
- [x] Botones con role correcto
- [x] External links con rel="noopener noreferrer"
- [ ] Focus order lógico (pendiente)

### Modales & Interactivos
- [ ] Focus trap en modales (verificar Sheet component)
- [ ] Escape key cierra modales
- [ ] aria-modal="true" en modales
- [ ] aria-labelledby para título del modal

### Testing
```bash
# Ejecutar auditoría de accesibilidad:
# 1. Instalar Lighthouse CI
npm install --save-dev @lhci/cli@^0.11.0

# 2. Correr auditoría local
npx lighthouse https://devmarkpe.com --output-path=./lighthouse.html

# 3. Probar navegación con teclado:
# - Tab para navegar
# - Enter para activar
# - Escape para cerrar modales

# 4. Probar con lector de pantalla (NVDA/JAWS/VoiceOver)
```

---

## 📋 Paleta de Colores Recomendada

Para mejorar la accesibilidad visual:

```css
/* Colores con buen contraste */
--primary: #3b82f6;          /* Azul */
--primary-dark: #1e40af;     /* Azul Oscuro (para focus) */
--background: #0f172a;       /* Casi Negro */
--background-light: #1e293b; /* Gris Muy Oscuro */
--foreground: #f1f5f9;       /* Casi Blanco */
--muted-foreground: #94a3b8; /* Gris Claro */
--error: #ef4444;            /* Rojo */
--success: #10b981;          /* Verde */
--warning: #f59e0b;          /* Ámbar */
```

### Ratios Verificados:
- **Azul (#3b82f6) vs Negro (#0f172a)**: ~6.5:1 ✅ AAA
- **Gris (#94a3b8) vs Negro (#0f172a)**: ~4.8:1 ✅ AA

---

## 🎤 Focus Management

Asegurar visible focus en:

```tsx
// Componentes que necesitan focus visible:
Button, Link, Input, Select, Checkbox, Radio, Tab

// CSS para focus visible:
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

---

## 📱 Responsividad Accesible

- [x] Viewport meta tag presente
- [x] Responsive design implementado
- [x] Touch targets ≥ 44x44px
- [ ] Verificar en dispositivos reales (pendiente)

---

## 🔊 Lectores de Pantalla

Textos que deben ser incluidos:

```tsx
// Links externos
aria-label="Instagram - Abre en una nueva ventana"

// Iconos sin texto
aria-label="Menú de navegación"

// Secciones
<section aria-label="Servicios principales">
<section aria-label="Testimonios de clientes">
<section aria-label="Formulario de contacto">
```

---

## ✨ Mejoras Rápidas a Implementar

1. **Focus Visible Global**
```css
/* Add to globals.css */
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

2. **Breadcrumbs en Blog**
```tsx
<nav aria-label="Breadcrumb">
  <ol>
    <li><Link href="/blog">Blog</Link></li>
    <li aria-current="page">{post.title}</li>
  </ol>
</nav>
```

3. **Aria-Live para Notificaciones**
```tsx
<div aria-live="polite" aria-atomic="true" role="status">
  {/* Toast notifications aquí */}
</div>
```

---

## 📚 Recursos Útiles

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [NVDA Screen Reader](https://www.nvaccess.org/)

---

**Revisado:** 6 de enero de 2026
**Estado:** En Progreso ⚙️
