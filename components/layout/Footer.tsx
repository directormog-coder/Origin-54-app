import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-[var(--cream)] pt-20 pb-10 px-6 md:px-12 border-t border-[var(--gold)]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Origin 54" width={45} height={45} className="rounded-full brightness-125" />
            <span className="font-display text-2xl tracking-wider uppercase">Origin 54</span>
          </Link>
          <p className="font-serif italic text-sm text-[var(--cream)]/60 leading-relaxed">
            Luxury fashion rooted in the heritage, craft, and bold spirit of Africa’s 54 nations.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="font-display text-[var(--gold)] mb-6 tracking-widest text-sm uppercase">Boutique</h4>
          <ul className="space-y-4 font-serif text-sm text-[var(--cream)]/60">
            <li><Link href="/shop?category=WOMEN" className="hover:text-[var(--gold)] transition">Women</Link></li>
            <li><Link href="/shop?category=MEN" className="hover:text-[var(--gold)] transition">Men</Link></li>
            <li><Link href="/shop?category=CHILDREN" className="hover:text-[var(--gold)] transition">Children</Link></li>
            <li><Link href="/shop?category=ACCESSORIES" className="hover:text-[var(--gold)] transition">Accessories</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-display text-[var(--gold)] mb-6 tracking-widest text-sm uppercase">Collective</h4>
          <ul className="space-y-4 font-serif text-sm text-[var(--cream)]/60">
            <li><Link href="/about" className="hover:text-[var(--gold)] transition">Our Story</Link></li>
            <li><Link href="/artisans" className="hover:text-[var(--gold)] transition">Meet the Artisans</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--gold)] transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-display text-[var(--gold)] mb-6 tracking-widest text-sm uppercase">Follow</h4>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[var(--gold)]"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-[var(--gold)]"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-[var(--gold)]"><Facebook size={20} /></Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[var(--cream)]/10 text-center">
        <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--cream)]/30 uppercase">
          © 2026 Origin 54 — The Asili Collective. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}


