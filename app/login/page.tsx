'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Account created successfully! Check your email to confirm.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        router.push("/account");
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
          The Asili Collective
        </span>
        <h2 className="mt-2 text-3xl font-serif font-extrabold tracking-tight text-white">
          ORIGIN 54
        </h2>
        <p className="mt-2 text-sm text-stone-400">
          {isSignUp ? "Create your collector profile" : "Sign in to your collector account"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-stone-900 py-8 px-4 shadow-2xl border border-stone-800 sm:rounded-xl sm:px-10">
          <form className="space-y-5" onSubmit={handleAuth}>
            {isSignUp && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-300 font-medium">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Kofi Mensah"
                    className="appearance-none block w-full px-3 py-2 border border-stone-700 rounded-md shadow-sm placeholder-stone-500 bg-stone-950 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-300 font-medium">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="collector@origin54.com"
                  className="appearance-none block w-full px-3 py-2 border border-stone-700 rounded-md shadow-sm placeholder-stone-500 bg-stone-950 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-300 font-medium">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="appearance-none block w-full px-3 py-2 border border-stone-700 rounded-md shadow-sm placeholder-stone-500 bg-stone-950 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
            </div>

            {message && (
              <p className="text-xs text-amber-400 text-center font-mono">{message}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-xs uppercase tracking-widest font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center space-y-2">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage("");
              }}
              className="text-xs text-stone-400 hover:text-amber-400 block w-full transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Need an account? Join the Collective"}
            </button>
            
            <Link
              href="/"
              className="text-xs text-stone-500 hover:text-stone-300 block transition-colors mt-2"
            >
              &larr; Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
