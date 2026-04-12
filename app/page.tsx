import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
      {/* Brand Aesthetic Background Element */}
      <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
      
      <div className="z-10 text-center px-4">
        {/* Main Logo Text */}
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-black mb-2">
          ORIGIN<span className="text-[#D97706]">54</span>
        </h1>
        
        {/* The Restored Caption */}
        <p className="text-lg md:text-2xl font-light tracking-[0.3em] text-gray-800 uppercase mb-12">
          BORN FROM AFRICA
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link 
            href="/shop" 
            className="group relative px-12 py-4 bg-black text-white text-sm font-bold tracking-widest transition-all hover:bg-[#D97706] active:scale-95"
          >
            SHOP COLLECTION
          </Link>
          
          <Link 
            href="/artisans" 
            className="text-sm font-bold tracking-widest text-black border-b-2 border-black pb-1 hover:text-[#D97706] hover:border-[#D97706] transition-colors"
          >
            MEET THE ARTISANS
          </Link>
        </div>
      </div>

      {/* Subtle Bottom Aesthetic */}
      <div className="absolute bottom-10 text-[10px] tracking-[0.5em] text-gray-300 uppercase">
        Heritage • Craft • Luxury
      </div>
    </main>
  );
}