import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  const supabase = await createClient();
  const category = searchParams.category;

  let query = supabase.from("products").select("*");
  if (category) query = query.eq("category", category);
  const { data: products } = await query.order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20 px-6">
      <header className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="font-display text-6xl text-[var(--charcoal)] uppercase mb-8">Collection</h1>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold tracking-widest uppercase">
          {["All", "WOMEN", "MEN", "CHILDREN", "ACCESSORIES"].map((cat) => (
            <Link 
              key={cat} 
              href={cat === "All" ? "/shop" : `/shop?category=${cat}`}
              className={`pb-1 transition-all ${(!category && cat === "All") || category === cat ? 'text-[var(--gold)] border-b border-[var(--gold)]' : 'text-[var(--charcoal)]/40'}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {products?.map((product) => (
          <Link key={product.id} href={`/shop/${product.id}`} className="group">
            <div className="relative aspect-[3/4] bg-[var(--cream-dark)] overflow-hidden mb-4 shadow-sm">
              <Image src={product.image_url || "/logo.png"} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex justify-between items-start">
              <h3 className="font-display text-xl text-[var(--charcoal)] uppercase tracking-tight">{product.name}</h3>
              <span className="font-serif text-[var(--gold)] text-lg">${product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
