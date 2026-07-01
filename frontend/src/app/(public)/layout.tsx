import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { StructuredData } from "@/components/seo/StructuredData";

/**
 * Shared chrome for all public marketing pages: fixed navbar, footer, and the
 * floating WhatsApp button. Page content is offset below the 96px navbar.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
