"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "../../../lib/supabase"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      setSent(true)
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.")
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "24px" }}>📬</div>
      <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "32px", letterSpacing: "0.08em", color: "#2C3E50", marginBottom: "16px" }}>EMAIL SENT</h2>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px", fontStyle: "italic", color: "rgba(44,62,80,0.6)", lineHeight: 1.7, marginBottom: "32px" }}>
        Check your inbox at <strong>{email}</strong> for the password reset link.
      </p>
      <Link href="/login" style={{ fontFamily: "var(--font-bebas)", fontSize: "14px", letterSpacing: "0.2em", color: "#C8922A", textDecoration: "none" }}>
        ← Back to Sign In
      </Link>
    </div>
  )

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "40px", letterSpacing: "0.08em", color: "#2C3E50", marginBottom: "8px" }}>
        RESET PASSWORD
      </h1>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px", fontStyle: "italic", color: "rgba(44,62,80,0.6)", marginBottom: "40px" }}>
        Enter your email and we'll send you a reset link
      </p>

      {error && (
        <div style={{ background: "rgba(184,92,44,0.08)", border: "1px solid rgba(184,92,44,0.3)", padding: "12px 16px", marginBottom: "20px", fontFamily: "var(--font-cormorant)", fontSize: "15px", color: "#B85C2C" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px", letterSpacing: "0.15em", color: "#2C3E50", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
            Email Address
          </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
            style={{ width: "100%", padding: "14px 16px", border: "1px solid rgba(44,62,80,0.2)", background: "#fff", fontFamily: "var(--font-cormorant)", fontSize: "16px", color: "#2C3E50", outline: "none" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C8922A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(44,62,80,0.2)")} required />
        </div>

        <button type="submit" disabled={loading} style={{ fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.2em", background: loading ? "rgba(200,146,42,0.5)" : "#C8922A", color: "#FAF3E8", border: "none", padding: "16px", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "SENDING..." : "SEND RESET LINK"}
        </button>
      </form>

      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px", color: "rgba(44,62,80,0.6)", textAlign: "center", marginTop: "32px" }}>
        <Link href="/login" style={{ color: "#C8922A", textDecoration: "none" }}>← Back to Sign In</Link>
      </p>
    </div>
  )
}
