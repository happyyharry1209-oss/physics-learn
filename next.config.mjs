/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Force webpack instead of Turbopack (Turbopack has issues with non-ASCII paths)
  webpack: (config) => config,
  // GitHub Pages deployment
  basePath: '/physics-learn',
  assetPrefix: '/physics-learn/',
};

export default nextConfig;
