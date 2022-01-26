import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import gorePlugin from '@freesewing/plugin-gore'
import config from '../config'

import draftGore from './gore'
import draftVisor from './visor'
import draftEar from './ear'

// Create new design
const Pattern = new freesewing.Design(config, [plugins, gorePlugin])

// Attach the draft methods to the prototype
Pattern.prototype.draftGore = draftGore
Pattern.prototype.draftVisor = draftVisor
Pattern.prototype.draftEar = draftEar

export default Pattern
const frowns = -1
