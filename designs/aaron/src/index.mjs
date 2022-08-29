import { Design } from '@freesewing/core'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { withCondition as bustPlugin } from '@freesewing/plugin-bust'
import { name, version } from '../pkg.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'

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
