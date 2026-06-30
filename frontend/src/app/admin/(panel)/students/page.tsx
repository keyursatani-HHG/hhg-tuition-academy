"use client";

import Image from "next/image";
import { CrudResource, type Column, type Field } from "@/components/admin/CrudResource";
import { assetUrl } from "@/lib/api";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface Student {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  course_name: string;
  photo_url: string;
  status: "active" | "inactive" | "alumni";
}

const statusStyles: Record<string, string> = {
  active: "bg-primary/10 text-primary",
  inactive: "bg-surface-container text-on-surface-variant",
  alumni: "bg-accent/15 text-accent",
};

const columns: Column<Student>[] = [
  {
    key: "photo_url",
    label: "Photo",
    render: (r) => (
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-outline-variant/40 bg-surface-container">
        {r.photo_url ? (
          <Image
            src={assetUrl(r.photo_url)}
            alt={r.full_name}
            fill
            sizes="40px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-on-surface-variant">
            <Icon name="person" className="text-xl" />
          </span>
        )}
      </div>
    ),
  },
  { key: "full_name", label: "Student" },
  { key: "email", label: "Email" },
  { key: "course_name", label: "Course" },
  {
    key: "status",
    label: "Status",
    render: (r) => (
      <span className={cn("inline-block rounded-full px-3 py-1 text-label-sm font-bold capitalize", statusStyles[r.status])}>
        {r.status}
      </span>
    ),
  },
];

const fields: Field[] = [
  { name: "photo_url", label: "Student Photo", type: "image" },
  { name: "full_name", label: "Full Name", required: true },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
  { name: "course_name", label: "Course" },
  {
    name: "status",
    label: "Status",
    type: "select",
    default: "active",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "alumni", label: "Alumni" },
    ],
  },
];

export default function AdminStudentsPage() {
  return (
    <CrudResource<Student>
      title="Students"
      subtitle="Manage enrolled student records."
      endpoint="/students"
      columns={columns}
      fields={fields}
      addLabel="Register Student"
      useAllList={false}
    />
  );
}
