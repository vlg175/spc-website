# Design Specification — SPC Website

## Tools Per Section
| Building this | Activate these skills | Use these MCPs |
|---------------|----------------------|----------------|
| Any UI section | `frontend-design` | — |
| Any GSAP animation | `gsap-scrolltrigger` (auto) | `context7` ("use context7, GSAP pin scrub Next.js") |
| Hover/transitions | `motion-framer` (auto) | — |
| 3D hero (optional) | `threejs-webgl`, `react-three-fiber` | — |
| Visual testing | `webapp-testing` | `playwright` ("test hero at 375px") |
| Performance | — | `chrome-devtools` ("profile for layout thrashing") |
| Figma designs | `figma` plugin | `figma` MCP |

**Skill trigger prompts:**
- "Use the frontend-design skill" → bold design mode
- "use context7, show GSAP ScrollTrigger pin with scrub in Next.js" → live docs
- "Check with Playwright at 375px, 768px, 1440px" → visual test
- "Profile this with Chrome DevTools" → perf audit

## Page Load Sequence (GSAP timeline)
1. Navy bg + SPC logo centered, fades in (0.3s)
2. Logo scales down → nav position (0.5s, power3.inOut)
3. Background grid fades in (0.8s, subtle)
4. Headline clipPath: inset(0 100% 0 0)→inset(0 0% 0 0), stagger 0.15s per line
5. Subtitle fades in (0.3s delay)
6. CTAs slide up translateY(20→0) + opacity, stagger 0.1s
7. Scroll indicator last — CSS infinite pulse

## Hero
Skills: `frontend-design`, `gsap-scrolltrigger`. Optional: `threejs-webgl`, `react-three-fiber`.
- 100vh, dark bg, animated SVG grid (thin lines, ~5% opacity, mouse parallax)
- Headline: display font 700+, white. Suggestion: "FORGED FOR WHAT MATTERS"
- Subtitle: JetBrains Mono, steel-gray. "Uzbek-Chinese JV | ERW Steel Pipe Manufacturing"
- CTAs: "View Products" (accent solid) → #products | "Contact Us" (outlined) → #contact
- Optional 3D: rotating pipe cross-section (R3F, simple geometry + wireframe + bloom)

## About
Skills: `gsap-scrolltrigger`, `frontend-design`. MCP: `context7` for counter examples.
- Lighter bg (contrast from hero). Two columns: text 60% + stats 40%
- Story from docs/content.md. Text reveals on scroll (translateY + opacity)
- Stats 2×2: "160+" employees, "2018" founded, "6+" products, "SEZ" Angren
- AnimatedCounter: JetBrains Mono ~48px, GSAP snap integers, triggers once
- Section heading: line draws width 0→200px, then title clipPath reveals

## Production Process
Skills: `gsap-scrolltrigger`, `frontend-design`. MCP: `context7`.
**→ Read `docs/production-process.md` for full 5-step spec. THE SHOWPIECE.**

## Products
Skills: `frontend-design`, `gsap-scrolltrigger`, `motion-framer`.
- 3-col grid (1-col mobile). Cards stagger from bottom (0.6s, 0.1s stagger)
- Each card: dark placeholder + Lucide icon, name, description + GOST ref, "Download Specs" PDF
- Hover (Motion): scale(1.02), shadow, image zoom scale(1.05) overflow:hidden
- Content + standards from docs/content.md

## Quality
Skills: `frontend-design`, `gsap-scrolltrigger`.
- Dark bg section, light text. "OUR QUALITY IS YOUR FOUNDATION"
- 3 blocks: Cpu→Advanced Tech | Lightbulb→Innovation | ShieldCheck→Certified
- SVG stroke draw-in on scroll (stroke-dasharray 100%→0, 0.6s)
- Cert badge row below: GOST 10704, GOST 10705, ISO 559, EN 10219, Uzstandard shields

## Partners
Skills: `frontend-design`.
- "TRUSTED BY INDUSTRY LEADERS". 6 items row (2-col mobile)
- Monospaced text boxes (placeholder for real logos)
- grayscale(100%)+opacity(0.6) → grayscale(0%)+opacity(1)+scale(1.05) on hover
- Optional CSS marquee

## Contact
Skills: `frontend-design`, `motion-framer`. MCP: `context7`.
- Two columns. Left: "LET'S BUILD SOMETHING THAT LASTS" + details + SocialIcons
- Right: form UI (Name, Email, Phone, Message, Submit accent button)

## Footer
Skills: `frontend-design`.
- Darkest bg. 3 cols: logo+tagline | links | contact
- "© 2018–2026 Steel Pipe Company LLC." + "Steel doesn't lie. Neither do we."

## Social Icons (SocialIcons.tsx)
Skills: `motion-framer`. All links: target="_blank" rel="noopener noreferrer".

**Telegram** → https://t.me/DiliSultonov
Idle: steel. Hover: fill #0088cc, rotate(-10deg) translateY(-3px) scale(1.1) — plane launches. 0.25s.

**Instagram** → https://instagram.com/steelpipe_uz
Idle: steel. Hover: gradient mask #833AB4→#E1306C→#F77737→#FCAF45, glow pulse. 0.3s.

**WhatsApp** → https://api.whatsapp.com/send?phone=998908064448
Idle: steel. Hover: fill #25D366, rotate(±3deg) 3x oscillation — vibrate. 0.2s.

Desktop: fixed sidebar right, vertical, 44px buttons. Mobile <768px: horizontal row, not fixed.

## Reusable Components

**AnimatedCounter.tsx:** Props: end, duration(2), suffix("+"), prefix. GSAP ScrollTrigger top 80%, once, snap integers. JetBrains Mono 48px/36px mobile.

**ScrollReveal.tsx:** Props: direction(up|left|right), delay, duration(0.6). GSAP wrapper top 85%, once. Up: translateY(40→0). Left: translateX(-40→0).

**SectionHeading:** Line width 0→200px (0.5s) then title clipPath reveals (0.4s, 0.3s delay).
