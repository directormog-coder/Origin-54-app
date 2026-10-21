import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/shop/${product.id}`}
          className="group overflow-hidden border border-[var(--gold)]/10 bg-[var(--cream-dark)] shadow-sm transition hover:shadow-lg"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={product.image_url || "/logo.png"}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="p-6">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
              {product.category || "Collection"}
            </p>
            <h3 className="font-display text-2xl uppercase text-[var(--charcoal)]">
              {product.name}
            </h3>
            <p className="font-serif text-[var(--charcoal)]/70 italic">
              {product.description || "Crafted with heritage and intention."}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
