"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[var(--cream)] px-6 py-20">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-display text-5xl uppercase text-[var(--charcoal)]">
          Something went wrong
        </h2>

        <p className="font-serif text-xl text-[var(--charcoal)]/70">
          {error.message || "An unexpected error occurred."}
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 bg-[var(--gold)] px-6 py-3 font-display tracking-widest text-sm uppercase text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-[var(--cream)]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
