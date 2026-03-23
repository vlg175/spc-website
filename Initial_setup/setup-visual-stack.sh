#!/usr/bin/env bash
# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  ANIMATED & HYPER-VISUAL WEBSITE FULL STACK                                ║
# ║  Complete Installation Guide for Claude Code                               ║
# ║  March 2026                                                                ║
# ║                                                                            ║
# ║  This script installs everything you need to create stunning,              ║
# ║  animated websites using Claude Code:                                      ║
# ║    • Skills (design, animation, 3D, accessibility)                         ║
# ║    • MCP Servers (Figma, Playwright, Context7, etc.)                       ║
# ║    • Plugin Marketplaces (Anthropic official + community)                  ║
# ║    • npm dependencies (animation libraries)                                ║
# ║    • CLAUDE.md configuration                                               ║
# ║                                                                            ║
# ║  USAGE:                                                                    ║
# ║    chmod +x setup-visual-stack.sh                                          ║
# ║    ./setup-visual-stack.sh              # Full install (everything)        ║
# ║    ./setup-visual-stack.sh --minimal    # Essential skills + MCP only      ║
# ║    ./setup-visual-stack.sh --skills     # Skills & plugins only            ║
# ║    ./setup-visual-stack.sh --mcp        # MCP servers only                 ║
# ║    ./setup-visual-stack.sh --deps       # npm dependencies only            ║
# ║    ./setup-visual-stack.sh --dry-run    # Preview commands without running ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

set -euo pipefail

# ── Colors ───────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

# ── Config ───────────────────────────────────────────────────────────────────
DRY_RUN=false
INSTALL_SKILLS=true
INSTALL_MCP=true
INSTALL_DEPS=true
MINIMAL=false

for arg in "$@"; do
  case $arg in
    --dry-run)   DRY_RUN=true ;;
    --minimal)   MINIMAL=true ;;
    --skills)    INSTALL_MCP=false; INSTALL_DEPS=false ;;
    --mcp)       INSTALL_SKILLS=false; INSTALL_DEPS=false ;;
    --deps)      INSTALL_SKILLS=false; INSTALL_MCP=false ;;
    --help|-h)
      head -23 "$0" | tail -17
      exit 0
      ;;
  esac
done

# ── Helpers ──────────────────────────────────────────────────────────────────
run() {
  if $DRY_RUN; then
    echo -e "  ${DIM}[dry-run]${NC} $*"
  else
    echo -e "  ${DIM}→${NC} $*"
    eval "$@" 2>&1 | sed 's/^/    /' || true
  fi
}

