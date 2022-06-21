import freesewing from '@freesewing/core'
import Bella from '@freesewing/bella'
import bundle from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBackPoints from './backPoints'
import draftBackInside from './backInside'
import draftBackOutside from './backOutside'
import draftFrontPoints from './frontPoints'
import draftFrontInside from './frontInside'
import draftFrontOutside from './frontOutside'

// Create design
const Noble = new freesewing.Design(config, bundle)

// Attach draft methods to prototype
Noble.prototype.draftBellaBack = function (part) {
  return new Bella(this.settings).draftBack(part)
}
Noble.prototype.draftBellaFrontSideDart = function (part) {
  return new Bella(this.settings).draftFrontSideDart(part)
}

Noble.prototype.draftBackPoints = draftBackPoints
Noble.prototype.draftBackInside = draftBackInside
Noble.prototype.draftBackOutside = draftBackOutside
Noble.prototype.draftFrontPoints = draftFrontPoints
Noble.prototype.draftFrontInside = draftFrontInside
Noble.prototype.draftFrontOutside = draftFrontOutside

export { config, Noble }

export default Noble
