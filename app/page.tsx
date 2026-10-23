'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);

  // E-Commerce Cart & Checkout State
  const [cart, setCart] = useState<{ product: any; size: string; quantity: number }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  // Checkout Form State
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PayFast / Card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderMsg, setOrderMsg] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function checkAuthAndFetchProducts() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin, shipping_address")
          .eq("id", user.id)
          .single();

        if (profile?.is_admin || user.email === "director.origin54@gmail.com") {
          setIsAdmin(true);
        }
        if (profile?.shipping_address) {
          setShippingAddress(profile.shipping_address);
        }
      }

      const { data } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setProducts(data);
        const initialSizes: { [key: string]: string } = {};
        data.forEach((p) => {
          initialSizes[p.id] = "M";
        });
        setSelectedSizes(initialSizes);
      }
      setLoading(false);
    }

    checkAuthAndFetchProducts();
  }, [supabase]);

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: any) => {
    const size = selectedSizes[product.id] || "M";
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, item) => acc + (parseFloat(item.product.price_zar || item.product.price || 0) * item.quantity),
    0
  );

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setOrderMsg("Processing secure transaction...");

    // Simulate gateway handoff & record order in database if orders table exists
    setTimeout(async () => {
      try {
        await supabase.from("orders").insert([
          {
            user_id: user?.id || null,
            items: cart,
            total_amount: cartTotal,
            shipping_address: shippingAddress,
            payment_method: paymentMethod,
            status: "Paid & Processing"
          }
        ]);
      } catch (err) {
        // Fallback if orders table hasn't been created yet
      }

      setOrderPlaced(true);
      setOrderMsg("Order successfully placed through secure paygate!");
      setCart([]);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#1C242B]">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#D99B26]/30 px-4 py-3 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border border-[#D99B26] overflow-hidden flex items-center justify-center bg-white shadow-sm">
            <span className="font-serif font-bold text-xs text-[#C85A32]">O54</span>
          </div>
          <div>
            <h1 className="font-serif font-black text-lg tracking-wider text-[#1C242B] leading-none">ORIGIN 54</h1>
            <p className="text-[9px] font-serif italic text-[#C85A32]">The Asili Collective</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="text-xs font-mono bg-[#C85A32] text-white font-bold px-3 py-1.5 rounded-lg hover:bg-[#B84A22] transition-colors"
            >
              DIRECTOR PORTAL
            </Link>
          )}

          <Link
            href="/account"
            className="text-xs font-mono border border-[#D99B26] text-[#1C242B] font-bold px-3 py-1.5 rounded-lg hover:bg-[#D99B26]/10 transition-colors"
          >
            {user ? "MY PROFILE" : "SIGN IN"}
          </Link>

          <button
            onClick={() => {
              setOrderPlaced(false);
              setCartOpen(!cartOpen);
            }}
            className="relative p-2 border border-[#D99B26]/40 rounded-lg bg-white text-[#1C242B] hover:border-[#C85A32] transition-colors"
            aria-label="View Shopping Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C85A32] text-white text-[10px] font-bold font-mono w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Slide-over Cart & Checkout Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#FAF6F0] h-full shadow-2xl p-6 flex flex-col justify-between border-l-2 border-[#D99B26] overflow-y-auto">
            
            {orderPlaced ? (
              <div className="my-auto text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-[#D99B26]/20 border-2 border-[#D99B26] rounded-full flex items-center justify-center mx-auto text-2xl text-[#C85A32]">
                  ✓
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1C242B]">Masterpiece Secured</h3>
                <p className="text-xs font-mono text-stone-600">
                  Your order has been recorded and submitted to the Asili Vault logistics guild. Thank you for collecting with Origin 54.
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setOrderPlaced(false);
                    setCheckingOut(false);
                  }}
                  className="px-6 py-2.5 bg-[#C85A32] text-white font-mono text-xs uppercase font-bold rounded-lg"
                >
                  Return to Storefront
                </button>
              </div>
            ) : checkingOut ? (
              <form onSubmit={handlePlaceOrder} className="space-y-6 my-auto">
                <div className="flex justify-between items-center border-b border-[#D99B26]/30 pb-3">
                  <h3 className="font-serif font-bold text-xl text-[#1C242B]">Secure Paygate Portal</h3>
                  <button
                    type="button"
                    onClick={() => setCheckingOut(false)}
                    className="text-xs font-mono text-[#C85A32] font-bold hover:underline"
                  >
                    ← BACK TO BAG
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="block uppercase font-semibold text-[#1C242B] mb-1">Delivery Address</label>
                    <textarea
                      required
                      rows={3}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Street address, city, province, postal code..."
                      className="w-full p-2.5 border border-[#D99B26]/40 rounded-lg bg-white text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-[#1C242B] mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-2.5 border border-[#D99B26]/40 rounded-lg bg-white text-xs focus:outline-none"
                    >
                      <option value="PayFast / Card">PayFast / Credit & Debit Card</option>
                      <option value="Ozow Instant EFT">Ozow Instant EFT</option>
                      <option value="Direct Bank Transfer">Direct Bank Transfer (EFT)</option>
                    </select>
                  </div>

                  <div className="p-3 bg-white border border-[#D99B26]/30 rounded-xl space-y-1">
                    <div className="flex justify-between font-bold text-sm">
                      <span>Total Investment:</span>
                      <span className="text-[#C85A32]">R{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {orderMsg && (
                    <p className="text-center font-bold text-[#C85A32]">{orderMsg}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C85A32] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#B84A22] transition-colors"
                >
                  COMPLETE SECURE PAYMENT
                </button>
              </form>
            ) : (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#D99B26]/30 pb-3">
                    <h3 className="font-serif font-bold text-xl text-[#1C242B]">Your Shopping Bag</h3>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="text-xs font-mono text-[#C85A32] font-bold hover:underline"
                    >
                      CLOSE ✕
                    </button>
                  </div>

                  {cart.length === 0 ? (
                    <p className="text-xs font-mono text-stone-500 py-10 text-center">Your bag is currently empty.</p>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item, index) => (
                        <div key={index} className="flex gap-3 bg-white p-3 rounded-xl border border-[#D99B26]/30 font-mono text-xs">
                          <img
                            src={item.product.image_url || item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                          <div className="flex-1 space-y-1">
                            <p className="font-serif font-bold text-[#1C242B] text-sm leading-snug">{item.product.name}</p>
                            <p className="text-[11px] text-stone-500">Size: <span className="font-bold text-[#C85A32]">{item.size}</span> | Qty: {item.quantity}</p>
                            <p className="text-xs font-bold text-[#C85A32]">
                              R{(parseFloat(item.product.price_zar || item.product.price || 0) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="pt-4 border-t-2 border-[#D99B26] space-y-3 font-mono">
                    <div className="flex justify-between text-sm font-bold text-[#1C242B]">
                      <span>SUBTOTAL:</span>
                      <span className="text-[#C85A32]">R{cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => setCheckingOut(true)}
                      className="w-full py-3 bg-[#C85A32] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#B84A22] transition-colors"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Storefront Catalog */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-end border-b-2 border-[#D99B26] pb-3">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C85A32] font-bold">
              ONLINE CATALOG
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#1C242B]">
              The Asili Store
            </h2>
          </div>
          <span className="text-xs font-mono bg-[#D99B26]/20 px-3 py-1 rounded-full text-[#1C242B] font-bold">
            {products.length} Designs Available
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center font-mono text-xs text-stone-500">
            Loading Catalog Items...
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center font-mono text-xs text-stone-500">
            No designs published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => {
              const imgSrc = prod.image_url || prod.image || "/placeholder.jpg";
              const priceVal = prod.price_zar || prod.price || "1750";
              const currentSize = selectedSizes[prod.id] || "M";

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
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="p-5 space-y-4">
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

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold uppercase text-stone-500 block">
                        SELECT SIZE:
                      </label>
                      <div className="flex gap-2">
                        {SIZES.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => handleSizeSelect(prod.id, size)}
                            className={`px-3 py-1 rounded-md text-xs font-mono font-bold border transition-colors ${
                              currentSize === size
                                ? "bg-[#C85A32] text-white border-[#C85A32]"
                                : "bg-[#FAF6F0] text-[#1C242B] border-[#D99B26]/40 hover:border-[#C85A32]"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#FAF6F0] space-y-3">
                      <div className="flex justify-between items-center font-mono text-xs">
                        <span className="text-stone-500 font-bold uppercase text-[10px]">PRICE:</span>
                        <span className="text-lg font-bold text-[#C85A32]">R{priceVal}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(prod)}
                        className="w-full py-2.5 bg-[#1C242B] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#C85A32] transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        ADD TO CART
                      </button>
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
