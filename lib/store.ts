import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductItem {
  id: string;
  name: string;
  region: string;
  priceZAR: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cart: ProductItem[];
  currency: string;
  isCartOpen: boolean;
  setCurrency: (currency: string) => void;
  toggleCart: () => void;
  addToCart: (product: Omit<ProductItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      currency: "ZAR",
      isCartOpen: false,

      setCurrency: (currency) => set({ currency }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isCartOpen: true,
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
            isCartOpen: true,
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as ProductItem[],
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "origin54-cart-storage",
    }
  )
);
