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
  whatsappNumber: "917698406361", // E.164 without '+', used for wa.me link
  contact: {
    address:
      "420, Silver Business Hub, Bapasitaram Chowk, BRTS Rd, Simada Gam, Surat, Gujarat 395011",
    // Structured address for local SEO
    streetAddress:
      "420, Silver Business Hub, Bapasitaram Chowk, BRTS Rd, Simada Gam",
    locality: "Surat",
    region: "Gujarat",
    postalCode: "395011",
    country: "IN",
    phone: "+91 76984 06361",
    email: "hhgsoftechteam11@gmail.com",
  },
  // Real geo coordinates for local/GEO SEO (from Google Maps)
  geo: { latitude: 21.218216, longitude: 72.895207 },
  // Socials intentionally omitted.
  socials: {} as Record<string, string>,
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
