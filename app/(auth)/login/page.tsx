"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// This relative path bypasses the @/ alias error
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
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "40px" }}>
      <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "40px", color: "#2C3E50" }}>WELCOME BACK</h1>
      <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", marginBottom: "30px" }}>Sign in to Origin 54</p>
      
      {error && <p style={{ color: "#B85C2C", fontFamily: "var(--font-cormorant)" }}>{error}</p>}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: "14px", border: "1px solid #ccc" }} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: "14px", border: "1px solid #ccc" }} 
          required 
        />
        <button 
          type="submit" 
          disabled={loading} 
          style={{ background: "#2C3E50", color: "#fff", padding: "16px", border: "none", fontFamily: "var(--font-bebas)", cursor: "pointer" }}
        >
          {loading ? "AUTHENTICATING..." : "SIGN IN"}
        </button>
      </form>
    </div>
  );
}
