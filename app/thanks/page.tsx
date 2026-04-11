import Link from "next/link";
import Image from "next/image";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] flex items-center justify-center pt-20 tribal-bg">
      <div className="max-w-2xl w-full mx-auto px-6 text-center">
        <div className="mb-10 inline-block relative">
          <div className="absolute inset-0 bg-[var(--gold)] blur-2xl opacity-20 rounded-full scale-150" />
          <Image src="/logo.png" alt="Origin 54" width={120} height={120} className="rounded-full relative z-10 shadow-xl" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl text-[var(--charcoal)] mb-6">
          ASANTE <span className="text-[var(--gold)]">SANA</span>
        </h1>

        <p className="font-serif text-xl md:text-2xl text-[var(--charcoal)]/80 italic mb-8 leading-relaxed">
          "Thank you for becoming part of the collective. Your purchase directly supports the heritage and craft of African artisans."
        </p>

        <div className="w-24 h-[1px] bg-[var(--gold)] mx-auto mb-10" />

        <p className="text-[var(--charcoal)]/60 mb-12 max-w-md mx-auto">
          An order confirmation has been sent to your email. We will notify you once your piece begins its journey from the continent to your door.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-gold rounded-sm px-10">
            CONTINUE SHOPPING
          </Link>
          <Link href="/artisans" className="px-10 py-4 border border-[var(--gold)] text-[var(--gold)] font-display tracking-widest text-sm hover:bg-[var(--gold)] hover:text-white transition-all">
            LEARN MORE ABOUT OUR ARTISANS
          </Link>
        </div>
      </div>
    </main>
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30