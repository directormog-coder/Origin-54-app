"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export const metadata = {
  title: "Shopping Cart | Origin 54",
  description: "Review your selected items from the Asili Collective.",
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl text-[var(--charcoal)] uppercase mb-8">
            Your Cart is Empty
          </h1>
          <p className="font-serif text-xl text-[var(--charcoal)]/70 italic mb-12">
            Discover our heritage pieces and add them to your collection.
          </p>
          <Link 
            href="/shop" 
            className="btn-gold px-12 py-5 inline-block font-display tracking-widest text-sm"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl text-[var(--charcoal)] uppercase mb-16 text-center">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-6 p-6 bg-[var(--cream-dark)] border border-[var(--gold)]/10"
              >
                <div className="relative w-32 h-40 flex-shrink-0 bg-[var(--charcoal)]/5">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-[var(--gold)] font-display text-xs tracking-widest mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-display text-xl text-[var(--charcoal)] uppercase mb-2">
                      {item.name}
                    </h3>
                    <p className="font-serif text-[var(--charcoal)]/60 text-sm">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--gold)] hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="font-display text-lg w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--gold)] hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="font-serif text-sm text-[var(--charcoal)]/40 hover:text-[var(--charcoal)] underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="font-serif text-sm text-[var(--charcoal)]/40 hover:text-[var(--charcoal)] underline"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--charcoal)] p-8 text-[var(--cream)] sticky top-32">
              <h2 className="font-display text-2xl uppercase tracking-widest mb-8">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-8 font-serif">
                <div className="flex justify-between">
                  <span className="text-[var(--cream)]/70">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--cream)]/70">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="h-[1px] bg-[var(--gold)]/30 my-4" />
                <div className="flex justify-between font-display text-xl">
                  <span>Total</span>
                  <span className="text-[var(--gold)]">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-[var(--gold)] text-[var(--charcoal)] text-center py-4 font-display tracking-widest text-sm hover:bg-[var(--cream)] transition-colors"
              >
                PROCEED TO CHECKOUT
              </Link>

              <Link
                href="/shop"
                className="block w-full text-center py-4 font-display tracking-widest text-sm text-[var(--cream)]/70 hover:text-[var(--cream)] transition-colors mt-4"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
