import freesewing from '@freesewing/core'
import Titan from '@freesewing/titan'
import plugins from '@freesewing/plugin-bundle'
import mirrorPlugin from '@freesewing/plugin-mirror'
import buttonsPlugin from '@freesewing/plugin-buttons'
import bartackPlugin from '@freesewing/plugin-bartack'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftWaistband from './waistband'
import draftWaistbandCurved from './waistband-curved'
import draftFrontPocket from './front-pocket'
import draftFrontPocketFacing from './front-pocket-facing'
import draftBackPocket from './back-pocket'
import draftBackPocketFacing from './back-pocket-facing'
import draftBackPocketInterfacing from './back-pocket-interfacing'
import draftBackPocketJet from './back-pocket-jet'
import draftFlyFacing from './fly-facing'
import draftFlyExtension from './fly-extension'
import draftBeltLoops from './beltloops'

// Create design
const Pattern = new freesewing.Design(config, [plugins, mirrorPlugin, buttonsPlugin, bartackPlugin])

// Attach titan draft methods to prototype
for (let p of ['Front', 'Back']) {
  Pattern.prototype[`draftTitan${p}`] = function (part) {
    return new Titan(this.settings)[`draft${p}`](part)
  }
}

// Attach charlie draft methods to prototype
Pattern.prototype.draftBack = (part) => draftBack(part)
Pattern.prototype.draftFront = (part) => draftFront(part)
Pattern.prototype.draftWaistband = (part) => draftWaistband(part)
Pattern.prototype.draftWaistbandCurved = (part) => draftWaistbandCurved(part)
Pattern.prototype.draftFrontPocket = (part) => draftFrontPocket(part)
Pattern.prototype.draftFrontPocketFacing = (part) => draftFrontPocketFacing(part)
Pattern.prototype.draftBackPocket = (part) => draftBackPocket(part)
Pattern.prototype.draftBackPocketFacing = (part) => draftBackPocketFacing(part)
Pattern.prototype.draftBackPocketInterfacing = (part) => draftBackPocketInterfacing(part)
Pattern.prototype.draftBackPocketJet = (part) => draftBackPocketJet(part)
Pattern.prototype.draftFlyFacing = (part) => draftFlyFacing(part)
Pattern.prototype.draftFlyExtension = (part) => draftFlyExtension(part)
Pattern.prototype.draftBeltLoops = (part) => draftBeltLoops(part)

export default Pattern
const frowns = -1
