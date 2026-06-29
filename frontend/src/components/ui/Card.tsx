import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Apply the interactive hover lift (Level 2 elevation). */
  interactive?: boolean;
  children: React.ReactNode;
}

/**
 * Primary content container: white surface, extra-large radius, ambient shadow.
 * Per DESIGN_SYSTEM.md, internal padding is supplied by the caller (min 32px).
 */
export function Card({
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-container-high/50 bg-white ambient-shadow",
        interactive && "ambient-shadow-hover",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
