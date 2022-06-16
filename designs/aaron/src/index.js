import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'

// Parts
import draftBack from './back'
import draftFront from './front'

// Create design
const Aaron = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Aaron.prototype.draftBase = function (part) {
  // Getting the base part from Brian
  return new Brian(this.settings).draftBase(part)
}
Aaron.prototype.draftFront = (part) => draftFront(part)
Aaron.prototype.draftBack = (part) => draftBack(part)

// Named exports
export { config, Aaron }

// Default export
export default Aaron
