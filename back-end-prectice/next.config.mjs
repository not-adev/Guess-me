/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
   remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dcgquf0d0/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**',
      },
    ], },
};

export default nextConfig;