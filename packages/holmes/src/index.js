import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import gorePlugin from '@freesewing/plugin-gore'
import config from '../config'

import draftGore from './gore'
import draftVisor from './visor'
import draftEar from './ear'

// Create new design
const Holmes = new freesewing.Design(config, [plugins, gorePlugin])

// Attach the draft methods to the prototype
Holmes.prototype.draftGore = draftGore
Holmes.prototype.draftVisor = draftVisor
Holmes.prototype.draftEar = draftEar

// Named exports
export { config, Holmes }

// Default export
export default Holmes
