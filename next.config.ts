import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site stays a folder of files (out/), hostable anywhere.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
