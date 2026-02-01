/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
    turbopack: {
    root: './surprise', // or whatever your project folder is
  },
}



export default nextConfig
