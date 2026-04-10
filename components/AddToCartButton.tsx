"use client";
import { useCart } from "@/lib/store";

export default function AddToCartButton({ product }: { product: any }) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <button 
      onClick={() => addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        quantity: 1
      })}
      className="btn-gold w-full md:w-auto text-center"
    >
      ADD TO BAG
    </button>
  );
}

