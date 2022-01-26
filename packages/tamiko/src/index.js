import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftTop from './top'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Part draft method
Pattern.prototype.draftTop = (part) => draftTop(part)

export default Pattern
const frowns = -1
