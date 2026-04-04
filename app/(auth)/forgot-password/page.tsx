"use client"

import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password | Origin 54",
}

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "40px",
        letterSpacing: "0.08em",
        color: "#2C3E50",
        marginBottom: "8px",
      }}>
        RESET PASSWORD
      </h1>
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "17px",
        fontStyle: "italic",
        color: "rgba(44,62,80,0.6)",
        marginBottom: "40px",
      }}>
        Enter your email and we'll send you a reset link
      </p>

      <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "13px",
            letterSpacing: "0.15em",
            color: "#2C3E50",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "8px",
          }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "1px solid rgba(44,62,80,0.2)",
              background: "#fff",
              fontFamily: "var(--font-cormorant)",
              fontSize: "16px",
              color: "#2C3E50",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "16px",
            letterSpacing: "0.2em",
            background: "#C8922A",
            color: "#FAF3E8",
            border: "none",
            padding: "16px",
            cursor: "pointer",
          }}
        >
          SEND RESET LINK
        </button>
      </form>

      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "16px",
        color: "rgba(44,62,80,0.6)",
        textAlign: "center",
        marginTop: "32px",
      }}>
        <Link href="/login" style={{ color: "#C8922A", textDecoration: "none" }}>
          ← Back to Sign In
        </Link>
      </p>
    </div>
  )
}


