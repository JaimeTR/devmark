---
target: home
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-15T20-51-14Z
slug: src-app-page-tsx
---
# Impeccable Critique — Home (/)

Method: dual-agent (A: a4cf586e84bde74dd · B: a07bbbc5122340745)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No carousel position indicator; scroll-triggered render issues hurt perceived responsiveness. |
| 2 | Match System / Real World | 3 | Missing accent "Perú" in H1; eyebrow badge mismatched to its section. |
| 3 | User Control and Freedom | 3 | Contact form force-redirects 2s after success. |
| 4 | Consistency and Standards | 2 | Two competing primary-blue tokens; two "book a meeting" systems. |
| 5 | Error Prevention | 3 | Server-validated fields, honeypot, no inline validation. |
| 6 | Recognition Rather Than Recall | 3 | Icon-only header controls rely on hover-only tooltips. |
| 7 | Flexibility and Efficiency | n/a | Persuade-mode surface. |
| 8 | Aesthetic and Minimalist Design | 3 | Strong system undercut by 10+ CTA labels and blob repetition. |
| 9 | Error Recovery | 3 | Field errors plain-language, non-blocking. |
| 10 | Help and Documentation | n/a | Persuade-mode surface. |
| Total | | 23/32 | Good (71.9%) |

## Design Specificity Verdict
Liquid-fusion chips and ASCII particle wordmark are genuinely bespoke and correctly scoped per DESIGN.md. Page skeleton and testimonial content read as template-standard / placeholder (stock avatar filenames, implausible 10-country roster for a Lima boutique agency). Detector: 12 hits, all design-system-font-size, worst is hero stat row at 7px on mobile (confirmed by both detector and persona testing). Browser overlay unavailable this run — app's own CSP blocked the cross-origin detector script injection (dev-tooling limitation, not an app bug).

## Priority Issues
[P1] Header renders structurally transparent — content bleeds through on every scroll. Outer <header> is fully transparent; only child pill has bg-white/80 backdrop-blur. Reproduced at every section boundary, both viewports. Fix: give the outer header element the solid/blurred background. -> /impeccable polish

[P1] Two competing primary-color systems contradict DESIGN.md's own Legacy Blue Rule. brand-blue (#4F4AD8) still drives Header/Hero/Strategy/Contact/Hosting; Services correctly use confident-indigo. Fix: point brand.blue at hsl(var(--primary)) or replace usages. -> /impeccable harden

[P1] Hero stat labels render at 7px on mobile (hero.tsx:104) — confirmed illegible by detector + persona test. Fix: raise base size to 10-11px minimum. -> /impeccable typeset

[P2] CTA sprawl + duplicate "book a meeting" systems (Cal.com embed vs Google Calendar link) dilute the single action goal. Fix: one tool, one phrase everywhere; demote secondary CTAs. -> /impeccable clarify

[P2] Testimonials read as placeholder trust content — 10-country roster, stock avatar filenames (uifaces-*.jpg). Fix: cut to 4-6 real, verifiable clients. -> /impeccable clarify

## Persona Red Flags
Jordan (first-timer): icon-only header controls fail on touch; raw acronyms with no glossing; ~10 CTA phrasings by Contact.
Riley (stress-tester): header bleed-through reproduced live repeatedly; two booking systems for one intent.
Casey (mobile): 7px stat text; testimonial carousel has no manual control or position indicator on mobile.

## Minor Observations
- Radius-floor violations vs DESIGN.md's 16px minimum: header logo (rounded-xl=12px), footer logo (rounded-lg=8px), every Contact-form input (rounded-md=6px, unoverridden shadcn default).
- header.tsx scroll handler runs unthrottled on every scroll tick (forced layout reads) — compounds the bleed-through bug.
- Line-clamp copy truncates mid-word in "Servicios complementarios" cards.
- Missing accent: "Lima, Peru" -> "Lima, Perú" in the hero H1.
- Advantages eyebrow badge ("Nuestros proyectos") mismatched to its own content, duplicates next section's title.
- No prefers-reduced-motion handling anywhere found.

## Questions to Consider
- Is the One Action Rule meant to govern CTA label proliferation too, or only color?
- Two booking systems for the same intent — deliberate, or drift?
