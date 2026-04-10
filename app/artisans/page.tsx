import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function ArtisansPage() {
  const supabase = await createClient();
  
  // Fetch artisans and their products to show what they've made
  const { data: artisans } = await supabase
    .from("artisans")
    .select("*, products(id, name, image_url)");

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20 overflow-hidden">
      {/* ── HEADER ── */}
      <header className="container mx-auto px-6 mb-24 text-center">
        <p className="text-[var(--gold)] font-display tracking-[0.4em] text-xs mb-4 uppercase">
          The Hands of Asili
        </p>
        <h1 className="text-6xl md:text-8xl font-display text-[var(--charcoal)] uppercase leading-none">
          Our <span className="text-[var(--gold)]">Artisans</span>
        </h1>
        <div className="w-24 h-[1px] bg-[var(--gold)] mx-auto mt-8 opacity-40" />
      </header>

      {/* ── ARTISAN LIST ── */}
      <div className="space-y-32 md:space-y-48">
        {artisans?.map((artisan, index) => (
          <section 
            key={artisan.id} 
            className={`container mx-auto px-6 flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } gap-12 md:gap-24 items-center`}
          >
            {/* Image Side with Decorative Frame */}
            <div className="w-full md:w-1/2 relative">
              <div className="absolute -inset-4 border border-[var(--gold)]/10 z-0 translate-x-2 translate-y-2" />
              <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out shadow-2xl z-10">
                <Image 
                  src={artisan.profile_image || "/placeholder-artisan.jpg"} 
                  alt={artisan.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              {/* Tribal Watermark behind image */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 tribal-bg opacity-10 z-0" />
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 space-y-6 animate-fade-in">
              <span className="font-serif italic text-[var(--gold)] text-xl block">
                {artisan.location}
              </span>
              <h2 className="font-display text-5xl md:text-6xl text-[var(--charcoal)] uppercase leading-tight">
                {artisan.name}
              </h2>
              <p className="font-serif text-[var(--charcoal)]/70 text-lg md:text-xl leading-relaxed italic">
                "{artisan.bio}"
              </p>
              
              {/* Featured Work by this Artisan */}
              {artisan.products && artisan.products.length > 0 && (
                <div className="pt-8 border-t border-[var(--gold)]/20">
                  <p className="font-display text-[10px] tracking-widest text-[var(--charcoal)]/40 uppercase mb-4">
                    Featured Work
                  </p>
                  <div className="flex gap-4">
                    {artisan.products.slice(0, 2).map((prod: any) => (
                      <Link key={prod.id} href={`/shop/${prod.id}`} className="group relative w-20 h-24 overflow-hidden bg-[var(--cream-dark)]">
                        <Image 
                          src={prod.image_url} 
                          alt={prod.name} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform" 
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* ── FOOTER CTA ── */}
      <footer className="mt-48 text-center py-20 bg-[var(--charcoal)] tribal-bg">
        <h3 className="font-display text-3xl text-[var(--cream)] mb-8 tracking-widest uppercase">
          Support the <span className="text-[var(--gold)]">Craft</span>
        </h3>
        <Link href="/shop" className="btn-gold px-12 py-4 inline-block">
          SHOP THE COLLECTION
        </Link>
      </footer>
    </main>
  );
}
