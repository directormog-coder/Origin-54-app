import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://origin-54.vercel.app";

  // Fetch products and categories safely with 'any' casting to prevent type errors
  const { data: products } = await supabase.from("products").select("id, updated_at");
  const { data: artisans } = await supabase.from("artisans").select("id, updated_at");

  const productRoutes = (products || []).map((product: any) => ({
    url: `${baseUrl}/shop/${product.id}`,
    lastModified: new Date(product.updated_at || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const artisanRoutes = (artisans || []).map((artisan: any) => ({
    url: `${baseUrl}/artisans/${artisan.id}`,
    lastModified: new Date(artisan.updated_at || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artisans`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  return [...staticRoutes, ...productRoutes, ...artisanRoutes];
}
