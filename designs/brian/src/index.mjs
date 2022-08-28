// FreeSewing Design constructor
import { Design } from '@freesewing/core'
// FreeSewing Plugins
import { pluginBundle } from '@freesewing/plugin-bundle'
import { withCondition as bustPlugin } from '@freesewing/plugin-bust'
// Design parts
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
// Get name & version from package.json
import { name, version } from '../package.json'
// Re-export skeleton parts so peope can re-use them
import { base } from './base.mjs'
import { sleevecap } from './sleevecap.mjs'

// Setup our new design
const Brian = new Design({
  name,
  version,
  parts: [ back, front, sleeve ],
  plugins: pluginBundle,
  conditionalPlugins: bustPlugin
})

// Named exports
export { back, front, sleeve, base, sleevecap, Brian }
