import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import bust from '@freesewing/plugin-bust'
import Bent from '@freesewing/bent'
import Carlton from '@freesewing/carlton'
import config from '../config'
// Parts
import draftFront from './front'
import draftSide from './side'

// Create new design
const Pattern = new freesewing.Design(config, [plugins, bust])

let fromBent = ['Base', 'Front', 'Back', 'Sleeve', 'TopSleeve', 'UnderSleeve']

// Attach draft methods from Bent to prototype
for (let m of fromBent) {
  Pattern.prototype['draftBent' + m] = function (part) {
    return new Bent(this.settings)['draft' + m](part)
  }
}

// Attach draft methods from Carlton to prototype
for (let m of [
  'draftBack',
  'draftTail',
  'draftTopSleeve',
  'draftUnderSleeve',
  'draftBelt',
  'draftCollarStand',
  'draftCollar',
  'draftCuffFacing',
  'draftPocket',
  'draftPocketFlap',
  'draftPocketLining',
  'draftChestPocketWelt',
  'draftChestPocketBag',
  'draftInnerPocketWelt',
  'draftInnerPocketBag',
  'draftInnerPocketTab',
]) {
  Pattern.prototype[m] = function (part) {
    return new Carlton(this.settings)[m](part)
  }
}

Pattern.prototype.draftCarltonFront = function (part) {
  return new Carlton(this.settings).draftFront(part)
}

// Attach own draft methods to prototype
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftSide = draftSide

export default Pattern
const frowns = -1
