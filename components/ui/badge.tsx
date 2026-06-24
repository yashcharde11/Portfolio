import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-mono text-sm tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-border bg-foreground/[0.03] px-3.5 py-1.5 text-muted-foreground",
        outline: "border-border px-3.5 py-1.5 text-muted-foreground",
        accent:
          "border-primary/30 bg-primary/10 px-3.5 py-1.5 text-primary",
        live: "border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-emerald-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
