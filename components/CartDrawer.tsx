'use client';

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

const currencyRates: Record<string, { symbol: string; rate: number }> = {
  ZAR: { symbol: "R", rate: 1 },
  USD: { symbol: "$", rate: 0.055 },
  GBP: { symbol: "£", rate: 0.043 },
  EUR: { symbol: "€", rate: 0.051 },
};

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, currency, setCurrency } =
    useCartStore();

  const currentRate = currencyRates[currency] || currencyRates["ZAR"];

  const subtotalZAR = cart.reduce(
    (total, item) => total + item.priceZAR * item.quantity,
    0
  );

  const convertedTotal = (subtotalZAR * currentRate.rate).toFixed(2);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 h-full flex flex-col p-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-stone-800 pb-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-white">Collector's Bag</h2>
            <p className="text-xs text-stone-400 font-mono">
              {cart.length} {cart.length === 1 ? "Item" : "Items"} Selected
            </p>
          </div>
          <button
            onClick={toggleCart}
            className="text-stone-400 hover:text-amber-400 text-lg font-mono px-2"
          >
            ✕
          </button>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center justify-between py-3 border-b border-stone-800 text-xs font-mono">
          <span className="text-stone-400 uppercase">Currency:</span>
          <div className="flex gap-2">
            {Object.keys(currencyRates).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-2 py-1 rounded ${
                  currency === cur
                    ? "bg-amber-400 text-stone-950 font-bold"
                    : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-sm">
              Your bag is currently empty.
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border border-stone-800 bg-stone-950 p-3 rounded-lg"
              >
                <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-serif font-semibold text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-amber-400 font-mono">
                    {currentRate.symbol}
                    {(item.priceZAR * currentRate.rate).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-0.5 bg-stone-800 text-xs text-stone-300 rounded hover:bg-stone-700"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-0.5 bg-stone-800 text-xs text-stone-300 rounded hover:bg-stone-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-stone-500 hover:text-red-400 text-xs px-2"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-stone-800 pt-4 space-y-4">
            <div className="flex justify-between items-center font-mono">
              <span className="text-xs uppercase text-stone-400">Total:</span>
              <span className="text-lg font-bold text-amber-400">
                {currentRate.symbol}
                {convertedTotal}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={toggleCart}
              className="block w-full py-3 bg-amber-400 text-stone-950 text-center text-xs uppercase tracking-widest font-semibold rounded hover:bg-amber-300 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
