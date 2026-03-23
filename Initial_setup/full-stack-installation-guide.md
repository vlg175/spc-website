# Full-Stack Installation Guide
## Animated & Hyper-Visual Websites with Claude Code

> **March 2026** — Every skill, plugin, MCP server, and npm dependency you need.
> Copy-paste ready. Organized by installation phase.

---

## Prerequisites

```bash
# You need these installed first:
node --version    # v18+ required
npm --version     # comes with Node
claude --version  # Claude Code CLI (v1.0.33+ for plugins)

# If Claude Code is not installed:
npm install -g @anthropic-ai/claude-code
```

---

## Phase 1 — Plugin Marketplaces

Register the catalogs. No plugins are installed yet — this just makes them browsable.

```bash
# ┌─────────────────────────────────────────────────────────────┐
# │  OFFICIAL ANTHROPIC — auto-registered, nothing to do        │
# │  Plugins use: <name>@claude-plugins-official                │
# └─────────────────────────────────────────────────────────────┘

# ┌─────────────────────────────────────────────────────────────┐
# │  ANIMATION & 3D SKILLS (23 skills)                          │
# │  GSAP, Three.js, Motion, React Spring, Lottie, etc.        │
# │  Source: github.com/freshtechbro/claudedesignskills         │
# └─────────────────────────────────────────────────────────────┘
claude plugin marketplace add freshtechbro/claudedesignskills

# ┌─────────────────────────────────────────────────────────────┐
# │  COMMUNITY COLLECTION (192+ skills)                         │
# │  Engineering, frontend, product, marketing, and more        │
# │  Source: github.com/alirezarezvani/claude-skills            │
# └─────────────────────────────────────────────────────────────┘
claude plugin marketplace add alirezarezvani/claude-skills
```

---

## Phase 2 — Design & Frontend Skills

```bash
# ══════════════════════════════════════════════════════════════
#  ESSENTIAL — Install these first
# ══════════════════════════════════════════════════════════════

# frontend-design (Official Anthropic)
# THE most important skill. 277K+ installs.
# Breaks Claude out of generic AI aesthetics.
claude plugin install frontend-design@claude-plugins-official

# Figma Plugin (Official Anthropic)
# Includes MCP server settings + Agent Skills for design workflows.
claude plugin install figma@claude-plugins-official

# ══════════════════════════════════════════════════════════════
#  RECOMMENDED — High-value additions
# ══════════════════════════════════════════════════════════════

# Web Artifacts Builder — complex HTML artifacts w/ React + Tailwind + shadcn
claude plugin install web-artifacts-builder@claude-plugins-official

# Brand Guidelines — consistent visual identity across outputs
claude plugin install brand-guidelines@claude-plugins-official

# TypeScript LSP — real-time type checking while Claude writes
claude plugin install typescript-lsp@claude-plugins-official

# Webapp Testing — Playwright-based frontend testing
claude plugin install webapp-testing@claude-plugins-official
```

---

## Phase 3 — Animation & 3D Skills

From the `claudedesignskills` marketplace. Skills auto-activate when you mention the relevant tech.

