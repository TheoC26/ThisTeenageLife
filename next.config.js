/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "ssl-static.libsyn.com",
      "static.libsyn.com",
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
