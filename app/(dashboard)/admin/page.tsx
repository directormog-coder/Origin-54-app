import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ADMIN DASHBOARD | Origin 54",
}

export default function Page() {
  return (
    <div style={{ padding: "48px", maxWidth: "1280px", margin: "0 auto" }}>
      <div style={{ width: "1px", height: "48px", background: "#C8922A", marginBottom: "32px" }} />
      <h1 style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "clamp(48px, 6vw, 80px)",
        letterSpacing: "0.08em",
        color: "#2C3E50",
        lineHeight: 1,
        marginBottom: "24px",
      }}>
        ADMIN DASHBOARD
      </h1>
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "20px",
        fontStyle: "italic",
        color: "rgba(44,62,80,0.6)",
      }}>
        Coming soon — this page is under construction.
      </p>
    </div>
  )
}
