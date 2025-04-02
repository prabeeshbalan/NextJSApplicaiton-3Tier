//Copy to frontend root folder
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/register',
          destination: 'http://localhost:3001/register',
        },
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/:path*',
        }
      ];
    }
    return [];
  },
};

export default nextConfig;

