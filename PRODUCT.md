# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Duenos y responsables de pequenas y medianas empresas, sobre todo en Peru (Lima y
provincias) y algunos fuera del pais: clinicas, inmobiliarias, estudios legales,
comercio electronico, salud y tecnologia. Llegan buscando quien les haga una web,
una tienda, un sistema o una automatizacion, casi siempre desde el celular, y
deciden comparando agencias. No son tecnicos: quieren entender que reciben, cuanto
cuesta y con quien hablan.

## Product Purpose

devmarkpe.com es la web comercial de DEVMARK, agencia de desarrollo web y software
con base en Lima. Su trabajo es que un visitante entienda que DEVMARK puede
resolver su necesidad digital y le escriba por WhatsApp. El exito es una
conversacion de WhatsApp iniciada con contexto (que servicio, que plan).

## Positioning

Un equipo chico a proposito: quien disena el proyecto es quien responde los
mensajes. Estrategia, diseno y tecnologia en una sola mesa, con precios
publicados desde el primer contacto y un cotizador con IA que entrega una
propuesta en PDF al momento. Ademas DEVMARK opera su propia plataforma de IA
(ai.devmarkpe.com) y su propio ERP, lo que respalda los servicios de chatbots,
automatizacion y software a medida.

## Operating Context

- Accion principal: escribir por WhatsApp (+51 975 646 074) con un mensaje
  preparado segun servicio o plan. Secundarias: agendar reunion (Cal.com),
  cotizador con IA (/quote, PDF), formulario de contacto (correo), chat con IA.
- Sitio bilingue: espanol (principal, rutas en raiz) e ingles (/en).
- Proximamente el contenido (paginas, blog, servicios, portafolio) y los
  formularios se administraran desde el ERP de DEVMARK (repo ERP-Devmark, modulo
  CMS); los leads entraran al ERP.

## Capabilities and Constraints

- Next.js 16 + React 19, Tailwind 3. Despliegue en una sola instancia.
- Servicios con planes y precios publicados en soles (src/data/services.ts):
  desarrollo web a medida, CMS y e-commerce, software a medida (ERP/CRM/SaaS/APIs),
  automatizacion, chatbots con IA, SEO, diseno UI/UX, marketing digital,
  consultoria, soporte y mantenimiento, hosting.
- Blog con 55+ articulos por idioma (src/data/blog-posts.ts), portafolio leido de
  Supabase (tabla projects compartida con jaimetr.dev).
- SEO es critico: URLs, metadatos, sitemap y contenido por servicio no se rompen.

## Brand Commitments

- Nombre: DEVMARK (wordmark en tipografia Braze, src/fonts). Logo en public/logo-mark*.svg.
- Color de marca: indigo #3D34BC, compartido con el ERP (decision de Jaime, 22 oct 2026).
- Voz: cercana, directa, sin letra chica; espanol neutro peruano; frases en
  formato oracion (sin Title Case).

## Evidence on Hand

Confirmado como real por Jaime (22 oct 2026):
- 100+ clientes satisfechos, 6 marcas colaboradoras, 91% mayor rapidez de ejecucion,
  +100 proyectos entregados para negocios en Peru.
- Clientes: ADLIM, JOPCO, TAKLAB, LUCE INMOBILIARIA, MEMORANDUM, MM TECH, DETALZONE,
  SUPERPROFE, NEWDENIM, OFFROADPERU, BREEZLINGO, AS ABOGADOS.
- Testimonios del sitio.

Pendiente o no real: las fotos de public/testimonials son avatares de stock
(uifaces), no de los clientes; las imagenes de public/portfolio son ilustrativas
(una generada con IA). No presentarlas como fotos reales de clientes o proyectos.

## Product Principles

1. Cada pagina termina en una conversacion de WhatsApp con contexto.
2. Precio y alcance visibles: nada de "consultanos" cuando hay precio publicado.
3. Mostrar trabajo real antes que adjetivos.
4. Primero el celular: la mayoria llega desde el telefono.
5. Ninguna cifra, cliente o testimonio inventado.
