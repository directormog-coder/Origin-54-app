'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .single();

        if (profile?.is_admin) {
          setIsAdmin(true);
        }
      }
    }
    getUser();
  }, [supabase]);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6F0] border-b border-[#D99B26]/30 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border-2 border-[#D99B26] flex items-center justify-center bg-[#FAF6F0] shadow-inner">
            <span className="font-serif font-bold text-base text-[#D99B26]">54</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-xl tracking-tight text-[#1C242B]">
              ORIGIN 54
            </span>
            <span className="font-serif italic text-xs text-[#C85A32] tracking-wide -mt-1">
              The Asili Collective
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-[#1C242B]">
          <Link href="/#catalog" className="hover:text-[#C85A32] transition-colors">
            Vault Collection
          </Link>
          <Link href="/artisans" className="hover:text-[#C85A32] transition-colors">
            Artisans & Guilds
          </Link>
          <Link href="/about" className="hover:text-[#C85A32] transition-colors">
            Our Heritage
          </Link>
        </nav>

        {/* User Account / Admin / Profile Controls */}
        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Link
              href="/admin"
              className="px-3 py-1.5 bg-[#C85A32] text-white text-xs uppercase tracking-wider font-bold rounded shadow hover:bg-[#B84A22] transition-colors"
            >
              Director Portal
            </Link>
          )}

          {user ? (
            <Link
              href="/account"
              className="px-3 py-1.5 border border-[#D99B26] text-[#1C242B] text-xs uppercase tracking-wider font-bold rounded hover:bg-[#D99B26]/10 transition-colors"
            >
              My Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-[#D99B26] text-[#1C242B] text-xs uppercase tracking-wider font-bold rounded shadow hover:bg-[#c38a1e] transition-colors"
            >
              Sign In / Profile
            </Link>
          )}

          <Link
            href="/cart"
            className="p-2 text-[#1C242B] hover:text-[#C85A32] transition-colors relative"
            aria-label="Shopping Bag"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </Link>
        </div>

      </div>
    </header>
  );
}
