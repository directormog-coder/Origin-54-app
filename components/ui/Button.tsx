import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'gold' | 'outline' | 'charcoal';
}

export default function Button({ children, variant = 'gold', ...props }: ButtonProps) {
  const styles = {
    gold: "bg-[var(--gold)] text-white hover:bg-[var(--tan)]",
    outline: "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)]/5",
    charcoal: "bg-[var(--charcoal)] text-[var(--cream)] hover:bg-[var(--gold)]"
  };

  return (
    <button 
      className={`${styles[variant]} px-10 py-4 font-display tracking-widest text-sm transition-all duration-300 uppercase shadow-md disabled:opacity-50`}
      {...props}
    >
      {children}
    </button>
  );
}
