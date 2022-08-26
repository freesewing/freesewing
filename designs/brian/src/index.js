// FreeSewing core library
import freesewing from '@freesewing/core'
// FreeSewing Plugins
import pluginBundle from '@freesewing/plugin-bundle'
import bustPlugin from '@freesewing/plugin-bust' // Note: conditional plugin
// Design config & options
import { info, measurements, optionalMeasurements } from '../config/index'
//import * as options from '../config/options'
// Design parts
import back from './back'
import front from './front'
import sleeve from './sleeve'
// These are only here to be exported
import base from './base'
import sleevecap from './sleevecap'


// Setup design
const Brian = new freesewing.Design({
  ...info,
  measurements,
  optionalMeasurements,
//  options: { ...options },
  parts: { back, front, sleeve },
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
export { back, front, sleeve, base, sleevecap }
// Default export
export default Brian
