import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password | Origin 54",
}

export default function ResetPasswordPage() {
  return (
    <div>
      <h1 style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "40px",
        letterSpacing: "0.08em",
        color: "#2C3E50",
        marginBottom: "8px",
      }}>
        NEW PASSWORD
      </h1>
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "17px",
        fontStyle: "italic",
        color: "rgba(44,62,80,0.6)",
        marginBottom: "40px",
      }}>
        Choose a strong new password for your account
      </p>

      <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {["New Password", "Confirm New Password"].map((label) => (
          <div key={label}>
            <label style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "13px",
              letterSpacing: "0.15em",
              color: "#2C3E50",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
            }}>
              {label}
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
              }}
            />
          </div>
        ))}

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
          }}
        >
          UPDATE PASSWORD
        </button>
      </form>
    </div>
  )
}

