"use client";

import { useEffect, useState } from "react";
import { useCartStore, type CartItem } from "@/lib/store/cartStore";

export function useCart() {
  const [isHydrated, setIsHydrated] = useState(false);
  const cart = useCartStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Prevent hydration mismatch by returning empty state until hydrated
  if (!isHydrated) {
    return {
      items: [] as CartItem[],
      total: 0,
      itemCount: 0,
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
    };
  }

  return cart;
}



// Deep Repair Sync: 2026-04-11 17:28:30