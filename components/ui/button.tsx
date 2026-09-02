import * as React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "apple-blue" | "ghost" | "danger" | "ai";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-tight rounded-full transition-all duration-200 ease-out focus:outline-none focus:ring-4 focus:ring-neutral-200 disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none";

    const sizes: Record<string, string> = {
      sm: "px-3.5 py-1.5 text-xs gap-1.5",
      md: "px-5 py-2.5 text-xs md:text-sm gap-2",
      lg: "px-7 py-3.5 text-sm md:text-base gap-2.5",
      icon: "p-2.5 rounded-full",
    };

    const variants: Record<string, string> = {
      primary:
        "bg-[#1D1D1F] text-white hover:bg-[#333336] active:scale-[0.98] shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
      secondary:
        "bg-[#E8E8ED] text-[#1D1D1F] hover:bg-[#DEDEE3] active:scale-[0.98]",
      "apple-blue":
        "bg-[#0071E3] text-white hover:bg-[#0077ED] active:scale-[0.98] shadow-[0_2px_8px_rgba(0,113,227,0.25)]",
      ai: "bg-[#1D1D1F] text-white hover:bg-[#333336] active:scale-[0.98] shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
      ghost: "text-[#1D1D1F] hover:bg-neutral-200/60 active:scale-[0.98]",
      danger:
        "text-rose-600 hover:bg-rose-50 border border-transparent active:scale-[0.98]",
    };

    const selectedSize = sizes[size] || sizes.md;
    const selectedVariant = variants[variant] || variants.primary;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${selectedSize} ${selectedVariant} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";