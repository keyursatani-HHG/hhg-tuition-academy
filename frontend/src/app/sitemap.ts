import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";
import { getBlogPosts } from "@/lib/public-api";

/** Generates /sitemap.xml — static public pages plus every published blog post. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/courses",
    "/faculty",
    "/achievements",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    postRoutes = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // If the backend is unreachable, still return the static routes.
  }

  return [...staticRoutes, ...postRoutes];
}
