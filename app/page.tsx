import Link from "next/link";
import Image from "next/image";

// Next.js 15: Async page components are supported but not required for static pages
// Keeping this as a Server Component for better performance (no "use client" needed)

export const metadata = {
  title: "Origin 54 | Born From Africa",
  description: "The Asili Collective - Luxury African fashion celebrating heritage through modern design.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] overflow-x-hidden">
      
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden tribal-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--charcoal)] via-[var(--charcoal)] to-[var(--terracotta)] opacity-95 z-0" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <Image 
            src="/logo.png" 
            alt="Origin 54" 
            width={180} 
            height={180} 
            className="mx-auto mb-8 rounded-full shadow-2xl border-2 border-[var(--gold)]/20" 
            priority 
            sizes="180px"
          />
          <p className="text-[var(--gold)] font-display tracking-[0.4em] text-xs mb-4 uppercase">The Asili Collective</p>
          <h1 className="font-display text-7xl md:text-[140px] leading-[0.85] text-[var(--cream)] mb-8 uppercase">
            Born From<br/>
            <span className="text-[var(--gold)]">Africa</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/shop" 
              className="btn-gold px-12 py-5 font-display tracking-widest text-sm inline-block text-center"
            >
              EXPLORE COLLECTION
            </Link>
            <Link 
              href="/about" 
              className="border border-[var(--cream)]/30 text-[var(--cream)] hover:border-[var(--gold)] px-12 py-5 font-display tracking-widest text-sm transition-all inline-block text-center"
            >
              OUR STORY
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "WOMEN", sub: "Luxury Womenswear", color: "var(--terracotta)", accent: "var(--cream)" },
            { title: "MEN", sub: "Elevated Menswear", color: "var(--charcoal)", accent: "var(--gold)" },
            { title: "CHILDREN", sub: "The Next Generation", color: "var(--tan)", accent: "var(--cream)" },
            { title: "ACCESSORIES", sub: "Artisan Craft", color: "var(--gold)", accent: "var(--charcoal)" },
          ].map((cat) => (
            <Link 
              key={cat.title} 
              href={`/shop?category=${cat.title}`} 
              className="group relative aspect-[4/5] overflow-hidden shadow-lg"
            >
              <div 
                style={{ backgroundColor: `var(${cat.color.match(/--[\w-]+/)?.[0] ?? '--terracotta'})` }} 
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 opacity-10 tribal-bg" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <h2 
                  className="font-display text-4xl leading-none" 
                  style={{ color: `var(${cat.accent.match(/--[\w-]+/)?.[0] ?? '--cream'})` }}
                >
                  {cat.title}
                </h2>
                <p 
                  className="font-serif italic text-sm opacity-80 mt-2" 
                  style={{ color: `var(${cat.accent.match(/--[\w-]+/)?.[0] ?? '--cream'})` }}
                >
                  {cat.sub}
                </p>
                <div 
                  className="h-[1px] w-0 group-hover:w-full transition-all duration-500 mt-4" 
                  style={{ backgroundColor: `var(${cat.accent.match(/--[\w-]+/)?.[0] ?? '--cream'})` }} 
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED ARTISAN SPOTLIGHT */}
      <section className="py-32 bg-[var(--cream-dark)] relative overflow-hidden">
        <div className="absolute inset-0 tribal-bg opacity-[0.03]" />
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl font-display text-[var(--charcoal)] uppercase leading-none">
              Meet the <br/> 
              <span className="text-[var(--gold)]">Makers</span>
            </h2>
            <p className="font-serif text-xl text-[var(--charcoal)]/70 italic max-w-md">
              &ldquo;Every stitch preserves a story, every pattern honors a nation.&rdquo;
            </p>
            <Link 
              href="/artisans" 
              className="inline-block border-b-2 border-[var(--gold)] pb-2 font-display tracking-widest text-sm hover:text-[var(--gold)] transition-colors"
            >
              VIEW ALL ARTISANS
            </Link>
          </div>
          <div className="relative aspect-square bg-[var(--charcoal)] flex items-center justify-center overflow-hidden shadow-2xl">
             <Image 
               src="/logo.png" 
               alt="Asili Heritage" 
               width={250} 
               height={250} 
               className="opacity-20 grayscale brightness-200" 
               sizes="250px"
             />
          </div>
        </div>
      </section>
    </main>
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30