---
name: DevMark
description: Web development & software agency in Lima, Perú — strategy, design, and technology fused into one studio.
colors:
  confident-indigo: "hsl(244 57% 47%)"
  confident-indigo-light: "hsl(244 57% 57%)"
  confident-indigo-darker: "hsl(244 57% 33%)"
  navy-ink: "hsl(244 41% 35%)"
  deep-navy: "hsl(250 55% 10%)"
  soft-lavender-surface: "hsl(224 88% 97%)"
  lavender-border: "hsl(224 82% 89%)"
  brand-lavender: "#CBD5FA"
  signal-teal: "hsl(173 58% 39%)"
  signal-steel: "hsl(197 37% 24%)"
  signal-gold: "hsl(43 74% 66%)"
  signal-orange: "hsl(27 87% 67%)"
  signal-violet: "hsl(280 60% 55%)"
  alert-red: "hsl(0 84.2% 60.2%)"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  pill: "9999px"
  lg: "24px"
  md: "16px"
  sm: "12px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "2rem"
  xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.confident-indigo}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.75rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.deep-navy}"
  button-outline:
    backgroundColor: "#ffffff"
    textColor: "{colors.confident-indigo}"
    rounded: "{rounded.md}"
    padding: "0.75rem 2rem"
  card-service:
    backgroundColor: "{colors.soft-lavender-surface}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.lg}"
    padding: "2rem"
---

# Design System: DevMark

## Overview

**Creative North Star: "The Digital Atelier"**

DevMark reads as a studio where strategy, design, and engineering happen at the same table, not a template with a logo swapped in. The system stays professional and warm: confident enough to sell software to a business owner, human enough that no screen feels like a cold SaaS dashboard. One disciplined indigo carries every call-to-action across the entire site; color otherwise shows up in small, deliberate doses, never as decoration for its own sake.

The system is built to feel alive under the cursor. Cards don't just change a background color on hover, their number badge and arrow chip pour into one liquid shape (an SDF smooth-union rendered as a live SVG path). This is not a stock micro-interaction; it's custom-built and specific to this brand. Static, flat hover states are the anti-reference.

**Key Characteristics:**
- One primary action color (Confident Indigo) used everywhere a user is asked to act; nothing else competes for that role.
- A six-color "signal" family rotates across service cards so the grid reads as distinct offerings, not one repeated block.
- Motion and shape-shifting (liquid fusion, glass/blur, soft blurred illustration blobs) do real communicative work — they mark interactivity and hierarchy, not just add movement.
- Warm, human copy voice paired with precise, structured layouts (rounded-3xl cards, consistent 8-value spacing rhythm).

## Colors

The palette is indigo-led: one confident primary, a family of warm neutrals for surfaces and text, and six signal hues reserved for per-service identity.

### Primary
- **Confident Indigo** (`hsl(244 57% 47%)`, `#3D34BC`, token `--primary` / `brand.blue`): every primary button fill, outline-button border/text, active nav state, link, focus ring, and the default (first) service-card signal. This is the only color allowed to mean "act here."
- **Confident Indigo Light** (`hsl(244 57% 57%)`, `#5B53D0`, token `brand.blue-light`, class name `brand-blue-dark` for historical reasons): same hue and saturation as Confident Indigo, just 10 points lighter. Used as the hover state on solid Confident Indigo fills (lighten-on-press). Never used as a fill on its own; it's a hover-state variant, not a second primary.

### Secondary
- **Soft Lavender Surface** (`hsl(224 88% 97%)`): the resting background for cards, muted panels, and secondary/outline chip fills.
- **Brand Lavender** (`#CBD5FA`): badge and pill borders/backgrounds (hero eyebrow badge, tag chips) — a step warmer than Soft Lavender Surface.
- **Lavender Border** (`hsl(224 82% 89%)`): hairline borders and dividers on light surfaces.

### Tertiary — Signal Colors
Each of the six main services owns one signal hue, cycling in this fixed order so the grid always reads left-to-right, top-to-bottom as distinct: Confident Indigo → Signal Gold → Signal Teal → Signal Orange → Signal Violet → Signal Steel.
- **Signal Teal** (`hsl(173 58% 39%)`)
- **Signal Steel** (`hsl(197 37% 24%)`): the one deliberately dark, desaturated signal — reads as "infrastructure/backend" (ERP/CRM).
- **Signal Gold** (`hsl(43 74% 66%)`)
- **Signal Orange** (`hsl(27 87% 67%)`)
- **Signal Violet** (`hsl(280 60% 55%)`)

