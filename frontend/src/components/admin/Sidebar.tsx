"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNav } from "@/lib/admin-nav";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/Icon";

/** Groups nav items by their `section` while preserving order. */
function groupedNav() {
  const groups: { section: string; items: typeof adminNav }[] = [];
  for (const item of adminNav) {
    const section = item.section ?? "";
    let group = groups.find((g) => g.section === section);
    if (!group) {
      group = { section, items: [] };
      groups.push(group);
    }
    group.items.push(item);
  }
  return groups;
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex h-full w-72 flex-col border-r border-outline-variant/20 bg-white">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Icon name="school" className="text-2xl text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-lg font-bold text-primary">Admin Panel</div>
          <div className="text-label-sm text-on-surface-variant">HHG Academy</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-4 pb-4">
        {groupedNav().map((group) => (
          <div key={group.section} className="mb-6">
            {group.section && (
              <div className="px-3 pb-2 text-label-sm font-semibold uppercase tracking-widest text-on-surface-variant/70">
                {group.section}
              </div>
            )}
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-label-md font-medium transition-colors",
                      active
                        ? "bg-primary text-white"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-primary",
                    )}
                  >
                    <Icon name={item.icon} className="text-xl" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="border-t border-outline-variant/20 p-4">
        <Link
          href="/"
          className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-label-md font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary"
        >
          <Icon name="public" className="text-xl" />
          View Site
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-label-md font-medium text-error hover:bg-error-container/40"
        >
          <Icon name="logout" className="text-xl" />
          Logout
        </button>
      </div>
    </aside>
  );
}
