'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchVaultProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setProducts(data);
      setLoading(false);
    }

    fetchVaultProducts();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#1C242B]">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#D99B26]/30 px-4 py-3 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border border-[#D99B26] overflow-hidden flex items-center justify-center bg-white">
            <span className="font-serif font-bold text-xs text-[#C85A32]">O54</span>
          </div>
          <div>
            <h1 className="font-serif font-black text-lg tracking-wider text-[#1C242B] leading-none">ORIGIN 54</h1>
            <p className="text-[9px] font-serif italic text-[#C85A32]">The Asili Collective</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-xs font-mono bg-[#C85A32] text-white font-bold px-3 py-1.5 rounded-lg hover:bg-[#B84A22] transition-colors"
          >
            DIRECTOR PORTAL
          </Link>
          <Link
            href="/account"
            className="text-xs font-mono border border-[#D99B26] text-[#1C242B] font-bold px-3 py-1.5 rounded-lg hover:bg-[#D99B26]/10 transition-colors"
          >
            MY PROFILE
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-end border-b-2 border-[#D99B26] pb-3">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C85A32] font-bold">
              CURATED MASTERPIECES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#1C242B]">
              The Asili Vault
            </h2>
          </div>
          <span className="text-xs font-mono bg-[#D99B26]/20 px-3 py-1 rounded-full text-[#1C242B] font-bold">
            {products.length} Live Pieces
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center font-mono text-xs text-stone-500">
            Unlocking Asili Vault Catalog...
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center font-mono text-xs text-stone-500">
            No designs published yet. Access Director Portal to upload.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => {
              const imgSrc = prod.image_url || prod.image || "/placeholder.jpg";
              const priceVal = prod.price_zar || prod.price || "1750";

              return (
                <div
                  key={prod.id}
                  className="bg-white border-2 border-[#D99B26]/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-[4/5] bg-[#FAF6F0] overflow-hidden flex items-center justify-center">
                    <img
                      src={imgSrc}
                      alt={prod.name}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        // Fallback image handling
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-[#C85A32]">
                        {prod.region || "Southern Africa"}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-[#1C242B] leading-snug">
                        {prod.name}
                      </h3>
                      {prod.artisan_guild && (
                        <p className="text-xs font-serif italic text-stone-500 mt-0.5">
                          Guild: {prod.artisan_guild}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {prod.provenance_story || prod.description}
                    </p>

                    <div className="pt-3 border-t border-[#FAF6F0] flex justify-between items-center font-mono text-xs">
                      <span className="text-stone-400 uppercase text-[10px]">INVESTMENT:</span>
                      <span className="text-base font-bold text-[#C85A32]">R{priceVal}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
