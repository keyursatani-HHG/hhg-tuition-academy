import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

interface LogoProps {
  /** Size of the icon badge: "md" for navbar, "sm" for footer. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Brand lockup: blue rounded badge with a school icon + stacked wordmark.
 * Matches the navbar/footer logo in the Stitch design (icon-based, no image asset).
 */
export function Logo({ size = "md", className }: LogoProps) {
  const badge = size === "md" ? "w-12 h-12" : "w-10 h-10";
  const iconSize = size === "md" ? "text-3xl" : "text-2xl";
  const wordmark = size === "md" ? "text-headline-md" : "text-xl";
  const sub = size === "md" ? "text-label-sm" : "text-[10px]";

  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-primary",
          badge,
        )}
      >
        <Icon name="school" className={cn("text-white", iconSize)} />
      </div>
      <div
        className={cn("font-bold leading-none text-primary", wordmark)}
      >
        HHG Tuition
        <br />
        <span
          className={cn(
            "font-medium uppercase tracking-[0.2em] text-on-surface",
            sub,
          )}
        >
          Academy
        </span>
      </div>
    </Link>
  );
}
