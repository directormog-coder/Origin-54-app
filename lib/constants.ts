// App Constants

export const APP_NAME = "Origin 54";
export const APP_TAGLINE = "The Asili Collective";
export const APP_DESCRIPTION = "African luxury fashion rooted in heritage and artisan craftsmanship.";

export const CATEGORIES = [
  { id: "women", name: "Women", description: "Luxury Womenswear" },
  { id: "men", name: "Men", description: "Elevated Menswear" },
  { id: "children", name: "Children", description: "The Next Generation" },
  { id: "accessories", name: "Accessories", description: "Artisan Craft" },
] as const;

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/artisans", label: "Artisans" },
  { href: "/about", label: "About" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/origin54",
  twitter: "https://twitter.com/origin54",
  facebook: "https://facebook.com/origin54",
} as const;

export const CONTACT = {
  email: "hello@origin54.com",
  phone: "+234 800 000 0000",
  address: "Lagos, Nigeria",
};


