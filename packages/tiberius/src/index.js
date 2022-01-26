import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftTunica from './tunica'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

Pattern.prototype.draftTunica = draftTunica

export default Pattern
const frowns = -1
