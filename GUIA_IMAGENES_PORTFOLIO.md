# 📸 Guía para Agregar Imágenes al Portafolio

## 📁 Ubicación de las Imágenes

Las imágenes de los proyectos del portafolio se almacenan en:
```
public/portfolio/
```

## 🎨 Nombres de Archivos Requeridos

Para que los proyectos muestren correctamente sus portadas, debes agregar las siguientes imágenes generadas con IA:

### Español e Inglés (comparten las mismas imágenes):

1. **ecommerce-global.jpg** - Plataforma E-commerce Global
2. **chatbot-ia.jpg** - Chatbot de Atención al Cliente con IA
3. **crm-inmobiliaria.jpg** - CRM a Medida para Inmobiliaria
4. **web-corporativa.jpg** - Web Corporativa para Startup Tecnológica
5. **seo-dental.jpg** - Optimización SEO para Clínica Dental
6. **marketing-app.jpg** - Campaña de Marketing para Lanzamiento de App
7. **diseno-ux-saas.jpg** - Rediseño de Experiencia de Usuario para SaaS
8. **automatizacion-financiera.jpg** - Automatización de Reportes Financieros

## 📐 Especificaciones de las Imágenes

- **Formato recomendado:** JPG o PNG
- **Dimensiones sugeridas:** 800x600 píxeles (proporción 4:3)
- **Tamaño de archivo:** Optimizado para web (< 200KB por imagen)
- **Calidad:** Alta resolución pero comprimida para rendimiento web

## ✨ Prompts Sugeridos para IA (Ej: DALL-E, Midjourney, Stable Diffusion)

### 1. E-commerce Global
```
Modern e-commerce website dashboard with shopping cart, product grid, multiple currencies, 
professional UI/UX design, tech startup aesthetic, clean and minimalist, blue and white color scheme
```

### 2. Chatbot IA
```
AI chatbot interface on laptop screen, chat bubbles, modern customer service dashboard, 
financial services theme, professional blue gradient, technology aesthetic, clean UI
```

### 3. CRM Inmobiliaria
```
Real estate CRM dashboard, property listings, client management interface, modern SaaS design, 
charts and analytics, professional teal color scheme, clean business aesthetic
```

### 4. Web Corporativa
```
Modern corporate website design for tech startup, hero section with modern layout, 
clean typography, professional color palette, tech innovation theme, laptop mockup
```

### 5. SEO Dental
```
Dental clinic website on computer screen, SEO optimization graphics, Google search results, 
medical aesthetic, clean white and blue theme, professional healthcare design
```

### 6. Marketing App
```
Mobile app launch campaign, social media graphics, influencer marketing concept, 
download statistics, modern digital marketing aesthetic, vibrant colors, app mockup
```

### 7. Diseño UX SaaS
```
UI/UX design process, wireframes and mockups, SaaS platform interface redesign, 
user flow diagrams, modern design thinking, professional workspace, purple and blue theme
```

### 8. Automatización Financiera
```
Financial report automation dashboard, data visualization, automated reporting system, 
charts and graphs, enterprise software aesthetic, professional blue and green color scheme
```

## 🚀 Pasos para Agregar las Imágenes

1. **Genera las imágenes** usando IA (DALL-E, Midjourney, Leonardo.AI, etc.)
2. **Optimiza las imágenes** para web usando herramientas como:
   - TinyPNG (https://tinypng.com/)
   - Squoosh (https://squoosh.app/)
   - ImageOptim (para Mac)
   
3. **Renombra los archivos** exactamente como se indica arriba

4. **Copia las imágenes** a la carpeta:
   ```
   public/portfolio/
   ```

5. **Verifica** que los nombres coincidan exactamente con los especificados

## ✅ Verificación

Después de agregar las imágenes, verifica que:

- [ ] Todas las 8 imágenes estén en `public/portfolio/`
- [ ] Los nombres de archivo sean exactamente como se especifica (minúsculas, con guiones)
- [ ] Las imágenes estén optimizadas (< 200KB cada una)
- [ ] El formato sea JPG o PNG
- [ ] Las dimensiones sean apropiadas (mínimo 800x600px)

## 🔄 Actualizar el Proyecto

Si necesitas cambiar una imagen:

1. Reemplaza el archivo en `public/portfolio/`
2. Mantén el mismo nombre de archivo
3. Limpia la caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)

## 📝 Notas Adicionales

- Las imágenes en la carpeta `public/` son accesibles directamente desde la URL del sitio
- Next.js optimiza automáticamente las imágenes cuando usas el componente `<Image />`
- Si cambias el nombre de un archivo, debes actualizar también `src/data/projects.ts`

## 🎯 Ejemplo de Estructura Final

```
public/
└── portfolio/
    ├── ecommerce-global.jpg
    ├── chatbot-ia.jpg
    ├── crm-inmobiliaria.jpg
    ├── web-corporativa.jpg
    ├── seo-dental.jpg
    ├── marketing-app.jpg
    ├── diseno-ux-saas.jpg
    └── automatizacion-financiera.jpg
```
