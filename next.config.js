/** @type {import('next').NextConfig} */
import { headers } from './config'
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return headers
  }
}

module.exports = nextConfig
