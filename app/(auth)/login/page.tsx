"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "../../../lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push("/shop")
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid rgba(44,62,80,0.2)",
    background: "#fff",
    fontFamily: "var(--font-cormorant)",
    fontSize: "16px",
    color: "#2C3E50",
    outline: "none",
    transition: "border-color 0.2s ease",
  }

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

      {error && (
        <div style={{
          background: "rgba(184,92,44,0.08)",
          border: "1px solid rgba(184,92,44,0.3)",
          padding: "12px 16px",
          marginBottom: "20px",
          fontFamily: "var(--font-cormorant)",
          fontSize: "15px",
          color: "#B85C2C",
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "13px",
            letterSpacing: "0.15em",
            color: "#2C3E50",
            textTransform: "uppercase" as const,
            display: "block",
            marginBottom: "8px",
          }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C8922A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(44,62,80,0.2)")}
            required
          />
        </div>

        <div>
          <label style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "13px",
            letterSpacing: "0.15em",
            color: "#2C3E50",
            textTransform: "uppercase" as const,
            display: "block",
            marginBottom: "8px",
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C8922A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(44,62,80,0.2)")}
            required
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
          disabled={loading}
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "16px",
            letterSpacing: "0.2em",
            background: loading ? "rgba(44,62,80,0.5)" : "#2C3E50",
            color: "#FAF3E8",
            border: "none",
            padding: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "8px",
            transition: "background 0.2s ease",
          }}
        >
          {loading ? "SIGNING IN..." : "SIGN IN"}
        </button>
      </form>

      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "16px",
        color: "rgba(44,62,80,0.6)",
        textAlign: "center",
        marginTop: "32px",
      }}>
        New to the collective?{" "}
        <Link href="/register" style={{ color: "#C8922A", textDecoration: "none", fontWeight: 600 }}>
          Create account
        </Link>
      </p>
    </div>
  )
}
