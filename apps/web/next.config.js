/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [
      {
        source: `/trpc/:path*`,
        destination: `${process.env.NEXT_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
