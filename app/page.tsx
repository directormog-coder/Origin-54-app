import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient();

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
      {/* 1. Rooted in Heritage Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D99B26]/30 bg-[#FAF6F0]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D99B26] font-mono">
            Established 54
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-[#1C242B] tracking-tight leading-none">
            ROOTED IN <span className="text-[#D99B26]">HERITAGE</span>
          </h1>
          <p className="text-base md:text-lg text-[#1C242B]/80 max-w-2xl mx-auto font-serif italic leading-relaxed">
            &ldquo;Origin-54 was born from a singular vision: to bridge the gap between ancient African craftsmanship and modern global luxury.&rdquo;
          </p>
        </div>
      </section>

      {/* 2. One Continent. 54 Stories. Dark Section */}
      <section className="bg-[#1C242B] text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-[#D99B26]/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square w-full max-w-md mx-auto bg-[#FAF6F0] rounded-2xl overflow-hidden p-6 shadow-2xl border-2 border-[#D99B26]">
            <Image
              src="/logo.png"
              alt="ORIGIN 54 Logo"
              fill
              className="object-contain p-6"
            />
          </div>
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D99B26] font-mono">
              The Asili Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
              ONE CONTINENT. <br /><span className="text-[#D99B26]">54 STORIES.</span>
            </h2>
            <p className="text-sm md:text-base text-stone-300 font-sans leading-relaxed">
              The number 54 represents more than geography. It represents the distinct, vibrant cultures of each African nation. Asili means &ldquo;Origin&rdquo; or &ldquo;Nature&rdquo; in Swahili. We return to the source, honoring the organic materials and traditional techniques that have existed for centuries.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-800 font-mono text-xs">
              <div>
                <span className="text-[#D99B26] font-bold block text-base">01</span>
                <span className="uppercase text-stone-400 font-semibold">Ethical Craft</span>
                <p className="text-[11px] text-stone-500 mt-1">Fair wages and safe environments for every artisan.</p>
              </div>
              <div>
                <span className="text-[#D99B26] font-bold block text-base">02</span>
                <span className="uppercase text-stone-400 font-semibold">Ancestral Tech</span>
                <p className="text-[11px] text-stone-500 mt-1">Preserving weaving & dyeing methods from antiquity.</p>
              </div>
              <div>
                <span className="text-[#D99B26] font-bold block text-base">03</span>
                <span className="uppercase text-stone-400 font-semibold">Modern Luxury</span>
                <p className="text-[11px] text-stone-500 mt-1">High-fashion silhouettes for global trendsetters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Main Category Tiles (Women, Men, Children, Accessories) */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C85A32] font-mono">
            Explore Collections
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C242B]">
            WEAR THE ORIGIN
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* WOMEN */}
          <Link
            href="/#catalog"
            className="group relative bg-[#C85A32] text-white rounded-2xl p-10 min-h-[320px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <div>
              <span className="text-xs uppercase tracking-widest font-mono opacity-80">Collection I</span>
              <h3 className="text-4xl font-serif font-black tracking-wider mt-2">WOMEN</h3>
              <p className="text-sm font-serif italic mt-1 opacity-90">Luxury Womenswear & Traditional Gowns</p>
            </div>
            <div className="flex justify-between items-center font-mono text-xs pt-8 border-t border-white/20">
              <span>Explore Subfolders</span>
              <span className="font-bold group-hover:translate-x-2 transition-transform">&rarr;</span>
            </div>
          </Link>

          {/* MEN */}
          <Link
            href="/#catalog"
            className="group relative bg-[#1C242B] text-white rounded-2xl p-10 min-h-[320px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-[#D99B26]/30"
          >
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-[#D99B26]">Collection II</span>
              <h3 className="text-4xl font-serif font-black tracking-wider mt-2">MEN</h3>
              <p className="text-sm font-serif italic mt-1 text-stone-300">Elevated Menswear & Regalia</p>
            </div>
            <div className="flex justify-between items-center font-mono text-xs pt-8 border-t border-white/10">
              <span>Explore Subfolders</span>
              <span className="font-bold text-[#D99B26] group-hover:translate-x-2 transition-transform">&rarr;</span>
            </div>
          </Link>

          {/* CHILDREN */}
          <Link
            href="/#catalog"
            className="group relative bg-[#D9A273] text-[#1C242B] rounded-2xl p-10 min-h-[320px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <div>
              <span className="text-xs uppercase tracking-widest font-mono opacity-80">Collection III</span>
              <h3 className="text-4xl font-serif font-black tracking-wider mt-2">CHILDREN</h3>
              <p className="text-sm font-serif italic mt-1 opacity-90">The Next Generation of Heritage</p>
            </div>
            <div className="flex justify-between items-center font-mono text-xs pt-8 border-t border-[#1C242B]/20">
              <span>Explore Subfolders</span>
              <span className="font-bold group-hover:translate-x-2 transition-transform">&rarr;</span>
            </div>
          </Link>

          {/* ACCESSORIES */}
          <Link
            href="/#catalog"
            className="group relative bg-[#D99B26] text-[#1C242B] rounded-2xl p-10 min-h-[320px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <div>
              <span className="text-xs uppercase tracking-widest font-mono opacity-80">Collection IV</span>
              <h3 className="text-4xl font-serif font-black tracking-wider mt-2">ACCESSORIES</h3>
              <p className="text-sm font-serif italic mt-1 opacity-90">Artisan Craft, Silver & Regalia</p>
            </div>
            <div className="flex justify-between items-center font-mono text-xs pt-8 border-t border-[#1C242B]/20">
              <span>Explore Subfolders</span>
              <span className="font-bold group-hover:translate-x-2 transition-transform">&rarr;</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Meet the Artisans Section */}
      <section className="bg-[#F4EFE6] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#D99B26]/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#D99B26]/40 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C85A32] font-mono font-bold">
                Master Guilds & Makers
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C242B] mt-2">
                MEET THE ARTISANS
              </h2>
            </div>
            <p className="text-sm text-[#1C242B]/70 max-w-md font-serif italic">
              Every garment and artifact tells the story of generations of master craftspeople preserving cultural identity across the continent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-[#D99B26]/30 shadow-sm space-y-4">
              <span className="text-xs font-mono text-[#C85A32] uppercase tracking-wider font-bold">West Africa</span>
              <h3 className="text-xl font-serif font-bold text-[#1C242B]">Bonwire Master Weavers</h3>
              <p className="text-xs text-[#1C242B]/70 leading-relaxed font-sans">
                Guardians of authentic Ashanti Kente weaving traditions in Ghana, creating hand-loomed silk and cotton regalia.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[#D99B26]/30 shadow-sm space-y-4">
              <span className="text-xs font-mono text-[#C85A32] uppercase tracking-wider font-bold">North Africa</span>
              <h3 className="text-xl font-serif font-bold text-[#1C242B]">Agadez Silversmith Guild</h3>
              <p className="text-xs text-[#1C242B]/70 leading-relaxed font-sans">
                Tuareg master jewelers crafting geometric sterling silver talismans, cuffs, and ceremonial daggers.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[#D99B26]/30 shadow-sm space-y-4">
              <span className="text-xs font-mono text-[#C85A32] uppercase tracking-wider font-bold">East Africa</span>
              <h3 className="text-xl font-serif font-bold text-[#1C242B]">Addis Fine Leather Craft</h3>
              <p className="text-xs text-[#1C242B]/70 leading-relaxed font-sans">
                Ethiopian artisans specializing in full-grain vegetable-tanned leather weekender bags and embossed footwear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Live Product Vault Catalog */}
      <section id="catalog" className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b-2 border-[#D99B26] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C85A32] font-semibold">
              Curated Masterpieces
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1C242B] mt-1">
              The Asili Vault
            </h2>
          </div>
          <span className="text-xs font-mono text-[#C85A32] bg-[#D99B26]/10 border border-[#D99B26]/30 px-3 py-1 rounded-full font-bold">
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
