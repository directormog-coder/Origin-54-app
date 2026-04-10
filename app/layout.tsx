import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

// Luxury Serif Font for body text and heritage feel
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap", // Ensures text is visible while font loads
});

// Bold Display Font for headers and call-to-actions
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

// Modern way to handle mobile scaling and theme colors
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F8F1EA", // Matches your 'cream' background
};

export const metadata: Metadata = {
  title: "Origin 54 — The Asili Collective",
  description: "African luxury fashion rooted in heritage and artisan craftsmanship.",
  icons: {
    icon: "/favicon.ico", // Ensure you have this in your /public folder
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${cormorant.variable} ${bebas.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col bg-[var(--cream)] selection:bg-[var(--gold)] selection:text-white">
        <Navbar />
        {/* The 'flex-grow' ensures the footer stays at the bottom even on short pages */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
