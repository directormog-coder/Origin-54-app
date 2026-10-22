'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  // New Product Form State
  const [name, setName] = useState("");
  const [region, setRegion] = useState("West Africa");
  const [artisan, setArtisan] = useState("");
  const [priceZAR, setPriceZAR] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function checkAdminStatusAndFetch() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Check admin flag in profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile || !profile.is_admin) {
        alert("Access denied. Director credentials required.");
        router.push("/");
        return;
      }

      setIsAdmin(true);

      // Fetch all customer orders
      const { data: allOrders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (allOrders) setOrders(allOrders);

      // Fetch all active products
      const { data: allProducts } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (allProducts) setProducts(allProducts);

      setLoading(false);
    }

    checkAdminStatusAndFetch();
  }, [router, supabase]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setFormMsg("");

    const { data, error } = await supabase.from("products").insert([
      {
        name,
        region,
        artisan,
        price_zar: parseFloat(priceZAR),
        image,
        description,
      },
    ]).select();

    if (error) {
      setFormMsg(`Error: ${error.message}`);
    } else {
      setFormMsg("New piece added to catalog successfully!");
      if (data) setProducts([data[0], ...products]);
      setName("");
      setArtisan("");
      setPriceZAR("");
      setImage("");
      setDescription("");
    }
    setCreating(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-950 text-stone-400 flex items-center justify-center font-mono text-xs">
        Authenticating Director Credentials...
      </main>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8 space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 flex justify-between items-center">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
            Restricted Control Center
          </span>
          <h1 className="text-3xl font-serif font-bold text-white mt-1">
            Director Management Portal
          </h1>
        </div>
        <span className="text-xs font-mono bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded text-amber-400">
          Director Authenticated
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Product Form */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl space-y-6 lg:col-span-1">
          <h2 className="text-xl font-serif font-bold text-white border-b border-stone-800 pb-3">
            Publish New Piece
          </h2>

          <form onSubmit={handleCreateProduct} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-stone-400 mb-1 uppercase">Piece Title</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Royal Benin Bronze Bust"
                className="w-full px-3 py-2 border border-stone-700 rounded bg-stone-950 text-white focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1 uppercase">Region Hub</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 border border-stone-700 rounded bg-stone-950 text-white focus:ring-amber-500 focus:outline-none"
              >
                <option value="West Africa">West Africa</option>
                <option value="East Africa">East Africa</option>
                <option value="North Africa">North Africa</option>
                <option value="Southern Africa">Southern Africa</option>
                <option value="Central Africa">Central Africa</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-400 mb-1 uppercase">Artisan / Guild</label>
              <input
                type="text"
                required
                value={artisan}
                onChange={(e) => setArtisan(e.target.value)}
                placeholder="Guild of Benin Master Casters"
                className="w-full px-3 py-2 border border-stone-700 rounded bg-stone-950 text-white focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1 uppercase">Price (ZAR)</label>
              <input
                type="number"
                required
                value={priceZAR}
                onChange={(e) => setPriceZAR(e.target.value)}
                placeholder="7500"
                className="w-full px-3 py-2 border border-stone-700 rounded bg-stone-950 text-white focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1 uppercase">Image URL</label>
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 border border-stone-700 rounded bg-stone-950 text-white focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1 uppercase">Provenance & Story</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Hand-cast lost-wax bronze sculpture depicting historical royal lineage..."
                className="w-full px-3 py-2 border border-stone-700 rounded bg-stone-950 text-white focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {formMsg && (
              <p className="text-amber-400 font-mono text-center text-[11px]">{formMsg}</p>
            )}

            <button
              type="submit"
              disabled={creating}
              className="w-full py-3 bg-amber-400 text-stone-950 font-bold uppercase tracking-widest text-xs rounded hover:bg-amber-300 transition-colors"
            >
              {creating ? "Publishing..." : "Add to Live Catalog"}
            </button>
          </form>
        </div>

        {/* Live Orders & Products Section */}
        <div className="space-y-8 lg:col-span-2">
          {/* Orders Table */}
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-serif font-bold text-white">
              Collector Orders ({orders.length})
            </h2>

            {orders.length === 0 ? (
              <p className="text-stone-500 text-xs font-mono py-4">
                No orders registered in the database yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-400 uppercase">
                      <th className="pb-3">Reference</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-950/50">
                        <td className="py-3 text-amber-400">{order.paystack_reference}</td>
                        <td className="py-3">R{order.total_amount}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              order.status === "paid"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                : "bg-amber-950 text-amber-400 border border-amber-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-stone-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Published Catalog Table */}
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-serif font-bold text-white">
              Published Catalog ({products.length})
            </h2>

            {products.length === 0 ? (
              <p className="text-stone-500 text-xs font-mono py-4">
                No custom products published in database yet.
              </p>
            ) : (
              <div className="space-y-3">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex justify-between items-center border border-stone-800 bg-stone-950 p-3 rounded text-xs font-mono"
                  >
                    <div>
                      <p className="font-serif font-semibold text-white text-sm">{prod.name}</p>
                      <p className="text-stone-400">{prod.region} • {prod.artisan}</p>
                    </div>
                    <span className="text-amber-400 font-bold">R{prod.price_zar}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
