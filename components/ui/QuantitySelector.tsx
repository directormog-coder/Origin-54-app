"use client";

import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function QuantitySelector({ 
  value, 
  onChange, 
  min = 1, 
  max = 99,
  className 
}: QuantitySelectorProps) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={decrease}
        disabled={value <= min}
        className="w-10 h-10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--gold)] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-display text-lg"
        aria-label="Decrease quantity"
      >
        −
      </button>
      
      <span className="w-12 text-center font-display text-lg text-[var(--charcoal)]">
        {value}
      </span>
      
      <button
        onClick={increase}
        disabled={value >= max}
        className="w-10 h-10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--gold)] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-display text-lg"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30