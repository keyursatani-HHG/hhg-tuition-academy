/**
 * Global site configuration: branding, navigation, contact details, and socials.
 * Centralized so the Navbar, Footer, and (later) API-driven content stay in sync.
 */

/** Public site URL — used for canonical URLs, sitemap, OG tags, and JSON-LD.
 *  Set NEXT_PUBLIC_SITE_URL in production (e.g. https://hhg-academy.vercel.app). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "HHG Tuition Academy",
  shortName: "HHG Tuition",
  tagline: "Empowering Academic Excellence",
  description:
    "Best tuition classes for academic excellence. Expert teachers, small batches and proven results across Secondary, Higher Secondary, Science and Commerce streams.",
  establishedYear: 2014,
  whatsappNumber: "1234567890", // E.164 without '+', used for wa.me link
  contact: {
    address: "123 Academic Excellence Way, Education District, London, UK",
    // Structured address for local SEO (update to your real values)
    streetAddress: "123 Academic Excellence Way",
    locality: "London",
    region: "England",
    postalCode: "EC1A 1BB",
    country: "GB",
    phone: "+44 (0) 20 7946 0123",
    email: "admissions@hhgacademy.edu",
  },
  // Approximate geo coordinates for local/GEO SEO (update to your real location)
  geo: { latitude: 51.5074, longitude: -0.1278 },
  socials: {
    facebook: "#",
    linkedin: "#",
    instagram: "#",
  },
} as const;

export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation — dedicated routes for each public page. */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Achievements", href: "/achievements" },
  { label: "Faculty", href: "/faculty" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
