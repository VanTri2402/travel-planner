/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...các cấu hình khác
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
      },
    ],
  },
};

export default nextConfig;
