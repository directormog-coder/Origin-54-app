import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
}

export default function ProductCard({ id, name, price, image_url, category }: ProductProps) {
  return (
    <Link href={`/shop/${id}`} className="group block">
      <div className="relative aspect-[3/4] bg-[var(--cream-dark)] overflow-hidden mb-5 shadow-sm">
        <Image 
          src={image_url || "/logo.png"} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-display text-lg text-[var(--charcoal)] uppercase tracking-tight leading-none group-hover:text-[var(--gold)] transition-colors">
            {name}
          </h3>
          <p className="font-serif italic text-xs text-[var(--charcoal)]/50">
            {category}
          </p>
        </div>
        <span className="font-serif font-medium text-[var(--charcoal)]">
          ${price}
        </span>
      </div>
    </Link>
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30