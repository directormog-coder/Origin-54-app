"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF3E8]">
      {/* ── Top announcement bar ── */}
      <div
        style={{
          background: "linear-gradient(90deg, #2C3E50, #B85C2C, #C8922A, #B85C2C, #2C3E50)",
          backgroundSize: "200% auto",
          animation: "shimmer 6s linear infinite",
        }}
        className="py-2 text-center text-xs tracking-[0.2em] text-[#FAF3E8] uppercase font-sans"
      >
        Free shipping on orders over R1,500 &nbsp;·&nbsp; Proudly African &nbsp;·&nbsp; Ships across 54 nations
      </div>

      {/* ── Main Header ── */}
      <header
        style={{
          background: "rgba(250, 243, 232, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(200, 146, 42, 0.2)",
        }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Origin 54"
              width={52}
              height={52}
              className="rounded-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "22px",
                  letterSpacing: "0.1em",
                  color: "#2C3E50",
                  lineHeight: 1,
                }}
              >
                ORIGIN 54
              </div>
              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "11px",
                  color: "#C8922A",
                  letterSpacing: "0.15em",
                  fontStyle: "italic",
                }}
              >
                The Asili Collective
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Shop", href: "/shop" },
              { label: "Collections", href: "/shop" },
              { label: "Artisans", href: "/artisans" },
              { label: "About", href: "/about" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "17px",
                  fontWeight: 500,
                  color: "#2C3E50",
                  letterSpacing: "0.05em",
                  position: "relative",
                  textDecoration: "none",
                }}
                className="group"
              >
                {item.label}
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    width: 0,
                    height: "1px",
                    background: "#C8922A",
                    transition: "width 0.3s ease",
                  }}
                  className="group-hover:w-full"
                />
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              aria-label="Search"
              style={{ color: "#2C3E50" }}
              className="hover:text-[#C8922A] transition-colors duration-200"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Account */}
            <Link
              href="/account"
              aria-label="Account"
              style={{ color: "#2C3E50" }}
              className="hover:text-[#C8922A] transition-colors duration-200"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              style={{ color: "#2C3E50", position: "relative" }}
              className="hover:text-[#C8922A] transition-colors duration-200"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "#C8922A",
                    color: "#FAF3E8",
                    fontSize: "10px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{ color: "#2C3E50" }}
              className="md:hidden hover:text-[#C8922A] transition-colors duration-200"
            >
              {menuOpen ? (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              borderTop: "1px solid rgba(200, 146, 42, 0.2)",
              background: "#FAF3E8",
            }}
            className="md:hidden px-6 py-4 flex flex-col gap-4"
          >
            {[
              { label: "Shop", href: "/shop" },
              { label: "Collections", href: "/shop" },
              { label: "Artisans", href: "/artisans" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "#2C3E50",
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(200, 146, 42, 0.15)",
                  paddingBottom: "12px",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── Page content ── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
      <footer
        style={{
          background: "#2C3E50",
          color: "#FAF3E8",
          borderTop: "3px solid #C8922A",
        }}
      >
        {/* Top footer */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Origin 54" width={44} height={44} className="rounded-full opacity-90" />
              <div>
                <div style={{ fontFamily: "var(--font-bebas)", fontSize: "20px", letterSpacing: "0.1em" }}>
                  ORIGIN 54
                </div>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "11px", color: "#C8922A", fontStyle: "italic", letterSpacing: "0.12em" }}>
                  The Asili Collective
                </div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px", lineHeight: 1.7, color: "rgba(250,243,232,0.7)" }}>
              African luxury fashion rooted in the heritage of 54 nations. Crafted with pride, worn with purpose.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.15em", color: "#C8922A", marginBottom: "16px" }}>
              SHOP
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["New Arrivals", "Women", "Men", "Accessories", "Sale"].map((item) => (
                <li key={item}>
                  <Link href="/shop" style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px", color: "rgba(250,243,232,0.7)", textDecoration: "none", letterSpacing: "0.03em" }}
                    className="hover:text-[#C8922A] transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.15em", color: "#C8922A", marginBottom: "16px" }}>
              INFO
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Artisans", href: "/artisans" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px", color: "rgba(250,243,232,0.7)", textDecoration: "none", letterSpacing: "0.03em" }}
                    className="hover:text-[#C8922A] transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.15em", color: "#C8922A", marginBottom: "16px" }}>
              JOIN THE COLLECTIVE
            </h4>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px", color: "rgba(250,243,232,0.7)", marginBottom: "16px", lineHeight: 1.6 }}>
              Be first to know about new collections and artisan stories.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  background: "rgba(250,243,232,0.08)",
                  border: "1px solid rgba(200,146,42,0.4)",
                  borderRadius: "4px",
                  padding: "10px 14px",
                  color: "#FAF3E8",
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "15px",
                  outline: "none",
                  width: "100%",
                }}
              />
              <button
                style={{
                  background: "#C8922A",
                  color: "#FAF3E8",
                  border: "none",
                  borderRadius: "4px",
                  padding: "10px 20px",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "15px",
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#B85C2C")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C8922A")}
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(200,146,42,0.2)",
            padding: "16px 24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "14px", color: "rgba(250,243,232,0.5)", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Origin 54 — The Asili Collective. All rights reserved.
          </p>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px", color: "rgba(250,243,232,0.4)", fontStyle: "italic" }}>
            Rooted in Africa. Worn by the world.
          </p>
        </div>
      </footer>
    </div>
  );
                  }

