import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Standard section heading: headline + optional supporting paragraph.
 */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "text-left",
        className,
      )}
    >
      <h2 className="mb-4 text-headline-lg font-bold text-on-surface">
        {title}
      </h2>
      {subtitle && (
        <p className="text-body-md text-on-surface-variant">{subtitle}</p>
      )}
    </div>
  );
}
