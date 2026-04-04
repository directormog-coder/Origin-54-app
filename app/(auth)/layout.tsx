import Link from "next/link"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      background: "#FAF3E8",
    }}>
      {/* Left — brand panel */}
      <div style={{
        background: "#2C3E50",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Tribal pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: `repeating-linear-gradient(45deg, #C8922A 0, #C8922A 1px, transparent 0, transparent 30px),
            repeating-linear-gradient(-45deg, #C8922A 0, #C8922A 1px, transparent 0, transparent 30px)`,
        }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Image src="/logo.png" alt="Origin 54" width={120} height={120} style={{ borderRadius: "50%", marginBottom: "32px" }} />
          <div style={{ fontFamily: "var(--font-bebas)", fontSize: "48px", letterSpacing: "0.1em", color: "#FAF3E8", lineHeight: 1 }}>
            ORIGIN 54
          </div>
          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px", color: "#C8922A", fontStyle: "italic", letterSpacing: "0.15em", marginTop: "8px" }}>
            The Asili Collective
          </div>
          <div style={{ width: "40px", height: "1px", background: "#C8922A", margin: "32px auto" }} />
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "18px", color: "rgba(250,243,232,0.65)", fontStyle: "italic", lineHeight: 1.8, maxWidth: "320px" }}>
            African luxury fashion rooted in the heritage of 54 nations.
          </p>
        </div>
      </div>

      {/* Right — form panel */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px",
      }}>
        {/* Mobile logo (hidden on desktop) */}
        <Link href="/" style={{ textDecoration: "none", marginBottom: "40px", display: "none" }}>
          <Image src="/logo.png" alt="Origin 54" width={60} height={60} style={{ borderRadius: "50%" }} />
        </Link>

        <div style={{ width: "100%", maxWidth: "400px" }}>
          {children}
        </div>

        <p style={{ marginTop: "32px", fontFamily: "var(--font-cormorant)", fontSize: "14px", color: "rgba(44,62,80,0.5)" }}>
          <Link href="/" style={{ color: "#C8922A", textDecoration: "none" }}>← Back to store</Link>
        </p>
      </div>
    </div>
  )
}
