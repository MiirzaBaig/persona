import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mirza Baig — Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0d12",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient orb */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "2px",
              background: "#3b82f6",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#3b82f6",
            }}
          >
            Portfolio
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          Mirza Baig
        </h1>

        {/* Title */}
        <p
          style={{
            fontSize: "28px",
            fontWeight: 400,
            color: "#71717a",
            marginTop: "16px",
            lineHeight: 1.4,
          }}
        >
          Full-Stack Engineer · Web3 · Building for the web
        </p>

        {/* Bottom bar with tech */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "48px",
          }}
        >
          {["Next.js", "TypeScript", "Node.js", "Solidity", "AWS"].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 20px",
                  borderRadius: "999px",
                  border: "1px solid #27272a",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#a1a1aa",
                  background: "rgba(39,39,42,0.4)",
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "16px",
            color: "#52525b",
            fontWeight: 500,
          }}
        >
          mirzabaig.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
