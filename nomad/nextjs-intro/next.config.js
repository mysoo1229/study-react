const API_KEY = "6c61618f0f7e88b0c9c7babe5058cf8f";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/learn",
        destination: "https://nomadcoders.co",
        permanent: false,
      },
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      }
    ];
  },
  async rewrites() {
    return [{
      source: "/api/movies",
      destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
    }];
  },
}

module.exports = nextConfig
