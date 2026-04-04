import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Orders | Origin 54",
}

export default function OrdersPage() {
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
        MY ORDERS
      </h1>
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "20px",
        fontStyle: "italic",
        color: "rgba(44,62,80,0.6)",
      }}>
        You have no orders yet.
      </p>
    </div>
  )
}
