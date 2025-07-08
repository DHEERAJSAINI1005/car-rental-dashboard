import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: false, // 👈 Tells Next.js not to look for /src/app
  },
};

export default nextConfig;
