"use client";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] overflow-x-hidden tribal-bg">
      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--charcoal)] via-[var(--charcoal)] to-transparent opacity-90 z-0" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <Image src="/logo.png" width={180} height={180} className="mx-auto mb-10 rounded-full shadow-2xl" alt="Logo" priority />
          <h1 className="font-display text-7xl md:text-[140px] text-[var(--cream)] leading-[0.85] mb-6">BORN FROM<br/><span className="text-[var(--gold)]">AFRICA</span></h1>
          <p className="font-serif italic text-xl md:text-2xl text-[var(--cream)]/70 mb-12 max-w-2xl mx-auto">Luxury fashion rooted in heritage and craft.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-gold px-12 py-4">SHOP COLLECTION</Link>
            <Link href="/artisans" className="border border-[var(--cream)]/30 text-[var(--cream)] px-12 py-4 font-display tracking-widest text-sm hover:border-[var(--gold)]">OUR STORY</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
