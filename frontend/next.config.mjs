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
  // Standalone output is for Docker/VPS. Netlify/Vercel use their own adapters,
  // and standalone can break Netlify's Next runtime — so skip it there.
  output: process.env.NETLIFY ? undefined : "standalone",
  images: {
    remotePatterns: uploadsRemotePattern(),
  },
};

export default nextConfig;