### Neutral
- **Navy Ink** (`hsl(244 41% 35%)`): default body text and headline color on light surfaces.
- **Deep Navy** (`hsl(250 55% 10%)`, `#110C29`): the darkest surface — hero illustration fill, footer-weight panels, dark-mode background. A desaturated near-black indigo, not a pure navy-black, so it stays in the same color family as Confident Indigo even at near-zero lightness.
- **Alert Red** (`hsl(0 84.2% 60.2%)`): the one semantic exception to the "no gray, no random color" rule — reserved strictly for destructive/error state, never decorative.

### Named Rules
**The One Action Rule.** Confident Indigo is the only color that means "click here." Signal colors identify; they never act — a signal-colored element is never the sole path to a primary action.

**The Legacy Blue Rule.** `brand.blue` (`#4F4AD8`) is a near-duplicate of Confident Indigo left over from early scaffolding. Don't introduce new usages of it; converge existing ones onto `confident-indigo` when touching that code.

## Typography

**Display & Body Font:** Poppins (with system sans-serif fallback) — the only typeface in the system; hierarchy comes entirely from weight and size, not font-switching.

**Character:** A single confident sans carries the whole site — geometric enough to feel technical, rounded enough to stay warm. Weight is the primary hierarchy signal: 500 for the hero-scale display line (size alone gives it presence), 600 for every section and card headline, 400 for body copy, 700–800 for small uppercase labels.

### Hierarchy
- **Display** (500, `clamp(3rem, 6vw, 4.5rem)`, 1.1 line-height): the hero H1 only. Size carries the weight; kept at medium rather than bold or extrabold on purpose.
- **Headline** (600, `clamp(1.875rem, 4vw, 3rem)`, 1.15, −0.01em): every section title ("Servicios principales", "Planes y precios", FAQ headings).
- **Title** (600, 1.25rem, 1.3): card and component-level headings (service card titles, form titles).
- **Body** (400, 1rem–1.125rem, 1.6): paragraph copy. No max-width token is enforced site-wide; wrap with `max-w-lg`/`max-w-2xl` per context.
- **Label** (800, 0.75rem, 1.2, 0.08em tracking, uppercase): eyebrow badges, category tags, eyebrow text above headlines.

### Named Rules
**The Size-Not-Weight Rule for Display.** The hero H1 stays at font-weight 500 even though it's the largest text on the page. Its scale (clamp up to 4.5rem) does the work; adding boldness on top would read as shouting, not confidence.

## Layout

Content is capped at `max-w-7xl` (site sections) or `max-w-3xl` (centered intros) and centered with `mx-auto px-6`. Section vertical rhythm is generous and consistent: `py-16` mobile, `py-24` desktop. Card grids use `gap-8` and collapse `lg:grid-cols-3 → md:grid-cols-2 → grid-cols-1`. The header is a fixed pill bar (`h-20`, condensing to a floating rounded capsule on scroll) — below `1024px` it collapses to a hamburger menu rather than trying to fit the full nav, since the space between 768–1023px isn't wide enough for the complete link row plus the language switcher and CTA.

## Elevation & Depth

DevMark is **lifted, not flat**, and its shadows are never neutral gray — every shadow carries a tint of Confident Indigo (`shadow-brand-blue/20`–`/30`) so elevation reads as "glowing," not "sitting in dust." Cards rest at `shadow-sm` and rise to `shadow-xl` plus a `-translate-y-1` lift on hover. A second depth language runs alongside shadow: glass panels (`backdrop-blur-md` + `bg-white/15` borders) appear specifically on hover states, over a color-washed surface — the frosted look is reserved for the "activated" state, never the resting one. **Sanctioned exception:** the hero's two floating value-widget cards (`bg-white/60 backdrop-blur-md`) and the hero's own eyebrow badge (`bg-brand-blue/90 backdrop-blur-md`) run glass at rest, permanently — a deliberate choice for that hero moment. Don't extend resting glass beyond those hero elements without the same deliberate call.

### Shadow Vocabulary
- **Resting card** (`shadow-sm`): default elevation for all cards, unactivated.
- **Activated glow** (`shadow-xl shadow-[brand-color]/20–30`): hover state on buttons and cards — the shadow tints to whatever the element's own accent is, not a fixed brand color.

