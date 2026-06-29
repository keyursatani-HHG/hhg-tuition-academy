"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { Page, apiFetch } from "@/lib/api";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Status = "new" | "contacted" | "closed";

interface Inquiry {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  student_class: string;
  subject: string;
  message: string;
  status: Status;
  created_at: string;
}

const statusStyles: Record<Status, string> = {
  new: "bg-accent/15 text-accent",
  contacted: "bg-primary/10 text-primary",
  closed: "bg-surface-container text-on-surface-variant",
};

export default function AdminInquiriesPage() {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<Page<Inquiry>>("/inquiries?limit=200");
      setRows(data.items);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: number, status: Status) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await apiFetch(`/inquiries/${id}`, { method: "PUT", body: { status } });
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to update");
      load();
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await apiFetch(`/inquiries/${id}`, { method: "DELETE" });
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-headline-md font-semibold text-on-surface">Inquiries</h2>
        <p className="text-body-md text-on-surface-variant">
          Manage enrollment inquiries submitted through the contact form.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-container-high bg-white ambient-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-label-sm uppercase tracking-widest text-on-surface-variant">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Subject</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-error">{error}</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">No inquiries yet.</td></tr>
              ) : (
                rows.map((inq) => (
                  <Fragment key={inq.id}>
                    <tr className="border-t border-outline-variant/10 text-body-md">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-on-surface">{inq.full_name}</div>
                        <div className="text-label-sm text-on-surface-variant">{inq.email}</div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">{inq.subject || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-block rounded-full px-3 py-1 text-label-sm font-bold capitalize", statusStyles[inq.status])}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            aria-label="View details"
                            onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-primary hover:bg-surface-container"
                          >
                            <Icon name={expanded === inq.id ? "expand_less" : "visibility"} className="text-xl" />
                          </button>
                          <select
                            value={inq.status}
                            onChange={(e) => updateStatus(inq.id, e.target.value as Status)}
                            aria-label="Change status"
                            className="rounded-lg border border-outline-variant/60 bg-surface-container-low px-2 py-1.5 text-label-md focus:border-primary focus:outline-none"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                          <button
                            type="button"
                            aria-label="Delete"
                            onClick={() => remove(inq.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-error hover:bg-error-container/40"
                          >
                            <Icon name="delete" className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded === inq.id && (
                      <tr className="bg-surface-container-low/50">
                        <td colSpan={4} className="px-6 py-4">
                          <div className="grid grid-cols-1 gap-3 text-body-md sm:grid-cols-2">
                            <div><span className="font-semibold">Phone:</span> {inq.phone || "—"}</div>
                            <div><span className="font-semibold">Class/Year:</span> {inq.student_class || "—"}</div>
                            <div className="sm:col-span-2"><span className="font-semibold">Message:</span> {inq.message || "—"}</div>
                            <div className="text-label-sm text-on-surface-variant">
                              Received {new Date(inq.created_at).toLocaleString()}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
