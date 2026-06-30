"use client";

import { CrudResource, type Column, type Field } from "@/components/admin/CrudResource";
import { Icon } from "@/components/ui/Icon";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  rating: number;
  is_published: boolean;
}

const columns: Column<Testimonial>[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  {
    key: "rating",
    label: "Rating",
    render: (r) => (
      <span className="flex items-center gap-0.5 text-[#FFD700]">
        {Array.from({ length: r.rating }).map((_, i) => (
          <Icon key={i} name="star" filled className="text-base" />
        ))}
      </span>
    ),
  },
  {
    key: "quote",
    label: "Quote",
    render: (r) => (
      <span className="line-clamp-1 max-w-xs text-on-surface-variant">{r.quote}</span>
    ),
  },
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
  { name: "name", label: "Name", required: true },
  { name: "role", label: "Role", default: "Student" },
  {
    name: "rating",
    label: "Rating",
    type: "select",
    default: "5",
    options: [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} stars` })),
  },
  { name: "image_url", label: "Photo", type: "image" },
  { name: "quote", label: "Quote", type: "textarea", required: true },
  { name: "is_published", label: "Published", type: "checkbox", default: true },
];

export default function AdminTestimonialsPage() {
  return (
    <CrudResource<Testimonial>
      title="Testimonials"
      subtitle="Manage the feedback featured on the home page."
      endpoint="/testimonials"
      columns={columns}
      fields={fields}
      addLabel="Add Testimonial"
    />
  );
}
