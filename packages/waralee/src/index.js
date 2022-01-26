import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftPantsproto from './pantsproto'
import draftPants from './pants'
import draftCutout from './cutout'
import draftPocket from './pocket'
import draftBackPocket from './backpocket'
import draftFacings from './facings'
import draftMini from './mini'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftPantsproto = draftPantsproto
Pattern.prototype.draftPants = draftPants
Pattern.prototype.draftCutout = draftCutout
Pattern.prototype.draftPocket = draftPocket
Pattern.prototype.draftBackPocket = draftBackPocket
Pattern.prototype.draftFacings = draftFacings
Pattern.prototype.draftMini = draftMini

export default Pattern
const frowns = -1
