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
    <main className="min-h-[80vh] bg-[#FAF6F0] text-[#1C242B] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#D99B26] mx-auto flex items-center justify-center bg-[#FAF6F0] mb-3 shadow-inner">
          <span className="font-serif font-bold text-xl text-[#D99B26]">54</span>
        </div>
        <h2 className="text-3xl font-serif font-black tracking-tight text-[#1C242B]">
          ORIGIN 54
        </h2>
        <p className="font-serif italic text-sm text-[#C85A32] mt-0.5">
          The Asili Collective
        </p>
        <p className="mt-4 text-xs text-[#1C242B]/70 font-sans">
          {step === "email"
            ? "Enter your email for passwordless secure authentication"
            : "Enter the 6-digit access code sent to your inbox"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-[#D99B26]/30 sm:rounded-2xl sm:px-10">
          {step === "email" ? (
            <form className="space-y-5" onSubmit={handleSendOtp}>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#1C242B] font-semibold">
                  Authorized Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="director.origin54@gmail.com"
                    className="appearance-none block w-full px-3 py-2.5 border border-[#D99B26]/40 rounded-lg shadow-sm placeholder-[#1C242B]/40 bg-[#FAF6F0] text-[#1C242B] focus:outline-none focus:ring-2 focus:ring-[#C85A32] sm:text-sm"
                  />
                </div>
              </div>

              {message && (
                <p className="text-xs text-[#C85A32] text-center font-mono font-semibold">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow text-xs uppercase tracking-widest font-bold text-white bg-[#C85A32] hover:bg-[#B84A22] focus:outline-none transition-colors"
              >
                {loading ? "Sending Passcode..." : "Send Secure Passcode"}
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#1C242B] font-semibold">
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
                    className="appearance-none block w-full px-3 py-2.5 border border-[#D99B26]/40 rounded-lg shadow-sm bg-[#FAF6F0] text-[#1C242B] font-mono text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                  />
                </div>
              </div>

              {message && (
                <p className="text-xs text-[#C85A32] text-center font-mono font-semibold">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow text-xs uppercase tracking-widest font-bold text-white bg-[#C85A32] hover:bg-[#B84A22] focus:outline-none transition-colors"
              >
                {loading ? "Verifying..." : "Verify & Access Platform"}
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full text-xs text-[#1C242B]/60 hover:text-[#C85A32] text-center mt-2 transition-colors"
              >
                &larr; Re-enter email address
              </button>
            </form>
          )}

          <div className="mt-6 text-center border-t border-[#FAF6F0] pt-4">
            <Link
              href="/"
              className="text-xs text-[#1C242B]/60 hover:text-[#C85A32] block transition-colors"
            >
              &larr; Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
