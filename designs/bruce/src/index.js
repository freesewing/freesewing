import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftSide from './side'
import draftFront from './front'
import draftInset from './inset'

// Create design
const Bruce = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Bruce.prototype.draftBack = (part) => draftBack(part)
Bruce.prototype.draftSide = (part) => draftSide(part)
Bruce.prototype.draftInset = (part) => draftInset(part)
Bruce.prototype.draftFront = (part) => draftFront(part)

// Named exports
export { config, Bruce }

// Default export
export default Bruce
