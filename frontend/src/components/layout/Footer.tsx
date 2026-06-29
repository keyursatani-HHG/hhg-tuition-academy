import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/layout/Logo";
import { siteConfig, navLinks } from "@/lib/site-config";

const socials = [
  {
    label: "Facebook",
    href: siteConfig.socials.facebook,
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    label: "Instagram",
    href: siteConfig.socials.instagram,
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/20 bg-surface-container-lowest pb-10 pt-20">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Logo size="sm" />
            <p className="text-body-md text-on-surface-variant">
              Empowering students through academic excellence and personalized
              mentorship since {siteConfig.establishedYear}.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-label-sm font-bold uppercase tracking-widest text-on-surface">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-on-surface-variant transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="text-label-sm font-bold uppercase tracking-widest text-on-surface">
              Contact Info
            </h4>
            <div className="flex flex-col gap-4 text-on-surface-variant">
              <div className="flex gap-3">
                <Icon name="location_on" className="text-primary" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex gap-3">
                <Icon name="call" className="text-primary" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex gap-3">
                <Icon name="mail" className="text-primary" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-outline-variant/20 pt-10 md:flex-row">
          <p className="text-label-md text-on-surface-variant">
            © {siteConfig.establishedYear + 12} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-primary transition-all hover:bg-primary hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
