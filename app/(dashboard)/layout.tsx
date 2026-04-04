"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "My Orders", href: "/orders", icon: "📦" },
  { label: "My Account", href: "/account", icon: "👤" },
]

const adminItems = [
  { label: "Dashboard", href: "/admin", icon: "⚡" },
  { label: "Add Product", href: "/admin/add-product", icon: "➕" },
  { label: "Customers", href: "/admin/customers", icon: "👥" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#FAF3E8" }}>

      {/* Sidebar */}
      <aside style={{
        width: "260px",
        background: "#2C3E50",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ padding: "32px 24px", borderBottom: "1px solid rgba(200,146,42,0.2)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <Image src="/logo.png" alt="Origin 54" width={40} height={40} style={{ borderRadius: "50%" }} />
            <div>
              <div style={{ fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.1em", color: "#FAF3E8", lineHeight: 1 }}>ORIGIN 54</div>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "10px", color: "#C8922A", fontStyle: "italic" }}>The Asili Collective</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ padding: "24px 16px", flex: 1 }}>
          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "rgba(250,243,232,0.35)",
            padding: "0 8px",
            marginBottom: "12px",
          }}>
            MY ACCOUNT
          </p>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "6px",
              marginBottom: "4px",
              textDecoration: "none",
              background: pathname === item.href ? "rgba(200,146,42,0.15)" : "transparent",
              borderLeft: pathname === item.href ? "2px solid #C8922A" : "2px solid transparent",
              transition: "all 0.2s ease",
            }}>
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              <span style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "16px",
                color: pathname === item.href ? "#C8922A" : "rgba(250,243,232,0.7)",
                fontWeight: pathname === item.href ? 600 : 400,
              }}>
                {item.label}
              </span>
            </Link>
          ))}

          {/* Admin section */}
          {isAdmin && (
            <>
              <p style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "rgba(250,243,232,0.35)",
                padding: "0 8px",
                marginBottom: "12px",
                marginTop: "24px",
              }}>
                ADMIN
              </p>
              {adminItems.map((item) => (
                <Link key={item.href} href={item.href} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "6px",
                  marginBottom: "4px",
                  textDecoration: "none",
                  background: pathname === item.href ? "rgba(200,146,42,0.15)" : "transparent",
                  borderLeft: pathname === item.href ? "2px solid #C8922A" : "2px solid transparent",
                  transition: "all 0.2s ease",
                }}>
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  <span style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "16px",
                    color: pathname === item.href ? "#C8922A" : "rgba(250,243,232,0.7)",
                    fontWeight: pathname === item.href ? 600 : 400,
                  }}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Bottom sign out */}
        <div style={{ padding: "24px 16px", borderTop: "1px solid rgba(200,146,42,0.15)" }}>
          <Link href="/login" style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            textDecoration: "none",
          }}>
            <span style={{ fontSize: "16px" }}>🚪</span>
            <span style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "16px",
              color: "rgba(250,243,232,0.5)",
            }}>
              Sign Out
            </span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {children}
      </div>
    </div>
  )
}
