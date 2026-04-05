"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Check if user is admin (you can adjust this logic)
      if (email.includes("admin")) {
        localStorage.setItem("isAdmin", "true");
      }
      
      router.push("/shop"); // Redirect to shop or dashboard
      
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid rgba(44,62,80,0.2)",
    background: "#fff",
    fontFamily: "var(--font-cormorant)",
    fontSize: "16px",
    color: "#2C3E50",
    outline: "none",
    marginBottom: "20px"
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
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
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

      {error && <p style={{ color: "#B85C2C", fontSize: "14px", marginBottom: "20px", fontFamily: "var(--font-cormorant)" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <label style={labelStyle}>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            fontFamily: "var(--font-bebas)",
            fontSize: "16px",
            letterSpacing: "0.2em",
            background: "#2C3E50",
            color: "#FAF3E8",
            border: "none",
            padding: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "background 0.2s ease",
          }}
        >
          {loading ? "AUTHENTICATING..." : "SIGN IN"}
        </button>
      </form>

      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "16px",
        color: "rgba(44,62,80,0.6)",
        textAlign: "center",
        marginTop: "32px",
      }}>
        New to Origin 54?{" "}
        <Link href="/register" style={{ color: "#C8922A", textDecoration: "none", fontWeight: 600 }}>
          Create an account
        </Link>
      </p>
    </div>
  );
}
