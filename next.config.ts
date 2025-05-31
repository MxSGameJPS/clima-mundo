import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.weatherapi.com",
      },
      {
        protocol: "https",
        hostname: "**", // Permitir imagens de qualquer domínio seguro para as notícias
      },
    ],
  },
};

export default nextConfig;
