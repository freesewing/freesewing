import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'

// Create design
const Pattern = new freesewing.Design(config(freesewing), plugins)

// Attach draft methods to prototype
Pattern.prototype.draftBase = function (part) {
  // Getting the base part from Brian
  return new Brian(this.settings).draftBase(part)
}
Pattern.prototype.draftFront = (part) => draftFront(part)
Pattern.prototype.draftBack = (part) => draftBack(part)

export default Pattern
const frowns = -1
