"use client";

import { useCart } from "@/lib/hooks/useCart";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    category: string;
    artisans?: { name: string } | null;
  };
  className?: string;
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      category: product.category,
      artisan_name: product.artisans?.name,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isAdded}
      className={`
        flex items-center justify-center gap-3 w-full py-4 font-display tracking-widest text-sm
        transition-all duration-300
        ${isAdded 
          ? "bg-green-600 text-white" 
          : "bg-[var(--gold)] text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-[var(--cream)]"
        }
        ${className}
      `}
    >
      {isAdded ? (
        <>
          <Check size={18} /> ADDED TO BAG
        </>
      ) : (
        <>
          <ShoppingBag size={18} /> ADD TO BAG
        </>
      )}
    </button>
  );
}


