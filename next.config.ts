import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/design/:slug",
        destination: "/templates/:slug",
        permanent: true,
      },
      {
        source: "/template/:slug",
        destination: "/templates/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
