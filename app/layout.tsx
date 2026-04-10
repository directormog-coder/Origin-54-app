import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Make sure you created this file!

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C59D3F", // Updated to your logo's gold
};

export const metadata: Metadata = {
  title: {
    default: "Origin 54 — The Asili Collective",
    template: "%s | Origin 54",
  },
  description:
    "African luxury fashion rooted in heritage. Discover bold, handcrafted clothing from the heart of the continent's 54 nations.",
  keywords: ["African fashion", "luxury clothing", "African designers", "Asili Collective", "Origin 54"],
  openGraph: {
    title: "Origin 54 — The Asili Collective",
    description: "African luxury fashion rooted in heritage.",
    type: "website",
    locale: "en_ZA",
    images: ["/icon-512.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon-32x32.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Origin 54",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${cormorant.variable} ${bebas.variable}`}
      suppressHydrationWarning
    >
      <body 
        className="bg-[var(--cream)] text-[var(--charcoal)] antialiased"
        suppressHydrationWarning
      >
        {/* The Navbar is now global and will show on every page */}
        <Navbar /> 
        
        {/* The main tag ensures content doesn't get hidden behind the fixed Navbar */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
