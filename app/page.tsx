import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export const revalidate = 0; // Ensure live database catalog updates on request

export default async function HomePage() {
  const supabase = createClient();

  // Fetch live products published from Director Panel
  const { data: dbProducts } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const fallbackProducts = [
    {
      id: "1",
      name: "Royal Ashanti Kente Outerwear",
      region: "West Africa (Ghana)",
      artisan: "Bonwire Master Weavers",
      price_zar: 4800,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200",
    },
    {
      id: "2",
      name: "Tuareg Hand-Carved Silver Cuff",
      region: "North Africa (Niger)",
      artisan: "Agadez Silversmith Guild",
      price_zar: 3200,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200",
    },
    {
      id: "3",
      name: "Highland Leather Weekender",
      region: "East Africa (Ethiopia)",
      artisan: "Addis Fine Leather Craft",
      price_zar: 6500,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200",
    },
  ];

  const displayProducts = dbProducts && dbProducts.length > 0 ? dbProducts : fallbackProducts;

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      {/* Hero Banner */}
      <section className="relative h-[80vh] flex items-center justify-center border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
            Pan-African Luxury E-Commerce
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-white tracking-tight leading-tight">
            Bridging Continental Craftsmanship with the Global Diaspora
          </h1>
          <p className="text-sm md:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Curated, provenance-verified luxury heritage pieces crafted by master artisan guilds across Africa.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <a
              href="#catalog"
              className="px-8 py-3.5 bg-amber-400 text-stone-950 font-bold uppercase tracking-widest text-xs rounded hover:bg-amber-300 transition-colors shadow-xl"
            >
              Explore Collection
            </a>
          </div>
        </div>
      </section>

      {/* Dynamic Product Catalog Section */}
      <section id="catalog" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-stone-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
              The Asili Vault
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
              Curated Heritage Pieces
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-400">
            {displayProducts.length} Pieces Live
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProducts.map((product: any) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-stone-900 border border-stone-800 rounded-xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square w-full bg-stone-950 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono">
                    {product.region}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-serif">
                    Guild: {product.artisan}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-stone-800/50 flex justify-between items-center font-mono text-xs">
                <span className="text-stone-400">Investment:</span>
                <span className="text-amber-400 font-bold">R{product.price_zar}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
