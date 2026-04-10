"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/store";
import { ShoppingBag, X, Plus, Minus, Menu, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 w-full z-[60] flex items-center justify-between px-6 md:px-12 py-4 bg-[var(--cream)]/90 backdrop-blur-md border-b border-[var(--gold)]/10">
        <button className="md:hidden text-[var(--charcoal)]" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
        </button>

        <Link href="/" className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <Image src="/logo.png" alt="Origin 54" width={42} height={42} className="rounded-full border border-[var(--gold)]/20" />
          <div className="hidden sm:block leading-none">
            <span className="font-display text-xl text-[var(--charcoal)] block uppercase">Origin 54</span>
            <span className="font-serif text-[7px] tracking-widest text-[var(--gold)] uppercase italic">The Asili Collective</span>
          </div>
        </Link>
        
        <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.2em] text-[var(--charcoal)] uppercase">
          <Link href="/shop" className="hover:text-[var(--gold)]">Shop</Link>
          <Link href="/artisans" className="hover:text-[var(--gold)]">Artisans</Link>
          <Link href="/about" className="hover:text-[var(--gold)]">Our Story</Link>
        </div>

        <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-[var(--charcoal)]">
          <ShoppingBag size={22} strokeWidth={1.5} />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-[var(--gold)] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </button>
      </nav>

      {/* Cart Drawer & Mobile Menu code remains same as previous comprehensive shared file */}
    </>
  );
}
