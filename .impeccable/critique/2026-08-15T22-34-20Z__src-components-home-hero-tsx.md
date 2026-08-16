---
target: hero banner (src/components/home/hero.tsx)
total_score: 15
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-15T22-34-20Z
slug: src-components-home-hero-tsx
---
Method: dual-agent (A: design-review subagent · B: detector/browser subagent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Hover/scroll feedback solid for a static hero. |
| 2 | Match System / Real World | 2/4 | H1/description drop Spanish accents ("Lima, Peru", "paginas web") while the widget-card copy in the same component correctly carries them ("páginas", "automatización"). Confirmed in `src/app/page.tsx`. |
| 3 | User Control and Freedom | 3/4 | "Agendar reunion" has a real `href="#contact"` fallback under the Cal.com trigger — degrades gracefully. |
| 4 | Consistency and Standards | 2/4 | Widget cards are glass (`bg-white/60 backdrop-blur-md`) permanently, not on hover — contradicts DESIGN.md's own Elevation rule ("frosted look... never the resting one"). Real violation, but user-directed this session (see note below). |
| 5 | Error Prevention | n/a | No destructive/input actions in a static hero. |
| 6 | Recognition Rather Than Recall | 3/4 | Icon-to-copy pairing (Layers/Rocket) is plausible but arbitrary — either icon works with either sentence. |
| 7 | Flexibility and Efficiency | n/a | No power-user path applies to a marketing hero. |
| 8 | Aesthetic and Minimalist Design | 2/4 | H1 + description + both widget cards restate "construimos webs/software/automatización" four times with no new information added by any repetition. |
| 9 | Error Recovery | n/a | No error states in this component. |
| 10 | Help and Documentation | n/a | Not applicable to a persuade-mode hero. |
| **Total** | | **15/24** | **Acceptable (62.5%)** |

## Design Specificity Verdict

Detector (deterministic scan) found zero mechanical anti-patterns in `hero.tsx` — no side-tab borders, no bounce easing, nothing on the banned list. But specificity is a judgment call the detector can't make: the hero's illustration is a generic unDraw stock silhouette with no visible tie to DevMark or Lima, and DESIGN.md still describes an "ASCII particle wordmark" as the hero's signature differentiator. That component exists in the repo (`src/components/ascii-wordmark/`) but isn't wired into the current hero — **this was a deliberate call earlier this session** (you asked for it removed after disliking how it looked as a background), not an oversight. The real issue isn't a missing feature; it's that DESIGN.md never got updated after that decision, so it's now describing a hero that doesn't exist. Right now, absent that signature moment, the hero leans on generic-agency default moves (pill badge, glass cards, stock illustration) — competent, but not distinctly DevMark's.

## Overall Impression

Opens confident (bold Poppins H1, tinted-shadow CTA, staggered-float glass widgets) but flattens fast: the same "hacemos webs, software y automatización" claim repeats four times across headline/description/both widgets before the visitor reaches a CTA, and the promised signature visual moment isn't there. Biggest opportunity: cut the repetition and decide, once, what DESIGN.md should say about the wordmark.

## What's Working

1. **Button spec fidelity** — `h-[52px]`, `rounded-full`, sentence-case labels, tinted glow shadow, `-translate-y-1` on hover match DESIGN.md's Buttons spec almost to the token.
2. **Staggered float animation** — the two widget cards run the same `float-card` keyframe with offset `animationDelay` so they bob out of phase instead of moving in lockstep. Small, deliberate motion-craft detail.
3. **Decorative-image accessibility** — `alt=""` + `role="presentation"` on the illustration correctly hides content-free decoration from assistive tech.

## Priority Issues

**[P1] DESIGN.md is stale on the hero's signature moment.**
Why it matters: the doc describes an ASCII particle wordmark as the hero's differentiator; it isn't in the shipped hero (removed by your own call this session). Future critiques (like this one) will keep flagging a "gap" that was actually a decision, wasting review cycles on a non-issue.
Fix: update DESIGN.md's ASCII Wordmark section — either drop it if retired for good, or mark it "built, currently unused, parked for later."
Suggested command: `/impeccable document`

**[P1] Glass-at-rest on the widget cards breaks DESIGN.md's own Elevation rule.**
Why it matters: DESIGN.md is explicit that frosted glass is an activated/hover-only state, never resting — the hero's two cards are `backdrop-blur-md` permanently. This was your explicit ask this session (and you confirmed liking it, asked to reuse it elsewhere), so the fix isn't reverting the look — it's updating the written rule so the doc matches the shipped, sanctioned brief instead of silently contradicting it.
Suggested command: `/impeccable document`

**[P1] Four consecutive restatements of one idea.**
Why it matters: the hero's whole job is a 5-second read. H1, description, and both widget cards all say "hacemos páginas web, software y automatización" in slightly different words — no new information across four passes, which costs scan time without adding a reason to act.
Fix: keep one clear value statement in H1/description; rewrite the two widget cards to carry distinct, concrete proof (an outcome, a number, a capability) instead of paraphrasing the headline.
Suggested command: `/impeccable distill`

**[P2] Missing accents in the hero's own headline/description.**
Why it matters: "Lima, Peru" and "paginas web" drop tildes while the widget-card copy in the same component correctly writes "páginas" and "automatización" — for a Lima-based agency, that inconsistency reads as unpolished in its single most-read sentence. Confirmed directly in `src/app/page.tsx` (`hero.title` / `hero.description`).
Fix: correct accents there; spot-check sibling locale strings for the same slip.
Suggested command: `/impeccable polish`

**[P3] No proof/portfolio path left in the hero.**
Why it matters: "Ver Proyectos" was removed earlier this session with no replacement — first-time visitors get no low-commitment way to see real work before "Servicios" or booking a call.
Fix (optional): a tertiary text link, or fold a project thumbnail into one of the widget cards.
Suggested command: `/impeccable layout`

## Persona Red Flags

**Jordan (first-timer):** Reads "Agencia de desarrollo web y software en Lima, Peru," then re-reads the same claim in the paragraph, then again in both floating cards — by the fourth pass, unsure if they missed something or the page is just repeating itself.

**Riley (stress tester):** Tabbing through the hero shows only the browser's default outline on focusable elements — no custom focus ring in Confident Indigo, despite DESIGN.md naming indigo the only "act here" signal. Auditing the component against DESIGN.md, Riley also finds the doc references a wordmark effect absent from the shipped code, and a glass treatment used exactly where the written rule says it shouldn't be.

**Casey (mobile):** At 375px the eyebrow badge wraps to two lines, turning a `rounded-full` pill into a tall rounded rectangle. Lower on the same screen, the second floating widget, the scroll-chevron, and the real WhatsApp chat bubble all cluster within one viewport height — three floating elements competing for attention during a fast skim.

## Minor Observations

- Widget icon assignment (Layers → widget 1, Rocket → widget 2) is arbitrary; either icon reads fine against either sentence.
- Scroll-down indicator sits close to the next section on mobile — invites a scroll that dead-ends almost immediately.
- Widget shadow (`shadow-brand-blue/15`) is the lightest tint used anywhere in the hero; on `bg-white/60` glass it's barely perceptible, weakening the "tinted shadow" depth signal DESIGN.md relies on.
- Assessment B flagged a black "N" circle overlapping the "Servicios" button at mobile width — cross-checked against this session's screenshots: that icon is fixed-position across every page/section regardless of scroll and isn't rendered by any component in the codebase (header/footer have no such element). Almost certainly browser-tooling chrome from the testing harness, not a real site defect — excluded from the findings above.

## Questions to Consider

- DESIGN.md still sells a signature moment the hero doesn't have — if the wordmark isn't coming back, what (if anything) should replace it as the hero's one distinctly-DevMark visual beat?
- headline, description, and both widget cards say the same thing three different ways — if only one sentence could survive, which one would the team actually keep?
- With the stats widget and portfolio button both gone from the hero, what's the single most persuasive reason a visitor now has to click "Agendar reunion" — and is it visible above the fold?
