import freesewing from '@freesewing/core'
import Titan from '@freesewing/titan'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftWaistband from './waistband'
import draftCuff from './cuff'
import draftPocketBagFront from './pocketbagfront'
import draftPocketBagBack from './pocketbagback'
import draftPocketWelt from './pocketwelt'
import draftPocketWeltInterfacing from './pocketweltinterfacing'

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
Pattern.prototype.draftBack = (part) => draftBack(part)
Pattern.prototype.draftFront = (part) => draftFront(part)
Pattern.prototype.draftWaistband = (part) => draftWaistband(part)
Pattern.prototype.draftCuff = (part) => draftCuff(part)
Pattern.prototype.draftPocketBagFront = (part) => draftPocketBagFront(part)
Pattern.prototype.draftPocketBagBack = (part) => draftPocketBagBack(part)
Pattern.prototype.draftPocketWelt = (part) => draftPocketWelt(part)
Pattern.prototype.draftPocketWeltInterfacing = (part) => draftPocketWeltInterfacing(part)

export default Pattern
const frowns = -1
