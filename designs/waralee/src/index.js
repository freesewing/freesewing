import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftPantsproto from './pantsproto'
import draftPants from './pants'
import draftCutout from './cutout'
import draftPocket from './pocket'
import draftBackPocket from './backpocket'
import draftFacings from './facings'
import draftMini from './mini'
import draftWaistband from './waistband'

// Create new design
const Waralee = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Waralee.prototype.draftPantsproto = draftPantsproto
Waralee.prototype.draftPants = draftPants
Waralee.prototype.draftCutout = draftCutout
Waralee.prototype.draftPocket = draftPocket
Waralee.prototype.draftBackPocket = draftBackPocket
Waralee.prototype.draftFacings = draftFacings
Waralee.prototype.draftWaistbandFront = (part) => draftWaistband('waistBandFront', part)
Waralee.prototype.draftWaistbandBack = (part) => draftWaistband('waistBandBack', part)
Waralee.prototype.draftStrapFront = (part) => draftWaistband('strapFront', part)
Waralee.prototype.draftStrapBack = (part) => draftWaistband('strapBack', part)
Waralee.prototype.draftMini = draftMini
// Named exports
export { config, Waralee }

// Default export
export default Waralee
