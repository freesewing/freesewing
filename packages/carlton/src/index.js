import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import Bent from '@freesewing/bent'
import config from '../config'
// Parts
import draftFront from './front'
import draftBack from './back'
import draftTail from './tail'
import draftTopSleeve from './topsleeve'
import draftUnderSleeve from './undersleeve'
import draftBelt from './belt'
import draftCollarStand from './collarstand'
import draftCollar from './collar'
import draftCuffFacing from './cufffacing'
import draftPocket from './pocket'
import draftPocketFlap from './pocketflap'
import draftPocketLining from './pocketlining'
import draftChestPocketWelt from './chestpocketwelt'
import draftChestPocketBag from './chestpocketbag'
import draftInnerPocketWelt from './innerpocketwelt'
import draftInnerPocketBag from './innerpocketbag'
import draftInnerPocketTab from './innerpockettab'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

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
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftTail = draftTail
Pattern.prototype.draftTopSleeve = draftTopSleeve
Pattern.prototype.draftUnderSleeve = draftUnderSleeve
Pattern.prototype.draftBelt = draftBelt
Pattern.prototype.draftCollarStand = draftCollarStand
Pattern.prototype.draftCollar = draftCollar
Pattern.prototype.draftCuffFacing = draftCuffFacing
Pattern.prototype.draftPocket = draftPocket
Pattern.prototype.draftPocketFlap = draftPocketFlap
Pattern.prototype.draftPocketLining = draftPocketLining
Pattern.prototype.draftChestPocketWelt = draftChestPocketWelt
Pattern.prototype.draftChestPocketBag = draftChestPocketBag
Pattern.prototype.draftInnerPocketWelt = draftInnerPocketWelt
Pattern.prototype.draftInnerPocketBag = draftInnerPocketBag
Pattern.prototype.draftInnerPocketTab = draftInnerPocketTab

export default Pattern
const frowns = -1
