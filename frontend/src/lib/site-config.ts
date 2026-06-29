/**
 * Global site configuration: branding, navigation, contact details, and socials.
 * Centralized so the Navbar, Footer, and (later) API-driven content stay in sync.
 */

export const siteConfig = {
  name: "HHG Tuition Academy",
  shortName: "HHG Tuition",
  tagline: "Empowering Academic Excellence",
  establishedYear: 2014,
  whatsappNumber: "1234567890", // E.164 without '+', used for wa.me link
  contact: {
    address:
      "123 Academic Excellence Way, Education District, London, UK",
    phone: "+44 (0) 20 7946 0123",
    email: "admissions@hhgacademy.edu",
  },
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
  { label: "Contact", href: "/contact" },
];
