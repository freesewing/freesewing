import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import Brian from '@freesewing/brian'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftSleeve from './sleeve'
import draftGusset from './gusset'
import draftHoodSide from './hoodside'
import draftHoodCenter from './hoodcenter'

// Create new design
const Yuri = new freesewing.Design(config, plugins)

// Attach draft methods from Brian to prototype
Yuri.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Yuri.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Yuri.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Yuri.prototype.draftSleevecap = function (part) {
  return new Brian(this.settings).draftSleevecap(part)
}
Yuri.prototype.draftSleeveBase = function (part) {
  return new Brian(this.settings).draftSleeve(part)
}

// Attach own draft methods to prototype
Yuri.prototype.draftBack = draftBack
Yuri.prototype.draftFront = draftFront
Yuri.prototype.draftSleeve = draftSleeve
Yuri.prototype.draftGusset = draftGusset
Yuri.prototype.draftHoodSide = draftHoodSide
Yuri.prototype.draftHoodCenter = draftHoodCenter

// Named exports
export { config, Yuri }

// Default export
export default Yuri
