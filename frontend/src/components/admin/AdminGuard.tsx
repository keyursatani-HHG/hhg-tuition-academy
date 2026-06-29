"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/Icon";

/**
 * Protects admin pages: while auth is resolving it shows a spinner; if no admin
 * session exists it redirects to the login page.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) {
      router.replace("/admin/login");
    }
  }, [loading, admin, router]);

  if (loading || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-container-low">
        <div className="flex flex-col items-center gap-3 text-primary">
          <Icon name="progress_activity" className="animate-spin text-4xl" />
          <span className="text-label-md font-medium text-on-surface-variant">
            Loading admin panel...
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
