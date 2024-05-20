/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // List Firebase Storage domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**', // Updated pathname for Firebase Storage v0 compatibility
      },
    ],
  },
};

export default nextConfig;

