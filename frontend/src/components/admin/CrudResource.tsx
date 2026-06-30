"use client";

import { useCallback, useEffect, useState } from "react";
import { Page, apiFetch } from "@/lib/api";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/admin/Modal";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { cn } from "@/lib/utils";

export interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "checkbox" | "image";
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  default?: string | number | boolean;
}

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface Row {
  id: number;
  [key: string]: unknown;
}

interface CrudResourceProps<T extends { id: number }> {
  title: string;
  subtitle?: string;
  endpoint: string; // e.g. "/courses"
  columns: Column<T>[];
  fields: Field[];
  addLabel?: string;
  /** Use the admin "/all" list (includes unpublished). Default true. */
  useAllList?: boolean;
}

function emptyForm(fields: Field[]): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const f of fields) {
    obj[f.name] =
      f.default ?? (f.type === "checkbox" ? true : f.type === "number" ? 0 : "");
  }
  return obj;
}

export function CrudResource<T extends { id: number }>({
  title,
  subtitle,
  endpoint,
  columns,
  fields,
  addLabel = "Add New",
  useAllList = true,
}: CrudResourceProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm(fields));
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const listPath = useAllList ? `${endpoint}/all` : endpoint;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<Page<T>>(`${listPath}?limit=200`);
      setRows(data.items);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [listPath]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm(fields));
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (row: T) => {
    setEditing(row);
    const next: Record<string, unknown> = {};
    for (const f of fields) next[f.name] = (row as Row)[f.name] ?? "";
    setForm(next);
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setFormError(null);
    try {
      if (editing) {
        await apiFetch(`${endpoint}/${editing.id}`, { method: "PUT", body: form });
      } else {
        await apiFetch(endpoint, { method: "POST", body: form });
      }
      setModalOpen(false);
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row: T) => {
    if (!confirm(`Delete this ${title.replace(/s$/, "").toLowerCase()}?`)) return;
    try {
      await apiFetch(`${endpoint}/${row.id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-headline-md font-semibold text-on-surface">
            {title}
          </h2>
          {subtitle && (
            <p className="text-body-md text-on-surface-variant">{subtitle}</p>
          )}
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-all hover:bg-primary-container active:scale-95"
        >
          <Icon name="add_circle" /> {addLabel}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-container-high bg-white ambient-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-label-sm uppercase tracking-widest text-on-surface-variant">
                {columns.map((c) => (
                  <th key={String(c.key)} className="px-6 py-4 font-semibold">
                    {c.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-on-surface-variant">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-error">
                    {error}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-on-surface-variant">
                    Nothing here yet. Click “{addLabel}” to create one.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-outline-variant/10 text-body-md"
                  >
                    {columns.map((c) => (
                      <td key={String(c.key)} className="px-6 py-4 align-middle">
                        {c.render
                          ? c.render(row)
                          : String((row as Row)[c.key as string] ?? "—")}
                      </td>
                    ))}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          aria-label="Edit"
                          onClick={() => openEdit(row)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-primary hover:bg-surface-container"
                        >
                          <Icon name="edit" className="text-xl" />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete"
                          onClick={() => handleDelete(row)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-error hover:bg-error-container/40"
                        >
                          <Icon name="delete" className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={modalOpen}
        title={`${editing ? "Edit" : "New"} ${title.replace(/s$/, "")}`}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-xl border border-outline-variant/60 px-6 py-2.5 font-bold text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-primary px-6 py-2.5 font-bold text-white hover:bg-primary-container disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        }
      >
        {formError && (
          <div className="mb-4 rounded-lg bg-error-container px-4 py-3 text-label-md font-medium text-on-error-container">
            {formError}
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {fields.map((f) => {
            const fieldId = `field-${f.name}`;
            const value = form[f.name];
            const wide = f.type === "textarea" || f.type === "image";
            if (f.type === "image") {
              return (
                <div key={f.name} className="sm:col-span-2">
                  <ImageUploadField
                    label={f.label}
                    value={String(value ?? "")}
                    onChange={(url) => setForm({ ...form, [f.name]: url })}
                  />
                </div>
              );
            }
            return (
              <div key={f.name} className={cn(wide && "sm:col-span-2")}>
                {f.type !== "checkbox" && (
                  <label
                    htmlFor={fieldId}
                    className="mb-2 block text-label-md font-medium text-on-surface"
                  >
                    {f.label}
                  </label>
                )}
                {f.type === "textarea" ? (
                  <textarea
                    id={fieldId}
                    rows={3}
                    value={String(value ?? "")}
                    placeholder={f.placeholder}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full resize-y rounded-lg border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-body-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                ) : f.type === "select" ? (
                  <select
                    id={fieldId}
                    value={String(value ?? "")}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-body-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {f.options?.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : f.type === "checkbox" ? (
                  <label className="flex items-center gap-2 pt-7 text-label-md font-medium text-on-surface">
                    <input
                      id={fieldId}
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })}
                      className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/30"
                    />
                    {f.label}
                  </label>
                ) : (
                  <input
                    id={fieldId}
                    type={f.type === "number" ? "number" : "text"}
                    value={String(value ?? "")}
                    placeholder={f.placeholder}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [f.name]:
                          f.type === "number"
                            ? Number(e.target.value)
                            : e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-body-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
