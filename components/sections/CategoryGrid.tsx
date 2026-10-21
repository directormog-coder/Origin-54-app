import Link from "next/link";

type Category = {
  title: string;
  sub: string;
  color: string;
  accent: string;
};

const categories: Category[] = [
  { title: "WOMEN", sub: "Luxury Womenswear", color: "var(--terracotta)", accent: "var(--cream)" },
  { title: "MEN", sub: "Elevated Menswear", color: "var(--charcoal)", accent: "var(--gold)" },
  { title: "CHILDREN", sub: "The Next Generation", color: "var(--tan)", accent: "var(--cream)" },
  { title: "ACCESSORIES", sub: "Artisan Craft", color: "var(--gold)", accent: "var(--charcoal)" },
];

export default function CategoryGrid() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={`/shop?category=${cat.title}`}
            className="group relative aspect-[4/5] overflow-hidden shadow-lg"
          >
            <div
              style={{ backgroundColor: cat.color }}
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 opacity-10 tribal-bg" />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
              <h2
                className="font-display text-4xl leading-none"
                style={{ color: cat.accent }}
              >
                {cat.title}
              </h2>
              <p
                className="font-serif italic text-sm opacity-80 mt-2"
                style={{ color: cat.accent }}
              >
                {cat.sub}
              </p>
              <div
                className="h-[1px] w-0 transition-all duration-500 group-hover:w-full mt-4"
                style={{ backgroundColor: cat.accent }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
