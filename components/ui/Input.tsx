import { forwardRef, type ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <label className="block w-full">
        {label && (
          <span className="mb-2 block font-display text-xs uppercase tracking-[0.2em] text-[var(--charcoal)]/70">
            {label}
          </span>
        )}

        <input
          ref={ref}
          {...props}
          className={[
            "w-full rounded-none border border-[var(--charcoal)]/20 bg-white px-4 py-3 text-sm text-[var(--charcoal)] outline-none transition focus:border-[var(--gold)]",
            className,
            error ? "border-red-500" : "",
          ].join(" ")}
        />

        {error && (
          <span className="mt-2 block text-xs text-red-600">{error}</span>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
