/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/destination/:slug*',
        destination: '/destinations/:slug*',
        permanent: true,
      },
      {
        source: '/experience/:slug*',
        destination: '/experiences/:slug*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