header() {
  echo ""
  echo -e "${BOLD}${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BOLD}${MAGENTA}  $1${NC}"
  echo -e "${BOLD}${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

section() {
  echo ""
  echo -e "${CYAN}  ▸ $1${NC}"
}

success() {
  echo -e "${GREEN}  ✔ $1${NC}"
}

warn() {
  echo -e "${YELLOW}  ⚠ $1${NC}"
}

info() {
  echo -e "${BLUE}  ℹ $1${NC}"
}

# ── Pre-flight checks ───────────────────────────────────────────────────────
header "PRE-FLIGHT CHECKS"

if ! command -v claude &> /dev/null; then
  echo -e "${RED}  ✘ Claude Code not found. Install it first:${NC}"
  echo -e "    npm install -g @anthropic-ai/claude-code"
  exit 1
fi
success "Claude Code found: $(claude --version 2>/dev/null || echo 'installed')"

if ! command -v node &> /dev/null; then
  echo -e "${RED}  ✘ Node.js not found. Install Node.js 18+ first.${NC}"
  exit 1
fi
success "Node.js found: $(node --version)"

if ! command -v npm &> /dev/null; then
  echo -e "${RED}  ✘ npm not found.${NC}"
  exit 1
fi
success "npm found: $(npm --version)"

if ! command -v git &> /dev/null; then
  warn "git not found. Some installations may fail."
fi

echo ""
echo -e "${BOLD}Ready to install the full visual animation stack.${NC}"
if $DRY_RUN; then
  echo -e "${YELLOW}Running in DRY RUN mode — no changes will be made.${NC}"
fi
echo ""


# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  PHASE 1: PLUGIN MARKETPLACES                                             ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

if $INSTALL_SKILLS; then

header "PHASE 1: PLUGIN MARKETPLACES"
info "Registering plugin catalogs (no plugins installed yet)"

section "1.1 — Official Anthropic Marketplace (auto-registered)"
info "The official Anthropic marketplace is available by default in Claude Code."
info "Plugins from it use the format: <name>@claude-plugins-official"

section "1.2 — Animation & 3D Skills Marketplace"
info "23 animation skills: GSAP, Three.js, Motion, React Spring, Lottie, etc."
info "Source: github.com/freshtechbro/claudedesignskills"
run "claude plugin marketplace add freshtechbro/claudedesignskills"

if ! $MINIMAL; then
  section "1.3 — Community Skills Marketplace (192+ skills)"
  info "Source: github.com/alirezarezvani/claude-skills"
  run "claude plugin marketplace add alirezarezvani/claude-skills"
fi


# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  PHASE 2: DESIGN & FRONTEND SKILLS                                        ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

header "PHASE 2: DESIGN & FRONTEND SKILLS"

section "2.1 — frontend-design (Official Anthropic — INSTALL FIRST)"
info "Breaks Claude out of generic AI aesthetics."
info "Forces bold design decisions before writing any code."
info "277,000+ installs. The #1 most important skill."
run "claude plugin install figma@claude-plugins-official"
# Also available as:
run "claude plugin install frontend-design@claude-plugins-official"

section "2.2 — Figma Plugin (Official Anthropic)"
info "Includes Figma MCP server settings + Agent Skills for design workflows."
run "claude plugin install figma@claude-plugins-official"

if ! $MINIMAL; then
  section "2.3 — Web Artifacts Builder (Official Anthropic)"
  info "Build complex multi-component HTML artifacts with React, Tailwind, shadcn/ui."
  run "claude plugin install web-artifacts-builder@claude-plugins-official"

  section "2.4 — Brand Guidelines (Official Anthropic)"
  info "Apply consistent brand colors and typography to artifacts."
  run "claude plugin install brand-guidelines@claude-plugins-official"

  section "2.5 — TypeScript LSP (Official Anthropic)"
  info "Real-time type checking as Claude writes code."
  run "claude plugin install typescript-lsp@claude-plugins-official"
fi


# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  PHASE 3: ANIMATION & 3D SKILLS                                           ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

header "PHASE 3: ANIMATION & 3D SKILLS"
info "From the claudedesignskills marketplace."
info "Skills auto-activate when you mention the relevant technology."

section "3.1 — Core 3D & Animation Bundle (5 skills)"
info "Three.js + GSAP + React Three Fiber + Motion + Babylon.js"
run "claude plugin install core-3d-animation@claudedesignskills"

if ! $MINIMAL; then
  section "3.2 — Extended Scroll & 3D Bundle (6 skills)"
  info "A-Frame + Vanta.js + PlayCanvas + PixiJS + Locomotive Scroll + Barba.js"
  run "claude plugin install extended-3d-scroll@claudedesignskills"

  section "3.3 — Animation Components Bundle (5 skills)"
  info "React Spring + Magic UI + AOS + anime.js + Lottie"
  run "claude plugin install animation-components@claudedesignskills"

  section "3.4 — Authoring & Motion Bundle (4 skills)"
  info "Blender pipeline + Spline + Rive + Substance 3D texturing"
  run "claude plugin install authoring-motion@claudedesignskills"

  section "3.5 — Meta Skills Bundle (2 skills)"
  info "Integration patterns + Modern design system fundamentals"
  run "claude plugin install meta-skills@claudedesignskills"
fi

echo ""
info "Individual skills can also be installed separately:"
echo -e "${DIM}    claude plugin install threejs-webgl@claudedesignskills"
echo -e "    claude plugin install gsap-scrolltrigger@claudedesignskills"
echo -e "    claude plugin install react-three-fiber@claudedesignskills"
echo -e "    claude plugin install motion-framer@claudedesignskills"
echo -e "    claude plugin install locomotive-scroll@claudedesignskills"
echo -e "    claude plugin install barba-js@claudedesignskills"
echo -e "    claude plugin install animejs@claudedesignskills"
echo -e "    claude plugin install lottie-animations@claudedesignskills"
echo -e "    claude plugin install pixijs-2d@claudedesignskills"
echo -e "    claude plugin install lightweight-3d-effects@claudedesignskills${NC}"


# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  PHASE 4: QUALITY & TESTING SKILLS                                        ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

if ! $MINIMAL; then

header "PHASE 4: QUALITY & TESTING SKILLS"

section "4.1 — Webapp Testing (Official Anthropic)"
info "Playwright-based testing for verifying frontend behavior."
run "claude plugin install webapp-testing@claude-plugins-official"

section "4.2 — UI Polish Pipeline"
info "Three-step pipeline: design → fix baseline → fix accessibility."
info "Run in sequence after generating a page."
echo -e "${DIM}    Step 1: /frontend-design     → Generate the page"
echo -e "    Step 2: /baseline-ui          → Fix spacing, typography, states"
echo -e "    Step 3: /fixing-accessibility  → Keyboard nav, labels, focus${NC}"

fi  # end !$MINIMAL

fi  # end INSTALL_SKILLS


# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  PHASE 5: MCP SERVERS                                                     ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

if $INSTALL_MCP; then

header "PHASE 5: MCP SERVERS"
warn "MCP servers consume tokens at session start. Keep 3-5 active max."
info "Use '/mcp disable <name>' when not needed to save tokens."
info "Using --scope user (-s user) makes servers available across ALL projects."

section "5.1 — Context7 (Live Documentation Lookup)"
info "Up-to-date docs and code examples for any library, injected into prompt."
info "Free, no API key needed."
run "claude mcp add context7 -s user -- npx -y @upstash/context7-mcp@latest"

section "5.2 — Playwright (Browser Automation & Testing)"
info "Auto-test animations, interactions, screenshot comparisons."
info "Node.js 18+ required."
run "claude mcp add playwright -s user -- npx -y @playwright/mcp@latest"

section "5.3 — Figma Remote MCP (Design ↔ Code)"
info "Read Figma designs directly. Supports Code to Canvas (Feb 2026)."
info "Requires Figma account. OAuth will prompt on first use."
run "claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp"

if ! $MINIMAL; then
  section "5.4 — Chrome DevTools MCP (Performance Debugging)"
  info "Inspect performance, network, rendering. Debug animation jank."
  run "claude mcp add chrome-devtools -s user -- npx -y @anthropic-ai/chrome-devtools-mcp@latest"

  section "5.5 — GitHub MCP (Repository Access)"
  info "Direct access to repos, PRs, issues from within Claude Code."
  info "Requires GITHUB_PERSONAL_ACCESS_TOKEN."
  warn "Get your token at: https://github.com/settings/tokens/new"
  warn "Scopes needed: repo, workflow, user"
  echo ""
  echo -e "${DIM}    # Run this after setting your token:${NC}"
  echo -e "${DIM}    claude mcp add github -s user -- npx -y @modelcontextprotocol/server-github \\${NC}"
  echo -e "${DIM}      --env GITHUB_PERSONAL_ACCESS_TOKEN=<your-token>${NC}"
  echo ""
  info "Skipping auto-install (requires token). Run manually with your token."

  section "5.6 — Sequential Thinking"
  info "Multi-step reasoning for complex animation logic and architecture."
  run "claude mcp add sequential-thinking -s user -- npx -y @modelcontextprotocol/server-sequential-thinking"
fi

echo ""
section "Verify MCP Servers"
info "After installation, verify with:"
echo -e "${DIM}    claude mcp list           # Check all servers${NC}"
echo -e "${DIM}    # Inside Claude Code:${NC}"
echo -e "${DIM}    /mcp                      # See real-time status${NC}"

fi  # end INSTALL_MCP


# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  PHASE 6: NPM DEPENDENCIES (Project-Level)                                ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

if $INSTALL_DEPS; then

header "PHASE 6: NPM DEPENDENCIES"
info "These are installed in your PROJECT, not globally."
info "Run these inside your project directory."
warn "If no package.json exists, run 'npm init -y' first."

section "6.1 — Core Animation Libraries"
echo -e "${DIM}    # GSAP (industry standard animation engine)"
echo -e "    npm install gsap"
echo -e ""
echo -e "    # Motion (formerly Framer Motion — React animation)"
echo -e "    npm install motion"
echo -e ""
echo -e "    # Three.js (3D graphics / WebGL)"
echo -e "    npm install three @types/three"
echo -e ""
echo -e "    # React Three Fiber + Drei (React wrapper for Three.js)"
echo -e "    npm install @react-three/fiber @react-three/drei${NC}"

section "6.2 — Scroll & Page Transition Libraries"
echo -e "${DIM}    # Locomotive Scroll (smooth scroll + parallax)"
echo -e "    npm install locomotive-scroll"
echo -e ""
echo -e "    # Barba.js (page transitions)"
echo -e "    npm install @barba/core"
echo -e ""
echo -e "    # Lenis (modern smooth scroll alternative)"
echo -e "    npm install lenis${NC}"

section "6.3 — Lightweight Animation Libraries"
echo -e "${DIM}    # anime.js (lightweight CSS/SVG/DOM animations)"
echo -e "    npm install animejs"
echo -e ""
echo -e "    # AOS — Animate On Scroll"
echo -e "    npm install aos"
echo -e ""
echo -e "    # React Spring (physics-based animations)"
echo -e "    npm install @react-spring/web"
echo -e ""
echo -e "    # Lottie (After Effects JSON animations)"
echo -e "    npm install lottie-web"
echo -e "    # For React: npm install lottie-react${NC}"

section "6.4 — 2D & Effects Libraries"
echo -e "${DIM}    # PixiJS (high-performance 2D canvas)"
echo -e "    npm install pixi.js"
echo -e ""
echo -e "    # Vanta.js (animated 3D backgrounds)"
echo -e "    npm install vanta"
echo -e ""
echo -e "    # TailwindCSS Motion (zero-JS utility animations)"
echo -e "    npm install tailwindcss-motion${NC}"

section "6.5 — Authoring Tools"
echo -e "${DIM}    # Spline (interactive 3D scenes)"
echo -e "    npm install @splinetool/react-spline @splinetool/runtime"
echo -e ""
echo -e "    # Rive (interactive vector animations)"
echo -e "    npm install @rive-app/react-canvas${NC}"

section "6.6 — One-Line Install (All Core Libraries)"
echo ""
echo -e "${BOLD}${GREEN}    # Copy-paste this to install all core animation deps at once:${NC}"
echo ""
echo -e "${BOLD}    npm install gsap motion three @react-three/fiber @react-three/drei \\${NC}"
echo -e "${BOLD}      locomotive-scroll @barba/core lenis animejs aos \\${NC}"
echo -e "${BOLD}      @react-spring/web lottie-web pixi.js vanta tailwindcss-motion${NC}"
echo ""

fi  # end INSTALL_DEPS


# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  PHASE 7: CLAUDE.md CONFIGURATION                                         ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

header "PHASE 7: CLAUDE.md PROJECT CONFIGURATION"
info "Add this to your project's CLAUDE.md for optimal animated website output."
info "CLAUDE.md goes in the root of your project directory."

CLAUDE_MD_CONTENT='# Project: Animated Visual Website

## Design Philosophy
- NEVER use generic AI aesthetics (Inter font, purple gradients, rounded cards)
- Choose a BOLD aesthetic direction BEFORE writing any code
- Every project gets a unique visual identity — no two sites look alike
- Animations must feel intentional and purposeful, not decorative

## Tech Stack
- Framework: Next.js 14+ / Vite + React
- Styling: Tailwind CSS v4 + CSS custom properties
- Animation: GSAP + ScrollTrigger for scroll-driven effects
- Component animations: Motion (Framer Motion) for React
- 3D: Three.js via React Three Fiber + Drei
- Smooth scroll: Lenis or Locomotive Scroll
- Page transitions: Barba.js
- Typography: Google Fonts — always distinctive, never generic

## Animation Guidelines
- Page load: Staggered reveals with animation-delay (CSS) or GSAP timeline
- Scroll: ScrollTrigger for parallax, pin sections, scrub animations
- Hover: Subtle scale + shadow lift on cards, color shifts on links
- Transitions: Barba.js for cross-page, Motion AnimatePresence for components
- 3D: Keep scenes lightweight (<1MB assets), use draco compression
- Performance: Target 60fps, use will-change sparingly, prefer transform/opacity

## Figma Integration
- Use get_design_context to read design structure
- Use get_variable_defs for token definitions
- Check Code Connect mappings before creating new components

## File Structure
- Components: src/components/
- Animations: src/lib/animations/ (GSAP timelines, scroll configs)
- 3D Scenes: src/components/three/
- Styles: src/styles/ (CSS variables, fonts, global)
- Tokens: src/styles/tokens.css

## Quality Pipeline
1. /frontend-design → Generate with bold aesthetics
2. Fix spacing, typography, component states
3. Fix accessibility — keyboard nav, labels, focus
4. Test with Playwright MCP — visual + functional'

section "7.1 — Writing CLAUDE.md"
if $DRY_RUN; then
  echo -e "  ${DIM}[dry-run] Would write CLAUDE.md to current directory${NC}"
else
  if [ -f "CLAUDE.md" ]; then
    warn "CLAUDE.md already exists. Saving as CLAUDE.visual-stack.md"
    echo "$CLAUDE_MD_CONTENT" > CLAUDE.visual-stack.md
    success "Written to CLAUDE.visual-stack.md"
    info "Merge manually into your existing CLAUDE.md"
  else
    echo "$CLAUDE_MD_CONTENT" > CLAUDE.md
    success "Written to CLAUDE.md"
  fi
fi


# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  PHASE 8: MODEL CONFIGURATION                                             ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

header "PHASE 8: MODEL RECOMMENDATIONS"

echo ""
echo -e "${BOLD}  Recommended Model Strategy:${NC}"
echo ""
echo -e "  ${GREEN}Default (80% of work):${NC}  Claude Sonnet 4.6"
echo -e "  ${DIM}  • Fast (40-60 tok/s), cheap (\$3/\$15 per 1M tokens)${NC}"
echo -e "  ${DIM}  • Excellent for components, pages, animations, iteration${NC}"
echo -e "  ${DIM}  • Set as default: claude config set model claude-sonnet-4-6${NC}"
echo ""
echo -e "  ${MAGENTA}Escalate (20% of work):${NC}  Claude Opus 4.6"
echo -e "  ${DIM}  • Deeper reasoning, 1M context window${NC}"
echo -e "  ${DIM}  • Agent Teams for parallel sub-tasks${NC}"
echo -e "  ${DIM}  • Use for: architecture, multi-file refactors, complex 3D scenes${NC}"
echo -e "  ${DIM}  • Switch with: claude config set model claude-opus-4-6${NC}"
echo ""
echo -e "  ${DIM}  Pro tip: Use /model sonnet or /model opus to switch mid-session${NC}"


# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  SUMMARY                                                                   ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

header "INSTALLATION COMPLETE"

echo ""
echo -e "${BOLD}  What was installed:${NC}"
echo ""

if $INSTALL_SKILLS; then
  echo -e "  ${GREEN}✔${NC} Plugin Marketplaces"
  echo -e "    • Anthropic Official (auto-registered)"
  echo -e "    • freshtechbro/claudedesignskills (23 animation skills)"
  if ! $MINIMAL; then
    echo -e "    • alirezarezvani/claude-skills (192+ skills)"
  fi
  echo ""
  echo -e "  ${GREEN}✔${NC} Design Skills"
  echo -e "    • frontend-design (bold aesthetics, anti-AI-slop)"
  echo -e "    • Figma plugin (design ↔ code)"
  if ! $MINIMAL; then
    echo -e "    • web-artifacts-builder (React/Tailwind/shadcn artifacts)"
    echo -e "    • brand-guidelines (consistent visual identity)"
    echo -e "    • typescript-lsp (real-time type checking)"
  fi
  echo ""
  echo -e "  ${GREEN}✔${NC} Animation & 3D Skills"
  echo -e "    • Three.js, GSAP, React Three Fiber, Motion, Babylon.js"
  if ! $MINIMAL; then
    echo -e "    • A-Frame, Vanta.js, PixiJS, Locomotive, Barba.js"
    echo -e "    • React Spring, AOS, anime.js, Lottie, Magic UI"
    echo -e "    • Blender pipeline, Spline, Rive, Substance 3D"
  fi
  if ! $MINIMAL; then
    echo ""
    echo -e "  ${GREEN}✔${NC} Quality Skills"
    echo -e "    • webapp-testing (Playwright-based)"
  fi
fi

if $INSTALL_MCP; then
  echo ""
  echo -e "  ${GREEN}✔${NC} MCP Servers"
  echo -e "    • Context7 (live docs for any library)"
  echo -e "    • Playwright (browser testing)"
  echo -e "    • Figma Remote (design ↔ code, Code to Canvas)"
  if ! $MINIMAL; then
    echo -e "    • Chrome DevTools (performance debugging)"
    echo -e "    • Sequential Thinking (complex reasoning)"
    echo -e "    • GitHub (manual setup needed — requires token)"
  fi
fi

if $INSTALL_DEPS; then
  echo ""
  echo -e "  ${GREEN}✔${NC} npm Dependencies (install in your project)"
  echo -e "    • See Phase 6 commands above"
fi

echo ""
echo -e "${BOLD}  Quick Reference — Key Commands:${NC}"
echo ""
echo -e "  ${DIM}claude mcp list${NC}                  # Verify MCP servers"
echo -e "  ${DIM}/mcp${NC}                             # Check status inside Claude Code"
echo -e "  ${DIM}/plugin${NC}                          # Browse installed plugins"
echo -e "  ${DIM}/reload-plugins${NC}                  # Reload after changes"
echo -e "  ${DIM}/mcp disable <name>${NC}              # Disable unused MCP (save tokens)"
echo -e "  ${DIM}/mcp enable <name>${NC}               # Re-enable when needed"
echo ""
echo -e "${BOLD}  Next Steps:${NC}"
echo ""
echo -e "  1. Restart Claude Code to load all plugins"
echo -e "  2. Run ${CYAN}/mcp${NC} to verify MCP servers are connected"
echo -e "  3. Run ${CYAN}/plugin${NC} to verify skills are loaded"
echo -e "  4. Start building! Try:"
echo ""
echo -e "  ${GREEN}  \"Build a dark, editorial landing page for a creative${NC}"
echo -e "  ${GREEN}   agency. GSAP scroll animations, Three.js hero with${NC}"
echo -e "  ${GREEN}   floating geometry, Motion for component transitions.${NC}"
echo -e "  ${GREEN}   Asymmetric grid, dramatic typography.\"${NC}"
echo ""
echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
