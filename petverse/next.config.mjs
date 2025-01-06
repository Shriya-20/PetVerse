/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        // port: "",
        // pathname: "",
        // search: "",
      },
    ],
  },
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
