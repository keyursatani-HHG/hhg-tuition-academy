import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Shared hero header for inner public pages: soft tinted band with an optional
 * eyebrow label, large headline, supporting copy, and optional actions/content.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  className,
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "border-b border-outline-variant/20 bg-surface-container-low py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        {eyebrow && (
          <span className="mb-4 inline-block rounded-full bg-surface-container px-4 py-1.5 text-label-sm font-bold uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-4xl text-[40px] font-bold leading-tight tracking-[-0.02em] text-on-surface md:text-display">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
