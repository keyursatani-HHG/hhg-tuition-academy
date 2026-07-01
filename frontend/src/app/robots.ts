import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";

/** Generates /robots.txt — allow everything except the admin area. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
