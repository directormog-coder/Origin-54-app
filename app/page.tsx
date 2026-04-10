"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] overflow-x-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden tribal-bg">
        {/* Luxury Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--charcoal)] via-[var(--charcoal)] to-[var(--terracotta)] opacity-95 z-0" />
        
        {/* Subtle Gold Flare */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[var(--gold)] opacity-10 blur-[150px] rounded-full" />

        <div className="container mx-auto px-6 text-center relative z-10 animate-fade-in">
          <div className="mb-10 inline-block">
            <Image 
              src="/logo.png" 
              alt="Origin 54" 
              width={180} 
              height={180} 
              className="rounded-full shadow-2xl border-2 border-[var(--gold)]/20"
              priority
            />
          </div>

          <p className="text-[var(--gold)] font-display tracking-[0.4em] text-xs mb-4 uppercase font-semibold">
            The Asili Collective
          </p>

          <h1 className="font-display text-7xl md:text-[140px] leading-[0.85] text-[var(--cream)] mb-8 tracking-tight">
            BORN FROM <br />
            <span className="text-[var(--gold)]">AFRICA</span>
          </h1>

          <p className="font-serif text-xl md:text-2xl text-[var(--cream)]/70 italic max-w-2xl mx-auto mb-12 leading-relaxed">
            "Luxury fashion rooted in the heritage, craft, and bold spirit of Africa’s 54 nations."
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/shop" className="btn-gold px-12 py-5 text-sm tracking-[0.2em] font-display">
              EXPLORE COLLECTION
            </Link>
            <Link href="/about" className="border border-[var(--cream)]/30 text-[var(--cream)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all py-5 px-12 font-display tracking-[0.2em] text-sm">
              OUR STORY
            </Link>
          </div>
        </div>

        {/* Vertical Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[var(--gold)] to-transparent opacity-50" />
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
            <Link key={cat.title} href={`/shop?category=${cat.title}`} className="group relative aspect-[3/4] overflow-hidden shadow-lg">
              <div 
                style={{ backgroundColor: `var(--${cat.title.toLowerCase() === 'women' ? 'terracotta' : cat.title.toLowerCase() === 'men' ? 'charcoal' : 'gold'})` }} 
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" 
              />
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

      {/* ── FEATURED ARTISAN PREVIEW ── */}
      <section className="py-32 bg-[var(--cream-dark)] relative overflow-hidden border-y border-[var(--gold)]/10">
        <div className="absolute top-0 left-0 w-full h-full tribal-bg opacity-[0.03]" />
        
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[var(--gold)]" />
              <p className="text-[var(--gold)] font-display tracking-[0.3em] text-xs uppercase">The Spotlight</p>
            </div>
            <h2 className="text-6xl md:text-8xl font-display text-[var(--charcoal)] uppercase leading-none">
              MEET THE <br /> <span className="text-[var(--gold)]">MAKERS</span>
            </h2>
            <p className="font-serif text-xl text-[var(--charcoal)]/70 max-w-md italic leading-relaxed">
              "We don't just sell clothes; we provide a platform for Africa's most talented creators to share their heritage with the world."
            </p>
            <Link href="/artisans" className="inline-block border-b-2 border-[var(--gold)] pb-2 font-display tracking-widest text-sm hover:text-[var(--gold)] transition-colors">
              VIEW ALL ARTISANS
            </Link>
          </div>
          
          <div className="relative aspect-square bg-[var(--charcoal)] flex items-center justify-center overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-40 tribal-bg" />
             <Image 
               src="/logo.png" 
               alt="Asili Heritage" 
               width={250} 
               height={250} 
               className="opacity-20 grayscale brightness-200"
             />
             <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-[var(--charcoal)] to-transparent">
                <p className="font-serif italic text-[var(--cream)]/60 text-center text-sm">
                  Every purchase directly supports rural craft communities across the continent.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-24 px-6 bg-[var(--cream)] tribal-bg">
        <div className="max-w-2xl mx-auto text-center relative">
          <h3 className="font-display text-4xl text-[var(--charcoal)] mb-4 tracking-widest">
            JOIN THE COLLECTIVE
          </h3>
          <p className="font-serif italic text-[var(--charcoal)]/70 mb-10 text-lg">
            Be the first to know about new heritage drops and artisan stories.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 border border-[var(--charcoal)]/10 shadow-xl" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-8 py-5 bg-white font-serif outline-none text-[var(--charcoal)]"
            />
            <button className="bg-[var(--charcoal)] text-[var(--cream)] px-12 py-5 font-display tracking-widest hover:bg-[var(--gold)] transition-colors text-sm">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
