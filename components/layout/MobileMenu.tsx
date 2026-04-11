"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import CartIcon from "@/components/cart/CartIcon";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[var(--charcoal)]"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span className={cn(
            "w-full h-0.5 bg-current transition-all duration-300",
            isOpen && "rotate-45 translate-y-2"
          )} />
          <span className={cn(
            "w-full h-0.5 bg-current transition-all duration-300",
            isOpen && "opacity-0"
          )} />
          <span className={cn(
            "w-full h-0.5 bg-current transition-all duration-300",
            isOpen && "-rotate-45 -translate-y-2"
          )} />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-50 bg-[var(--cream)] transition-transform duration-500 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-20 px-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-[var(--charcoal)]"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-3xl uppercase tracking-widest text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pb-8">
            <CartIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
