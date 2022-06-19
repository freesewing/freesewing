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
const Rendertest = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Rendertest.prototype.draftDemo = (part) => draftDemo(part)
Rendertest.prototype.draftCircles = (part) => draftCircles(part)
Rendertest.prototype.draftColors = (part) => draftColors(part)
Rendertest.prototype.draftWidths = (part) => draftWidths(part)
Rendertest.prototype.draftStyles = (part) => draftStyles(part)
Rendertest.prototype.draftCombos = (part) => draftCombos(part)
Rendertest.prototype.draftText = (part) => draftText(part)
Rendertest.prototype.draftSnippets = (part) => draftSnippets(part)
Rendertest.prototype.draftMacros = (part) => draftMacros(part)

// Named exports
export { config, Rendertest }

// Default export
export default Rendertest