### Named Rules
**The Tinted Shadow Rule.** No shadow in this system is neutral black/gray. Every shadow inherits a hue from the element it belongs to (indigo for primary actions, the card's own signal color for service cards).

## Shapes

Corner radius scales with a component's role, not a fixed global value: buttons, chips, and badges are always fully rounded (`rounded-full`, `{rounded.pill}`); cards and large surfaces use a generous `rounded-3xl` (`{rounded.lg}`, 24px); icon containers use `rounded-2xl` (`{rounded.md}`, 16px). The liquid-fusion components (below) replace this fixed-radius language locally with a computed, organic outline — the one place shape is generated rather than declared.

### Named Rules
**The Generous Radius Rule.** Nothing in the system uses a sharp corner or a barely-rounded `rounded-md`/`rounded-lg` default. The floor is 16px; most surfaces are fully round or 24px. Buttons are the one deliberate exception to "fully round" — they use the 16px floor (`rounded-2xl`) instead of the pill, a considered choice, not an oversight.

## Components

### Buttons
- **Shape:** `rounded-2xl` (16px) — buttons are the one exception to the pill radius, revised deliberately after review. Fixed `52px` height across all buttons in a row, and BOTH variants carry a `border-2` (transparent on the primary, colored on the outline) so the outline button's border never makes it read wider than its solid sibling.
- **Primary:** Confident Indigo fill, white text, `font-semibold`, sentence case (not uppercase). Tinted glow shadow, `-translate-y-1` on hover; fill darkens to Deep Navy (`brand.navy-dark`, `#110C29`) on hover.
- **Outline/Secondary:** white fill, 2px Confident Indigo border, Confident Indigo text; on hover, border and text darken to Confident Indigo Darker (`hsl(244 57% 33%)`, same hue/saturation as primary — not Deep Navy, which is a different hue).
- **Named Rule — The Sentence-Case Rule:** button labels are sentence case, never uppercase+tracked. Uppercase+letter-spacing is reserved for Label-role eyebrow text only.

### Chips / Badges
- **Eyebrow badge:** `rounded-full`, Brand Lavender background, Navy Ink text, Label typography.
- **Category tag:** `rounded-full`, Soft Lavender Surface or `white/10` (on dark), Label typography, the section's signal color for text.

### Cards / Containers
- **Corner Style:** `rounded-3xl` (24px).
- **Background:** Soft Lavender Surface at rest; on hover, service cards wash to a diagonal gradient of their own signal color (`from-[signal] to-[signal]/80`).
- **Shadow Strategy:** see Elevation & Depth — `shadow-sm` resting, tinted `shadow-xl` + lift on hover.
- **Border:** 1px `slate-100` at rest, dissolves to transparent on hover (the gradient wash replaces it).
- **Internal Padding:** `2rem` (`{spacing.lg}`).

### Liquid Fusion Chip (signature component)
The number badge and arrow-forward affordance at the base of every service card, hosting/coupon-code copy button, and complementary-service card are not two separate elements — they're rendered as ONE shape via a signed-distance-field smooth-union (`smin`), traced into a live SVG path with marching squares. At rest the two pieces sit crisp and nearly separate (low blend `k≈4-6`); on hover/success they pour into a single gooey pill (`k≈22-26`) and the fill switches from solid white to a translucent glass tint of the card's own signal color. This is the site's primary "delight" signature — reserve it for exactly this micro-interaction (index + action affordance fusing), don't scatter it as generic decoration.

### Navigation
- Fixed pill header, `h-20`, condenses to a floating rounded capsule (`bg-white/80 backdrop-blur-md`) after 20px of scroll.
- Active link: `bg-primary/10 text-primary` pill. Inactive: `text-muted-foreground`.
- Below `1024px`: hamburger + slide-out sheet, not a squeezed nav row.

## Do's and Don'ts

### Do:
- **Do** keep Confident Indigo as the only color that means "primary action" — every other color identifies or decorates.
- **Do** give shadows a tint from their own element's color; never use a flat neutral gray shadow.
- **Do** use sentence case on all button labels; reserve uppercase+tracking for Label-role eyebrow/tag text only.
- **Do** keep the liquid-fusion treatment scoped to index+action pairings (service cards, coupon copy) — it's a signature, not a generic hover effect to apply everywhere.
- **Do** fix explicit heights (e.g. `h-[52px]`) when two buttons with different border widths sit side by side, so a 2px outline never reads taller than its solid sibling.

### Don't:
- **Don't** introduce new usages of `brand.blue` (`#4F4AD8`); it's a legacy duplicate of Confident Indigo.
- **Don't** add a sharp or barely-rounded corner anywhere; the floor is 16px, most surfaces are fully round or 24px.
- **Don't** run generative-background or particle effects full-bleed behind real UI copy — they must stay contained to open, non-competing regions, if used at all.
- **Don't** use the classic "AI-slop" side-tab accent border (a thick flat-colored border on one edge of a rounded card) or bounce/elastic easing anywhere in the product UI — both are explicitly banned anti-patterns for this system.
