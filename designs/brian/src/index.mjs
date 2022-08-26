// FreeSewing core library
import freesewing from '@freesewing/core'
// FreeSewing Plugins
import pluginBundle from '@freesewing/plugin-bundle'
import bustPlugin from '@freesewing/plugin-bust'
// Design parts
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
// These are only here to be exported
import { base } from './base.mjs'
import { sleevecap } from './sleevecap.mjs'
// Get version from package.json
import { version } from '../package.json' assert { type: 'json' }

// Setup design
const Brian = new freesewing.Design({
  name: 'brian',
  version,
  parts: [ back, front, sleeve ],
  plugins: pluginBundle,
  conditionalPlugins: {
    plugin: bustPlugin,
    condition: (settings=false) =>
      settings?.options?.draftForHighBust &&
      settings?.measurements?.highBust
      ? true : false
  }
})

// Named exports
export { back, front, sleeve, base, sleevecap, Brian }
