"use client";

import Image from "next/image";
import { CrudResource, type Column, type Field } from "@/components/admin/CrudResource";

interface GalleryImage {
  id: number;
  image_url: string;
  caption: string;
  display_order: number;
  is_published: boolean;
}

const columns: Column<GalleryImage>[] = [
  {
    key: "image_url",
    label: "Preview",
    render: (r) => (
      <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-surface-container">
        {r.image_url && (
          <Image src={r.image_url} alt={r.caption} fill sizes="64px" className="object-cover" />
        )}
      </div>
    ),
  },
  { key: "caption", label: "Caption" },
  { key: "display_order", label: "Order" },
  {
    key: "is_published",
    label: "Status",
    render: (r) => (
      <span className={r.is_published ? "font-semibold text-primary" : "text-on-surface-variant"}>
        {r.is_published ? "Published" : "Hidden"}
      </span>
    ),
  },
];

const fields: Field[] = [
  { name: "image_url", label: "Image URL", required: true, placeholder: "/images/classroom-1.png" },
  { name: "caption", label: "Caption", placeholder: "Classroom" },
  { name: "display_order", label: "Display Order", type: "number", default: 0 },
  { name: "is_published", label: "Published", type: "checkbox", default: true },
];

export default function AdminGalleryPage() {
  return (
    <CrudResource<GalleryImage>
      title="Gallery"
      subtitle="Curate the photos shown across the public site."
      endpoint="/gallery"
      columns={columns}
      fields={fields}
      addLabel="Add Image"
    />
  );
}
