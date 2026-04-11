"use client";

import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="relative">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 text-[var(--charcoal)]" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
        />
      </svg>
      
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--gold)] text-[var(--charcoal)] text-xs flex items-center justify-center font-display rounded-full">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
