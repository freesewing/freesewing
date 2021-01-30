import freesewing from '@freesewing/core'
import Titan from '@freesewing/titan'
import plugins from '@freesewing/plugin-bundle'

import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach titan draft methods to prototype
for (let p of ['Front', 'Back']) {
  Pattern.prototype[`draftTitan${p}`] = function(part) {
    return new Titan(this.settings)[`draft${p}`](part)
  }
}

// Attach charlie draft methods to prototype
Pattern.prototype.draftBack = part => draftBack(part)
Pattern.prototype.draftFront = part => draftFront(part)

export default Pattern
