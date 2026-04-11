import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-display tracking-widest text-sm transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          
          // Variants
          variant === "primary" && "bg-[var(--gold)] text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-[var(--cream)]",
          variant === "secondary" && "bg-[var(--charcoal)] text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--charcoal)]",
          variant === "outline" && "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--charcoal)]",
          variant === "ghost" && "text-[var(--charcoal)] hover:text-[var(--gold)]",
          
          // Sizes
          size === "sm" && "px-6 py-3 text-xs",
          size === "md" && "px-10 py-4",
          size === "lg" && "px-16 py-5 text-base",
          
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            LOADING...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;


