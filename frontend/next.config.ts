const nextConfig = {
  // Disable rewrites in production (use Docker's service name)
  rewrites: async () => {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/:path*'
        }
      ];
    }
    return []; // No rewrites in production
  }
};

module.exports = nextConfig;