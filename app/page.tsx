import CategoryGrid from "@/components/CategoryGrid";
import PanAfricanHub from "@/components/PanAfricanHub";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      {/* Hero Header */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
          The Asili Collective
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-extrabold tracking-tight mt-2 text-white">
          ORIGIN 54
        </h1>
        <p className="text-stone-300 max-w-xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
          Bridging ancient African craftsmanship with modern global luxury for the continent and the global diaspora.
        </p>
      </section>

      {/* Main Categories */}
      <CategoryGrid />

      {/* Pan-African Continental & Diaspora Hub */}
      <PanAfricanHub />
    </main>
  );
}
