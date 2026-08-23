import * as React from "react";

export function Skeleton({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`animate-pulse rounded-xl bg-neutral-200/70 ${className}`} {...props} />
  );
}