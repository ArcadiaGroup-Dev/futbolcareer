import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['example.com', "img.freepik.com"], // Permite cargar imágenes de Freepik
  },
};

export default nextConfig;
