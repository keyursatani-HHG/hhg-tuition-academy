import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { getBlogPosts } from "@/lib/public-api";
import { assetUrl } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog | HHG Tuition Academy",
  description:
    "Study tips, exam strategies and academic insights from the HHG Tuition Academy faculty.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHeader
        eyebrow="Insights & Resources"
        title="The HHG Academy Blog"
        subtitle="Study techniques, exam strategies and academic guidance from our expert educators."
      />

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          {posts.length === 0 ? (
            <p className="py-16 text-center text-body-lg text-on-surface-variant">
              No posts published yet. Check back soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-container-high bg-white ambient-shadow ambient-shadow-hover"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-surface-container">
                    {post.cover_image_url && (
                      <Image
                        src={assetUrl(post.cover_image_url)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="flex flex-grow flex-col p-7">
                    <div className="mb-3 flex items-center gap-3 text-label-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <Icon name="person" className="text-base" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="calendar_month" className="text-base" />
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                    <h3 className="mb-2 text-headline-md font-semibold text-on-surface transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mb-6 flex-grow text-body-md text-on-surface-variant">
                      {post.excerpt}
                    </p>
                    <span className="flex items-center gap-2 font-bold text-primary">
                      Read more
                      <Icon
                        name="arrow_forward"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
