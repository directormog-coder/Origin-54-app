import type { Metadata } from "next";
import { Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";

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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* Added suppressHydrationWarning here to stop the refresh loop */
    <html 
      lang="en" 
      className={`${cormorant.variable} ${bebas.variable}`}
      suppressHydrationWarning
    >
      <body 
        className="bg-[#FAF3E8] text-[#2C3E50] antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
