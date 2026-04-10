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

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "customer@origin54.com", amount: subtotal, metadata: { cartItems: cart } }),
    });
    const data = await res.json();
    if (data.authorization_url) window.location.href = data.authorization_url;
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[60] flex items-center justify-between px-6 md:px-12 py-4 bg-[var(--cream)]/90 backdrop-blur-md border-b border-[var(--gold)]/10">
        <button className="md:hidden text-[var(--charcoal)]" onClick={() => setIsMenuOpen(true)}><Menu size={24} /></button>

        <Link href="/" className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <Image src="/logo.png" alt="Origin 54" width={42} height={42} className="rounded-full border border-[var(--gold)]/20" />
          <div className="hidden sm:block">
            <span className="font-display text-xl text-[var(--charcoal)] leading-none block uppercase">Origin 54</span>
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
          {itemCount > 0 && <span className="absolute top-0 right-0 bg-[var(--gold)] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{itemCount}</span>}
        </button>
      </nav>

      {/* Mobile Menu */}
      <aside className={`fixed inset-0 z-[100] bg-[var(--cream)] p-8 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6"><X size={32} /></button>
        <div className="flex flex-col gap-8 mt-20 font-display text-5xl">
          <Link href="/shop" onClick={() => setIsMenuOpen(false)}>SHOP</Link>
          <Link href="/artisans" onClick={() => setIsMenuOpen(false)}>ARTISANS</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>OUR STORY</Link>
        </div>
      </aside>

      {/* Cart Drawer */}
      <aside className={`fixed top-0 right-0 z-[70] h-screen w-full max-w-md bg-[var(--cream)] shadow-2xl transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-10 border-b border-[var(--gold)]/20 pb-4">
            <h2 className="font-display text-3xl">BAG ({itemCount})</h2>
            <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 aspect-[3/4] relative bg-[var(--cream-dark)] shadow-sm"><Image src={item.image} fill className="object-cover" alt={item.name} /></div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div><p className="font-display text-lg uppercase leading-none">{item.name}</p><p className="font-serif text-[var(--gold)]">${item.price}</p></div>
                  <div className="flex items-center gap-4 text-xs"><button onClick={() => removeFromCart(item.id)}><Minus size={14}/></button><span>{item.quantity}</span><button onClick={() => addToCart(item)}><Plus size={14}/></button></div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-[var(--gold)]/20">
            <div className="flex justify-between mb-6"><span className="font-serif italic text-lg opacity-60">Subtotal</span><span className="font-display text-2xl">${subtotal.toFixed(2)}</span></div>
            <button onClick={handleCheckout} className="btn-gold w-full py-5 font-display tracking-[0.2em]">CHECKOUT <ArrowRight size={18} className="ml-2" /></button>
          </div>
        </div>
      </aside>
    </>
  );
}
