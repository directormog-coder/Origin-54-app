import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-4 text-center">
      <h1 className="text-6xl font-serif mb-4">ORIGIN 54</h1>
      <p className="text-xl mb-8 max-w-md uppercase tracking-widest">
        Authentic African Craftsmanship. Modern Luxury.
      </p>
      <Link 
        href="/shop" 
        className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-300"
      >
        EXPLORE THE COLLECTION
      </Link>
    </div>
  );
}