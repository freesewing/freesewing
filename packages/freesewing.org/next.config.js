const path = require('path')

module.exports = {
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
    // Keep fs from throwing errors
    config.resolve.fallback = {
      fs: 'shared/empty.js',
      path: 'shared/empty.js'
    }
    // Alias shared for easy access
    config.resolve.alias.shared = path.resolve(__dirname, '../shared')
    // Alias dev for easy access from shared
    config.resolve.alias.site = path.resolve(__dirname)
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
