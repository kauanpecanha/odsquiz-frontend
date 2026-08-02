import type { NextConfig } from "next";

const authApiUrl = process.env.AUTH_API_URL ?? "http://localhost:8080";
const initiativesApiUrl =
  process.env.INITIATIVES_API_URL ?? "http://localhost:8081";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${authApiUrl.replace(/\/$/, "")}/api/auth/:path*`,
      },
      {
        source: "/api/initiatives/:path*",
        destination: `${initiativesApiUrl.replace(/\/$/, "")}/api/initiatives/:path*`,
      },
    ];
  },
};

export default nextConfig;
