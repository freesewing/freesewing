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
const Cornelius = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Cornelius.prototype.draftFrontpoints = draftFrontpoints
Cornelius.prototype.draftFront = draftFront
Cornelius.prototype.draftBack = draftBack
Cornelius.prototype.draftLegband = draftLegband
Cornelius.prototype.draftLegbandkeystone = draftLegbandkeystone
Cornelius.prototype.draftWaistband = draftWaistband
Cornelius.prototype.draftPocketfacing = draftPocketfacing
Cornelius.prototype.draftPocket = draftPocket
Cornelius.prototype.draftZipperguard = draftZipperguard
// Cornelius.prototype.draftPlacket = draftPlacket

// Named exports
export { config, Cornelius }

// Default export
export default Cornelius
