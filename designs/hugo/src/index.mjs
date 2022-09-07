import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
import { pocket } from './pocket.mjs'
import { pocketFacing } from './pocketfacing.mjs'
import { hoodSide } from './hoodside.mjs'
import { hoodCenter } from './hoodcenter.mjs'
import { waistband } from './waistband.mjs'
import { cuff } from './cuff.mjs'

// Setup our new design
const Hugo = new Design({
  data,
  parts: [back, front, sleeve, pocket, pocketFacing, hoodSide, hoodCenter, waistband, cuff],
})

// Named exports
export { back, front, sleeve, pocket, pocketFacing, hoodSide, hoodCenter, waistband, cuff, Hugo }
/*




import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftSleeve from './sleeve'
import draftPocket from './pocket'
import draftPocketFacing from './pocketfacing'
import draftHoodSide from './hoodside'
import draftHoodCenter from './hoodcenter'
import draftWaistband from './waistband'
import draftCuff from './cuff'

const condition = (settings = false) =>
  settings &&
  settings.options &&
  settings.options.draftForHighBust &&
  settings.measurements.highBust
    ? true
    : false

// Create design
const Hugo = new freesewing.Design(config, plugins, { plugin, condition })

// Attach draft methods to prototype
Hugo.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Hugo.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Hugo.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Hugo.prototype.draftSleeveBase = function (part) {
  return new Brian(this.settings).draftSleeve(part)
}
Hugo.prototype.draftSleevecap = function (part) {
  return new Brian(this.settings).draftSleevecap(part)
}
Hugo.prototype.draftBack = draftBack
Hugo.prototype.draftFront = draftFront
Hugo.prototype.draftSleeve = draftSleeve
Hugo.prototype.draftPocket = draftPocket
Hugo.prototype.draftPocketFacing = draftPocketFacing
Hugo.prototype.draftHoodSide = draftHoodSide
Hugo.prototype.draftHoodCenter = draftHoodCenter
Hugo.prototype.draftWaistband = draftWaistband
Hugo.prototype.draftCuff = draftCuff

// Named exports
export { config, Hugo }

// Default export
export default Hugo
*/
