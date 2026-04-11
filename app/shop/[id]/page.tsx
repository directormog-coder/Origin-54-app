import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

// Next.js 15: params is now async/Promise-based
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await the params Promise
  const { id } = await params;
  
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*, artisans(*)")
    .eq("id", id)
    .single();

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="relative aspect-[3/4] bg-[var(--cream-dark)] overflow-hidden shadow-xl">
          <Image 
            src={product.image_url} 
            alt={product.name} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-[var(--gold)] font-display tracking-widest mb-2">
            {product.category}
          </p>
          <h1 className="text-5xl font-display text-[var(--charcoal)] mb-4 uppercase">
            {product.name}
          </h1>
          <p className="text-2xl font-serif text-[var(--charcoal)] mb-8">
            ${product.price}
          </p>
          <p className="font-serif text-[var(--charcoal)]/70 leading-relaxed mb-10 text-lg">
            {product.description}
          </p>

          {/* This button handles the Zustand cart logic */}
          <AddToCartButton product={product} />

          {/* Artisan Credit */}
          {product.artisans && (
            <div className="mt-12 p-6 border border-[var(--gold)]/20 bg-[var(--gold)]/5">
              <p className="text-xs font-display text-[var(--gold)] tracking-widest mb-2">CRAFTED BY</p>
              <p className="font-serif italic text-[var(--charcoal)]">{product.artisans.name}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
