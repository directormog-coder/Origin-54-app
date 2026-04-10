import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";

export default async function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  const supabase = await createClient(); // Server-side connection
  const category = await searchParams.category;

  let query = supabase.from("products").select("*, artisans(name)");
  if (category && category !== "All") {
    query = query.eq("category", category);
  }
  
  const { data: products, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error.message);
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20 px-6">
      <header className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="font-display text-6xl text-[var(--charcoal)] uppercase mb-8">Collection</h1>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold tracking-widest uppercase">
          {["All", "WOMEN", "MEN", "CHILDREN", "ACCESSORIES"].map((cat) => (
            <a 
              key={cat} 
              href={cat === "All" ? "/shop" : `/shop?category=${cat}`}
              className={`pb-1 transition-all ${(!category && cat === "All") || category === cat ? 'text-[var(--gold)] border-b border-[var(--gold)]' : 'text-[var(--charcoal)]/40'}`}
            >
              {cat}
            </a>
          ))}
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {products?.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            artisanName={product.artisans?.name} 
          />
        ))}
      </div>
    </main>
  );
}
