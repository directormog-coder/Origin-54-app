import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Origin 54",
};

export default function RegisterPage() {
  const nameFields = ["First Name", "Last Name"];
  const otherFields = [
    { label: "Email Address", type: "email", placeholder: "your@email.com" },
    { label: "Password", type: "password", placeholder: "Min. 8 characters" },
    { label: "Confirm Password", type: "password", placeholder: "Repeat password" },
  ];

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid rgba(44,62,80,0.2)",
    background: "#fff",
    fontFamily: "var(--font-cormorant)",
    fontSize: "16px",
    color: "#2C3E50",
    outline: "none",
  };

  const labelStyle = {
    fontFamily: "var(--font-cormorant)",
    fontSize: "13px",
    letterSpacing: "0.15em",
    color: "#2C3E50",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: "8px",
  };

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "40px", letterSpacing: "0.08em", color: "#2C3E50", marginBottom: "8px" }}>
        JOIN THE COLLECTIVE
      </h1>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px", fontStyle: "italic", color: "rgba(44,62,80,0.6)", marginBottom: "40px" }}>
        Create your Origin 54 account
      </p>
      
      <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {nameFields.map((label) => (
            <div key={label}>
              <label style={labelStyle}>{label}</label>
              <input type="text" style={inputStyle} required />
            </div>
          ))}
        </div>

        {otherFields.map((field) => (
          <div key={field.label}>
            <label style={labelStyle}>{field.label}</label>
            <input type={field.type} placeholder={field.placeholder} style={inputStyle} required />
          </div>
        ))}

        <button type="submit" style={{ fontFamily: "var(--font-bebas)", fontSize: "16px", letterSpacing: "0.2em", background: "#C8922A", color: "#FAF3E8", border: "none", padding: "16px", cursor: "pointer", marginTop: "8px" }}>
          CREATE ACCOUNT
        </button>
      </form>

      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px", color: "rgba(44,62,80,0.6)", textAlign: "center", marginTop: "32px" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#C8922A", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
      </p>
    </div>
  );
}
