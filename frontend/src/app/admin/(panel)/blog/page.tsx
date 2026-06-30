"use client";

import { CrudResource, type Column, type Field } from "@/components/admin/CrudResource";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  is_published: boolean;
}

const columns: Column<BlogPost>[] = [
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  { key: "slug", label: "Slug", render: (r) => <span className="text-on-surface-variant">/{r.slug}</span> },
  {
    key: "is_published",
    label: "Status",
    render: (r) => (
      <span className={r.is_published ? "font-semibold text-primary" : "text-on-surface-variant"}>
        {r.is_published ? "Published" : "Draft"}
      </span>
    ),
  },
];

const fields: Field[] = [
  { name: "cover_image_url", label: "Cover Image", type: "image" },
  { name: "title", label: "Title", required: true },
  { name: "author", label: "Author", default: "HHG Academy" },
  { name: "excerpt", label: "Excerpt (short summary)", type: "textarea" },
  { name: "content", label: "Content", type: "textarea" },
  { name: "is_published", label: "Published", type: "checkbox", default: true },
];

export default function AdminBlogPage() {
  return (
    <CrudResource<BlogPost>
      title="Blog Posts"
      subtitle="Write and manage articles shown on the public blog."
      endpoint="/blog"
      columns={columns}
      fields={fields}
      addLabel="New Post"
    />
  );
}
