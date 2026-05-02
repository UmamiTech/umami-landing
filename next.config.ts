import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project. Without this, Next.js
  // walks up the directory tree looking for the closest package-lock.json
  // and can latch onto a stray one in C:\Users\seana\ — which makes module
  // and font resolution fail silently.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
