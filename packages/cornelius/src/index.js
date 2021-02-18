import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftFrontpoints from './frontpoints'
import draftFront from './front'
import draftBack from './back'
import draftLegband from './legband'
import draftWaistband from './waistband'
import draftPocketfacing from './pocketfacing'
import draftPocket from './pocket'
// import draftPlacket from './placket'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// console.log( Pattern );
// Attach the draft methods to the prototype
Pattern.prototype.draftFrontpoints = draftFrontpoints
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftLegband = draftLegband
Pattern.prototype.draftWaistband = draftWaistband
Pattern.prototype.draftPocketfacing = draftPocketfacing
Pattern.prototype.draftPocket = draftPocket
// Pattern.prototype.draftPlacket = draftPlacket
// console.log( Pattern );

export default Pattern
