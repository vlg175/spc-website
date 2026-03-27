"use client";

import { useId, useState } from "react";
import { motion, useAnimate } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   SOCIAL ICONS — SPC Website
   Three animated brand icons: Telegram · Instagram · WhatsApp
   Desktop: fixed right sidebar (z-40, vertical).
   Mobile:  exported <SocialIconsRow> for horizontal use in Contact section.
   ───────────────────────────────────────────────────────────────────────── */

/* ── Resolved token value (can't interpolate CSS vars as color) ──────── */
const STEEL = "#658098"; // var(--steel-400)

/* ── SVG path data ─────────────────────────────────────────────────────── */
const TG_PATH =
  "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z";

const IG_PATH =
  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z";

const WA_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z";

/* ═════════════════════════════════════════════════════════════════════════
   1. TELEGRAM
   Hover: #0088cc fill · rotate(-10deg) · translateY(-3px) · scale(1.1)
   "The plane launches."
   ═════════════════════════════════════════════════════════════════════════ */
function TelegramBtn() {
  return (
    <motion.a
      href="https://t.me/+998947785533"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram — message us"
      className="relative flex items-center justify-center w-11 h-11 focus-visible:outline-none"
      initial="idle"
      whileHover="hovered"
    >
      {/* Hover background hint */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0"
        variants={{
          idle:    { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
        style={{
          background: "rgba(0,136,204,0.06)",
          border: "1px solid rgba(0,136,204,0.20)",
        }}
      />

      {/* Icon — tilt + fly up on hover */}
      <motion.div
        variants={{
          idle:    { rotate: 0,   y: 0,  scale: 1   },
          hovered: { rotate: -10, y: -3, scale: 1.1 },
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <motion.path
            d={TG_PATH}
            variants={{
              idle:    { fill: STEEL      },
              hovered: { fill: "#0088cc" },
            }}
            transition={{ duration: 0.25 }}
          />
        </svg>
      </motion.div>
    </motion.a>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
   2. INSTAGRAM
   Hover: gradient #833AB4→#E1306C→#F77737→#FCAF45 · glow pulse
   "The lens ignites."
   Two SVGs cross-fade (Motion can't tween to gradient fill directly).
   useId() ensures unique linearGradient IDs when rendered multiple times.
   ═════════════════════════════════════════════════════════════════════════ */
function InstagramBtn() {
  const rawId = useId();
  // Strip colons/special chars — SVG id must be valid NCName
  const gradId = `ig-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="https://instagram.com/steelpipe_uz"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram — follow our factory"
      className="relative flex items-center justify-center w-11 h-11 focus-visible:outline-none"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Glow pulse — radiates outward, repeats while hovered */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-full"
        animate={
          hovered
            ? { opacity: [0, 0.6, 0], scale: [0.7, 1.7, 0.7] }
            : { opacity: 0, scale: 1 }
        }
        transition={
          hovered
            ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.18 }
        }
        style={{
          background:
            "radial-gradient(circle, rgba(228,49,108,0.6) 0%, rgba(131,58,180,0.18) 50%, transparent 70%)",
        }}
      />

      {/* Stacked SVGs — cross-fade between steel and gradient */}
      <span className="relative w-5 h-5 block">
        {/* Steel (idle state) */}
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute inset-0 w-full h-full"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.28 }}
          aria-hidden="true"
        >
          <path d={IG_PATH} fill={STEEL} />
        </motion.svg>

        {/* Gradient (hovered state) */}
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute inset-0 w-full h-full"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#FCAF45" />
              <stop offset="33%"  stopColor="#F77737" />
              <stop offset="66%"  stopColor="#E1306C" />
              <stop offset="100%" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <path d={IG_PATH} fill={`url(#${gradId})`} />
        </motion.svg>
      </span>
    </motion.a>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
   3. WHATSAPP
   Hover: #25D366 fill · rotate ±3deg × 3 oscillation (phone vibrates)
   useAnimate() fires the imperative shake on hoverStart, plays once.
   ═════════════════════════════════════════════════════════════════════════ */
function WhatsAppBtn() {
  const [iconScope, animateIcon] = useAnimate();
  const [hovered, setHovered] = useState(false);

  const onHoverStart = async () => {
    setHovered(true);
    // 3 back-and-forth rotations, plays once
    await animateIcon(
      iconScope.current,
      { rotate: [0, 3, -3, 3, -3, 3, 0] },
      { duration: 0.42, ease: "easeInOut" }
    );
  };

  return (
    <motion.a
      href="https://wa.me/998947785533"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp — chat with us"
      className="relative flex items-center justify-center w-11 h-11 focus-visible:outline-none"
      onHoverStart={onHoverStart}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Hover background hint */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        style={{
          background: "rgba(37,211,102,0.06)",
          border: "1px solid rgba(37,211,102,0.22)",
        }}
      />

      {/* Icon — shake scope */}
      <div ref={iconScope}>
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <motion.path
            d={WA_PATH}
            animate={{ fill: hovered ? "#25D366" : STEEL }}
            transition={{ duration: 0.22 }}
          />
        </svg>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Shared group — used by both exports
   ───────────────────────────────────────────────────────────────────────── */
function IconGroup() {
  return (
    <>
      <TelegramBtn />
      <InstagramBtn />
      <WhatsAppBtn />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DEFAULT EXPORT — fixed right sidebar, desktop only (hidden on mobile)
   Placed in root layout.tsx so it persists across all scroll positions.
   ───────────────────────────────────────────────────────────────────────── */
export default function SocialIcons() {
  return (
    <nav
      className="hidden md:flex flex-col items-center gap-1 fixed right-6 top-1/2 -translate-y-1/2 z-40"
      aria-label="Social media links"
    >
      {/* Top decorative line */}
      <div
        aria-hidden="true"
        className="w-px h-12 mb-0.5"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--border-subtle))",
        }}
      />

      <IconGroup />

      {/* Bottom decorative line */}
      <div
        aria-hidden="true"
        className="w-px h-12 mt-0.5"
        style={{
          background:
            "linear-gradient(to bottom, var(--border-subtle), transparent)",
        }}
      />
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   NAMED EXPORT — horizontal row for Contact section & mobile use
   ───────────────────────────────────────────────────────────────────────── */
export function SocialIconsRow() {
  return (
    <div
      className="flex flex-row items-center gap-1"
      role="group"
      aria-label="Social media links"
    >
      <IconGroup />
    </div>
  );
}