```bash
# ══════════════════════════════════════════════════════════════
#  BUNDLES (install groups of related skills at once)
# ══════════════════════════════════════════════════════════════

# Core 3D & Animation (5 skills)
# → Three.js, GSAP+ScrollTrigger, React Three Fiber, Motion, Babylon.js
claude plugin install core-3d-animation@claudedesignskills

# Extended Scroll & 3D (6 skills)
# → A-Frame, Vanta.js, PlayCanvas, PixiJS, Locomotive Scroll, Barba.js
claude plugin install extended-3d-scroll@claudedesignskills

# Animation Components (5 skills)
# → React Spring, Magic UI, AOS, anime.js, Lottie
claude plugin install animation-components@claudedesignskills

# Authoring & Motion (4 skills)
# → Blender web pipeline, Spline, Rive, Substance 3D texturing
claude plugin install authoring-motion@claudedesignskills

# Meta Skills (2 skills)
# → Integration patterns, Modern design system fundamentals
claude plugin install meta-skills@claudedesignskills

# ══════════════════════════════════════════════════════════════
#  INDIVIDUAL SKILLS (cherry-pick what you need)
# ══════════════════════════════════════════════════════════════

claude plugin install threejs-webgl@claudedesignskills
claude plugin install gsap-scrolltrigger@claudedesignskills
claude plugin install react-three-fiber@claudedesignskills
claude plugin install motion-framer@claudedesignskills
claude plugin install babylonjs-engine@claudedesignskills
claude plugin install aframe-webxr@claudedesignskills
claude plugin install lightweight-3d-effects@claudedesignskills    # Vanta.js
claude plugin install playcanvas-engine@claudedesignskills
claude plugin install pixijs-2d@claudedesignskills
claude plugin install locomotive-scroll@claudedesignskills
claude plugin install barba-js@claudedesignskills
claude plugin install react-spring-physics@claudedesignskills
claude plugin install animated-component-libraries@claudedesignskills  # Magic UI
claude plugin install scroll-reveal-libraries@claudedesignskills       # AOS
claude plugin install animejs@claudedesignskills
claude plugin install lottie-animations@claudedesignskills
claude plugin install blender-web-pipeline@claudedesignskills
claude plugin install spline-interactive@claudedesignskills
claude plugin install rive-interactive@claudedesignskills
claude plugin install substance-3d-texturing@claudedesignskills
```

---

## Phase 4 — MCP Servers

MCP servers give Claude real-time access to external tools. Use `--scope user` (`-s user`) for all-project availability.

> **Token warning:** MCP servers consume tokens at session start. Keep 3–5 active. Disable unused ones with `/mcp disable <name>`.

```bash
# ══════════════════════════════════════════════════════════════
#  ESSENTIAL MCP SERVERS
# ══════════════════════════════════════════════════════════════

# Context7 — Live documentation for ANY library
# Free, no API key needed. Injects up-to-date docs into your prompt.
# Usage: "use context7, implement scroll animation with GSAP"
claude mcp add context7 -s user -- npx -y @upstash/context7-mcp@latest

# Playwright — Browser automation & visual testing
# Auto-test animations, take screenshots, verify interactions.
claude mcp add playwright -s user -- npx -y @playwright/mcp@latest

# Figma Remote — Design ↔ Code (with Code to Canvas)
# Read designs directly. OAuth will prompt on first use.
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp

# ══════════════════════════════════════════════════════════════
#  RECOMMENDED MCP SERVERS
# ══════════════════════════════════════════════════════════════

# Chrome DevTools — Performance profiling & debugging
# Inspect animation jank, network, rendering pipeline.
claude mcp add chrome-devtools -s user -- npx -y @anthropic-ai/chrome-devtools-mcp@latest

# Sequential Thinking — Multi-step reasoning
# For complex animation choreography and architecture decisions.
claude mcp add sequential-thinking -s user -- npx -y @modelcontextprotocol/server-sequential-thinking

# ══════════════════════════════════════════════════════════════
#  OPTIONAL MCP SERVERS (require API keys)
# ══════════════════════════════════════════════════════════════

# GitHub — Direct repo access, PRs, issues
# Get token: https://github.com/settings/tokens/new (scopes: repo, workflow, user)
claude mcp add github -s user \
  --env GITHUB_PERSONAL_ACCESS_TOKEN=ghp_YOUR_TOKEN_HERE \
  -- npx -y @modelcontextprotocol/server-github

# GSAP MCP — Full GSAP feature access via MCP
# Provides: gsap-animate, gsap-timeline, gsap-scroll-trigger,
#           gsap-morph-svg, gsap-draggable, gsap-motion-path
claude mcp add gsap -s user -- npx -y infi-gsap-mcp

# Firecrawl — Web scraping (scrape design inspiration sites)
# Get key: https://firecrawl.dev
claude mcp add firecrawl -s user \
  --env FIRECRAWL_API_KEY=fc_YOUR_KEY_HERE \
  -- npx -y firecrawl-mcp
```

