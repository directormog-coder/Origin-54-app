'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function CheckoutPage() {
  const { cart, currency, clearCart } = useCartStore();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("South Africa");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const subtotalZAR = cart.reduce(
    (total, item) => total + item.priceZAR * item.quantity,
    0
  );

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/checkout/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amountZAR: subtotalZAR,
          items: cart,
          shippingAddress: { fullName, address, city, country },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment initialization failed.");
      }

      // Redirect user to Paystack payment portal
      window.location.href = data.authorization_url;
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during checkout.");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center items-center px-4">
        <h2 className="text-2xl font-serif font-bold text-white mb-2">
          Your Collector's Bag is Empty
        </h2>
        <p className="text-sm text-stone-400 mb-6">
          Add artisanal items from the storefront before proceeding to checkout.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-amber-400 text-stone-950 font-bold uppercase tracking-widest text-xs rounded hover:bg-amber-300 transition-colors"
        >
          Return to Storefront
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
              Secure Delivery
            </span>
            <h1 className="text-2xl font-serif font-bold text-white mt-1">
              Shipping Information
            </h1>
          </div>

          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-300 font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@origin54.com"
                className="mt-1 block w-full px-3 py-2 border border-stone-700 rounded-md bg-stone-950 text-white focus:outline-none focus:ring-amber-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-300 font-medium">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Kofi Mensah"
                className="mt-1 block w-full px-3 py-2 border border-stone-700 rounded-md bg-stone-950 text-white focus:outline-none focus:ring-amber-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-300 font-medium">
                Street Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="1073 Kwa-Guqa Main Rd"
                className="mt-1 block w-full px-3 py-2 border border-stone-700 rounded-md bg-stone-950 text-white focus:outline-none focus:ring-amber-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-300 font-medium">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="eMalahleni"
                  className="mt-1 block w-full px-3 py-2 border border-stone-700 rounded-md bg-stone-950 text-white focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-300 font-medium">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-stone-700 rounded-md bg-stone-950 text-white focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 font-mono text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-400 text-stone-950 text-center text-xs uppercase tracking-widest font-semibold rounded hover:bg-amber-300 transition-colors mt-4"
            >
              {loading ? "Initializing Paystack..." : "Proceed to Paystack"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl space-y-6 h-fit">
          <h2 className="text-xl font-serif font-bold text-white border-b border-stone-800 pb-4">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-semibold text-stone-200">{item.name}</p>
                  <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-mono text-amber-400">
                  R{(item.priceZAR * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-800 pt-4 flex justify-between items-center font-mono">
            <span className="text-xs uppercase text-stone-400">Total (ZAR):</span>
            <span className="text-xl font-bold text-amber-400">
              R{subtotalZAR.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
