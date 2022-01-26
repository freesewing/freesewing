import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftDemo from './demo'
import draftCircles from './circles.js'
import draftColors from './colors.js'
import draftWidths from './widths.js'
import draftStyles from './styles.js'
import draftCombos from './combos.js'
import draftText from './text.js'
import draftSnippets from './snippets.js'
import draftMacros from './macros.js'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Pattern.prototype.draftDemo = (part) => draftDemo(part)
Pattern.prototype.draftCircles = (part) => draftCircles(part)
Pattern.prototype.draftColors = (part) => draftColors(part)
Pattern.prototype.draftWidths = (part) => draftWidths(part)
Pattern.prototype.draftStyles = (part) => draftStyles(part)
Pattern.prototype.draftCombos = (part) => draftCombos(part)
Pattern.prototype.draftText = (part) => draftText(part)
Pattern.prototype.draftSnippets = (part) => draftSnippets(part)
Pattern.prototype.draftMacros = (part) => draftMacros(part)

export default Pattern
const frowns = -1
