import configBuilder from '../shared/config/next.mjs'
import i18nConfig from './next-i18next.config.js'
import { banner } from '../../scripts/banner.mjs'
import withBundleAnalyzer from '@next/bundle-analyzer'
import { jargon } from './jargon.mjs'

let config = configBuilder({ site: 'org', jargon })
config.i18n = i18nConfig.i18n
config.rewrites = async () => {
  return [
    {
      source: '/blog',
      destination: '/blog/page/1',
    },
    {
      source: '/showcase',
      destination: '/showcase/page/1',
    },
  ]
}

// Say hi
console.log(banner + '\n')

config.eslint = {
  // Ignore linter for now
  ignoreDuringBuilds: true,
}

// To run the bundle analyzer, run:
// ANALYZE=true yarn build
if (process.env.ANALYZE) config = withBundleAnalyzer(config)(config)

export default config
