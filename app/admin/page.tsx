'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

// Category mapping based on your initial prompt
const CATEGORIES = ['WOMEN', 'MEN', 'CHILDREN', 'ACCESSORIES'];
const REGIONS = ['West Africa', 'East Africa', 'North Africa', 'Southern Africa', 'Central Africa'];

export default function DirectorDashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [region, setRegion] = useState(REGIONS[0]);
  const [artisan, setArtisan] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [provenance, setProvenance] = useState('');

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Access check for authenticated Director role
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setMessage('Error: Authenticated session required.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('products').insert([
      {
        name,
        category,
        region,
        artisan_guild: artisan,
        price_zar: parseFloat(price),
        image_url: imageUrl,
        provenance_story: provenance,
      },
    ]);

    if (error) {
      setMessage(`Error inserting product: ${error.message}`);
    } else {
      setMessage('Design published successfully to the Vault!');
      // Clear form
      setName('');
      setArtisan('');
      setPrice('');
      setImageUrl('');
      setProvenance('');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#FAF6F0] p-12 text-[#1C242B]">
      <h1 className="text-4xl font-serif font-bold text-[#C85A32] mb-10">Director Control Panel</h1>
      
      <form onSubmit={handlePublish} className="max-w-3xl space-y-6 font-sans">
        <h2 className="text-xl font-semibold border-b border-[#D99B26]/30 pb-3">Publish New Masterpiece</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <input type="text" placeholder="Design Name (e.g., Terracotta Trench Coat)" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
          <input type="number" placeholder="Price (ZAR)" value={price} onChange={(e) => setPrice(e.target.value)} className="input-field" required />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field">
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="input-field">
            {REGIONS.map(reg => <option key={reg} value={reg}>{reg}</option>)}
          </select>
        </div>

        <input type="text" placeholder="Artisan/Guild (e.g., Kente Master Weavers)" value={artisan} onChange={(e) => setArtisan(e.target.value)} className="input-field" />
        
        <input type="url" placeholder="Public Image URL (e.g., imagehost.com/design1.png)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="input-field" required />

        <textarea placeholder="Provenance & Story (Ancestral Tech details...)" value={provenance} onChange={(e) => setProvenance(e.target.value)} className="input-field h-40" required />

        <button type="submit" disabled={loading} className="w-full py-4 bg-[#C85A32] text-white font-bold rounded-lg hover:bg-[#A6452A] transition disabled:opacity-50">
          {loading ? 'Publishing...' : 'Add to Live Catalog'}
        </button>
        {message && <p className="text-center font-mono text-sm mt-4 text-[#C85A32]">{message}</p>}
      </form>
    </main>
  );
}
