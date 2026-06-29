import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HHG Tuition Academy | Empowering Academic Excellence",
  description:
    "Best tuition classes for academic excellence. Expert teachers, small batches, and proven results across Secondary, Higher Secondary, Science and Commerce streams.",
  metadataBase: new URL("https://hhgacademy.edu"),
  openGraph: {
    title: "HHG Tuition Academy | Empowering Academic Excellence",
    description:
      "Expert Teachers | Small Batches | Proven Results. Empowering the next generation of leaders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Material Symbols Outlined — variable icon font used across the design */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="font-sans antialiased bg-background text-on-surface">
        {children}
      </body>
    </html>
  );
}
