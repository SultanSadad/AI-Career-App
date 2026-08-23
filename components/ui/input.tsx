import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && <label className="block text-xs font-bold text-neutral-700">{label}</label>}
        <input
          ref={ref}
          className={`w-full text-xs p-2.5 rounded-xl border bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
              : "border-neutral-200 focus:border-black"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && <label className="block text-xs font-bold text-neutral-700">{label}</label>}
        <textarea
          ref={ref}
          className={`w-full text-xs p-2.5 rounded-xl border bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
              : "border-neutral-200 focus:border-black"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";