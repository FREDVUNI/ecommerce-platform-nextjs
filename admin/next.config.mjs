/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: "nodejs",
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
