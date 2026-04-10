import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen tribal-bg flex items-center justify-center overflow-hidden pt-20">
      {/* Decorative gradient flare */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--gold)]/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
        <div className="mb-8 animate-fade-in">
          <Image 
            src="/logo.png" 
            alt="Origin 54 Logo" 
            width={220} 
            height={220} 
            className="rounded-full shadow-2xl border-4 border-[var(--gold)]/20"
            priority
          />
        </div>

        <p className="text-[var(--gold)] font-semibold tracking-[0.3em] text-xs mb-4 uppercase">
          The Asili Collective
        </p>

        <h1 className="text-6xl md:text-8xl font-display text-[var(--charcoal)] leading-none mb-6">
          BORN FROM <br />
          <span className="text-[var(--gold)]">AFRICA</span>
        </h1>

        <p className="max-w-xl text-lg md:text-xl text-[var(--charcoal)]/80 font-light mb-10 italic">
          "Luxury fashion rooted in the heritage, craft, and bold spirit of Africa’s 54 nations."
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/shop" className="btn-gold rounded-sm">
            EXPLORE COLLECTION
          </Link>
          <Link href="/about" className="px-12 py-4 border border-[var(--gold)] text-[var(--gold)] font-semibold hover:bg-[var(--gold)]/5 transition-all rounded-sm">
            OUR STORY
          </Link>
        </div>
      </div>

      {/* Subtle bottom detail */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-20 bg-gradient-to-b from-[var(--gold)] to-transparent" />
      </div>
    </main>
  );
}
