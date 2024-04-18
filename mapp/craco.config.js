const path = require('path');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          fs: false,
          path: require.resolve('path-browserify')
        }
      }
    }
  }
};
