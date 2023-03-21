/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // basePath: process.env.GITHUB_ACTIONS && 'nextjs-template',
  trailingSlash: true, 
  images: {
    unoptimized: true
  },
  // output: 'standalone'
};

export default nextConfig;
