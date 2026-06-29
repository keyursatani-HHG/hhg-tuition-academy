/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a minimal standalone server bundle for Docker/VPS deployment.
  output: "standalone",
  // Self-hosted images live in /public; no remote loaders required.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
