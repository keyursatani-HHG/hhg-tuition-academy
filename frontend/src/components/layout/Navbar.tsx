"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";

/**
 * Fixed top navigation bar. Adds a subtle shadow once the page is scrolled and
 * provides a slide-down mobile menu below the `md` breakpoint.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 h-24 w-full bg-white/90 backdrop-blur-md transition-all duration-300",
        scrolled ? "shadow-md" : "shadow-sm",
      )}
    >
      <nav className="mx-auto flex h-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center space-x-10 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-2 text-label-md font-medium transition-colors",
                  active
                    ? "border-b-2 border-primary font-bold text-primary"
                    : "text-on-surface-variant hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Button href="/contact" className="hidden md:inline-flex">
            Enroll Now
          </Button>
          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-primary hover:bg-surface-container md:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="text-3xl" />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "overflow-hidden border-t border-outline-variant/20 bg-white/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1 px-margin-mobile py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-label-md font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button
            href="/contact"
            className="mt-2 w-full"
            onClick={() => setOpen(false)}
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </header>
  );
}
