import freesewing from '@freesewing/core'
import Titan from '@freesewing/titan'
import plugins from '@freesewing/plugin-bundle'
import mirrorPlugin from '@freesewing/plugin-mirror'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftWaistband from './waistband'
import draftWaistbandButtonSide from './waistband-button-side'
import draftWaistbandButtonholeSide from './waistband-buttonhole-side'
import draftFrontPocket from './front-pocket'
import draftBackPocket from './back-pocket'
import draftBackPocketFacing from './back-pocket-facing'

// Hack the waistHeight option to make room for waistband
const waistbandPlugin = {
  name: 'charlieWaistbandPlugin',
  version: config.version,
  hooks: {
    preDraft: function ({ settings }) {
      // Reduce the waistHeight option by 25% to make room for the waistband
      // We could also just use negative numbers, but that might confuse the user
      settings.options.waistHeight -= settings.options.waistbandReduction
    }
  }
}

// Create design
const Pattern = new freesewing.Design(config, [plugins, mirrorPlugin, waistbandPlugin])

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
Pattern.prototype.draftWaistbandButtonSide = (part) => draftWaistbandButtonSide(part)
Pattern.prototype.draftWaistbandButtonholeSide = (part) => draftWaistbandButtonholeSide(part)
Pattern.prototype.draftFrontPocket = (part) => draftFrontPocket(part)
Pattern.prototype.draftBackPocket = (part) => draftBackPocket(part)
Pattern.prototype.draftBackPocketFacing = (part) => draftBackPocketFacing(part)

export default Pattern
