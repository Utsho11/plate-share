import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com", // Add any other image host you use
      "example.com",
      "shorturl.at",
    ],
  },
};

export default nextConfig;
