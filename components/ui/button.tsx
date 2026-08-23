import * as React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold transition rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variants = {
      default: "bg-neutral-950 text-white hover:bg-neutral-800",
      secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
      outline: "border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300",
      ghost: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
      danger: "bg-red-600 text-white hover:bg-red-700",
      accent: "bg-[#FFEB43] text-neutral-950 hover:bg-[#ffe724] shadow-xs",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-xs px-4 py-2.5 gap-2",
      lg: "text-sm px-5 py-3 gap-2.5",
      icon: "p-2 shrink-0 aspect-square",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";