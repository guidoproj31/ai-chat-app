import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Enable CORS
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['pages', 'components', 'lib', 'src']
  }
};

export default nextConfig;




