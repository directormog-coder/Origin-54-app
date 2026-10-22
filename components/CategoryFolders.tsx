'use client';

import React, { useState } from "react";

interface SubCategory {
  name: string;
  slug: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  textColor: string;
  subfolders: SubCategory[];
}

const CATEGORIES: Category[] = [
  {
    id: "women-traditional",
    name: "WOMEN'S ATTIRE",
    subtitle: "Ceremonial & Luxury Heritage",
    color: "bg-[#C85A32]", // Terracotta Ochre
    textColor: "text-white",
    subfolders: [
      { name: "Kente & Anseba Ceremonial Gowns", slug: "women-kente-gowns", description: "Hand-woven master silk & cotton ceremonial dresses" },
      { name: "Shweshwe & Umbhaco Modern Silhouettes", slug: "women-umbhaco-dresses", description: "Structured Xhosa & Sotho traditional attire" },
      { name: "Iro & Buba Wrapped Ensembles", slug: "women-iro-buba", description: "Yoruba classic silk lace & hand-dyed sets" },
      { name: "Habesha Kemis & Hand-Embroidered Robes", slug: "women-habesha", description: "Ethiopian fine woven cotton with golden borders" },
    ],
  },
  {
    id: "men-traditional",
    name: "MEN'S ATTIRE",
    subtitle: "Regal Menswear & Tailoring",
    color: "bg-[#1C242B]", // Ebony Charcoal
    textColor: "text-white",
    subfolders: [
      { name: "Agbada & Grand Boubou Sets", slug: "men-agbada", description: "Triple-piece embroidered ceremonial robes" },
      { name: "Isiagu & Royal Velvet Tunics", slug: "men-isiagu", description: "Igbo lion-head gold embroidered tunics" },
      { name: "Dashiki & Hand-Dyed Kurta Tops", slug: "men-dashiki", description: "Batik & wax print everyday luxury shirts" },
      { name: "Traditional Trousers & Wraps", slug: "men-trousers", description: "Tailored draw-string & pleated traditional pants" },
    ],
  },
  {
    id: "crowns-headwear",
    name: "HEADWEAR & CROWNS",
    subtitle: "Sacred & Ceremonial Regalia",
    color: "bg-[#D99B26]", // Golden Sun Ochre
    textColor: "text-[#1C242B]",
    subfolders: [
      { name: "Gele & Auto-Gele Headwraps", slug: "head-gele", description: "Stiff Aso-Oke & metallic pleated headpieces" },
      { name: "Yoruba Beaded King's Crowns (Ade)", slug: "head-[#D99B26]-crowns", description: "Hand-beaded sacred royal crowns with veil fringes" },
      { name: "Isicholo Traditional Zulu Hats", slug: "head-isicholo", description: "Flared woven grass & beaded ancestral hats" },
      { name: "Fez, Chechia & Kofia Caps", slug: "head-kofia", description: "Hand-embroidered velvet & cotton caps" },
    ],
  },
  {
    id: "jewelry-regalia",
    name: "JEWELRY & REGALIA",
    subtitle: "Metals, Beads & Ancestral Crafts",
    color: "bg-[#D9A273]", // Warm Sand
    textColor: "text-[#1C242B]",
    subfolders: [
      { name: "Tuareg Hand-Carved Silver Cuffs", slug: "jewelry-tuareg", description: "Saharan geometric sterling silver adornments" },
      { name: "Maasai & Ndebele Beaded Neckpieces", slug: "jewelry-beaded", description: "Intricate multi-row ceremonial neck collars" },
      { name: "Benin Bronze & Brass Pendants", slug: "jewelry-brass", description: "Lost-wax cast historical pendants & bangles" },
      { name: "Coral Bead Royal Necklaces", slug: "jewelry-coral", description: "Genuine African red coral bridal beadwork" },
    ],
  },
  {
    id: "leather-bags",
    name: "LEATHER & ACCESSORIES",
    subtitle: "Artisanal Bags & Belts",
    color: "bg-[#8C4A27]", // Clay Copper
    textColor: "text-white",
    subfolders: [
      { name: "Highland Embossed Leather Duffles", slug: "leather-duffles", description: "Ethiopian full-grain hand-stitched travel bags" },
      { name: "Woven Raffia & Leather Clutches", slug: "leather-clutches", description: "Madagascan natural palm raffia luxury pouches" },
      { name: "Beaded Leather Waist Belts & Pouches", slug: "leather-belts", description: "Hand-carved leather belts with glass bead inlay" },
    ],
  },
  {
    id: "footwear",
    name: "ROYAL FOOTWEAR",
    subtitle: "Handcrafted Leather Soles",
    color: "bg-[#2C3E35]", // Forest Earth
    textColor: "text-white",
    subfolders: [
      { name: "Embroidered Royal Velvet Slippers", slug: "footwear-slippers", description: "Gold-thread embroidered ceremonial slip-ons" },
      { name: "Hand-Stitched Leather Sandals", slug: "footwear-sandals", description: "Saharan & East African woven leather sandals" },
      { name: "Artisanal Beaded Moccasins", slug: "footwear-moccasins", description: "Soft leather shoes with beaded toe caps" },
    ],
  },
];

