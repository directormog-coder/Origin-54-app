import Image from "next/image";
import Link from "next/link";

const regions = [
  {
    name: "WEST AFRICA",
    craft: "Kente, Aso-Oke & Mudcloth",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=800",
    countries: "Ghana, Nigeria, Senegal, Mali",
  },
  {
    name: "NORTH AFRICA",
    craft: "Egyptian Cottons & Berber Craft",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=800",
    countries: "Egypt, Morocco, Tunisia",
  },
  {
    name: "EAST AFRICA",
    craft: "Swahili Kikoy & Maasai Beadwork",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
    countries: "Kenya, Ethiopia, Tanzania",
  },
  {
    name: "SOUTHERN AFRICA",
    craft: "Luxury Mohair & Shweshwe Tailoring",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800",
    countries: "South Africa, Zimbabwe, Namibia",
  },
];

export default function PanAfricanHub() {
  return (
    <section className="bg-stone-900 text-stone-100 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Global Diaspora Banner */}
        <div className="border border-amber-500/30 bg-amber-950/20 rounded-2xl p-6 md:p-8 text-center backdrop-blur-md">
          <p className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-2">
            Global Diaspora & Continental Network
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Connecting All 54 African Nations to the World
          </h2>
          <p className="text-stone-300 max-w-2xl mx-auto mt-3 text-sm md:text-base leading-relaxed">
            Directly supporting master artisans across Africa with express international shipping to London, New York, Paris, Toronto, Johannesburg, and beyond.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-amber-200/80 font-mono">
            <span className="px-3 py-1 bg-stone-800 rounded-full border border-stone-700">ZAR (R)</span>
            <span className="px-3 py-1 bg-stone-800 rounded-full border border-stone-700">USD ($)</span>
            <span className="px-3 py-1 bg-stone-800 rounded-full border border-stone-700">GBP (£)</span>
            <span className="px-3 py-1 bg-stone-800 rounded-full border border-stone-700">EUR (€)</span>
            <span className="px-3 py-1 bg-stone-800 rounded-full border border-stone-700">NGN (₦)</span>
            <span className="px-3 py-1 bg-stone-800 rounded-full border border-stone-700">KES (KSh)</span>
            <span className="px-3 py-1 bg-stone-800 rounded-full border border-stone-700">GHS (₵)</span>
          </div>
        </div>

        {/* Regional Heritage Grid */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold">
                Shop by African Region
              </h3>
              <p className="text-stone-400 text-xs md:text-sm mt-1">
                Explore distinct textile traditions and handcrafts from across the continent.
              </p>
            </div>
            <Link
              href="/artisans"
              className="text-amber-400 hover:text-amber-300 text-xs uppercase tracking-widest font-semibold"
            >
              Meet Artisans &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((reg) => (
              <div
                key={reg.name}
                className="group relative h-80 rounded-xl overflow-hidden border border-stone-800 bg-stone-950"
              >
                <Image
                  src={reg.image}
                  alt={reg.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <span className="text-[10px] tracking-widest uppercase text-amber-400 font-mono">
                    {reg.countries}
                  </span>
                  <h4 className="text-xl font-bold font-serif text-white mt-1">
                    {reg.name}
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 italic">
                    {reg.craft}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
