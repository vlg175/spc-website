# SPC Website — Build Progress

## Current Step: 13 — Systematic QA & Bug Fixes ✅

## Done
**Step 1** — tokens.css (105 vars), globals.css (Tailwind v4 @theme)
**Step 2** — layout.tsx, LenisProvider, Navbar (fixed, mobile drawer)
**Step 3** — Hero: 100vh, GSAP 7-step load timeline, mouse parallax grid
**Step 4** — SocialIcons: Telegram/Instagram/WhatsApp unique Framer Motion hovers, fixed sidebar
**Step 5** — About: AnimatedCounter, ScrollReveal, 2-col story+stats, 4 animated counters
**Step 6** — ProductionProcess: GSAP pin+scrub, 5-panel horizontal, SVG morphs, mobile vertical timeline
**Step 7** — Products: 3-col grid, GOST badges, Framer Motion hover, PDF CTA
**Step 8** — Quality: dark bg, 3 blocks, GSAP SVG stroke draw-in, 8 cert badges
**Step 9** — Partners: 6-col grid, CSS marquee, per-partner accent colors, grayscale→color hover
**Step 10** — Contact: 2-col form + social row. Footer: 3-col, copyright
**Step 11** — BackToTop, PageLoader wired into root layout. Image warnings silenced.
**Step 12** — Review, responsive testing, optimization
**Step 13** — Full Playwright QA audit. Fixed 3 bugs:
- **Nav active state**: Hero section now observed; nav clears when back at top (Navbar.tsx)
- **Contact heading word break**: "ЧТО-ТО" no longer splits at hyphen — non-breaking hyphen (U+2011) in ru.json
- **Image warning**: Removed redundant `style={{ width, height }}` props from Navbar & PageLoader logo Images

## Responsive Verified (desktop 1440px, mobile 375px)
- Hero, About, Process, Products, Quality, Partners, Contact, Footer — all sections screenshot-verified
- All section headings render correctly at both viewports
- Nav active state works: clears at Hero, highlights correct section on scroll

## All Sections
01 Hero ✓ | 02 About ✓ | 03 Process ✓ | 04 Products ✓
05 Quality ✓ | 06 Partners ✓ | 07 Contact ✓ | Footer ✓
Navbar ✓ | PageLoader ✓ | BackToTop ✓ | SocialIcons ✓

## Blockers
None. Site is feature-complete and QA-verified.

## Next
Optional: real images, form backend, deploy to Vercel.
