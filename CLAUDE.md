# SPC — Steel Pipe Company | Website Rebuild

## Identity
- ERW (Electric Resistance Welded) steel pipe manufacturer, Uzbek-Chinese JV
- SEZ Angren Free Economic Zone, Akhangaran, Tashkent Region, Uzbekistan
- Founded 2018, first production line Dec 2019, 160+ employees
- Logo: `/public/logo_SPC.png` — "SPC" monogram, "C" = pipe cross-section cutaway
- Brand navy from logo: `#2A3E72`

## Reference Docs — Read Before Building
IMPORTANT: Before starting work on any section, read the relevant doc file first.
| Building this? | Read this file first |
|----------------|---------------------|
| Any UI section (Hero, About, Products, Quality, Partners, Contact, Footer) | `docs/design-spec.md` |
| Production Process section (Step 6) | `docs/production-process.md` |
| Any text content, company copy, product descriptions | `docs/content.md` |

## Design Direction: Industrial Minimalism
This is heavy industry — steel, fire, precision engineering. NOT a tech startup.
Think: Swiss design meets factory floor. Grid overlays, dimension lines, technical cross-sections.

**Color — Creative freedom:** Brand navy `#2A3E72` is the anchor. Beyond that, YOU build a rich atmospheric palette. Think raw steel (cool silver-blue), welded seams (warm orange glow), concrete (neutral), molten metal (copper/bronze). Create depth with layered tones — not just 2-3 flat colors. Accent must POP for CTAs. Define all as CSS custom properties.

**Typography:** Bold industrial sans for headings (Outfit, Barlow Condensed, or Bebas Neue — pick best fit). Clean sans body (DM Sans or IBM Plex Sans). Monospaced for stats/specs (JetBrains Mono). NEVER Inter/Roboto/Arial/system fonts.

**AVOID:** Purple gradients, pastels, neon, rounded blobs, tech-startup aesthetics, generic stock photos. Only navy+white+gray is too safe — push further with metallics and warm accents.

## Tech Stack
Next.js 14+ (App Router), TypeScript, Tailwind CSS v4 + CSS custom properties
GSAP + ScrollTrigger (scroll animations, parallax, counters, pinned production timeline)
Motion/Framer Motion (hover states, social icon animations, page transitions)
Lenis (smooth scroll), Lucide React (icons)
Optional: Three.js via React Three Fiber + Drei (hero 3D element)

## Animation Philosophy
- Animations communicate PRECISION, not playfulness
- Page load: staggered clip-path reveals on headline, subtle grid fade-in
- Scroll: GSAP ScrollTrigger for counters, card staggers, section reveals, parallax at 0.3x
- Hover: nav underline draw-left, card lift+shadow, partner logos grayscale→color
- Production Process: GSAP pin+scrub cinematic scroll (the showpiece section)
- Social icons: each has unique branded hover animation (specs in design-spec.md)
- Target 60fps. Prefer transform/opacity. Use will-change sparingly.

## Site Sections (in order)
1. **Hero** — full viewport, dark bg, animated grid, headline reveal, 2 CTAs
2. **About** — company story + animated stat counters (160+, 2018, 6+, SEZ)
3. **Production Process** — 5-step ERW pipeline, scroll-driven, pinned (the WOW section)
4. **Products** — 3-col grid: Round, Square, Profile pipes + PDF download
5. **Quality** — 3 differentiators with icon draw-in animations
6. **Partners** — logo strip: ArcelorMittal, EVRAZ, HUAYE, SAP, MMK, TTZ
7. **Contact** — form + details + animated social icons (Telegram, Instagram, WhatsApp)
8. **Footer** — compact: logo, links, contact, legal

## File Structure
```
src/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
├── components/
│   ├── Navbar.tsx, Hero.tsx, About.tsx
│   ├── ProductionProcess.tsx    ← 8-step animated pipeline
│   ├── Products.tsx, Quality.tsx, Partners.tsx
│   ├── Contact.tsx, Footer.tsx
│   ├── SocialIcons.tsx          ← animated Telegram/Instagram/WhatsApp
│   ├── AnimatedCounter.tsx, ScrollReveal.tsx
│   └── three/PipeScene.tsx      ← optional 3D hero
├── lib/animations.ts
├── styles/tokens.css
└── public/logo_SPC.png, images/
```

## Strict Rules
- Every design decision must be intentional and defensible
- Vary dark/light sections for visual rhythm
- All imagery context: pipes, steel, factory, welding, machinery
- Social links open in new tab with rel="noopener noreferrer"
- Mobile: single-column stacks, vertical timeline for Production Process
- Clean up GSAP ScrollTrigger instances on component unmount
- Lazy load images below fold, code-split Three.js if used

## Progress Tracking
After completing each step, update PROGRESS.md with: what was done, what's next, any issues.
Keep PROGRESS.md under 250 words. Overwrite, don't append.

## Compaction Rule
When compacting, ALWAYS preserve: current step number, list of modified files, any bugs/blockers, and the reference table above.
