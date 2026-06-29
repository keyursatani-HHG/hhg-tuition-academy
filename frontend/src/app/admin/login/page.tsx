"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { Icon } from "@/components/ui/Icon";

export default function AdminLoginPage() {
  const { admin, loading, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect away if already authenticated.
  useEffect(() => {
    if (!loading && admin) router.replace("/admin/dashboard");
  }, [loading, admin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#f0f3ff_0%,#e7eefe_100%)] p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Icon name="school" className="text-3xl text-white" />
          </div>
          <h1 className="text-headline-lg font-bold text-primary">
            HHG Tuition Academy
          </h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Administrative Access Portal
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-surface-container-high bg-white p-8 ambient-shadow">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-error-container px-4 py-3 text-label-md font-medium text-on-error-container">
                <Icon name="error" className="text-xl" />
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-label-md font-medium text-on-surface"
              >
                Email Address
              </label>
              <div className="relative">
                <Icon
                  name="mail"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hhgacademy.com"
                  className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low py-3 pl-11 pr-4 text-body-md transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-label-md font-medium text-on-surface"
                >
                  Password
                </label>
                <span className="text-label-sm font-bold text-primary">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <Icon
                  name="lock"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low py-3 pl-11 pr-11 text-body-md transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
                >
                  <Icon name={showPassword ? "visibility_off" : "visibility"} />
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-label-md text-on-surface-variant">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/30"
              />
              Remember this device
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white transition-all hover:bg-primary-container active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Signing in..." : "Login to Dashboard"}
              {!submitting && <Icon name="arrow_forward" />}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-label-md text-on-surface-variant">
          Encountering issues?{" "}
          <span className="font-bold text-primary">Contact System Admin</span>
        </p>
      </div>
    </div>
  );
}