### Verify MCP Servers

```bash
# From terminal:
claude mcp list

# Inside Claude Code session:
/mcp                          # See real-time connection status
/mcp disable playwright       # Disable when not testing
/mcp enable playwright        # Re-enable when needed
```

---

## Phase 5 — npm Dependencies (Project-Level)

Run these **inside your project directory**. If no `package.json` exists, run `npm init -y` first.

### One-Line Install (All Core Libraries)

```bash
npm install gsap motion three @react-three/fiber @react-three/drei \
  locomotive-scroll @barba/core lenis animejs aos \
  @react-spring/web lottie-web pixi.js vanta tailwindcss-motion
```

### Individual Categories

```bash
# ── Core Animation ──────────────────────────────────────────
npm install gsap                          # GSAP (timeline, ScrollTrigger, etc.)
npm install motion                        # Motion (formerly Framer Motion)
npm install three @types/three            # Three.js (3D / WebGL)
npm install @react-three/fiber @react-three/drei  # React Three Fiber

# ── Scroll & Page Transitions ──────────────────────────────
npm install locomotive-scroll             # Smooth scroll + parallax
npm install @barba/core                   # Page transitions
npm install lenis                         # Modern smooth scroll (alternative)

# ── Lightweight Animations ─────────────────────────────────
npm install animejs                       # anime.js (CSS/SVG/DOM)
npm install aos                           # Animate On Scroll
npm install @react-spring/web             # Physics-based React animations
npm install lottie-web                    # After Effects JSON animations
npm install lottie-react                  # Lottie for React

# ── 2D Canvas & Effects ───────────────────────────────────
npm install pixi.js                       # High-performance 2D canvas
npm install vanta                         # Animated 3D backgrounds
npm install tailwindcss-motion            # Zero-JS Tailwind animations (5KB)

# ── Interactive 3D Authoring ───────────────────────────────
npm install @splinetool/react-spline @splinetool/runtime   # Spline 3D scenes
npm install @rive-app/react-canvas        # Rive interactive animations

# ── Dev Dependencies ───────────────────────────────────────
npm install -D @gsap/react                # GSAP React hooks (useGSAP)
npm install -D @types/animejs             # TypeScript types for anime.js
```

---

## Phase 6 — CLAUDE.md Configuration

Create this file in the root of your project. It tells Claude Code your project's conventions.

```bash
cat > CLAUDE.md << 'EOF'
# Project: Animated Visual Website

## Design Philosophy
- NEVER use generic AI aesthetics (Inter font, purple gradients, rounded cards)
- Choose a BOLD aesthetic direction BEFORE writing any code
- Every project gets a unique visual identity — no two sites look alike
- Animations must feel intentional and purposeful, not decorative

## Tech Stack
- Framework: Next.js 14+ (App Router) / Vite + React
- Styling: Tailwind CSS v4 + CSS custom properties
- Animation: GSAP + ScrollTrigger for scroll-driven effects
- Component animations: Motion (Framer Motion) for React transitions
- 3D: Three.js via React Three Fiber + Drei
- Smooth scroll: Lenis or Locomotive Scroll
- Page transitions: Barba.js
- Typography: Google Fonts — always distinctive, never generic

## Animation Guidelines
- Page load: Staggered reveals with GSAP timeline or CSS animation-delay
- Scroll: ScrollTrigger for parallax, pin sections, scrub animations
- Hover: Subtle scale + shadow lift on cards, color shifts on links
- Transitions: Barba.js for pages, Motion AnimatePresence for components
- 3D: Lightweight scenes (<1MB), draco compression, lazy loading
- Performance: 60fps target, prefer transform/opacity, use will-change sparingly

## Figma Integration
- Use get_design_context to read design structure from Figma
- Use get_variable_defs for design tokens
- Check Code Connect mappings before creating new components

## File Structure
src/
├── components/        # React components
│   └── three/         # Three.js / R3F scenes
├── lib/
│   └── animations/    # GSAP timelines, scroll configs
├── styles/
│   ├── tokens.css     # Design tokens (CSS variables)
│   ├── fonts.css      # Font imports
│   └── global.css     # Base styles
└── app/               # Next.js App Router pages

## Quality Pipeline
1. Generate with bold aesthetics (frontend-design skill)
2. Fix spacing, typography, hover/focus states
3. Fix accessibility — keyboard nav, ARIA labels, focus rings
4. Test with Playwright — visual regression + interaction tests
EOF
```

