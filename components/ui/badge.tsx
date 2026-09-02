import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "blue" | "success" | "warning" | "ai";
}

export function Badge({
  className = "",
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  const variants: Record<string, string> = {
    neutral: "bg-[#E8E8ED] text-[#1D1D1F]",
    blue: "bg-[#0071E3]/10 text-[#0071E3]",
    success: "bg-emerald-500/10 text-emerald-700",
    warning: "bg-amber-500/10 text-amber-800",
    ai: "bg-gradient-to-r from-[#0071E3]/10 to-[#9333EA]/10 text-[#0071E3] border border-[#0071E3]/20 font-medium",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-tight ${variants[variant] || variants.neutral} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}