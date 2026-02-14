import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "default" && "bg-gray-900 text-gray-50",
        variant === "secondary" && "bg-gray-100 text-gray-900",
        variant === "outline" && "border border-gray-200 text-gray-950",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
