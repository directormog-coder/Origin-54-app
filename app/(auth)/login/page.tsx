"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Using the direct relative path to ensure Vercel finds the file
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

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "42px", color: "#2C3E50" }}>WELCOME BACK</h1>
      <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#C8922A", marginBottom: "30px" }}>The Asili Collective</p>
      
      {error && <p style={{ color: "#B85C2C", marginBottom: "20px" }}>{error}</p>}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: "14px", border: "1px solid rgba(44,62,80,0.2)", outline: "none" }} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: "14px", border: "1px solid rgba(44,62,80,0.2)", outline: "none" }} 
          required 
        />
        <button 
          type="submit" 
          disabled={loading} 
          style={{ background: "#2C3E50", color: "#FAF3E8", padding: "16px", border: "none", fontFamily: "var(--font-bebas)", cursor: "pointer", letterSpacing: "0.1em" }}
        >
          {loading ? "VERIFYING..." : "SIGN IN"}
        </button>
      </form>
    </div>
  );
}
