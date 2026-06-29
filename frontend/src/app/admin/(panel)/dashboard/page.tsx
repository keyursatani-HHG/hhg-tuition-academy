"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface DashboardStats {
  total_students: number;
  active_courses: number;
  total_inquiries: number;
  new_inquiries: number;
  total_faculty: number;
  recent_inquiries: {
    id: number;
    full_name: string;
    email: string;
    subject: string;
    status: "new" | "contacted" | "closed";
    created_at: string;
  }[];
}

const statusStyles: Record<string, string> = {
  new: "bg-accent/15 text-accent",
  contacted: "bg-primary/10 text-primary",
  closed: "bg-surface-container text-on-surface-variant",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<DashboardStats>("/dashboard/stats")
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  const cards = stats
    ? [
        { label: "Total Students", value: stats.total_students, icon: "groups", tint: "bg-primary/10 text-primary" },
        { label: "Active Courses", value: stats.active_courses, icon: "menu_book", tint: "bg-accent/15 text-accent" },
        { label: "Total Inquiries", value: stats.total_inquiries, icon: "forum", tint: "bg-tertiary/10 text-tertiary" },
        { label: "Expert Faculty", value: stats.total_faculty, icon: "badge", tint: "bg-primary/10 text-primary" },
      ]
    : [];

  if (error) {
    return (
      <div className="rounded-2xl border border-error/30 bg-error-container/40 p-6 text-on-error-container">
        Failed to load dashboard: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {(stats ? cards : Array.from({ length: 4 })).map((card, i) => (
          <div
            key={i}
            className="rounded-2xl border border-surface-container-high bg-white p-6 ambient-shadow"
          >
            {stats ? (
              <>
                <div
                  className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
                    (card as { tint: string }).tint,
                  )}
                >
                  <Icon name={(card as { icon: string }).icon} className="text-2xl" />
                </div>
                <div className="text-3xl font-bold text-on-surface">
                  {(card as { value: number }).value}
                </div>
                <div className="mt-1 text-label-md font-medium text-on-surface-variant">
                  {(card as { label: string }).label}
                </div>
              </>
            ) : (
              <div className="h-24 animate-pulse rounded-lg bg-surface-container" />
            )}
          </div>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="rounded-2xl border border-surface-container-high bg-white ambient-shadow">
        <div className="flex items-center justify-between border-b border-outline-variant/20 px-6 py-5">
          <h2 className="text-headline-md font-semibold text-on-surface">
            Recent Inquiries
          </h2>
          <a href="/admin/inquiries" className="text-label-md font-bold text-primary hover:underline">
            View All Inquiries
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-label-sm uppercase tracking-widest text-on-surface-variant">
                <th className="px-6 py-3 font-semibold">Student Name</th>
                <th className="px-6 py-3 font-semibold">Subject</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recent_inquiries.length ? (
                stats.recent_inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="border-t border-outline-variant/10 text-body-md"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-on-surface">
                        {inq.full_name}
                      </div>
                      <div className="text-label-sm text-on-surface-variant">
                        {inq.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {inq.subject || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-block rounded-full px-3 py-1 text-label-sm font-bold capitalize",
                          statusStyles[inq.status],
                        )}
                      >
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-on-surface-variant"
                  >
                    No inquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
