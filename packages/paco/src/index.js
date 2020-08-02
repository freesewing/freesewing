import freesewing from '@freesewing/core'
import Titan from '@freesewing/titan'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftPocketBagFront from './pocketbagfront'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach Titan draft methods to prototype
Pattern.prototype.draftTitanBack = function (part) {
  return new Titan(this.settings).draftBack(part)
}
Pattern.prototype.draftTitanFront = function (part) {
  return new Titan(this.settings).draftFront(part)
}

// Attach own draft methods to prototype
Pattern.prototype.draftFront = (part) => draftFront(part)
Pattern.prototype.draftBack = (part) => draftBack(part)
Pattern.prototype.draftPocketBagFront = (part) => draftPocketBagFront(part)

export default Pattern
