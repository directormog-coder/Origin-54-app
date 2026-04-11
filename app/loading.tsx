export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[var(--cream)] tribal-bg">
      {/* The Animated Gold Ring */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-[var(--gold)]/10 border-t-[var(--gold)] animate-spin" />
        {/* Optional: A tiny dot in the middle for more luxury feel */}
        <div className="absolute inset-0 m-auto w-1 h-1 bg-[var(--gold)] rounded-full" />
      </div>

      {/* Branded Loading Text */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-display text-sm tracking-[0.4em] text-[var(--gold)] uppercase animate-pulse">
          Origin 54
        </span>
        <span className="font-serif italic text-[10px] text-[var(--charcoal)]/40 tracking-widest uppercase">
          The Asili Collective
        </span>
      </div>

      {/* We use standard Tailwind 'animate-spin', so we don't need the <style> tag anymore! */}
    </div>
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30