import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.56.1"],
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/projects/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/sequence/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/models/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // HLS master & variant playlists — short cache so re-encoded versions propagate quickly
        source: "/hls/:path*.m3u8",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=600",
          },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, HEAD, OPTIONS" },
          {
            key: "Access-Control-Expose-Headers",
            value: "Content-Length, Content-Range",
          },
        ],
      },
      {
        // HLS video segments — immutable (re-encode → new directory)
        source: "/hls/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, HEAD, OPTIONS" },
          {
            key: "Access-Control-Expose-Headers",
            value: "Content-Length, Content-Range",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
