/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/v1/:path*',
      },
    ]
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    // 環境変数の設定
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};