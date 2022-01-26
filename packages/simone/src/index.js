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
const Pattern = new freesewing.Design(config, [plugins, flipPlugin, buttonPlugin, bustPlugin])

// Attach draft methods to prototype
Pattern.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Pattern.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Pattern.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Pattern.prototype.draftSleeveBase = function (part) {
  let brian = new Brian(this.settings)
  return brian.draftSleeve(brian.draftSleevecap(part))
}

// Attach draft methods from Simon
let simonParts = [
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

for (let Part of simonParts) {
  Pattern.prototype[`draft${Part}`] = function (part) {
    let simon = new Simon(this.settings)
    return simon[`draft${Part}`](part)
  }
}

Pattern.prototype.draftFbaFront = draftFbaFront

export default Pattern
const frowns = -1
