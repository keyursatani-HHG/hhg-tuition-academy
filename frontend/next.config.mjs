/**
 * Allow next/image to load uploaded images served by the backend at /uploads.
 * Derived from the API base URL so it works in both dev and production.
 */
function uploadsRemotePattern() {
  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";
  try {
    const u = new URL(base);
    return [
      {
        protocol: u.protocol.replace(":", ""),
        hostname: u.hostname,
        port: u.port || undefined,
        pathname: "/uploads/**",
      },
    ];
  } catch {
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a minimal standalone server bundle for Docker/VPS deployment.
  output: "standalone",
  images: {
    remotePatterns: uploadsRemotePattern(),
  },
};

export default nextConfig;
