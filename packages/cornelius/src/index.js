import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftFrontpoints from './frontpoints'
import draftFront from './front'
import draftBack from './back'
import draftLegband from './legband'
import draftLegbandkeystone from './legbandkeystone'
import draftWaistband from './waistband'
import draftPocketfacing from './pocketfacing'
import draftPocket from './pocket'
import draftZipperguard from './zipperguard'
// import draftPlacket from './placket'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftFrontpoints = draftFrontpoints
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftLegband = draftLegband
Pattern.prototype.draftLegbandkeystone = draftLegbandkeystone
Pattern.prototype.draftWaistband = draftWaistband
Pattern.prototype.draftPocketfacing = draftPocketfacing
Pattern.prototype.draftPocket = draftPocket
Pattern.prototype.draftZipperguard = draftZipperguard
// Pattern.prototype.draftPlacket = draftPlacket

export default Pattern
const frowns = -1
