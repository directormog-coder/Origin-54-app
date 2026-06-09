import Image from "next/image";
import Link from "next/link";

export default function HeritageSection() {
  return (
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
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30