/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',          // opcional
        pathname: '/**',   // permite todos os caminhos
      },
    ],
  },
};

module.exports = nextConfig;
