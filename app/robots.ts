import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
  };
}



// Deep Repair Sync: 2026-04-11 17:28:30