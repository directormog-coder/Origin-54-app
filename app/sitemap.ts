import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  
  // Fetch all products
  const { data: products } = await supabase.from("products").select("id, updated_at");
  const { data: artisans } = await supabase.from("artisans").select("id, updated_at");

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://origin54.com";

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/artisans`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const productRoutes = products?.map((product) => ({
    url: `${baseUrl}/shop/${product.id}`,
    lastModified: new Date(product.updated_at || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  })) || [];

  const artisanRoutes = artisans?.map((artisan) => ({
    url: `${baseUrl}/artisans/${artisan.id}`,
    lastModified: new Date(artisan.updated_at || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })) || [];

  return [...staticRoutes, ...productRoutes, ...artisanRoutes];
}



// Final Path Fix Build