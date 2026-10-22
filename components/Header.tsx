'use client';

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function Header() {
  const { cart, toggleCart } = useCartStore();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-serif font-black tracking-widest text-stone-100">
            ORIGIN 54
          </span>
          <span className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-mono">
            The Asili Collective
          </span>
        </Link>

        {/* Global Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-stone-300 font-medium">
          <Link href="/#regional-hubs" className="hover:text-amber-400 transition-colors">
            Craft Hubs
          </Link>
          <Link href="/#categories" className="hover:text-amber-400 transition-colors">
            Capsules
          </Link>
          <Link href="/account" className="hover:text-amber-400 transition-colors">
            Collector Account
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <Link
            href="/account"
            className="md:hidden text-stone-300 hover:text-amber-400 text-xs uppercase tracking-wider"
          >
            Account
          </Link>

          {/* Cart Trigger Button */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-stone-100 hover:text-amber-400 transition-colors flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5"
          >
            <span className="text-xs uppercase font-mono tracking-wider">Bag</span>
            <span className="flex items-center justify-center w-5 h-5 text-[11px] font-bold font-mono bg-amber-400 text-stone-950 rounded-full">
              {itemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
