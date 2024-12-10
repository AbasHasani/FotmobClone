import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.fotmob.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "static01.nyt.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "i.ebayimg.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "www.goal.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "img.sofascore.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "assets.goal.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "cdn.sportfeeds.io",
        protocol: "https",
        port: "",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
