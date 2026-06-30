/**
 * Lightweight typed API client for the FastAPI backend.
 *
 * - Reads/writes JWT tokens from localStorage (admin SPA).
 * - Attaches the access token to every request.
 * - On a 401, transparently tries the refresh token once, then retries.
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

/** Backend origin (BASE_URL without the /api/v1 suffix) — used to resolve /uploads paths. */
export const API_ORIGIN = BASE_URL.replace(/\/api\/v1\/?$/, "");

/**
 * Resolve a stored image path to a displayable URL:
 * - absolute http(s) URLs are returned as-is
 * - /uploads/* paths are served by the backend (prefixed with API_ORIGIN)
 * - everything else (e.g. /images/* seed assets) is served by the frontend
 */
export function assetUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/uploads/")) return `${API_ORIGIN}${path}`;
  return path;
}

const ACCESS_KEY = "hhg_access_token";
const REFRESH_KEY = "hhg_refresh_token";

export const tokenStore = {
  get access() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_KEY);
  },
  get refresh() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_KEY);
  },
  set(access: string, refresh: string) {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail) && data.detail[0]?.msg) {
      return data.detail.map((d: { msg: string }) => d.msg).join(", ");
    }
    return res.statusText;
  } catch {
    return res.statusText;
  }
}

async function tryRefresh(): Promise<boolean> {
  const refresh = tokenStore.refresh;
  if (!refresh) return false;
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
  });
  if (!res.ok) return false;
  const data = await res.json();
  tokenStore.set(data.access_token, data.refresh_token);
  return true;
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  auth?: boolean; // attach access token (default true)
  retry?: boolean; // internal: whether a refresh-retry is still allowed
}

export async function apiFetch<T = unknown>(
  path: string,
  { method = "GET", body, auth = true, retry = true }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth && tokenStore.access) {
    headers["Authorization"] = `Bearer ${tokenStore.access}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && auth && retry && (await tryRefresh())) {
    return apiFetch<T>(path, { method, body, auth, retry: false });
  }

  if (!res.ok) {
    throw new ApiError(res.status, await parseError(res));
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/** Upload an image file (multipart) and get back its stored path. Admin only. */
export async function uploadImage(
  file: File,
): Promise<{ url: string; filename: string }> {
  const headers: Record<string, string> = {};
  if (tokenStore.access) headers["Authorization"] = `Bearer ${tokenStore.access}`;
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE_URL}/uploads/image`, {
    method: "POST",
    headers, // do NOT set Content-Type; the browser sets the multipart boundary
    body: form,
  });
  if (!res.ok) throw new ApiError(res.status, await parseError(res));
  return (await res.json()) as { url: string; filename: string };
}

// ───────────── Shared response shapes ─────────────
export interface Page<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AdminProfile {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  is_superadmin: boolean;
  created_at: string;
}
