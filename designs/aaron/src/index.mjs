// FreeSewing core library
import { Design } from '@freesewing/core'
// FreeSewing Plugins
import { pluginBundle } from '@freesewing/plugin-bundle'
import { withCondition as bustPlugin } from '@freesewing/plugin-bust'
// Design parts
import { back } from './back.mjs'
import { front } from './front.mjs'
// Get name & version from package.json
import { name, version } from '../package.json' assert { type: 'json' }

// Setup our new design
const Aaron = new Design({
  name,
  version,
  parts: [ back, front ],
  plugins: pluginBundle,
  conditionalPlugins: bustPlugin
})

// Named exports
export { back, front, Aaron }
