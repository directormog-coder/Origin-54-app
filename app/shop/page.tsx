import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

// Next.js 15: searchParams is now async/Promise-based
export default async function ShopPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ category?: string }> 
}) {
  // Await the searchParams Promise
  const { category } = await searchParams;
  
  const supabase = await createClient();

  let query = supabase.from("products").select("*, artisans(name)");

  if (category) {
    query = query.eq("category", category);
  }

  const { data: products } = await query;

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display text-[var(--charcoal)] uppercase mb-16 text-center">
          {category ? category : "All Collections"}
        </h1>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link 
                key={product.id} 
                href={`/shop/${product.id}`}
                className="group"
              >
                <div className="relative aspect-[3/4] bg-[var(--cream-dark)] overflow-hidden shadow-lg mb-4">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="font-display text-xl text-[var(--charcoal)] uppercase">
                  {product.name}
                </h3>
                <p className="font-serif text-[var(--gold)]">${product.price}</p>
                {product.artisans && (
                  <p className="font-serif text-sm text-[var(--charcoal)]/60 italic">
                    by {product.artisans.name}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-[var(--charcoal)]/70">
              No products found in this collection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}


