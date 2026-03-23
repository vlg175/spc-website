# Production Process — ERW Steel Pipe Manufacturing

> "5 stages. Zero shortcuts."

## Overview
The SHOWPIECE section. An animated factory tour: flat steel strip → certified pipe in 5 stages. Most visually impressive part of the entire site.

## Design
- GSAP ScrollTrigger: `pin: true`, `scrub: 0.5`, snap to each step
- Section PINS at viewport top while user scrolls through all 5 steps
- Progress bar with 5 numbered dots advances across top
- Color shifts: cool steel blue → warm welding orange → cool blue (finished)
- Running pipe cross-section at top evolves per step: flat→curved→circle→glowing→stamped
- SVG line art icons with stroke-dasharray draw-in
- Mobile: vertical timeline, scroll-triggered reveals, NO pinning

## The 5 Steps

### Step 1: Steel Preparation
*Coil → flat strip, trimmed and ready*

- **Visual:** Steel coil unrolling, flattening through rollers, blade trimming edges
- **Copy:** "Hot-rolled steel coils are inspected, unrolled, and leveled. Strips are joined for continuous operation and precision-trimmed to exact width. The journey begins."
- **Animation:** Coiled spiral unrolling → wavy line flattening → blade trimming motion
- **Color:** Cool steel blue/silver
- **Standard ref:** Raw material per GOST 380-2005

### Step 2: Forming (THE HERO ANIMATION)
*Flat strip → cylindrical tube*

- **Visual:** Flat strip bending through forming rollers into cylinder
- **Copy:** "Calibrated forming rollers gradually bend flat steel from strip to U-shape to closed cylinder. This is where steel becomes pipe."
- **Animation:** THE STAR MOMENT — flat rectangle SVG morphs into a circle. Show cross-section: flat → curve → U → O. Multiple frames or smooth path morph. Most memorable animation on the site.
- **Color:** Cool → neutral transition
- **Overlay tagline:** "Where steel becomes pipe."

### Step 3: High-Frequency Welding
*Open seam → forged bond at 1,000°C*

- **Visual:** Electric arc, glowing seam, spark particles
- **Copy:** "High-frequency current at 2,000–10,000 amps heats edges past 1,000°C. Squeeze rolls forge them together — no filler material, no compromise. The seam becomes the steel."
- **Animation:** Glowing orange/white seam line + particle sparks radiating. Warm pulsing glow. This step feels HOT.
- **Color:** WARM — orange, amber, white-hot. Most colorful step.
- **Overlay tagline:** "1,000°C. Zero filler. Pure bond."

### Step 4: Treatment & Sizing
*Raw weld → precision-calibrated pipe*

- **Visual:** Burrs removed, heat glow fading, sizing rolls, dimension annotations
- **Copy:** "Burrs removed inside and out. Heat treatment refines the weld. Sizing rolls calibrate to exact diameter, roundness, and straightness — fractions of a millimeter."
- **Animation:** Bumpy surface smoothing → glow fading → oval squeezed to perfect circle → dimension lines: "Ø219mm ±0.5mm" in monospace
- **Color:** Warm fading to cool precision blue
- **Overlay tagline:** "Every millimeter, accounted for."

### Step 5: Testing & Certification
*Finished pipe → verified, stamped, shipped*

- **Visual:** Ultrasonic waves, pressure gauge, cut saw, certification stamps
- **Copy:** "Ultrasonic weld inspection. Hydraulic pressure testing at 20 MPa. Dimensional verification. Only then does it earn the GOST stamp and leave our facility."
- **Animation:** Sequence: ultrasonic wave icon → pressure gauge fills → checkmarks appear → GOST certification badge stamp with satisfying seal animation
- **Color:** Cool blue + green/gold quality accents
- **Badge:** "GOST 10704 · GOST 10705 · ISO 559 · Uzstandard"
- **Overlay tagline:** "Tested. Certified. Ready."

## Technical Implementation

```javascript
ScrollTrigger.create({
  trigger: "#production-process",
  start: "top top",
  end: "+=300%",     // 3x viewport scroll distance
  pin: true,
  scrub: 0.5,
  snap: { snapTo: 1/4, duration: 0.3, ease: "power1.inOut" }
})
```

### Step transition: each occupies 1/5 of scroll distance
1. Previous fades out (opacity→0, translateX -20px)
2. Current icon draws in (stroke-dasharray, 0.4s)
3. Title clipPath reveals (0.3s)
4. Description fades in (0.3s)
5. Running pipe morphs to current stage

### Progress bar
Thin line across top. Fills left→right. 5 dots: active = accent + scale(1.2), inactive = steel outline.

### Pipe evolution (top of section)
SVG cross-section morphing: flat strip → curving → circle → circle+glow seam → circle+checkmark

### Mobile
Vertical timeline. Thin line left side. Cards reveal on scroll (once: true). Step dots on timeline. Simpler animations (fade+scale, no complex morphs). Sticky step dots at section top.
