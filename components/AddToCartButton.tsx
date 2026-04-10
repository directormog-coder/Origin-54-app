"use client";
import { useCart } from "@/lib/store";

export default function AddToCartButton({ product }: { product: any }) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <button 
      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image_url, quantity: 1 })}
      className="btn-gold w-full mt-8 py-5 text-sm tracking-[0.2em] font-display"
    >
      ADD TO BAG
    </button>
  );
}
