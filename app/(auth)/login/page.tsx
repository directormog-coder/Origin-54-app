"use client"

import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In | Origin 54",
}

export default function LoginPage() {
  return (
    <div>
      <h1 style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "40px",
        letterSpacing: "0.08em",
        color: "#2C3E50",
        marginBottom: "8px",
      }}>
        WELCOME BACK
      </h1>
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "17px",
        fontStyle: "italic",
        color: "rgba(44,62,80,0.6)",
        marginBottom: "40px",
      }}>
        Sign in to your Origin 54 account
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
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C8922A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(44,62,80,0.2)")}
          />
        </div>

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
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "1px solid rgba(44,62,80,0.2)",
              background: "#fff",
              fontFamily: "var(--font-cormorant)",
              fontSize: "16px",
              color: "#2C3E50",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C8922A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(44,62,80,0.2)")}
          />
          <div style={{ textAlign: "right", marginTop: "8px" }}>
            <Link href="/forgot-password" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "14px",
              color: "#C8922A",
              textDecoration: "none",
            }}>
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "16px",
            letterSpacing: "0.2em",
            background: "#2C3E50",
            color: "#FAF3E8",
            border: "none",
            padding: "16px",
            cursor: "pointer",
            marginTop: "8px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#C8922A")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2C3E50")}
        >
          SIGN IN
        </button>
      </form>

      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "16px",
        color: "rgba(44,62,80,0.6)",
        textAlign: "center",
        marginTop: "32px",
      }}>
        Don't have an account?{" "}
        <Link href="/register" style={{ color: "#C8922A", textDecoration: "none", fontWeight: 600 }}>
          Create one
        </Link>
      </p>
    </div>
  )
}


