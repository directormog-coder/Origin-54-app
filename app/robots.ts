import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/account/", "/orders/", "/checkout/"],
      },
    ],
    sitemap: "https://origin-54-app.vercel.app/sitemap.xml",
  }
}

