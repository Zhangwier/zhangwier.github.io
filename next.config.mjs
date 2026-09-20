/** @type {import('next').NextConfig} */

// For GitHub Pages:
//   user site  (https://<user>.github.io)      -> BASE_PATH stays empty
//   project site (https://<user>.github.io/x)  -> BASE_PATH=/x
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  output: 'export', // fully static, no Node server needed
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true }, // required for static export
  trailingSlash: true, // friendlier for static hosts
  reactStrictMode: true,
};

export default nextConfig;
