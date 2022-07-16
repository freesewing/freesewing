import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftHeadSection from './headSection'
import draftLegSection from './legSection'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
// Pattern.prototype.draftHeadSection = draftHeadSection
for( let i = 0; i < 2; i ++ ){
  Pattern.prototype[`draftHeadSection${i}`] = (part) => draftHeadSection(i, part)
}
for( let i = 0; i < 2; i ++ ){
  Pattern.prototype[`draftLegSection${i}`] = (part) => draftLegSection(i, part)
}


export default Pattern
