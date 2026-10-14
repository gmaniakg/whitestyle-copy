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
  async rewrites() {
    const internalRewrites = [
      {
        source: "/_mir.do.sqlexec.php",
        destination: "/api/sqlexec",
      },
    ];

    if (!process.env.LEGACY_HOST) {
      return internalRewrites;
    }

    return [
      ...internalRewrites,
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
