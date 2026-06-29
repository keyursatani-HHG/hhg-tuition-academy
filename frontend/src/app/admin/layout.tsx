import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Panel | HHG Tuition Academy",
  robots: { index: false, follow: false },
};

/** Root admin layout — provides auth context to login + panel pages. */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
