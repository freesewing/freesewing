import freesewing from '@freesewing/core'
import Titan from '@freesewing/titan'
import plugins from '@freesewing/plugin-bundle'

import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'

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
const Pattern = new freesewing.Design(config, [plugins, waistbandPlugin])

// Attach titan draft methods to prototype
for (let p of ['Front', 'Back']) {
  Pattern.prototype[`draftTitan${p}`] = function (part) {
    return new Titan(this.settings)[`draft${p}`](part)
  }
}

// Attach charlie draft methods to prototype
Pattern.prototype.draftBack = (part) => draftBack(part)
Pattern.prototype.draftFront = (part) => draftFront(part)

export default Pattern
