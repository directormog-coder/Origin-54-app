import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-[var(--cream)] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="font-display text-2xl uppercase tracking-widest">Origin 54</h3>
          <p className="font-serif text-sm text-[var(--cream)]/60 italic">
            The Asili Collective — Bridging ancient African craftsmanship with modern luxury.
          </p>
        </div>
        
        <div>
          <h4 className="font-display text-xs tracking-widest uppercase mb-4 text-[var(--gold)]">Shop</h4>
          <ul className="space-y-2 font-serif text-sm">
            <li><Link href="/shop?category=WOMEN" className="hover:text-[var(--gold)] transition-colors">Women</Link></li>
            <li><Link href="/shop?category=MEN" className="hover:text-[var(--gold)] transition-colors">Men</Link></li>
            <li><Link href="/shop?category=CHILDREN" className="hover:text-[var(--gold)] transition-colors">Children</Link></li>
            <li><Link href="/shop?category=ACCESSORIES" className="hover:text-[var(--gold)] transition-colors">Accessories</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-display text-xs tracking-widest uppercase mb-4 text-[var(--gold)]">Company</h4>
          <ul className="space-y-2 font-serif text-sm">
            <li><Link href="/about" className="hover:text-[var(--gold)] transition-colors">Our Story</Link></li>
            <li><Link href="/artisans" className="hover:text-[var(--gold)] transition-colors">Artisans</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-display text-xs tracking-widest uppercase mb-4 text-[var(--gold)]">Connect</h4>
          <p className="font-serif text-sm text-[var(--cream)]/60">hello@origin54.com</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[var(--gold)]/10 text-center">
        <p className="font-serif text-xs text-[var(--cream)]/40">
          © 2026 Origin 54. The Asili Collective. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

