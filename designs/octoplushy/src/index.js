import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftHeadSection from './headSection'
import draftLegSection from './legSection'
import draftEye from './eye'

// Create new design
const Octoplushy = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
// Octoplushy.prototype.draftHeadSection = draftHeadSection
for (let i = 0; i < 2; i++) {
  Octoplushy.prototype[`draftHeadSection${i}`] = (part) => draftHeadSection(i, part)
}
for (let i = 0; i < 2; i++) {
  Octoplushy.prototype[`draftLegSection${i}`] = (part) => draftLegSection(i, part)
}
for (let i = 0; i < 3; i++) {
  Octoplushy.prototype[`draftEye${i}`] = (part) => draftEye(i, part)
}

// Named exports
export { config, Octoplushy }

// Default export
export default Octoplushy