---

## Phase 7 — Model Configuration

```bash
# Set Sonnet 4.6 as your default (fast, cheap, great for frontend)
claude config set model claude-sonnet-4-6

# Switch to Opus 4.6 when you need deep reasoning
# (architecture decisions, complex 3D, multi-file refactors)
claude config set model claude-opus-4-6

# Or switch mid-session:
# /model sonnet
# /model opus
```

### When to Use Each Model

| Task | Model | Why |
|------|-------|-----|
| Components, pages, animations | **Sonnet 4.6** | Fast iteration, 97-99% of Opus quality |
| Iterative UI refinement | **Sonnet 4.6** | Speed matters for back-and-forth |
| CSS/GSAP/Motion animations | **Sonnet 4.6** | Well within its sweet spot |
| Multi-page site architecture | **Opus 4.6** | Deeper reasoning across files |
| Complex 3D scene choreography | **Opus 4.6** | Better at spatial/temporal logic |
| Agent Teams (parallel tasks) | **Opus 4.6** | Exclusive feature |

---

## Quick Reference Card

### After Installation

```bash
# Restart Claude Code to load everything
exit                   # or Ctrl+C
claude                 # restart

# Verify
/mcp                   # Check MCP server status
/plugin                # Browse installed plugins
claude mcp list        # Check MCP from terminal
```

### Token-Saving Tips

```bash
# MCP servers eat tokens. Disable when not in use:
/mcp disable figma
/mcp disable chrome-devtools
/mcp disable playwright

# Re-enable when needed:
/mcp enable playwright

# Skills are cheap (~100 tokens to scan). Keep them all active.
```

### Example Prompts to Get Started

```
"Build a dark editorial landing page for a creative agency.
GSAP scroll animations, Three.js hero with floating geometry,
Motion for component transitions. Asymmetric grid layout."

"Create a product showcase with smooth Locomotive Scroll,
parallax image sections, and GSAP-powered text reveals.
Warm earth tones, serif typography, organic feel."

"Build an interactive 3D portfolio using React Three Fiber.
Each project is a floating card in 3D space. Orbit controls,
bloom post-processing, dark theme with neon accent colors."

"Design a SaaS landing page with scroll-triggered sections.
Pin the hero, scrub through a feature animation, stagger
cards on scroll. Clean, geometric, high-contrast."
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `/plugin` command not found | Update Claude Code: `npm update -g @anthropic-ai/claude-code` (need v1.0.33+) |
| Marketplace not loading | Check URL is accessible, `.claude-plugin/marketplace.json` exists at the path |
| Plugin skills not appearing | `rm -rf ~/.claude/plugins/cache`, restart Claude Code, reinstall |
| MCP server won't connect | Run `claude mcp list`, check if `npx` is in PATH, try full node path |
| Figma MCP OAuth fails | Disconnect all instances: remove from `/mcp`, re-add with `--scope user` |
| Token usage too high | Disable unused MCP servers with `/mcp disable <name>` |
| `generate_figma_design` missing | Use remote MCP (`https://mcp.figma.com/mcp`), not local Dev Mode server |

---

*Full stack assembled March 2026. Run `claude plugin marketplace update` periodically to get latest skill versions.*
