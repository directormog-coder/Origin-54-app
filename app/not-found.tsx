import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Page Not Found | Origin 54",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--cream)] flex items-center justify-center pt-20 tribal-bg">
      <div className="max-w-2xl w-full mx-auto px-6 text-center">
        <div className="mb-8">
          <Image 
            src="/logo.png" 
            alt="Origin 54" 
            width={100} 
            height={100} 
            className="mx-auto opacity-50 grayscale" 
            sizes="100px"
          />
        </div>
        
        <h1 className="font-display text-8xl md:text-9xl text-[var(--charcoal)] mb-4">
          404
        </h1>
        
        <h2 className="font-display text-2xl md:text-3xl text-[var(--gold)] uppercase tracking-widest mb-6">
          Page Not Found
        </h2>
        
        <p className="font-serif text-lg text-[var(--charcoal)]/70 italic mb-10 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="w-16 h-[1px] bg-[var(--gold)] mx-auto mb-10" />

        <Link 
          href="/" 
          className="btn-gold px-12 py-4 inline-block font-display tracking-widest text-sm"
        >
          RETURN HOME
        </Link>
      </div>
    </main>
  );
}


