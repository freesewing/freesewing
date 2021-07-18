const path = require('path')

const fill = ['fs', 'path', 'child_process', 'crypto', 'os', 'tty', 'worker_threads']

module.exports = {
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    // Keep server-side modules from throwing errors in a browser context
    //config.resolve.fallback = {}
    //for (const mod of fill) config.resolve.fallback[mod] = 'shared/empty.js'
    // Alias shared for easy access
    //config.resolve.alias.shared = path.resolve(__dirname, '../freesewing.shared')
    // Alias dev for easy access from shared
    //config.resolve.alias.site = path.resolve(__dirname)
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
