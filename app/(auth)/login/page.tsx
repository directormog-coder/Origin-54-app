"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase"; // Corrected path

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) router.push("/");
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "var(--font-cormorant)" }}>
      <h1 style={{ fontFamily: "var(--font-bebas)" }}>ORIGIN 54 LOGIN</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ padding: "10px" }} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ padding: "10px" }} />
        <button type="submit" style={{ background: "#2C3E50", color: "white", padding: "15px", cursor: "pointer" }}>
          {loading ? "LOADING..." : "SIGN IN"}
        </button>
      </form>
    </div>
  );
}
