/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/petverse",
        destination: "/petverse/messages",
        permanent: true,
      },
      {
        source: "/",
        destination: "/petverse/messages",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
