"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main style={{ background: "#FAF3E8", overflowX: "hidden" }}>

      {/* ── NAVIGATION ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px",
        background: "rgba(250,243,232,0)",
        transition: "background 0.4s ease",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <Image src="/logo.png" alt="Origin 54" width={48} height={48} style={{ borderRadius: "50%" }} />
          <div>
            <div style={{ fontFamily: "var(--font-bebas)", fontSize: "20px", letterSpacing: "0.1em", color: "#2C3E50", lineHeight: 1 }}>ORIGIN 54</div>
            <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "10px", color: "#C8922A", letterSpacing: "0.15em", fontStyle: "italic" }}>The Asili Collective</div>
          </div>
        </Link>
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {["Shop", "Artisans", "About"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} style={{
              fontFamily: "var(--font-cormorant)", fontSize: "17px", fontWeight: 500,
              color: "#2C3E50", textDecoration: "none", letterSpacing: "0.05em",
            }}>{item}</Link>
          ))}
          <Link href="/shop" style={{
            fontFamily: "var(--font-bebas)", fontSize: "14px", letterSpacing: "0.15em",
            background: "#C8922A", color: "#FAF3E8", padding: "10px 24px",
            textDecoration: "none", borderRadius: "2px",
          }}>SHOP NOW</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", position: "relative",
        display: "flex", alignItems: "center",
        background: "linear-gradient(135deg, #2C3E50 0%, #1a2535 60%, #B85C2C 100%)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: `repeating-linear-gradient(45deg, #C8922A 0, #C8922A 1px, transparent 0, transparent 50%),
            repeating-linear-gradient(-45deg, #C8922A 0, #C8922A 1px, transparent 0, transparent 50%)`,
          backgroundSize: "30px 30px",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "680px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ width: "40px", height: "1px", background: "#C8922A" }} />
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px", letterSpacing: "0.25em", color: "#C8922A", textTransform: "uppercase" }}>The Asili Collective</span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-bebas)", fontSize: "clamp(72px, 10vw, 140px)",
              lineHeight: 0.9, letterSpacing: "0.04em", color: "#FAF3E8",
              marginBottom: "32px",
            }}>
              BORN<br />
              <span style={{ color: "#C8922A" }}>FROM</span><br />
              AFRICA
            </h1>

            <p style={{
              fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 300,
              color: "rgba(250,243,232,0.75)", lineHeight: 1.7, marginBottom: "48px",
              maxWidth: "480px", fontStyle: "italic",
            }}>
              Luxury fashion rooted in the heritage, craft, and bold spirit of Africa's 54 nations.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/shop" style={{
                fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.18em",
                background: "#C8922A", color: "#FAF3E8",
                padding: "16px 40px", textDecoration: "none",
                display: "inline-block", transition: "background 0.2s ease",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#B85C2C")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C8922A")}
              >
                EXPLORE COLLECTION
              </Link>
              <Link href="/about" style={{
                fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.18em",
                background: "transparent", color: "#FAF3E8",
                padding: "16px 40px", textDecoration: "none",
                display: "inline-block",
                border: "1px solid rgba(250,243,232,0.4)",
                transition: "border-color 0.2s ease",
              }}>
                OUR STORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ── */}
      <section style={{ padding: "100px 48px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {[
            { title: "WOMEN", sub: "Luxury Womenswear", color: "#B85C2C", accent: "#FAF3E8" },
            { title: "MEN", sub: "Elevated Menswear", color: "#2C3E50", accent: "#C8922A" },
            { title: "ACCESSORIES", sub: "Artisan Accessories", color: "#C8922A", accent: "#FAF3E8" },
          ].map((cat) => (
            <Link key={cat.title} href="/shop" style={{ textDecoration: "none" }}>
              <div style={{
                background: cat.color, padding: "64px 32px",
                position: "relative", overflow: "hidden",
                cursor: "pointer", transition: "transform 0.3s ease",
                aspectRatio: "3/4", display: "flex", flexDirection: "column",
                justifyContent: "flex-end",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{ fontFamily: "var(--font-bebas)", fontSize: "56px", letterSpacing: "0.08em", color: cat.accent, lineHeight: 1 }}>{cat.title}</div>
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px", color: `${cat.accent}cc`, fontStyle: "italic", marginTop: "8px" }}>{cat.sub}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ARTISANS CTA ── */}
      <section style={{
        background: "#2C3E50", padding: "100px 48px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 7vw, 90px)", letterSpacing: "0.05em", color: "#FAF3E8", lineHeight: 0.95, marginBottom: "32px" }}>
            MEET OUR<br /><span style={{ color: "#C8922A" }}>ARTISANS</span>
          </h2>
          <Link href="/artisans" style={{
            fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.2em",
            border: "1px solid #C8922A", color: "#C8922A",
            padding: "16px 48px", textDecoration: "none", display: "inline-block",
            transition: "all 0.25s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#C8922A"; e.currentTarget.style.color = "#FAF3E8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C8922A"; }}
          >
            DISCOVER THEIR STORIES
          </Link>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ padding: "100px 48px", background: "#FAF3E8" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "0.06em", color: "#2C3E50", marginBottom: "16px" }}>
            JOIN THE COLLECTIVE
          </h2>
          <div style={{ display: "flex", gap: "0", maxWidth: "440px", margin: "0 auto" }}>
            <input type="email" placeholder="Your email address" style={{
              flex: 1, padding: "14px 20px",
              border: "1px solid rgba(44,62,80,0.2)", borderRight: "none",
              background: "#fff", fontFamily: "var(--font-cormorant)", fontSize: "16px",
              color: "#2C3E50", outline: "none",
            }} />
            <button style={{
              background: "#2C3E50", color: "#FAF3E8", border: "none",
              padding: "14px 24px", cursor: "pointer",
              fontFamily: "var(--font-bebas)", fontSize: "14px", letterSpacing: "0.15em",
              whiteSpace: "nowrap", transition: "background 0.2s ease",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#C8922A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2C3E50")}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
