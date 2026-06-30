"use client";

import { Badge } from "@/components/ui/Badge";
import { CrudResource, type Column, type Field } from "@/components/admin/CrudResource";

interface Faculty {
  id: number;
  name: string;
  role: string;
  subject: string;
  qualification: string;
  display_order: number;
  is_active: boolean;
}

const columns: Column<Faculty>[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "subject", label: "Subject", render: (r) => <Badge>{r.subject}</Badge> },
  { key: "qualification", label: "Qualification" },
  {
    key: "is_active",
    label: "Status",
    render: (r) => (
      <span className={r.is_active ? "font-semibold text-primary" : "text-on-surface-variant"}>
        {r.is_active ? "Active" : "Hidden"}
      </span>
    ),
  },
];

const fields: Field[] = [
  { name: "name", label: "Full Name", required: true },
  { name: "role", label: "Role", placeholder: "e.g. Senior Physics Faculty" },
  { name: "subject", label: "Primary Subject", placeholder: "Physics" },
  { name: "qualification", label: "Highest Qualification", placeholder: "PhD, Quantum Physics" },
  { name: "image_url", label: "Faculty Photo", type: "image" },
  { name: "display_order", label: "Display Order", type: "number", default: 0 },
  { name: "bio", label: "Biography", type: "textarea" },
  { name: "is_active", label: "Active", type: "checkbox", default: true },
];

export default function AdminFacultyPage() {
  return (
    <CrudResource<Faculty>
      title="Faculty Management"
      subtitle="Manage your team of expert educators."
      endpoint="/faculty"
      columns={columns}
      fields={fields}
      addLabel="Add Faculty"
    />
  );
}
