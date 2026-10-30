import type { NextConfig } from "next";

const LEGACY_HOST = process.env.LEGACY_HOST || 'http://old.whitestyle.com';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.symlinks = false;
    return config;
  },
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-win32-x64-msvc',
      'node_modules/@esbuild',
      'node_modules/typescript',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'ld',
            value: 'Japanese',
          },
        ],
        destination: '/about/japan-landing',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'ld',
            value: 'japanese',
          },
        ],
        destination: '/about/japan-landing',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    if (!process.env.LEGACY_HOST) {
      return [];
    }

    return [
      {
        source: "/mrw/:path*",
        destination: `${LEGACY_HOST}/mrw/:path*`,
      },
      {
        source: "/dev/:path*",
        destination: `${LEGACY_HOST}/dev/:path*`,
      },
      {
        source: "/_mir/:path*",
        destination: `${LEGACY_HOST}/_mir/:path*`,
      },
      {
        source: "/data/:path*",
        destination: `${LEGACY_HOST}/data/:path*`,
      },
      {
        source: "/bbs/:path*",
        destination: `${LEGACY_HOST}/bbs/:path*`,
      },
    ];
  },
};

export default nextConfig;
