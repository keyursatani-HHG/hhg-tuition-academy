"use client";

import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/Icon";

interface TopbarProps {
  title: string;
  onMenuClick?: () => void;
}

/** Admin top bar: page title, search affordance, and the signed-in admin. */
export function Topbar({ title, onMenuClick }: TopbarProps) {
  const { admin } = useAuth();
  const initials = (admin?.full_name ?? "AD")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-outline-variant/20 bg-white/90 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-primary hover:bg-surface-container lg:hidden"
        >
          <Icon name="menu" className="text-2xl" />
        </button>
        <h1 className="text-headline-md font-bold text-on-surface">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
        >
          <Icon name="notifications" className="text-xl" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
        </button>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-label-md font-bold text-on-surface">
              {admin?.full_name ?? "Admin"}
            </div>
            <div className="text-label-sm text-on-surface-variant">
              {admin?.is_superadmin ? "Super Admin" : "Admin"}
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-label-md font-bold text-white">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
