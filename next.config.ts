import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});

const productionFeatureEnv =
  process.env.VERCEL_ENV === "production"
    ? {
        NEXT_PUBLIC_FILMTRACK_M2_RATING_DIARY_ENABLED:
          process.env.NEXT_PUBLIC_FILMTRACK_M2_RATING_DIARY_ENABLED ?? "true",
        NEXT_PUBLIC_FILMTRACK_M3_COMMUNITY_ENABLED:
          process.env.NEXT_PUBLIC_FILMTRACK_M3_COMMUNITY_ENABLED ?? "true",
        NEXT_PUBLIC_FILMTRACK_M3_COMMUNITY_CONTENT_ENABLED:
          process.env.NEXT_PUBLIC_FILMTRACK_M3_COMMUNITY_CONTENT_ENABLED ?? "true",
        NEXT_PUBLIC_FILMTRACK_M3_EPISODE_COMMUNITY_ENABLED:
          process.env.NEXT_PUBLIC_FILMTRACK_M3_EPISODE_COMMUNITY_ENABLED ?? "true",
        NEXT_PUBLIC_FILMTRACK_ACCOUNT_DELETE_ENABLED:
          process.env.NEXT_PUBLIC_FILMTRACK_ACCOUNT_DELETE_ENABLED ?? "true",
      }
    : {};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {},
  env: productionFeatureEnv,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default withSerwist(nextConfig);
