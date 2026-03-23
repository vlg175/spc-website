import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SPC — Steel Pipe Company | ERW Steel Pipes, Uzbekistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0d1b3e 0%, #1a2a5e 50%, #0d1b3e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #E85E22, #f4813f, transparent)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              color: "#E85E22",
              fontSize: 14,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              marginBottom: 28,
              fontWeight: 500,
            }}
          >
            STEEL PIPE COMPANY · SEZ ANGREN · UZBEKISTAN
          </div>

          {/* Logo monogram */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 0,
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: 120,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              SPC
            </span>
          </div>

          {/* Divider line */}
          <div
            style={{
              width: 80,
              height: 2,
              background: "#E85E22",
              marginTop: 24,
              marginBottom: 24,
            }}
          />

          {/* Tagline */}
          <div
            style={{
              color: "#94a3b8",
              fontSize: 18,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            ERW Steel Pipes · GOST Certified · Round · Square · Profile
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 56,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 48,
            paddingRight: 48,
          }}
        >
          <span
            style={{
              color: "#E85E22",
              fontSize: 13,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            steelpipe.uz
          </span>
          <span
            style={{
              color: "#64748b",
              fontSize: 13,
              letterSpacing: "0.15em",
            }}
          >
            +998 (55) 900-00-77 · jv.steelpipe@gmail.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
