import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence.
 * Essential for resolving Tailwind class conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with currency.
 * Updated to handle different locales and ensure it defaults to NGN/USD appropriately.
 */
export function formatPrice(
  price: number, 
  currency: string = "USD", 
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price);
}

/**
 * Truncate text with ellipsis safely.
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate SEO-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Deep clone an object using the modern native API.
 * Replaced JSON.parse/stringify with structuredClone for better performance/data support.
 */
export function deepClone<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;
  return structuredClone(obj);
}

/**
 * Environment Checks
 */
export const isClient = typeof window !== "undefined";
export const isServer = !isClient;
