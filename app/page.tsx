import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export const revalidate = 0;

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
    <main className="min-h-screen bg-[#FAF6F0] text-[#1C242B]">
      {/* Hero Banner with Authentic African Canvas Aesthetics */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D99B26]/30 bg-gradient-to-b from-[#F4EFE6] to-[#FAF6F0]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block border-y-2 border-[#D99B26] py-1 px-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C85A32] font-semibold">
              Pan-African Luxury E-Commerce
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-black text-[#1C242B] tracking-tight leading-tight">
            Bridging Continental Craftsmanship with the Global Diaspora
          </h1>
          
          <p className="text-base md:text-lg text-[#1C242B]/80 max-w-2xl mx-auto font-serif leading-relaxed">
            Curated, provenance-verified luxury heritage pieces crafted by master artisan guilds across Africa.
          </p>

          <div className="pt-6">
            <a
              href="#catalog"
              className="inline-block px-8 py-3.5 bg-[#C85A32] text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#B84A22] transition-all shadow-md hover:shadow-lg"
            >
              Explore The Asili Vault
            </a>
          </div>
        </div>
      </section>

      {/* Dynamic Product Catalog Section */}
      <section id="catalog" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b-2 border-[#D99B26] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C85A32] font-semibold">
              Authentic African Heritage
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1C242B] mt-1">
              The Asili Vault
            </h2>
          </div>
          <span className="text-xs font-mono text-[#C85A32] bg-[#D99B26]/10 border border-[#D99B26]/30 px-3 py-1 rounded-full">
            {displayProducts.length} Live Pieces
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProducts.map((product: any) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-white border border-[#D99B26]/30 rounded-2xl overflow-hidden hover:border-[#C85A32] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square w-full bg-[#F4EFE6] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#C85A32] font-bold">
                    {product.region}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#1C242B] group-hover:text-[#C85A32] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#1C242B]/70 font-serif italic">
                    Guild: {product.artisan}
                  </p>
                </div>
              </div>
              
              <div className="p-6 pt-0 border-t border-[#F4EFE6] flex justify-between items-center font-mono text-xs mt-4">
                <span className="text-[#1C242B]/60 uppercase tracking-wider text-[11px]">
                  Investment:
                </span>
                <span className="text-[#C85A32] font-extrabold text-sm">
                  R{product.price_zar}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
