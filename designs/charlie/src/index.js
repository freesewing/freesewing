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
import draftBackPocketWelt from './back-pocket-welt'
import draftFlyFacing from './fly-facing'
import draftFlyExtension from './fly-extension'
import draftBeltLoops from './beltloops'

// Create design
const Charlie = new freesewing.Design(config, [plugins, mirrorPlugin, buttonsPlugin, bartackPlugin])

// Attach titan draft methods to prototype
for (let p of ['Front', 'Back']) {
  Charlie.prototype[`draftTitan${p}`] = function (part) {
    return new Titan(this.settings)[`draft${p}`](part)
  }
}

// Attach charlie draft methods to prototype
Charlie.prototype.draftBack = (part) => draftBack(part)
Charlie.prototype.draftFront = (part) => draftFront(part)
Charlie.prototype.draftWaistband = (part) => draftWaistband(part)
Charlie.prototype.draftWaistbandCurved = (part) => draftWaistbandCurved(part)
Charlie.prototype.draftFrontPocket = (part) => draftFrontPocket(part)
Charlie.prototype.draftFrontPocketFacing = (part) => draftFrontPocketFacing(part)
Charlie.prototype.draftBackPocket = (part) => draftBackPocket(part)
Charlie.prototype.draftBackPocketFacing = (part) => draftBackPocketFacing(part)
Charlie.prototype.draftBackPocketInterfacing = (part) => draftBackPocketInterfacing(part)
Charlie.prototype.draftBackPocketWelt = (part) => draftBackPocketWelt(part)
Charlie.prototype.draftFlyFacing = (part) => draftFlyFacing(part)
Charlie.prototype.draftFlyExtension = (part) => draftFlyExtension(part)
Charlie.prototype.draftBeltLoops = (part) => draftBeltLoops(part)

// Named exports
export { config, Charlie }

// Default export
export default Charlie
