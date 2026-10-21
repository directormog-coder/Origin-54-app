"use client";

import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function CartSummary() {
  const { items, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-[var(--charcoal)] p-8 text-[var(--cream)]">
        <p className="font-serif italic text-center">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--charcoal)] p-8 text-[var(--cream)] sticky top-32">
      <h2 className="font-display text-2xl uppercase tracking-widest mb-8">
        Order Summary
      </h2>
      
      <div className="space-y-4 mb-8 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative w-16 h-20 bg-[var(--cream)]/10 overflow-hidden flex-shrink-0">
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--gold)] text-[var(--charcoal)] text-xs flex items-center justify-center font-display">
                {item.quantity}
              </span>
            </div>
            <div className="flex-grow min-w-0">
              <p className="font-display text-sm uppercase truncate">{item.name}</p>
              <p className="font-serif text-xs text-[var(--cream)]/60">
                {formatPrice(item.price)} × {item.quantity}
              </p>
            </div>
            <p className="font-display text-sm flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="h-[1px] bg-[var(--gold)]/30 my-6" />
      
      <div className="flex justify-between font-display text-xl mb-6">
        <span>Total ({itemCount} items)</span>
        <span className="text-[var(--gold)]">{formatPrice(total)}</span>
      </div>

      <Link
        href="/checkout"
        className="block w-full bg-[var(--gold)] text-[var(--charcoal)] text-center py-4 font-display tracking-widest text-sm hover:bg-[var(--cream)] transition-colors"
      >
        PROCEED TO CHECKOUT
      </Link>
    </div>
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30