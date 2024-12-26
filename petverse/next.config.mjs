/** @type {import('next').NextConfig} */
const nextConfig = {
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
