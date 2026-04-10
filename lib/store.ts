import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) => set((state) => {
        const existing = state.cart.find((i) => i.id === item.id);
        if (existing) {
          return {
            cart: state.cart.map((i) => 
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { cart: [...state.cart, item] };
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.reduce((acc, item) => {
          if (item.id === id) {
            if (item.quantity > 1) acc.push({ ...item, quantity: item.quantity - 1 });
            return acc;
          }
          acc.push(item);
          return acc;
        }, [] as CartItem[]),
      })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'asili-cart-storage' }
  )
);
