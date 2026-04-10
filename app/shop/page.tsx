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
        <h1 className="font-display text-6xl text-[var(--charcoal)] uppercase mb-6">Store</h1>
        
        {/* Filters */}
        <div className="flex justify-center gap-6 text-[10px] font-bold tracking-widest uppercase text-[var(--charcoal)]/60">
          <Link href="/shop" className={`${!category ? 'text-[var(--gold)] border-b border-[var(--gold)]' : ''} pb-1`}>All</Link>
          <Link href="/shop?category=Women" className={`${category === 'Women' ? 'text-[var(--gold)] border-b border-[var(--gold)]' : ''} pb-1`}>Women</Link>
          <Link href="/shop?category=Men" className={`${category === 'Men' ? 'text-[var(--gold)] border-b border-[var(--gold)]' : ''} pb-1`}>Men</Link>
          <Link href="/shop?category=Accessories" className={`${category === 'Accessories' ? 'text-[var(--gold)] border-b border-[var(--gold)]' : ''} pb-1`}>Accessories</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {products?.map((product) => (
          <Link key={product.id} href={`/shop/${product.id}`} className="group">
            <div className="relative aspect-[3/4] bg-[var(--cream-dark)] overflow-hidden mb-4 shadow-sm">
              <Image src={product.image_url} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-display text-xl text-[var(--charcoal)]">{product.name}</h3>
                <p className="font-serif italic text-xs opacity-50">{product.category}</p>
              </div>
              <span className="font-serif text-[var(--charcoal)]">${product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
