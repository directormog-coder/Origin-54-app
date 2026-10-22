import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "ORIGIN 54 — The Asili Collective | Pan-African Luxury",
  description:
    "Bridging ancient African craftsmanship with modern global luxury for the continent and the worldwide diaspora.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-stone-950 text-stone-100 antialiased font-sans min-h-screen flex flex-col">
        <Header />
        <CartDrawer />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
