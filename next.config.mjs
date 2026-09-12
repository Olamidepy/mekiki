/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Prevent lint warnings from failing production build
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
