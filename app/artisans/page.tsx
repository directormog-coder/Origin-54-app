import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function ArtisansPage() {
  const supabase = await createClient();
  const { data: artisans } = await supabase.from("artisans").select("*");

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20">
      <div className="container mx-auto px-6">
        <header className="max-w-3xl mb-20">
          <p className="text-[var(--gold)] font-display tracking-[0.3em] text-xs mb-4 uppercase">The Hands Behind Origin 54</p>
          <h1 className="text-6xl md:text-8xl font-display text-[var(--charcoal)] mb-6">OUR <span className="text-[var(--gold)]">ARTISANS</span></h1>
          <p className="font-serif italic text-xl text-[var(--charcoal)]/60">Preserving heritage through every stitch, bead, and weave.</p>
        </header>

        <div className="grid grid-cols-1 gap-24">
          {artisans?.map((artisan, index) => (
            <section key={artisan.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              <div className="w-full md:w-1/2 aspect-square relative grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                <Image 
                  src={artisan.profile_image} 
                  alt={artisan.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <span className="text-[var(--gold)] font-serif italic text-lg">{artisan.location}</span>
                <h2 className="text-5xl font-display text-[var(--charcoal)] uppercase">{artisan.name}</h2>
                <p className="font-serif text-[var(--charcoal)]/70 text-lg leading-relaxed">
                  {artisan.bio}
                </p>
                <div className="pt-6">
                  <div className="w-20 h-[1px] bg-[var(--gold)] mb-4" />
                  <p className="font-display text-sm tracking-widest text-[var(--charcoal)]">MASTER CRAFTSMAN</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
