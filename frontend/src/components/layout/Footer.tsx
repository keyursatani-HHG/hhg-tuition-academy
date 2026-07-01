import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/layout/Logo";
import { siteConfig, navLinks } from "@/lib/site-config";

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
        </div>
      </div>
    </footer>
  );
}
