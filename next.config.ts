import fs from "fs";
import type { NextConfig } from "next";

// Windows exFAT compatibility: fs.readlink throws EISDIR on regular files instead of EINVAL
if (process.platform === "win32") {
  const globalPatch = globalThis as typeof globalThis & { __wsExfatReadlinkPatched?: boolean };
  if (!globalPatch.__wsExfatReadlinkPatched) {
    globalPatch.__wsExfatReadlinkPatched = true;
    const origReadlink = fs.readlink.bind(fs);
    const origReadlinkSync = fs.readlinkSync.bind(fs);
    const origPromisesReadlink = fs.promises.readlink.bind(fs.promises);

    const normalizeErr = (err: unknown) => {
      if (err && typeof err === "object" && "code" in err && (err as { code?: string }).code === "EISDIR") {
        (err as NodeJS.ErrnoException).code = "EINVAL";
        (err as NodeJS.ErrnoException).errno = -4071;
      }
      return err;
    };

    (fs as unknown as { readlink: (...args: unknown[]) => unknown }).readlink = function (...args: unknown[]) {
      const cb = args[args.length - 1];
      if (typeof cb === "function") {
        args[args.length - 1] = (err: unknown, res: unknown) => (cb as (e: unknown, r: unknown) => void)(normalizeErr(err), res);
      }
      return (origReadlink as (...a: unknown[]) => unknown)(...args);
    };

    (fs as unknown as { readlinkSync: (...args: unknown[]) => unknown }).readlinkSync = function (...args: unknown[]) {
      try {
        return (origReadlinkSync as (...a: unknown[]) => unknown)(...args);
      } catch (err) {
        throw normalizeErr(err);
      }
    };

    fs.promises.readlink = async function (...args: Parameters<typeof origPromisesReadlink>) {
      try {
        return await origPromisesReadlink(...args);
      } catch (err) {
        throw normalizeErr(err);
      }
    };
  }
}

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
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.whitestyle.com',
          },
        ],
        destination: 'https://whitestyle.com/:path*',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'mir_code',
            value: '12187',
          },
        ],
        destination: '/ja',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'ld',
            value: 'Japanese',
          },
        ],
        destination: '/ja',
        permanent: true,
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
        destination: '/ja',
        permanent: true,
      },
      ...[
        ['12117', '/about/greeting'],
        ['12118', '/about/doctors'],
        ['12119', '/about/tour'],
        ['12120', '/about/location'],
        ['12121', '/treatments/implant'],
        ['12122', '/treatments/implant/bone-graft'],
        ['12123', '/treatments/implant/edentulous'],
        ['12125', '/treatments/implant/insurance'],
        ['12126', '/treatments/orthodontics'],
        ['12127', '/treatments/orthodontics/types'],
        ['12128', '/treatments/general'],
        ['12129', '/treatments/general/caries'],
        ['12130', '/treatments/general/endo'],
        ['12131', '/treatments/general/scaling'],
        ['12132', '/treatments/general/wisdom-tooth'],
        ['12133', '/treatments/aesthetic/zeroshell'],
        ['12134', '/treatments/aesthetic/easy-white'],
        ['16880', '/treatments/implant'],
        ['17875', '/ja'],
      ].map(([code, dest]) => ({
        source: '/',
        has: [
          {
            type: 'query' as const,
            key: 'mir_code',
            value: code,
          },
        ],
        destination: dest,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/_mir.do.sqlexec.php",
        destination: "/api/mir-sqlexec",
      },
      {
        source: "/download.css",
        destination: "/ai-pet/download.css",
      },
      {
        source: "/download.js",
        destination: "/ai-pet/download.js",
      },
      {
        source: "/assets3d/:path*",
        destination: "/ai-pet/assets3d/:path*",
      },
      {
        source: "/engine/:path*",
        destination: "/ai-pet/engine/:path*",
      },
      {
        source: "/downloads/:path*",
        destination: "/ai-pet/downloads/:path*",
      },
      {
        source: "/mrw/:path*",
        destination: "/legacy_assets/mrw/:path*",
      },
      {
        source: "/dev/:path*",
        destination: "/legacy_assets/dev/:path*",
      },
      {
        source: "/_mir/:path*",
        destination: "/legacy_assets/_mir/:path*",
      },
      {
        source: "/data/:path*",
        destination: "/legacy_assets/data/:path*",
      },
      {
        source: "/theme_pc/:path*",
        destination: "/legacy_assets/theme_pc/:path*",
      },
      {
        source: "/css/:path*",
        destination: "/legacy_assets/css/:path*",
      },
      {
        source: "/js/:path*",
        destination: "/legacy_assets/js/:path*",
      },
      {
        source: "/img/:path*",
        destination: "/legacy_assets/img/:path*",
      },
    ];
  },
};

export default nextConfig;
