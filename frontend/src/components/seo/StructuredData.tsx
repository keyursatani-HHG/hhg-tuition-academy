import { siteConfig, siteUrl } from "@/lib/site-config";

/**
 * JSON-LD structured data for search engines.
 *
 * Emits an EducationalOrganization that is ALSO a LocalBusiness — the
 * combination gives Google both the "school/course provider" signal and the
 * local/GEO signals (postal address, geo coordinates, area served, hours)
 * needed to appear in local search and map results.
 */
export function StructuredData() {
  const sameAs = Object.values(siteConfig.socials).filter(
    (u) => u && u !== "#",
  );

  const organization = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    foundingDate: String(siteConfig.establishedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.streetAddress,
      addressLocality: siteConfig.contact.locality,
      addressRegion: siteConfig.contact.region,
      postalCode: siteConfig.contact.postalCode,
      addressCountry: siteConfig.contact.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.contact.locality,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
