import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import Navbar from "@/components/layout/Navbar"; // Updated path
import Footer from "@/components/layout/Footer";
=======
import Navbar from "@/components/layout/Navbar"; // Corrected path
import Footer from "@/components/layout/Footer"; // Corrected path
>>>>>>> 1c884f001bf5553ae24941ea97044b54e7ae9561

// Luxury Serif Font for body text
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

// Bold Display Font for headers
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F8F1EA", // Matches 'cream' background
};

export const metadata: Metadata = {
  title: "Origin 54 — The Asili Collective",
  description: "African luxury fashion rooted in heritage and artisan craftsmanship.",
  icons: {
    icon: "/favicon.ico",
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
        {/* 'flex-grow' ensures the footer stays at the bottom on short pages */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}





// Deployment Sync: 2026-04-11 17:13:18

// Deep Repair Sync: 2026-04-11 17:28:30