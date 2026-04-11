export default function HeritageSection() {
  return (
    <section className="py-24 bg-[var(--cream)] relative overflow-hidden tribal-bg">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <p className="text-[var(--gold)] font-display tracking-[0.4em] text-xs uppercase">The Philosophy</p>
        <h2 className="text-5xl md:text-7xl font-display text-[var(--charcoal)] uppercase leading-tight">
          Modern Design. <br />
          <span className="text-[var(--gold)]">Ancient Wisdom.</span>
        </h2>
        <div className="w-16 h-[1px] bg-[var(--gold)] mx-auto" />
        <p className="font-serif text-xl md:text-2xl text-[var(--charcoal)]/80 italic leading-relaxed">
          "Asili Collective is a return to the source. We believe luxury isn't just about price, 
          but the time, prayer, and history woven into every thread."
        </p>
      </div>
    </section>
  );
}
