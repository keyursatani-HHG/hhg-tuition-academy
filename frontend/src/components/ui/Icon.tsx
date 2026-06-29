import { cn } from "@/lib/utils";

interface IconProps {
  /** Material Symbols Outlined ligature name, e.g. "school", "trending_flat". */
  name: string;
  className?: string;
  /** Render the filled variant of the symbol. */
  filled?: boolean;
}

/**
 * Material Symbols Outlined icon. The font is loaded globally in the root layout.
 */
export function Icon({ name, className, filled = false }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined select-none", className)}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}
