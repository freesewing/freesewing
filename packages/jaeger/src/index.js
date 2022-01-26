import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import buttons from '@freesewing/plugin-buttons'
import Bent from '@freesewing/bent'
import config from '../config'
// Parts
import draftBackBase from './backbase'
import draftFrontBase from './frontbase'
import draftFront from './front'
import draftBack from './back'
import draftSide from './side'
import draftCollarStand from './collarstand'
import draftCollar from './collar'
import draftUnderCollar from './undercollar'
import draftPocket from './pocket'
import draftPocketLining from './pocketlining'
import draftChestPocketWelt from './chestpocketwelt'
import draftChestPocketBag from './chestpocketbag'
import draftInnerPocketWelt from './innerpocketwelt'
import draftInnerPocketBag from './innerpocketbag'
import draftTopSleeve from './topsleeve'
import draftUnderSleeve from './undersleeve'

// Create new design
const Pattern = new freesewing.Design(config, [plugins, buttons])

// Attach draft methods from Bent to prototype
Pattern.prototype.draftBentBase = function (part) {
  return new Bent(this.settings).draftBase(part)
}
Pattern.prototype.draftBentFront = function (part) {
  return new Bent(this.settings).draftFront(part)
}
Pattern.prototype.draftBentBack = function (part) {
  return new Bent(this.settings).draftBack(part)
}
Pattern.prototype.draftBentSleeve = function (part) {
  return new Bent(this.settings).draftSleeve(part)
}
Pattern.prototype.draftBentTopSleeve = function (part) {
  return new Bent(this.settings).draftTopSleeve(part)
}
Pattern.prototype.draftBentUnderSleeve = function (part) {
  return new Bent(this.settings).draftUnderSleeve(part)
}

// Attach own draft methods to prototype
Pattern.prototype.draftBackBase = draftBackBase
Pattern.prototype.draftFrontBase = draftFrontBase
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftSide = draftSide
Pattern.prototype.draftCollarStand = draftCollarStand
Pattern.prototype.draftCollar = draftCollar
Pattern.prototype.draftUnderCollar = draftUnderCollar
Pattern.prototype.draftPocket = draftPocket
Pattern.prototype.draftPocketLining = draftPocketLining
Pattern.prototype.draftChestPocketWelt = draftChestPocketWelt
Pattern.prototype.draftChestPocketBag = draftChestPocketBag
Pattern.prototype.draftInnerPocketWelt = draftInnerPocketWelt
Pattern.prototype.draftInnerPocketBag = draftInnerPocketBag
Pattern.prototype.draftTopSleeve = draftTopSleeve
Pattern.prototype.draftUnderSleeve = draftUnderSleeve

export default Pattern
const frowns = -1
