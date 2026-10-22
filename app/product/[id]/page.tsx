'use client';

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

const mockProducts: Record<
  string,
  {
    id: string;
    name: string;
    region: string;
    artisan: string;
    priceZAR: number;
    image: string;
    description: string;
    materials: string[];
  }
> = {
  "1": {
    id: "1",
    name: "Royal Ashanti Kente Outerwear",
    region: "West Africa (Ghana)",
    artisan: "Bonwire Master Weavers",
    priceZAR: 4800,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200",
    description:
      "Hand-loomed double-weave strip cloth constructed with genuine silk and cotton threads. Each geometric pattern reflects historical royal proverbs.",
    materials: ["Handwoven Silk", "Organic Ghanaian Cotton", "Brass Embellishments"],
  },
  "2": {
    id: "2",
    name: "Tuareg Hand-Carved Silver Cuff",
    region: "North Africa (Niger / Mali)",
    artisan: "Agadez Silversmith Guild",
    priceZAR: 3200,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200",
    description:
      "Precision-engraved 925 sterling silver cuff featuring traditional Saharan astrological motifs and protective talismans.",
    materials: ["925 Sterling Silver", "Ebony Wood Inlay"],
  },
  "3": {
    id: "3",
    name: "Ethiopian Highland Leather Weekender",
    region: "East Africa (Ethiopia)",
    artisan: "Addis Fine Leather Craft",
    priceZAR: 6500,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200",
    description:
      "Vegetable-tanned full-grain highland leather, hand-stitched for extreme durability with custom antiqued brass hardware.",
    materials: ["Full-Grain Highland Leather", "Antique Brass Hardware", "Hand-Dyed Cotton Lining"],
  },
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = mockProducts[resolvedParams.id] || mockProducts["1"];
  const { addToCart, currency } = useCartStore();

  const currencySymbols: Record<string, string> = {
    ZAR: "R",
    USD: "$",
    GBP: "£",
    EUR: "€",
  };

  const rates: Record<string, number> = {
    ZAR: 1,
    USD: 0.055,
    GBP: 0.043,
    EUR: 0.051,
  };

  const rate = rates[currency] || 1;
  const symbol = currencySymbols[currency] || "R";
  const displayPrice = (product.priceZAR * rate).toFixed(2);

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image Display */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>

        {/* Product Details & Purchase Form */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
              {product.region} — Provenance Verified
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mt-1">
              {product.name}
            </h1>
            <p className="text-2xl font-mono text-amber-300 font-semibold mt-3">
              {symbol} {displayPrice} <span className="text-xs font-normal text-stone-400">({currency})</span>
            </p>
          </div>

          <p className="text-stone-300 text-sm leading-relaxed border-t border-b border-stone-800 py-4">
            {product.description}
          </p>

          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-stone-400 font-mono">
              Artisan Guild
            </h4>
            <p className="text-sm font-serif text-white">{product.artisan}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-stone-400 font-mono">
              Craft Materials
            </h4>
            <ul className="flex flex-wrap gap-2">
              {product.materials.map((mat, idx) => (
                <li
                  key={idx}
                  className="text-xs bg-stone-900 border border-stone-800 px-3 py-1 rounded-full text-stone-300"
                >
                  {mat}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 py-3.5 bg-amber-400 text-stone-950 font-bold uppercase tracking-widest text-xs rounded hover:bg-amber-300 transition-colors shadow-lg"
            >
              Add to Collector's Bag
            </button>
            <Link
              href="/"
              className="px-6 py-3.5 border border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-800 font-mono text-xs rounded uppercase tracking-wider flex items-center justify-center"
            >
              Store
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
