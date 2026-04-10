import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Luxury Serif Font for body text and italics
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

// Bold Display Font for headings (The 'Bebas' look)
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C59D3F", // Origin 54 Gold
};

export const metadata: Metadata = {
  title: {
    default: "Origin 54 — The Asili Collective",
    template: "%s | Origin 54",
  },
  description:
    "Luxury African fashion rooted in heritage. Discover handcrafted clothing and artisan stories from the heart of the continent's 54 nations.",
  metadataBase: new URL("https://origin54.com"), // Replace with your actual domain when live
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Origin 54 — The Asili Collective",
    description: "Handcrafted African Luxury.",
    images: ["/logo.png"],
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
      <body className="bg-[var(--cream)] text-[var(--charcoal)] antialiased min-h-screen flex flex-col">
        
        {/* The persistent Navbar at the top */}
        <Navbar /> 
        
        {/* The 'flex-grow' ensures that if a page has very little content, 
            the footer is still pushed to the bottom of the screen.
        */}
        <main className="flex-grow">
          {children}
        </main>

        {/* The persistent Footer at the bottom */}
        <Footer />

      </body>
    </html>
  );
}
