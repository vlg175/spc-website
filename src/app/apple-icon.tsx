import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple Touch Icon — pipe cross-section mark + "SPC" monogram.
 * Larger canvas allows more detail than the 32×32 favicon.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #2A3E72 0%, #1e2f5a 100%)",
          fontFamily: "sans-serif",
          gap: 0,
        }}
      >
        {/* Pipe cross-section mark */}
        <svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer pipe wall */}
          <circle cx="45" cy="45" r="38" fill="white" />

          {/* Inner bore cutaway — offset for perspective */}
          <circle cx="50" cy="42" r="22" fill="#2A3E72" />

          {/* Molten-orange bore accent */}
          <circle
            cx="50"
            cy="42"
            r="22"
            fill="none"
            stroke="#E85E22"
            strokeWidth="2.5"
          />

          {/* Inner glow ring */}
          <circle
            cx="50"
            cy="42"
            r="16"
            fill="none"
            stroke="#E85E22"
            strokeWidth="0.8"
            opacity="0.4"
          />

          {/* Wall thickness dimension tick marks */}
          <line
            x1="45"
            y1="7"
            x2="45"
            y2="12"
            stroke="rgba(232,94,34,0.5)"
            strokeWidth="0.8"
          />
          <line
            x1="45"
            y1="78"
            x2="45"
            y2="83"
            stroke="rgba(232,94,34,0.5)"
            strokeWidth="0.8"
          />
        </svg>

        {/* SPC text */}
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "0.12em",
            marginTop: 4,
            lineHeight: 1,
          }}
        >
          SPC
        </div>
      </div>
    ),
    { ...size }
  );
}
