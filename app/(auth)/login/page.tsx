"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Fixed relative path import
import { supabase } from "../../../lib/supabase";

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
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/"); 
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", padding: "14px 16px", border: "1px solid rgba(44,62,80,0.2)", background: "#fff", fontFamily: "var(--font-cormorant)", fontSize: "16px", color: "#2C3E50", outline: "none", marginBottom: "20px" };

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "40px", letterSpacing: "0.08em", color: "#2C3E50", marginBottom: "8px" }}>WELCOME BACK</h1>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px", fontStyle: "italic", color: "rgba(44,62,80,0.6)", marginBottom: "40px" }}>Sign in to Origin 54</p>
      {error && <p style={{ color: "#B85C2C", marginBottom: "20px" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label style={{ display: "block", marginBottom: "8px", fontFamily: "var(--font-cormorant)", fontSize: "13px", textTransform: "uppercase" }}>Email Address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
        <label style={{ display: "block", marginBottom: "8px", fontFamily: "var(--font-cormorant)", fontSize: "13px", textTransform: "uppercase" }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
        <button type="submit" disabled={loading} style={{ width: "100%", background: "#2C3E50", color: "#FAF3E8", padding: "16px", border: "none", fontFamily: "var(--font-bebas)", cursor: "pointer", letterSpacing: "0.2em" }}>
          {loading ? "AUTHENTICATING..." : "SIGN IN"}
        </button>
      </form>
    </div>
  );
}
