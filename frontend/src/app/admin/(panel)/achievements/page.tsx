"use client";

import { CrudResource, type Column, type Field } from "@/components/admin/CrudResource";

interface Achievement {
  id: number;
  title: string;
  student_name: string;
  detail: string;
  badge: string;
  display_order: number;
  is_published: boolean;
}

const columns: Column<Achievement>[] = [
  { key: "title", label: "Title" },
  { key: "student_name", label: "Student" },
  { key: "badge", label: "Badge" },
  { key: "detail", label: "Detail" },
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
  { name: "title", label: "Title", required: true, placeholder: "99.8% Board Topper" },
  { name: "student_name", label: "Student Name", placeholder: "Priya Singhania" },
  { name: "detail", label: "Detail", placeholder: "Class 10 State Board - 2023" },
  { name: "badge", label: "Badge Text", placeholder: "Rank #1" },
  {
    name: "badge_color",
    label: "Badge Colour",
    type: "select",
    default: "primary",
    options: [
      { value: "primary", label: "Blue (Primary)" },
      { value: "tertiary", label: "Brown (Tertiary)" },
      { value: "primary-container", label: "Light Blue" },
    ],
  },
  { name: "image_url", label: "Photo URL", placeholder: "/images/student-1.png" },
  { name: "display_order", label: "Display Order", type: "number", default: 0 },
  { name: "is_published", label: "Published", type: "checkbox", default: true },
];

export default function AdminAchievementsPage() {
  return (
    <CrudResource<Achievement>
      title="Achievements"
      subtitle="Celebrate your students' success stories."
      endpoint="/achievements"
      columns={columns}
      fields={fields}
      addLabel="Add Achievement"
    />
  );
}
