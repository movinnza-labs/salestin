import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const ONE_YEAR = 31536000

const nextConfig: NextConfig = {
  // minimal server bundle for the Docker image (see Dockerfile)
  output: 'standalone',
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    formats: ['image/webp'], // AVIF is much heavier to generate
    minimumCacheTTL: ONE_YEAR, // generate each image size once
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // no 2048 / 3840 variants
  },
  experimental: {
    cpus: 4, // limits build workers and their database connections
  },
  // the catalogue moved to /shop
  redirects: async () => [{ source: '/products', destination: '/shop', permanent: true }],
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
