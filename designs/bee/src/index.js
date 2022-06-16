import freesewing from '@freesewing/core'
import Bella from '@freesewing/bella'
import bundle from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftCup from './cup'
import draftNeckTie from './neckTie'
import draftBandTie from './bandTie'
//import draftFrontShoulderDart from './front-shoulder-dart'

// Create design
const Bee = new freesewing.Design(config, bundle)

// Attach draft methods to prototype
for (let m of ['draftBack', 'draftFrontSideDart']) {
  Bee.prototype[m] = function (part) {
    return new Bella(this.settings)[m](part)
  }
}
Bee.prototype.draftCup = draftCup
Bee.prototype.draftNeckTie = draftNeckTie
Bee.prototype.draftBandTie = draftBandTie
//Bee.prototype.draftFrontShoulderDart = (part) => draftFrontShoulderDart(part)

// Named exports
export { config, Bee }

// Default export
export default Bee
