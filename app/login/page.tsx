'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  // Step 1: Request 6-digit OTP code to email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setStep("otp");
      setMessage("A 6-digit secure access code has been sent to your email.");
    }

    setLoading(false);
  };

  // Step 2: Verify OTP code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otpToken,
      type: "email",
    });

    if (error) {
      setMessage(error.message);
    } else {
      // Check if user is director
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", data.user?.id)
        .single();

      if (profile?.is_admin) {
        router.push("/admin");
      } else {
        router.push("/account");
      }
      router.refresh();
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
          {step === "email"
            ? "Enter your director email for passwordless verification"
            : "Enter the 6-digit access code sent to your inbox"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-stone-900 py-8 px-4 shadow-2xl border border-stone-800 sm:rounded-xl sm:px-10">
          {step === "email" ? (
            <form className="space-y-5" onSubmit={handleSendOtp}>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-300 font-medium">
                  Authorized Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="director.origin54@gmail.com"
                    className="appearance-none block w-full px-3 py-2 border border-stone-700 rounded-md shadow-sm placeholder-stone-500 bg-stone-950 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  />
                </div>
              </div>

              {message && (
                <p className="text-xs text-amber-400 text-center font-mono">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-xs uppercase tracking-widest font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                {loading ? "Sending Passcode..." : "Send Secure Passcode"}
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-300 font-medium">
                  6-Digit Verification Code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpToken}
                    onChange={(e) => setOtpToken(e.target.value)}
                    placeholder="123456"
                    className="appearance-none block w-full px-3 py-2 border border-stone-700 rounded-md shadow-sm placeholder-stone-500 bg-stone-950 text-white font-mono text-center tracking-widest text-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              {message && (
                <p className="text-xs text-amber-400 text-center font-mono">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-xs uppercase tracking-widest font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                {loading ? "Verifying..." : "Verify & Access Platform"}
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full text-xs text-stone-500 hover:text-stone-300 text-center mt-2 transition-colors"
              >
                &larr; Re-enter email address
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-stone-500 hover:text-stone-300 block transition-colors"
            >
              &larr; Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
