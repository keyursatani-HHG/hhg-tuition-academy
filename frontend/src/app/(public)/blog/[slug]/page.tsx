import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { getBlogPost } from "@/lib/public-api";
import { assetUrl } from "@/lib/api";

interface Props {
  params: { slug: string };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: "Post not found | HHG Tuition Academy" };
  return {
    title: `${post.title} | HHG Tuition Academy`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n").filter((p) => p.trim().length > 0);

  return (
    <article className="bg-surface pb-24">
      {/* Header */}
      <div className="border-b border-outline-variant/20 bg-surface-container-low py-16">
        <div className="mx-auto max-w-3xl px-margin-mobile md:px-margin-desktop">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-label-md font-bold text-primary hover:underline"
          >
            <Icon name="arrow_back" className="text-lg" />
            Back to Blog
          </Link>
          <h1 className="text-[34px] font-bold leading-tight tracking-[-0.02em] text-on-surface md:text-display">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-label-md text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <Icon name="person" className="text-lg text-primary" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="calendar_month" className="text-lg text-primary" />
              {formatDate(post.created_at)}
            </span>
          </div>
        </div>
      </div>

      {/* Cover */}
      {post.cover_image_url && (
        <div className="mx-auto max-w-4xl px-margin-mobile pt-12 md:px-margin-desktop">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl ambient-shadow">
            <Image
              src={assetUrl(post.cover_image_url)}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="mx-auto max-w-3xl px-margin-mobile pt-12 md:px-margin-desktop">
        <div className="flex flex-col gap-6">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-body-lg leading-relaxed text-on-surface-variant">
              {para}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
