import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // <--- Das hier löst den Fehler sofort!
  },
  turbopack: {
    root: resolve(__dirname),
  },
};

export default nextConfig;