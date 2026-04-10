"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/store";
import { ShoppingBag, X, Plus, Minus } from "lucide-react";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  // Calculate totals
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* ── MAIN NAVIGATION BAR ── */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[var(--cream)]/80 backdrop-blur-md border-b border-[var(--gold)]/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 overflow-hidden rounded-full border border-[var(--gold)]/20 transition-transform group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Origin 54" 
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl text-[var(--charcoal)] leading-none">ORIGIN 54</span>
            <span className="font-serif text-[8px] tracking-[0.2em] text-[var(--gold)] uppercase italic">The Asili Collective</span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.25em] text-[var(--charcoal)] uppercase">
          <Link href="/shop" className="hover:text-[var(--gold)] transition-colors">Shop</Link>
          <Link href="/artisans" className="hover:text-[var(--gold)] transition-colors">Artisans</Link>
          <Link href="/about" className="hover:text-[var(--gold)] transition-colors">Our Story</Link>
        </div>

        {/* Cart Trigger */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-[var(--gold)] text-[var(--cream)] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-fade-in">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ── CART DRAWER OVERLAY ── */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-[var(--charcoal)]/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* ── CART DRAWER SIDEBAR ── */}
      <aside className={`fixed top-0 right-0 z-[101] h-screen w-full max-w-md bg-[var(--cream)] shadow-2xl transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-8 border-b border-[var(--gold)]/10">
            <h2 className="font-display text-3xl text-[var(--charcoal)] tracking-tight">YOUR BAG</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-[var(--charcoal)] hover:rotate-90 transition-transform">
              <X size={24} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="font-serif italic text-[var(--charcoal)]/50 text-lg mb-6">Your bag is empty.</p>
                <Link 
                  href="/shop" 
                  onClick={() => setIsCartOpen(false)}
                  className="text-[var(--gold)] font-display tracking-widest border-b border-[var(--gold)] pb-1"
                >
                  START SHOPPING
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-24 aspect-[3/4] bg-[var(--cream-dark)] flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <h3 className="font-display text-lg text-[var(--charcoal)] uppercase tracking-tight">{item.name}</h3>
                        <p className="font-serif text-[var(--gold)]">${item.price}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-[var(--gold)]/20 px-2 py-1 gap-4">
                          <button onClick={() => removeFromCart(item.id)} className="text-[var(--charcoal)] hover:text-[var(--gold)]">
                            <Minus size={14} />
                          </button>
                          <span className="font-display text-sm">{item.quantity}</span>
                          <button onClick={() => addToCart(item)} className="text-[var(--charcoal)] hover:text-[var(--gold)]">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-8 bg-[var(--cream-dark)] space-y-4">
              <div className="flex justify-between items-end border-b border-[var(--gold)]/20 pb-4">
                <span className="font-serif italic text-[var(--charcoal)]/60">Subtotal</span>
                <span className="font-display text-2xl text-[var(--charcoal)]">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-center text-[var(--charcoal)]/40 uppercase tracking-widest">Shipping & taxes calculated at checkout</p>
              <button className="btn-gold w-full py-5 font-display tracking-[0.2em] text-sm">
                PROCEED TO CHECKOUT
              </button>
              <button 
                onClick={clearCart}
                className="w-full text-[10px] font-bold tracking-widest text-[var(--charcoal)]/40 hover:text-[var(--terracotta)] transition-colors uppercase"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
