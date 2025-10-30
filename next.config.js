// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '8000',
//         pathname: '/Uploads/**',
//       },
//     ],
//   },
// };


// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '89.207.250.180',
        port: '8000',
        pathname: '/Uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'tiptoppay.kz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'widget.tiptoppay.kz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'totu.kz',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '3000', // Фронтенд-сервер
//         pathname: '/Uploads/**',
//       },
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/Uploads/:path*',
//         destination: 'http://localhost:8000/Uploads/:path*',
//       },
//     ];
//   },
// };

// module.exports = nextConfig;