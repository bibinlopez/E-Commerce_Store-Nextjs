import type { NextConfig } from 'next'

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
}

export default nextConfig

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
}
