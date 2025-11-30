/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    // Fail production builds on ESLint errors
    ignoreDuringBuilds: false,
  },

  typescript: {
    // Fail production builds on TS errors
    ignoreBuildErrors: false,
  },

  // Helpful in prod debugging if you want real stack traces
  productionBrowserSourceMaps: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 's3.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.ctfassets.net', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },

  async headers() {
    return [
      {
        source: '/home-live',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
    ];
  },
};

export default nextConfig;