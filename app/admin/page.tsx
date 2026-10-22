'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const CATEGORIES = ["WOMEN", "MEN", "CHILDREN", "ACCESSORIES"];
const REGIONS = ["West Africa", "East Africa", "North Africa", "Southern Africa", "Central Africa"];

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [region, setRegion] = useState(REGIONS[0]);
  const [artisan, setArtisan] = useState("");
  const [priceZAR, setPriceZAR] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [provenance, setProvenance] = useState("");
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function checkAdminAndFetch() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        alert("Access restricted. Director credentials required.");
        router.push("/");
        return;
      }

      setIsAdmin(true);

      const { data: allProducts } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (allProducts) setProducts(allProducts);
      setLoading(false);
    }

    checkAdminAndFetch();
  }, [router, supabase]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFormMsg("");

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      const { error: uploadErr } = await supabase.storage
        .from('products')
        .upload(filePath, file, { upsert: true });

      if (!uploadErr) {
        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          setImageUrl(publicUrlData.publicUrl);
          setFormMsg("Image uploaded successfully to Storage!");
          setUploading(false);
          return;
        }
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
          setFormMsg("Photo loaded successfully from device!");
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setFormMsg(`Upload error: ${err.message}`);
      setUploading(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setFormMsg("");

    const numericPrice = parseFloat(priceZAR);

    // Full payload with all fields
    let payload: any = {
      name,
      category,
      region,
      artisan_guild: artisan,
      price_zar: numericPrice,
      price: numericPrice,
      image_url: imageUrl,
      image: imageUrl,
      provenance_story: provenance,
      description: provenance,
    };

    let { data, error } = await supabase.from("products").insert([payload]).select();

    // If region or price_zar column cache error occurs, strip them dynamically and retry
    if (error && (error.message.includes("region") || error.message.includes("price_zar"))) {
      delete payload.region;
      delete payload.price_zar;
      const retry = await supabase.from("products").insert([payload]).select();
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      setFormMsg(`Error publishing design: ${error.message}`);
    } else {
      setFormMsg("Design published live to the Vault!");
      if (data) setProducts([data[0], ...products]);
      setName("");
      setArtisan("");
      setPriceZAR("");
      setImageUrl("");
      setProvenance("");
    }
    setCreating(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF6F0] text-[#1C242B] flex items-center justify-center font-mono text-xs">
        Verifying Director Access...
      </main>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#1C242B] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="border-b-2 border-[#D99B26] pb-6 flex justify-between items-center">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C85A32] font-mono font-bold">
            Director Control Panel
          </span>
          <h1 className="text-3xl font-serif font-black text-[#1C242B] mt-1">
            Publish New Masterpiece Design
          </h1>
        </div>
        <span className="text-xs font-mono bg-[#D99B26]/10 border border-[#D99B26]/30 px-3 py-1.5 rounded-full text-[#C85A32] font-bold">
          Director Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handlePublish} className="bg-white border-2 border-[#D99B26]/30 p-6 rounded-2xl space-y-4 lg:col-span-1 shadow-md">
          <h2 className="text-xl font-serif font-bold text-[#1C242B] border-b border-[#FAF6F0] pb-3">
            Add Design to Vault
          </h2>

          <div>
            <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">Design Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Forest Green Bomber & Skirt"
              className="mt-1 w-full px-3 py-2 border border-[#D99B26]/40 rounded-lg bg-[#FAF6F0] text-xs focus:ring-2 focus:ring-[#C85A32] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full px-2 py-2 border border-[#D99B26]/40 rounded-lg bg-[#FAF6F0] text-xs focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="mt-1 w-full px-2 py-2 border border-[#D99B26]/40 rounded-lg bg-[#FAF6F0] text-xs focus:outline-none"
              >
                {REGIONS.map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">Artisan / Guild</label>
            <input
              type="text"
              value={artisan}
              onChange={(e) => setArtisan(e.target.value)}
              placeholder="e.g., ORIGIN 54 Master Tailors"
              className="mt-1 w-full px-3 py-2 border border-[#D99B26]/40 rounded-lg bg-[#FAF6F0] text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">Price (ZAR)</label>
            <input
              type="number"
              required
              value={priceZAR}
              onChange={(e) => setPriceZAR(e.target.value)}
              placeholder="1750"
              className="mt-1 w-full px-3 py-2 border border-[#D99B26]/40 rounded-lg bg-[#FAF6F0] text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">
              Upload Design Photo from Phone
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="mt-1 w-full text-xs font-mono file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#D99B26] file:text-[#1C242B] hover:file:bg-[#c38a1e] file:cursor-pointer"
            />
            {uploading && <p className="text-[10px] font-mono text-[#C85A32] mt-1">Processing photo...</p>}
          </div>

          <div>
            <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">Image URL (Auto-filled)</label>
            <input
              type="text"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Photo link will populate automatically..."
              className="mt-1 w-full px-3 py-2 border border-[#D99B26]/40 rounded-lg bg-[#FAF6F0] text-xs focus:outline-none font-mono text-[10px]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">Provenance & Craft Story</label>
            <textarea
              rows={3}
              required
              value={provenance}
              onChange={(e) => setProvenance(e.target.value)}
              placeholder="Detail the ancestral tech, dyes, or weaving used..."
              className="mt-1 w-full px-3 py-2 border border-[#D99B26]/40 rounded-lg bg-[#FAF6F0] text-xs focus:outline-none"
            />
          </div>

          {formMsg && (
            <p className="text-xs font-mono text-[#C85A32] font-bold text-center">{formMsg}</p>
          )}

          <button
            type="submit"
            disabled={creating || uploading || !imageUrl}
            className="w-full py-3 bg-[#C85A32] text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-[#B84A22] transition-colors disabled:opacity-50"
          >
            {creating ? "Publishing..." : "Publish to Vault Catalog"}
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4 bg-white border-2 border-[#D99B26]/30 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-serif font-bold text-[#1C242B]">
            Published Design Vault ({products.length})
          </h2>

          {products.length === 0 ? (
            <p className="text-stone-500 text-xs font-mono py-6">
              No designs published in the database yet. Select a photo from your phone gallery to publish!
            </p>
          ) : (
            <div className="space-y-3">
              {products.map((prod) => (
                <div key={prod.id} className="flex justify-between items-center border border-[#D99B26]/30 bg-[#FAF6F0] p-4 rounded-xl text-xs font-mono">
                  <div>
                    <p className="font-serif font-bold text-[#1C242B] text-sm">{prod.name}</p>
                    <p className="text-stone-500">{prod.region || 'Southern Africa'} • {prod.category || 'WOMEN'}</p>
                  </div>
                  <span className="text-[#C85A32] font-bold text-sm">R{prod.price_zar || prod.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
