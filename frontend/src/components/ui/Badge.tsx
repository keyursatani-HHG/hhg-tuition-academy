import { cn } from "@/lib/utils";

type BadgeVariant = "chip" | "primary" | "tertiary" | "primary-container";

const variants: Record<BadgeVariant, string> = {
  // Category chip: subtle blue tint background with dark blue text (DESIGN_SYSTEM.md)
  chip: "bg-surface-container text-primary",
  primary: "bg-primary text-white",
  tertiary: "bg-tertiary text-white",
  "primary-container": "bg-primary-container text-white",
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

/**
 * Pill indicator used for category tags and achievement badges.
 */
export function Badge({ variant = "chip", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-label-sm font-bold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
