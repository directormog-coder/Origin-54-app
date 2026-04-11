"use client";

import { createClient } from "@/lib/supabase/client"; // Browser-side connection
import { useCart } from "@/lib/store";

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCart((state) => state.addToCart);
  // We initialize the client here if we wanted to track 'Add to Cart' events in Supabase
  const supabase = createClient(); 

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      quantity: 1
    });
  };

  return (
    <button 
      onClick={handleAdd}
      className="btn-gold w-full mt-10 py-5 text-sm tracking-[0.2em] font-display uppercase"
    >
      Add to Bag
    </button>
  );
}
