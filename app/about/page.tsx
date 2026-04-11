import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20 overflow-hidden">
      {/* ── MANIFESTO SECTION ── */}
      <section className="container mx-auto px-6 mb-32 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/5 blur-[100px] rounded-full -z-10" />
        
        <div className="max-w-4xl">
          <p className="text-[var(--gold)] font-display tracking-[0.4em] text-xs mb-6 uppercase animate-fade-in">
            Established 54
          </p>
          <h1 className="text-6xl md:text-9xl font-display text-[var(--charcoal)] leading-[0.85] mb-10 uppercase">
            Rooted in <br />
            <span className="text-[var(--gold)]">Heritage</span>
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-[var(--charcoal)]/80 italic leading-relaxed mb-12">
            "Origin-54 was born from a singular vision: to bridge the gap between ancient African craftsmanship and modern global luxury."
          </p>
        </div>
      </section>

      {/* ── THE "54" CONCEPT ── */}
      <section className="bg-[var(--charcoal)] py-24 mb-32 relative tribal-bg">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square border border-[var(--gold)]/20 p-4">
            <div className="absolute inset-0 bg-[var(--gold)]/5 z-0" />
            <Image 
              src="/logo.png" 
              alt="Origin 54 Concept" 
              fill 
              className="object-contain p-12 opacity-90 z-10"
            />
          </div>
          <div className="space-y-8">
            <h2 className="font-display text-5xl text-[var(--cream)] uppercase tracking-tight">
              One Continent. <br />
              <span className="text-[var(--gold)]">54 Stories.</span>
            </h2>
            <div className="space-y-6 font-serif text-[var(--cream)]/70 text-lg leading-relaxed">
              <p>
                The number 54 represents more than geography. It represents the distinct, 
                vibrant cultures of each African nation. From the intricate beadwork of 
                the Maasai to the hand-woven Kente of Ghana, we celebrate the diversity 
                of the continent.
              </p>
              <p>
                Asili means "Origin" or "Nature" in Swahili. We return to the source, 
                honoring the organic materials and traditional techniques that have 
                existed for centuries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE THREE PILLARS ── */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: "Ethical Craft", 
              desc: "We ensure fair wages and safe environments for every artisan in our collective." 
            },
            { 
              title: "Ancestral Tech", 
              desc: "Preserving weaving and dyeing methods that pre-date modern machinery." 
            },
            { 
              title: "Modern Luxury", 
              desc: "High-fashion silhouettes designed for the global trendsetter." 
            }
          ].map((pillar, idx) => (
            <div key={idx} className="border-t border-[var(--gold)]/30 pt-8">
              <span className="text-[var(--gold)] font-display text-lg mb-4 block">0{idx + 1}</span>
              <h3 className="font-display text-2xl text-[var(--charcoal)] mb-4 uppercase">{pillar.title}</h3>
              <p className="font-serif text-[var(--charcoal)]/60 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="text-center py-32 border-t border-[var(--gold)]/10">
        <h2 className="font-display text-4xl mb-10 text-[var(--charcoal)] uppercase tracking-widest">
          Wear the <span className="text-[var(--gold)]">Origin</span>
        </h2>
        <Link href="/shop" className="btn-gold px-16 py-5 inline-block">
          VIEW THE COLLECTION
        </Link>
      </section>
    </main>
  );
}


