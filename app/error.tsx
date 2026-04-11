"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--cream)] flex items-center justify-center pt-20 tribal-bg">
      <div className="max-w-2xl w-full mx-auto px-6 text-center">
        <div className="mb-8">
          <Image 
            src="/logo.png" 
            alt="Origin 54" 
            width={100} 
            height={100} 
            className="mx-auto opacity-50" 
            sizes="100px"
          />
        </div>
        
        <h1 className="font-display text-5xl md:text-6xl text-[var(--charcoal)] mb-4 uppercase">
          Something Went Wrong
        </h1>
        
        <p className="font-serif text-lg text-[var(--charcoal)]/70 italic mb-8 max-w-md mx-auto">
          We apologize for the inconvenience. Please try again or return to the homepage.
        </p>

        {error.message && (
          <p className="font-mono text-xs text-[var(--charcoal)]/40 mb-8 bg-[var(--charcoal)]/5 p-4 rounded">
            {error.message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="btn-gold px-10 py-4 font-display tracking-widest text-sm"
          >
            TRY AGAIN
          </button>
          <Link 
            href="/" 
            className="px-10 py-4 border border-[var(--gold)] text-[var(--gold)] font-display tracking-widest text-sm hover:bg-[var(--gold)] hover:text-white transition-all"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </main>
  );
}
