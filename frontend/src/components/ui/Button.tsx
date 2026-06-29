import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant =
  | "primary" // solid blue (default primary action)
  | "secondary" // white with blue border + blue text
  | "accent" // orange high-conversion CTA
  | "outline-light" // transparent with light border (on dark backgrounds)
  | "white" // white bg with blue text (on dark/blue backgrounds)
  | "soft"; // surface-container fill with blue text

type Size = "md" | "lg" | "xl";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-container hover:shadow-lg active:scale-95",
  secondary:
    "bg-white border border-primary text-primary hover:bg-primary hover:text-white",
  accent: "bg-accent text-white hover:brightness-95 active:scale-95",
  "outline-light":
    "border-2 border-white/50 text-white backdrop-blur-md hover:bg-white/10",
  white:
    "bg-white text-primary hover:bg-primary-container hover:text-white shadow-xl",
  soft: "bg-surface-container text-primary hover:bg-primary-fixed-dim",
};

const sizeStyles: Record<Size, string> = {
  md: "px-8 py-3.5 text-label-md",
  lg: "px-8 py-4 text-base",
  xl: "px-10 py-5 text-lg",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Themed button matching the HHG design system. Renders an <a> (Next Link)
 * when `href` is provided, otherwise a native <button>.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
