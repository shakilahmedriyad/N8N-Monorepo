/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [
      {
        source: `/api/auth/:path*`,
        destination: `${process.env.BETTER_AUTH_URL}/api/auth/:path*`,
      },
      {
        source: `/trpc/:path*`,
        destination: `${process.env.NEXT_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
