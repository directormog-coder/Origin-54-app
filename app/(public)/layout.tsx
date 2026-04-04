import Link from "next/link"
import Image from "next/image"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FAF3E8" }}>

      {/* Simple header */}
      <header style={{
        borderBottom: "1px solid rgba(200,146,42,0.2)",
        padding: "20px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#FAF3E8",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <Image src="/logo.png" alt="Origin 54" width={44} height={44} style={{ borderRadius: "50%" }} />
          <div>
            <div style={{ fontFamily: "var(--font-bebas)", fontSize: "18px", letterSpacing: "0.1em", color: "#2C3E50", lineHeight: 1 }}>ORIGIN 54</div>
            <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "10px", color: "#C8922A", fontStyle: "italic", letterSpacing: "0.12em" }}>The Asili Collective</div>
          </div>
        </Link>

        <Link href="/shop" style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "13px",
          letterSpacing: "0.18em",
          background: "#C8922A",
          color: "#FAF3E8",
          padding: "10px 24px",
          textDecoration: "none",
        }}>
          SHOP NOW
        </Link>
      </header>

      {/* Page content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Simple footer */}
      <footer style={{
        background: "#2C3E50",
        borderTop: "3px solid #C8922A",
        padding: "40px 48px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "24px",
      }}>
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "14px", color: "rgba(250,243,232,0.5)" }}>
          © {new Date().getFullYear()} Origin 54 — The Asili Collective
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "Shop", href: "/shop" },
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "14px",
              color: "rgba(250,243,232,0.5)",
              textDecoration: "none",
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  )
}

