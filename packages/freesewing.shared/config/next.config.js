const path = require('path')

module.exports = {
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on node modules
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.child_process = false
    }
    // Fix for nextjs bug #17806
    config.module.rules.push({
      test: /index.mjs$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false
      }
    })

    return config
  }
}
