import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "cream" | "charcoal";
}

export default function LoadingSpinner({ 
  className, 
  size = "md", 
  variant = "gold" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const variantClasses = {
    gold: "text-[var(--gold)]",
    cream: "text-[var(--cream)]",
    charcoal: "text-[var(--charcoal)]",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <div className={cn(
          "absolute inset-0 rounded-full border-2 border-current opacity-20",
          variantClasses[variant]
        )} />
        <div className={cn(
          "absolute inset-0 rounded-full border-2 border-t-transparent border-current animate-spin",
          variantClasses[variant]
        )} />
      </div>
    </div>
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30