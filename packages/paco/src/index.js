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
const Paco = new freesewing.Design(config, plugins)

// Attach Titan draft methods to prototype
Paco.prototype.draftTitanBack = function (part) {
  return new Titan(this.settings).draftBack(part)
}
Paco.prototype.draftTitanFront = function (part) {
  return new Titan(this.settings).draftFront(part)
}

// Attach own draft methods to prototype
Paco.prototype.draftBack = (part) => draftBack(part)
Paco.prototype.draftFront = (part) => draftFront(part)
Paco.prototype.draftWaistband = (part) => draftWaistband(part)
Paco.prototype.draftCuff = (part) => draftCuff(part)
Paco.prototype.draftPocketBagFront = (part) => draftPocketBagFront(part)
Paco.prototype.draftPocketBagBack = (part) => draftPocketBagBack(part)
Paco.prototype.draftPocketWelt = (part) => draftPocketWelt(part)
Paco.prototype.draftPocketWeltInterfacing = (part) => draftPocketWeltInterfacing(part)

// Named exports
export { config, Paco }

// Default export
export default Paco
