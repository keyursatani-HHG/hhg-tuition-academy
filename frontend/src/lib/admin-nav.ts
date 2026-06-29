export interface AdminNavItem {
  label: string;
  href: string;
  icon: string; // Material Symbols name
  section?: string;
}

/** Sidebar navigation for the admin panel (matches the Stitch dashboard design). */
export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "dashboard", section: "Main Menu" },
  { label: "Students", href: "/admin/students", icon: "groups", section: "Main Menu" },
  { label: "Courses", href: "/admin/courses", icon: "menu_book", section: "Main Menu" },
  { label: "Inquiries", href: "/admin/inquiries", icon: "forum", section: "Main Menu" },
  { label: "Faculty", href: "/admin/faculty", icon: "badge", section: "Main Menu" },
  { label: "Achievements", href: "/admin/achievements", icon: "star", section: "Content" },
  { label: "Gallery", href: "/admin/gallery", icon: "photo_library", section: "Content" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "reviews", section: "Content" },
];
