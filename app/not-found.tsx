import Link from "next/link"

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
      padding: "48px",
      background: "#FAF3E8",
      textAlign: "center",
    }}>
      {/* Decorative line */}
      <div style={{ width: "1px", height: "60px", background: "#C8922A" }} />

      <div style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "clamp(100px, 20vw, 180px)",
        color: "#2C3E50",
        lineHeight: 1,
        letterSpacing: "0.05em",
      }}>
        404
      </div>

      <h2 style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "clamp(24px, 4vw, 40px)",
        letterSpacing: "0.1em",
        color: "#C8922A",
      }}>
        PAGE NOT FOUND
      </h2>

      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "20px",
        fontStyle: "italic",
        color: "rgba(44,62,80,0.65)",
        maxWidth: "440px",
        lineHeight: 1.7,
      }}>
        The page you are looking for may have moved, or perhaps it never existed.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "14px",
          letterSpacing: "0.2em",
          background: "#2C3E50",
          color: "#FAF3E8",
          padding: "14px 36px",
          textDecoration: "none",
        }}>
          GO HOME
        </Link>
        <Link href="/shop" style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "14px",
          letterSpacing: "0.2em",
          border: "1px solid #2C3E50",
          color: "#2C3E50",
          padding: "14px 36px",
          textDecoration: "none",
        }}>
          SHOP NOW
        </Link>
      </div>

      <div style={{ width: "1px", height: "60px", background: "#C8922A" }} />
    </div>
  )
}
