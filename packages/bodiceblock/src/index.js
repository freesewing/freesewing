import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
//Parts
import draftArmhole from './armhole'
import draftNeck from './neck'
import draftFront from './front'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftArmhole = draftArmhole
Pattern.prototype.draftNeck = draftNeck
Pattern.prototype.draftFront = draftFront



export default Pattern
