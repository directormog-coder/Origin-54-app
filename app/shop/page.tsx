'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const supabase = createClient();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error) {
        setProducts(data || []);
        setFilteredProducts(data || []);
      }
    }
    fetchProducts();
  }, []);

  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    setFilteredProducts(category === 'ALL' ? products : products.filter(p => p.category === category));
  };

  return (
    <main className="container mx-auto p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-black tracking-tighter mb-8">SHOP THE <span className="text-[#D97706]">54</span></h1>
      
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {['ALL', 'Woman', 'Man', 'Children', 'Accessories'].map(cat => (
          <button 
            key={cat} 
            onClick={() => filterByCategory(cat)}
            className={`px-8 py-2 rounded-full border-2 transition-all font-bold uppercase text-xs tracking-widest ${activeCategory === cat ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredProducts.map(product => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-50 mb-4">
              <Image 
                src={product.image_url} 
                alt={product.name} 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={true}
              />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-tight">{product.name}</h3>
            <p className="text-xs text-[#D97706] font-bold mt-1">${product.price}</p>
            <button className="w-full mt-4 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
              Add to Bag
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}