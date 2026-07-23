/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Force webpack instead of Turbopack (Turbopack has issues with non-ASCII paths)
  webpack: (config) => config,
  // 部署到 GitHub Pages 時取消註解並修改 repo 名稱
  // basePath: '/physics-learn',
  // assetPrefix: '/physics-learn/',
};

export default nextConfig;
