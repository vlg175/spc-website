/* ─────────────────────────────────────────────────────────────────────────
   404 — Not Found
   Industrial-themed 404 page matching the SPC design system.
   ───────────────────────────────────────────────────────────────────────── */

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "var(--bg-void)" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(42,62,114,0.08) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(42,62,114,0.08) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Depth vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(5,8,16,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-6">
        {/* Giant 404 */}
        <h1
          className="font-display font-extrabold uppercase leading-none select-none"
          style={{
            fontSize: "clamp(7rem, 22vw, 18rem)",
            color: "var(--bg-surface)",
            letterSpacing: "-0.03em",
          }}
        >
          404
        </h1>

        {/* Molten accent line */}
        <div
          className="mx-auto mb-6"
          style={{
            width: 80,
            height: 2,
            background: "var(--molten-500)",
          }}
        />

        {/* Message */}
        <p
          className="font-mono text-xs tracking-[0.28em] uppercase mb-2"
          style={{ color: "var(--molten-500)" }}
        >
          Section not found
        </p>
        <p
          className="text-sm leading-relaxed max-w-md mx-auto mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-display font-semibold text-sm uppercase tracking-[0.14em] transition-all duration-200"
          style={{
            padding: "14px 32px",
            background: "var(--molten-500)",
            color: "var(--text-white)",
          }}
        >
          Back to homepage
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>

        {/* Spec label */}
        <p
          className="mt-12 font-mono text-[9px] tracking-[0.22em] uppercase"
          style={{ color: "rgba(42,62,114,0.45)" }}
        >
          SPC-ERR-404
        </p>
      </div>
    </div>
  );
}
