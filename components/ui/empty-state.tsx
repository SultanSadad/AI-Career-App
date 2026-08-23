import * as React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = FolderOpen,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 ${className}`}>
      <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-bold text-xs text-neutral-800">{title}</h4>
      {description && <p className="text-[11px] text-neutral-400 mt-1 max-w-xs">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="mt-3">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}