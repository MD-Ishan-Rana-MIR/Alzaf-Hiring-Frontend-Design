/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["alzaf-frontend-2025.vercel.app"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://alzaf-frontend-2025.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
