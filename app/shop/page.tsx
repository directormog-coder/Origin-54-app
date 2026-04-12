'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Woman', 'Man', 'Children', 'Accessories'];
  const supabase = createClient();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
        setFilteredProducts(data || []);
      }
    }
    fetchProducts();
  }, [supabase]);

  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    if (category === 'ALL') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-black">Origin 54 Collection</h1>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className={`p-6 border-2 text-center rounded-lg transition-all ${
              activeCategory === cat 
                ? 'bg-black text-white border-black font-bold scale-105' 
                : 'bg-white text-black border-gray-200 hover:border-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-sm bg-white">
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors">
              Add to Bag
            </button>
          </div>
        ))}
      </section>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p>No unique {activeCategory.toLowerCase()} pieces are available at the moment.</p>
        </div>
      )}
    </main>
  );
}