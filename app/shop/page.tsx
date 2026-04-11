'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard'; // Adjust path if needed
import { createClient } from '@/lib/supabase/client'; // Uses the repaired path!

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL'); // Handle 'All' view

  // Categories MUST match the SQL precisely (capitalization matters!)
  const categories = ['ALL', 'Woman', 'Man', 'CHILDREN', 'ACCESSORIES'];
  const supabase = createClient();

  // Fetch all products once on load
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
        setFilteredProducts(data || []); // Default to showing all
      }
    }
    fetchProducts();
  }, [supabase]);

  // The dynamic filtering function
  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    if (category === 'ALL') {
      setFilteredProducts(products); // Reset the view
    } else {
      const filtered = products.filter((p) => p.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-origin-black">Origin 54 Collection</h1>

      {/* 1. The Dynamic Tiles (Category Selector) */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className={p-6 border-2 text-center rounded-lg transition-all 
              }
          >
            {cat}
          </button>
        ));
      </section>

      {/* 2. The Dynamic Product Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      
      {/* 3. Handle Empty Category */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-origin-gray">
          <p>No unique {activeCategory.toLowerCase()} pieces are available at the moment.</p>
          <p>Please check back soon.</p>
        </div>
      )}
    </main>
  );
}
