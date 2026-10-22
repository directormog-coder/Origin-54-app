import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "WOMEN",
    subtitle: "Luxury Womenswear",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000",
    href: "/category/women",
    previewItem: "Kente Drape Silk Gown",
  },
  {
    title: "MEN",
    subtitle: "Elevated Menswear",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
    href: "/category/men",
    previewItem: "Structured Tailored Blazer",
  },
  {
    title: "FOOTWEAR",
    subtitle: "Artisanal & Leatherwork",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000",
    href: "/category/footwear",
    previewItem: "Hand-Burnished Leather Boots",
  },
  {
    title: "JEWELRY",
    subtitle: "Fine Adornment & Metals",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000",
    href: "/category/jewelry",
    previewItem: "Hand-Carved Brass Cuffs",
  },
  {
    title: "ACCESSORIES",
    subtitle: "Leather Goods & Scarves",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1000",
    href: "/category/accessories",
    previewItem: "Woven Pattern Travel Tote",
  },
  {
    title: "LIMITED CAPSULES",
    subtitle: "Exclusive Runway Drops",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000",
    href: "/category/capsules",
    previewItem: "Origin 54 Heritage Jacket",
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group relative h-[450px] w-full overflow-hidden rounded-xl bg-stone-900 border border-stone-800 shadow-md transition-all duration-300 hover:shadow-2xl"
          >
            {/* Background High-Res Image */}
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-75 group-hover:opacity-85"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Dark Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Top Badge Placeholder */}
            <div className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-200">
                In Stock
              </span>
            </div>

            {/* Bottom Content Labels & Featured Item Placeholder */}
            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <p className="text-xs uppercase tracking-widest text-amber-300/90 font-medium mb-1">
                {cat.subtitle}
              </p>
              <h3 className="text-2xl font-bold tracking-wider font-serif">
                {cat.title}
              </h3>
              
              {/* Product Placeholder Tag Inside Card */}
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-stone-300">
                <span className="italic truncate">{cat.previewItem}</span>
                <span className="font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  Explore &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
