type ErrorCardProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorCard({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}: ErrorCardProps) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-none border border-[var(--gold)]/20 bg-[var(--cream)] p-8">
      <div className="max-w-md text-center">
        <h2 className="font-display text-3xl uppercase tracking-wider text-[var(--charcoal)]">
          {title}
        </h2>

        <p className="font-serif text-lg text-[var(--charcoal)]/70">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center justify-center border border-[var(--gold)] px-6 py-3 font-display text-xs uppercase tracking-[0.2em] text-[var(--charcoal)] transition hover:bg-[var(--gold)] hover:text-[var(--charcoal)]"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
