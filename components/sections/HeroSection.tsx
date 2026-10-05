import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden tribal-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--charcoal)] via-[var(--charcoal)] to-[var(--terracotta)] opacity-95" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <Image
          src="/logo.png"
          alt="Origin 54"
          width={180}
          height={180}
          className="mx-auto mb-8 rounded-full border-2 border-[var(--gold)]/20 shadow-2xl"
          priority
          sizes="180px"
        />

        <p className="text-[var(--gold)] font-display tracking-[0.4em] text-xs mb-4 uppercase">
          The Asili Collective
        </p>

        <h1 className="font-display text-7xl md:text-[140px] leading-[0.85] text-[var(--cream)] mb-8 uppercase">
          Born From
          <br />
          <span className="text-[var(--gold)]">Africa</span>
        </h1>

        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <Link
            href="/shop"
            className="btn-gold inline-block px-12 py-5 text-center font-display tracking-widest text-sm"
          >
            EXPLORE COLLECTION
          </Link>

          <Link
            href="/about"
            className="inline-block border border-[var(--cream)]/30 px-12 py-5 text-center font-display tracking-widest text-sm text-[var(--cream)] transition-all hover:border-[var(--gold)]"
          >
            OUR STORY
          </Link>
        </div>
      </div>
    </section>
  );
}
