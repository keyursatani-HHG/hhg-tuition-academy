"use client";

import { Badge } from "@/components/ui/Badge";
import { CrudResource, type Column, type Field } from "@/components/admin/CrudResource";

interface Course {
  id: number;
  title: string;
  category: string;
  price: string;
  duration: string;
  schedule: string;
  is_published: boolean;
}

const columns: Column<Course>[] = [
  { key: "title", label: "Course" },
  { key: "category", label: "Category", render: (r) => <Badge>{r.category}</Badge> },
  { key: "price", label: "Price" },
  { key: "schedule", label: "Schedule" },
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
  { name: "title", label: "Course Title", required: true },
  { name: "category", label: "Category", placeholder: "e.g. Secondary School" },
  { name: "price", label: "Price", placeholder: "₹2,500/month" },
  { name: "duration", label: "Duration", placeholder: "12 Months" },
  { name: "schedule", label: "Schedule", placeholder: "Mon-Wed-Fri" },
  { name: "image_url", label: "Course Image", type: "image" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "is_published", label: "Published", type: "checkbox", default: true },
];

export default function AdminCoursesPage() {
  return (
    <CrudResource<Course>
      title="Course Management"
      subtitle="Review and manage the academy's current educational offerings."
      endpoint="/courses"
      columns={columns}
      fields={fields}
      addLabel="Add New Course"
    />
  );
}
