import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Brand Header Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>
      
      <div className="text-center z-10 px-6">
        {/* Origin 54 Logo with Brand Ochre */}
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-black mb-1">
          ORIGIN<span className="text-[#D97706]">54</span>
        </h1>
        
        {/* The Restored Caption */}
        <p className="text-sm md:text-lg font-medium tracking-[0.4em] text-gray-500 uppercase mb-10">
          BORN FROM AFRICA
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            href="/shop" 
            className="px-10 py-4 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D97706] transition-all"
          >
            Explore Collection
          </Link>
          <Link 
            href="/artisans" 
            className="px-10 py-4 border border-black text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Aesthetic Footer Detail */}
      <div className="absolute bottom-8 text-[10px] tracking-[0.8em] text-gray-300 uppercase">
        Heritage • Craft • Luxury
      </div>
    </main>
  );
}