import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import Simon from '@freesewing/simon'
import plugins from '@freesewing/plugin-bundle'
import flipPlugin from '@freesewing/plugin-flip'
import buttonPlugin from '@freesewing/plugin-buttons'
import bustPlugin from '@freesewing/plugin-bust'
import config from '../config'
// Parts
import draftFbaFront from './fba-front'

// Create design
const Simone = new freesewing.Design(config, [plugins, flipPlugin, buttonPlugin, bustPlugin])

// Attach draft methods to prototype
Simone.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Simone.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Simone.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Simone.prototype.draftSleeveBase = function (part) {
  let brian = new Brian(this.settings)
  return brian.draftSleeve(brian.draftSleevecap(part))
}

// Attach draft methods from Simon
const simonParts = [
  'Back',
  'Front',
  'FrontRight',
  'ButtonPlacket',
  'FrontLeft',
  'ButtonholePlacket',
  'Yoke',
  'Sleeve',
  'CollarStand',
  'Collar',
  'SleevePlacketUnderlap',
  'SleevePlacketOverlap',
  'Cuff',
]

for (const Part of simonParts) {
  Simone.prototype[`draft${Part}`] = function (part) {
    let simon = new Simon(this.settings)
    return simon[`draft${Part}`](part)
  }
}

Simone.prototype.draftFbaFront = draftFbaFront

// Named exports
export { config, Simone }

// Default export
export default Simone
