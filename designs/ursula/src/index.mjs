import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftFront from './front'
import draftBack from './back'
import draftGusset from './gusset'
import draftElastic from './elastic'

// Create new design
const Ursula = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Ursula.prototype.draftFront = draftFront
Ursula.prototype.draftBack = draftBack
Ursula.prototype.draftGusset = draftGusset
Ursula.prototype.draftElastic = draftElastic

// Named exports
export { config, Ursula }

// Default export
export default Ursula
