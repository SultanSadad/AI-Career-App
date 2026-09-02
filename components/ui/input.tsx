import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, hint, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="space-y-1.5 w-full text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-[#86868B] tracking-tight"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full px-4 py-3 text-sm rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] placeholder:text-[#86868B] border border-transparent focus:border-[#0071E3] focus:bg-white focus:outline-none transition-all duration-200 ${
            error
              ? "border-rose-400 bg-rose-50/40 focus:border-rose-500"
              : "hover:bg-[#EBEBEF]"
          } ${className}`}
          {...props}
        />
        {hint && !error && (
          <p className="text-[12px] text-[#86868B] leading-normal">{hint}</p>
        )}
        {error && (
          <p className="text-[12px] text-rose-600 font-medium">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";