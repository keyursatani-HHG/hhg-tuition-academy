"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { adminNav } from "@/lib/admin-nav";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = adminNav.find((n) => n.href === pathname);
  const title = current?.label ?? "Admin";

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-surface-container-low">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <div className="fixed inset-y-0 left-0 w-72">
            <Sidebar />
          </div>
        </div>

        {/* Mobile sidebar drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-on-surface/40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-72">
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Main */}
        <div className={cn("flex min-w-0 flex-1 flex-col lg:ml-72")}>
          <Topbar title={title} onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
