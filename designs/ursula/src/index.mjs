import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftFront from './front'
import draftBack from './back'
import draftGusset from './gusset'
import draftElastic from './elastic'
import draftFront2 from './front2'
import draftBack2 from './back2'
import draftGusset2 from './gusset2'

// Create new design
const Ursula = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Ursula.prototype.draftFront = draftFront
Ursula.prototype.draftBack = draftBack
Ursula.prototype.draftGusset = draftGusset
Ursula.prototype.draftElastic = draftElastic
Ursula.prototype.draftFront2 = draftFront2
Ursula.prototype.draftBack2 = draftBack2
Ursula.prototype.draftGusset2 = draftGusset2

// Named exports
export { config, Ursula }

// Default export
export default Ursula
