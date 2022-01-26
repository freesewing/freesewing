import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBase from './base'
import draftBow1 from './bow1'
import draftBow2 from './bow2'
import draftBow3 from './bow3'
import draftRibbon from './ribbon'

// Create new design
const benjamin = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
benjamin.prototype.draftBase = draftBase
benjamin.prototype.draftBow1 = draftBow1
benjamin.prototype.draftBow2 = draftBow2
benjamin.prototype.draftBow3 = draftBow3
benjamin.prototype.draftRibbon = draftRibbon

export default benjamin
const frowns = -1
