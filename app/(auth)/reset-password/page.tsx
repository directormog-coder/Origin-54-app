"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "../../../lib/supabase"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setSuccess(true)
      setTimeout(() => router.push("/login"), 2000)
    } catch (err: any) {
      setError(err.message || "Failed to update password.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px",
    border: "1px solid rgba(44,62,80,0.2)",
    background: "#fff", fontFamily: "var(--font-cormorant)",
    fontSize: "16px", color: "#2C3E50", outline: "none",
  }

  if (success) return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "24px" }}>✅</div>
      <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "32px", letterSpacing: "0.08em", color: "#2C3E50", marginBottom: "16px" }}>PASSWORD UPDATED</h2>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px", fontStyle: "italic", color: "rgba(44,62,80,0.6)" }}>
        Redirecting you to sign in...
      </p>
    </div>
  )

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "40px", letterSpacing: "0.08em", color: "#2C3E50", marginBottom: "8px" }}>
        NEW PASSWORD
      </h1>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px", fontStyle: "italic", color: "rgba(44,62,80,0.6)", marginBottom: "40px" }}>
        Choose a strong new password for your account
      </p>

      {error && (
        <div style={{ background: "rgba(184,92,44,0.08)", border: "1px solid rgba(184,92,44,0.3)", padding: "12px 16px", marginBottom: "20px", fontFamily: "var(--font-cormorant)", fontSize: "15px", color: "#B85C2C" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {[
          { label: "New Password", value: password, setter: setPassword },
          { label: "Confirm New Password", value: confirm, setter: setConfirm },
        ].map(({ label, value, setter }) => (
          <div key={label}>
            <label style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px", letterSpacing: "0.15em", color: "#2C3E50", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>{label}</label>
            <input type="password" value={value} onChange={(e) => setter(e.target.value)} placeholder="••••••••" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#C8922A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(44,62,80,0.2)")} required minLength={8} />
          </div>
        ))}

        <button type="submit" disabled={loading} style={{ fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.2em", background: loading ? "rgba(44,62,80,0.5)" : "#2C3E50", color: "#FAF3E8", border: "none", padding: "16px", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "UPDATING..." : "UPDATE PASSWORD"}
        </button>
      </form>
    </div>
  )
}
