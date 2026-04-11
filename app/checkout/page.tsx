"use client";

import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          amount: total,
          metadata: {
            cartItems: items,
            customer: formData,
          },
        }),
      });

      const data = await response.json();

      if (data.authorization_url) {
        clearCart();
        window.location.href = data.authorization_url;
      } else {
        throw new Error("Failed to initialize payment");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl text-[var(--charcoal)] uppercase mb-16 text-center">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[var(--cream-dark)] p-8 border border-[var(--gold)]/10">
                <h2 className="font-display text-xl uppercase tracking-widest mb-6 text-[var(--charcoal)]">
                  Contact Information
                </h2>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--charcoal)]/20 py-3 font-serif focus:border-[var(--gold)] focus:outline-none transition-colors placeholder:text-[var(--charcoal)]/40"
                />
              </div>

              <div className="bg-[var(--cream-dark)] p-8 border border-[var(--gold)]/10">
                <h2 className="font-display text-xl uppercase tracking-widest mb-6 text-[var(--charcoal)]">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--charcoal)]/20 py-3 font-serif focus:border-[var(--gold)] focus:outline-none transition-colors placeholder:text-[var(--charcoal)]/40"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--charcoal)]/20 py-3 font-serif focus:border-[var(--gold)] focus:outline-none transition-colors placeholder:text-[var(--charcoal)]/40"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--charcoal)]/20 py-3 font-serif focus:border-[var(--gold)] focus:outline-none transition-colors placeholder:text-[var(--charcoal)]/40 mb-4"
                />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--charcoal)]/20 py-3 font-serif focus:border-[var(--gold)] focus:outline-none transition-colors placeholder:text-[var(--charcoal)]/40"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--charcoal)]/20 py-3 font-serif focus:border-[var(--gold)] focus:outline-none transition-colors placeholder:text-[var(--charcoal)]/40"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--charcoal)]/20 py-3 font-serif focus:border-[var(--gold)] focus:outline-none transition-colors placeholder:text-[var(--charcoal)]/40"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[var(--gold)] text-[var(--charcoal)] py-5 font-display tracking-widest text-sm hover:bg-[var(--charcoal)] hover:text-[var(--cream)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "PROCESSING..." : `PAY ${formatPrice(total)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-12">
            <div className="bg-[var(--charcoal)] p-8 text-[var(--cream)] sticky top-32">
              <h2 className="font-display text-2xl uppercase tracking-widest mb-8">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-20 bg-[var(--cream)]/10 overflow-hidden">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--gold)] text-[var(--charcoal)] text-xs flex items-center justify-center font-display">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-display text-sm uppercase">{item.name}</p>
                      <p className="font-serif text-xs text-[var(--cream)]/60">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-display text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-[var(--gold)]/30 my-6" />
              
              <div className="flex justify-between font-display text-xl">
                <span>Total</span>
                <span className="text-[var(--gold)]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


