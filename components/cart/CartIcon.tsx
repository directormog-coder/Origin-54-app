"use client";

import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";
import { cn } from "@/lib/utils";

interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className }: CartIconProps) {
  const { itemCount } = useCart();

  return (
    <Link 
      href="/cart" 
      className={cn("relative inline-block", className)}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
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
        <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 bg-[var(--gold)] text-[var(--charcoal)] text-xs flex items-center justify-center font-display rounded-full">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30