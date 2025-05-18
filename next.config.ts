import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
    images: {
    domains: ['image.tmdb.org', 'images.unsplash.com'],
  },
    // Skip type checking during next build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
