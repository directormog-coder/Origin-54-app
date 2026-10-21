import { ImageResponse } from "next/og";

export const alt = "Origin 54 - The Asili Collective";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "#C59D3F",
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#1A1A1A", fontSize: 60, fontWeight: "bold" }}>
            54
          </span>
        </div>
        <h1
          style={{
            fontSize: 80,
            color: "#F8F1EA",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Origin 54
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "#C59D3F",
            marginTop: 20,
            fontStyle: "italic",
          }}
        >
          The Asili Collective
        </p>
      </div>
    ),
    { ...size }
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30