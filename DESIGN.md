---
name: DevMark
description: Web development & software agency in Lima, Perú — strategy, design, and technology in one studio.
colors:
  ink: "#110C29"
  ink-soft: "#1C1640"
  ink-muted: "#B4B1D6"
  paper: "#FFFFFF"
  mist: "#EEF0FB"
  mist-line: "#D5DAF3"
  band: "#CBD5FA"
  periwinkle: "#A9B4FF"
  indigo: "#3D34BC"
  whatsapp: "#25D366"
typography:
  display:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7.4vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 4rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  accent:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontStyle: italic
    fontWeight: 400
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  wordmark:
    fontFamily: "Braze"
rounded:
  panel: "20px"
  card: "16px"
  button: "10px"
  tile: "7px"
spacing:
  panel-gap: "8px / 12px (sm+)"
  panel-padding-y: "80px / 112px (sm+)"
  content-max: "1240px"
---

# Design System: DevMark (rediseño 2026)

## Overview

**North star: "the studio you can see working."** The page is a stack of framed
panels inset a few pixels from the viewport edge, alternating dark ink and light
mist/paper, with very large tight headlines that put one phrase in a serif
italic. The visitor sees what DEVMARK does, what it costs and real proof, and
ends in a WhatsApp conversation that already names the service.

References chosen by Jaime (22 oct 2026): **enrique.lat** for structure (framed
panels, mixed sans + italic serif headlines, icon-tile buttons, glass nav inside
the hero, marquee band, expanding service columns, floating chips, FAQ on ink)
and **pau.pe** for motion (word-by-word reveals, tilted ribbon, blur entrances).
The look is rebuilt in DEVMARK's own light indigo palette; no code or assets
were copied.

## Colors

- **Ink** `#110C29` — dark panels (hero, why-us, contact, FAQ, footer nav). Text on ink is white; secondary text is **ink-muted** `#B4B1D6`.
- **Paper** `#FFFFFF` and **Mist** `#EEF0FB` — light panels alternate between them. Cards inside a paper panel are mist, and inside a mist panel are white.
- **Band** `#CBD5FA` — the lavender services marquee and the hosting panel. The one "loud" light surface.
- **Indigo** `#3D34BC` (`--primary`) — action only: the icon tile of the light button, focus rings, link color, the hosting ribbon. Shared with the ERP (decision 22 oct 2026).
- **Periwinkle** `#A9B4FF` — small accents on ink (icons in chips, globe countries, checks).
- **WhatsApp green** `#25D366` — only inside the floating WhatsApp bubble.

## Typography

- **Schibsted Grotesk** for everything, weight 500 for headlines with tight tracking (`.display` -0.04em, `.headline` -0.035em).
- **Instrument Serif italic** only inside `<em>` within a headline: the one phrase the headline is about. Never for body text.
- **Braze** only for the DEVMARK wordmark, client names in the logo marquee and the coupon code.
- Sentence case everywhere. No eyebrow labels above headings.

## Components (`src/app/globals.css`, `src/components/site/`)

- **Panels**: `.panel-ink`, `.panel-mist`, `.panel-paper` (20px radius, 8–12px inset), content in `.panel-inner` (max 1240px). Dark panels carry `data-tone="dark"` so the header switches tone over them.
- **Buttons** (`Btn` / `.btn-*`): rectangular, 56px tall (44px small), 10px radius, with a 40px icon tile on the left that widens and tilts its icon on hover. Variants: `light` (white + indigo tile, for ink), `ink` (for light panels), `glass` (secondary on ink), `outline` (secondary on light).
- **Glass**: `.glass-dark` / `.glass-light`, soft blur. Used only for the header bar, floating chips, the hero side card and the FAQ call-out.
- **Header**: floating glass bar; tone follows the panel underneath; primary action "Hablemos por WhatsApp".
- **Chips**: glass pill with an icon tile (hero proof, why-us).
- **Fields**: `.field-dark` on ink, `.field-light` on paper.
- **Footer**: two panels, mist (brand, socials, WhatsApp) + ink (navigation, services, contact).
- **Floating dock**: AI assistant square + WhatsApp bubble ("¿Hablamos? En línea").

## Motion

- Hero content enters once on load with blur + rise (`.hero-in`).
- Below the fold, `.reveal` (blur + rise) and `.reveal-words` (word-by-word from 18% to full) run on CSS scroll-driven animations only. Content is visible by default; browsers without `animation-timeline` and visitors with reduced motion see it static.
- Marquees (services band, client logos, hosting ribbon tilted -2.5°) pause on hover.
- Easing: `ease-out-expo` = `cubic-bezier(0.16, 1, 0.3, 1)`.

## Signature pieces

- **Globe** (`WorldGlobe`, three + three-globe, lazy-loaded): arcs from Lima to client cities; `tone="dark"` on ink.
- **Expanding service columns** with code-drawn previews of each deliverable (`service-visuals.tsx`) and published prices.
- **Process window**: a browser frame that "builds" the site step by step.

## Content rules

- WhatsApp is the primary action on every surface, always with a prefilled message naming the page or service (`whatsappHref`).
- Numbers, clients and testimonials are the ones Jaime confirmed; testimonials use initials, never stock photos.
- Home copy lives in `src/content/home.ts` / `home-data.ts` (es/en), shaped for the future ERP CMS.

## Don'ts

- No gradient text, no eyebrow labels, no stock illustrations as decoration, no colored side borders.
- No new colors in pages; add a token instead.
- Don't hide content behind JavaScript-driven entrances.
