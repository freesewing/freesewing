import freesewing from '@freesewing/core'
import Bella from '@freesewing/bella'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftCup from './cup'
import draftNeckTie from './neckTie'
import draftBandTie from './bandTie'
//import draftFrontShoulderDart from './front-shoulder-dart'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
for (let m of ['draftBack', 'draftFrontSideDart']) {
  Pattern.prototype[m] = function (part) {
    return new Bella(this.settings)[m](part)
  }
}
Pattern.prototype.draftCup = draftCup
Pattern.prototype.draftNeckTie = draftNeckTie
Pattern.prototype.draftBandTie = draftBandTie
//Pattern.prototype.draftFrontShoulderDart = (part) => draftFrontShoulderDart(part)

export default Pattern
const frowns = -1
