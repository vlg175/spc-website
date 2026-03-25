/* ─────────────────────────────────────────────────────────────────────────
   Animation Constants — SPC Website
   Central timing, easing, and stagger values used across sections.
   Import these instead of hardcoding numbers inline.
   ───────────────────────────────────────────────────────────────────────── */

/* ── Easing ───────────────────────────────────────────────────────────── */
export const EASE = {
  /** Default for most reveals. */
  out: "power2.out",
  /** Strong exit ease for headline reveals. */
  outStrong: "power3.out",
  /** Symmetric ease for morphs/transforms. */
  inOut: "power2.inOut",
  /** Overshoot bounce for elements that "snap" in. */
  back: "back.out(1.5)",
  /** No ease — linear. Used for scrub progress bars. */
  none: "none",
} as const;

/* ── Durations (seconds) ──────────────────────────────────────────────── */
export const DUR = {
  /** Section heading line scaleX. */
  headingLine: 0.45,
  /** Section heading label fade. */
  headingLabel: 0.3,
  /** Section heading title clip-path reveal. */
  headingTitle: 0.65,
  /** Standard card/text reveal. */
  reveal: 0.55,
  /** Fast micro-interaction. */
  micro: 0.25,
  /** Slow ambient / background animation. */
  ambient: 0.85,
} as const;

/* ── Stagger (seconds) ────────────────────────────────────────────────── */
export const STAGGER = {
  /** Card grid items. */
  card: 0.12,
  /** Text lines / list items. */
  text: 0.08,
  /** Detail rows (contact details). */
  detail: 0.12,
  /** Form fields. */
  field: 0.1,
  /** Certification badges. */
  badge: 0.055,
} as const;

/* ── ScrollTrigger defaults ───────────────────────────────────────────── */
export const SCROLL = {
  /** Standard "trigger enters viewport" start. */
  start: "top 85%",
  /** Slightly earlier start for details. */
  startEarly: "top 82%",
  /** Only fire once. */
  once: true,
} as const;

/* ── Distances (pixels) ───────────────────────────────────────────────── */
export const OFFSET = {
  /** Card slide-up distance. */
  cardY: 50,
  /** Text slide-up distance. */
  textY: 20,
  /** Side-entry distance (left/right). */
  sideX: 30,
} as const;
