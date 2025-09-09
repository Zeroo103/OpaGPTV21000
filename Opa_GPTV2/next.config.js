/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Opa_GPTV2' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Opa_GPTV2/' : '',
}

module.exports = nextConfig