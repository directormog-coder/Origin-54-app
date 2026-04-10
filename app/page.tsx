"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--cream)]">
      
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden tribal-bg">
        {/* Decorative Radial Gradient for Luxury Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--charcoal)] via-[var(--charcoal)] to-[var(--terracotta)] opacity-95" />
        
        {/* Subtle Gold Flare */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[var(--gold)] opacity-10 blur-[150px] rounded-full" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            {/* Branding Tagline */}
            <div className="flex items-center gap-4 mb-8 animate-fade-in">
              <div className="w-12 h-[1px] bg-[var(--gold)]" />
              <span className="font-serif text-[var(--gold)] tracking-[0.3em] text-xs uppercase font-semibold">
                The Asili Collective
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-7xl md:text-[140px] leading-[0.85] text-[var(--cream)] mb-8 tracking-tight">
              BORN<br />
              <span className="text-[var(--gold)]">FROM</span><br />
              AFRICA
            </h1>

            {/* Description */}
            <p className="font-serif text-xl md:text-2xl text-[var(--cream)]/70 italic max-w-lg mb-12 leading-relaxed">
              "Luxury fashion rooted in the heritage, craft, and bold spirit of Africa’s 54 nations."
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/shop" className="btn-gold text-center text-sm tracking-[0.2em] font-display py-5 px-10">
                EXPLORE COLLECTION
              </Link>
              <Link href="/about" className="border border-[var(--cream)]/30 text-[var(--cream)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all py-5 px-10 text-center font-display tracking-[0.2em] text-sm">
                OUR STORY
              </Link>
            </div>
          </div>
        </div>

        {/* Vertical Scroll Indicator */}
        <div className="absolute bottom-10 left-12 hidden md:block">
          <div className="w-[1px] h-24 bg-gradient-to-b from-[var(--gold)] to-transparent opacity-50" />
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "WOMEN", sub: "Luxury Womenswear", color: "var(--terracotta)", accent: "var(--cream)" },
            { title: "MEN", sub: "Elevated Menswear", color: "var(--charcoal)", accent: "var(--gold)" },
            { title: "ACCESSORIES", sub: "Artisan Craft", color: "var(--gold)", accent: "var(--cream)" },
          ].map((cat) => (
            <Link key={cat.title} href="/shop" className="group relative aspect-[3/4] overflow-hidden">
              <div 
                style={{ backgroundColor: cat.color }} 
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" 
              />
              {/* Subtle pattern overlay for the cards */}
              <div className="absolute inset-0 opacity-10 tribal-bg" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <h2 className="font-display text-5xl md:text-6xl leading-none transition-colors" style={{ color: cat.accent }}>
                  {cat.title}
                </h2>
                <p className="font-serif italic text-lg opacity-80 mt-2" style={{ color: cat.accent }}>
                  {cat.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ARTISANS CTA ── */}
      <section className="bg-[var(--charcoal)] py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 tribal-bg" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display text-6xl md:text-8xl text-[var(--cream)] mb-8 leading-none">
            MEET OUR <span className="text-[var(--gold)]">ARTISANS</span>
          </h2>
          <p className="font-serif text-[var(--cream)]/60 text-xl mb-12 max-w-2xl mx-auto italic">
            Go behind the scenes and discover the master crafters preserving centuries-old African techniques.
          </p>
          <Link href="/artisans" className="inline-block border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white transition-all px-12 py-4 font-display tracking-widest text-sm">
            DISCOVER THEIR STORIES
          </Link>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-24 px-6 bg-[var(--cream)]">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-display text-4xl text-[var(--charcoal)] mb-4 tracking-wider">
            JOIN THE COLLECTIVE
          </h3>
          <p className="font-serif italic text-[var(--charcoal)]/70 mb-8">
            Be the first to know about new heritage drops and artisan stories.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 border border-[var(--charcoal)]/10 shadow-sm">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 bg-white font-serif outline-none text-[var(--charcoal)]"
            />
            <button className="bg-[var(--charcoal)] text-[var(--cream)] px-10 py-4 font-display tracking-widest hover:bg-[var(--gold)] transition-colors">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
