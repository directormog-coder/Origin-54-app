import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server"; // Adjust path based on your supabase setup

export default async function ShopPage() {
  // 1. Connect to Supabase
  const supabase = await createClient();
  
  // 2. Fetch products
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20 px-6 md:px-12">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="font-display text-5xl md:text-7xl text-[var(--charcoal)] mb-4">
          THE <span className="text-[var(--gold)]">COLLECTION</span>
        </h1>
        <p className="font-serif italic text-lg text-[var(--charcoal)]/60">
          Handcrafted luxury pieces from across the continent.
        </p>
      </header>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {products?.map((product) => (
          <Link 
            key={product.id} 
            href={`/shop/${product.id}`} 
            className="group block"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--cream-dark)] mb-6 shadow-sm">
              <Image
                src={product.image_url || "/placeholder-product.jpg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-[var(--charcoal)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Product Info */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display text-xl tracking-wider text-[var(--charcoal)] group-hover:text-[var(--gold)] transition-colors">
                  {product.name}
                </h3>
                <p className="font-serif italic text-[var(--charcoal)]/60 text-sm">
                  {product.category}
                </p>
              </div>
              <span className="font-serif font-medium text-[var(--charcoal)]">
                ${product.price}
              </span>
            </div>
            
            <div className="mt-4 w-full h-[1px] bg-[var(--gold)]/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </Link>
        ))}
      </div>

      {/* Empty State (if no products yet) */}
      {(!products || products.length === 0) && (
        <div className="text-center py-20 border border-dashed border-[var(--gold)]/30 rounded-lg">
          <p className="font-serif italic text-[var(--charcoal)]/40">
            Our latest collection is currently being curated. Check back soon.
          </p>
        </div>
      )}
    </main>
  );
}

