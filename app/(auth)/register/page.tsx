"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "../../../lib/supabase"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName, last_name: lastName } },
      })
      if (error) throw error
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px",
    border: "1px solid rgba(44,62,80,0.2)",
    background: "#fff", fontFamily: "var(--font-cormorant)",
    fontSize: "16px", color: "#2C3E50", outline: "none",
    transition: "border-color 0.2s ease",
  }

  if (success) return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "24px" }}>✉️</div>
      <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "32px", letterSpacing: "0.08em", color: "#2C3E50", marginBottom: "16px" }}>CHECK YOUR EMAIL</h2>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px", fontStyle: "italic", color: "rgba(44,62,80,0.6)", lineHeight: 1.7 }}>
        We've sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
      </p>
    </div>
  )

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "40px", letterSpacing: "0.08em", color: "#2C3E50", marginBottom: "8px" }}>
        JOIN THE COLLECTIVE
      </h1>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px", fontStyle: "italic", color: "rgba(44,62,80,0.6)", marginBottom: "40px" }}>
        Create your Origin 54 account
      </p>

      {error && (
        <div style={{ background: "rgba(184,92,44,0.08)", border: "1px solid rgba(184,92,44,0.3)", padding: "12px 16px", marginBottom: "20px", fontFamily: "var(--font-cormorant)", fontSize: "15px", color: "#B85C2C" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { label: "First Name", value: firstName, setter: setFirstName },
            { label: "Last Name", value: lastName, setter: setLastName },
          ].map(({ label, value, setter }) => (
            <div key={label}>
              <label style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px", letterSpacing: "0.15em", color: "#2C3E50", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>{label}</label>
              <input type="text" value={value} onChange={(e) => setter(e.target.value)} style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#C8922A")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(44,62,80,0.2)")} required />
            </div>
          ))}
        </div>

        <div>
          <label style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px", letterSpacing: "0.15em", color: "#2C3E50", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C8922A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(44,62,80,0.2)")} required />
        </div>

        <div>
          <label style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px", letterSpacing: "0.15em", color: "#2C3E50", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C8922A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(44,62,80,0.2)")} required minLength={8} />
        </div>

        <button type="submit" disabled={loading} style={{ fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.2em", background: loading ? "rgba(200,146,42,0.5)" : "#C8922A", color: "#FAF3E8", border: "none", padding: "16px", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s ease" }}>
          {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
        </button>
      </form>

      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px", color: "rgba(44,62,80,0.6)", textAlign: "center", marginTop: "32px" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#C8922A", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
      </p>
    </div>
  )
}
