import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Origin 54 - The Asili Collective",
    short_name: "Origin 54",
    description: "African luxury fashion rooted in heritage and artisan craftsmanship.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F1EA",
    theme_color: "#C59D3F",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
