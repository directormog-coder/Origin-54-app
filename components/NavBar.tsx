import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-[var(--cream)]/80 backdrop-blur-md border-b border-[var(--gold)]/10">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="Origin 54" width={45} height={45} className="rounded-full" />
        <span className="font-display text-2xl text-[var(--gold)]">ORIGIN 54</span>
      </Link>
      
      <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest text-[var(--charcoal)]">
        <Link href="/shop" className="hover:text-[var(--gold)] transition">SHOP</Link>
        <Link href="/artisans" className="hover:text-[var(--gold)] transition">ARTISANS</Link>
        <Link href="/about" className="hover:text-[var(--gold)] transition">OUR STORY</Link>
      </div>

      <div className="flex gap-4">
        <button className="text-[var(--charcoal)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </button>
      </div>
    </nav>
  );
}