export default function CategoryFolders({ onSelectSubcategory }: { onSelectSubcategory?: (slug: string) => void }) {
  const [activeFolder, setActiveFolder] = useState<string | null>("women-traditional");

  return (
    <section id="categories" className="space-y-8 my-12">
      <div className="border-b-2 border-[#D99B26] pb-4 flex justify-between items-end">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C85A32] font-semibold">
            Pan-African Archives
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1C242B] mt-1">
            Traditional Attire & Accessories
          </h2>
        </div>
        <span className="text-xs font-mono text-[#C85A32] bg-[#D99B26]/10 border border-[#D99B26]/30 px-3.5 py-1.5 rounded-full font-bold">
          6 Main Folders
        </span>
      </div>

      {/* Main Folder Grid Styled with Logo Color Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const isActive = activeFolder === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => setActiveFolder(isActive ? null : cat.id)}
              className={`cursor-pointer rounded-2xl p-8 min-h-[230px] flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden border border-black/10 ${cat.color} ${cat.textColor}`}
            >
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest opacity-80 font-mono">
                    Main Category Folder
                  </span>
                  <div className="w-3 h-3 rounded-full bg-white/40"></div>
                </div>
                <h3 className="text-2xl font-serif font-black tracking-wider mt-2">
                  {cat.name}
                </h3>
                <p className="text-xs font-serif italic mt-1 opacity-90">
                  {cat.subtitle}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/20 font-mono text-xs">
                <span>{cat.subfolders.length} Subfolders</span>
                <span className="font-bold text-xs uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  {isActive ? "Close ▲" : "Explore Subfolders ▼"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Subfolder Container */}
      {activeFolder && (
        <div className="bg-white border-2 border-[#D99B26] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#FAF6F0] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C85A32] font-mono font-bold">
                Active Folder
              </span>
              <h4 className="font-serif font-bold text-xl text-[#1C242B] flex items-center gap-2 mt-0.5">
                <span className="w-3 h-3 rounded-full bg-[#C85A32]"></span>
                {CATEGORIES.find((c) => c.id === activeFolder)?.name}
              </h4>
            </div>
            <span className="text-xs font-mono text-[#C85A32] bg-[#FAF6F0] px-3 py-1 rounded-lg border border-[#D99B26]/30">
              Click subfolder to filter catalog
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.find((c) => c.id === activeFolder)?.subfolders.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => onSelectSubcategory && onSelectSubcategory(sub.slug)}
                className="p-5 bg-[#FAF6F0] border border-[#D99B26]/40 rounded-xl text-left hover:border-[#C85A32] hover:bg-[#F4EFE6] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] uppercase font-mono text-[#C85A32] font-bold tracking-wider">
                    Subfolder
                  </div>
                  <div className="text-sm font-serif font-bold text-[#1C242B] group-hover:text-[#C85A32] transition-colors mt-1">
                    {sub.name}
                  </div>
                  <p className="text-xs text-[#1C242B]/70 font-sans mt-2 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </div>
                <div className="text-[10px] font-mono font-semibold text-[#D99B26] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Collection &rarr;
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
