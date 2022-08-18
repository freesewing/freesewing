import { version } from '../package.json'
import { config as simonConfig } from '@freesewing/simon'

// Add the Bust-aligned Buttons option into the "Style->Closure" submenu.
// - Because the closure submenu is an object in the style array,
//   we cannot simply replace/overwrite it by adding a new closure
//   submenu. Doing so would just create a duplicate "Closure"
//   submenu.
// - Instead, we would need to remove the existing closure submenu
//   object from simonConfig.optionGroups.style first, before adding
//   the new closure submenu. (Doing it this way would also have the
//   side effect of changing the position of the "Closure" submenu
//   within the main"Style" menu.)
// - Alternately, we can simply modify the existing closure submenu
//   object in place, and that is what we are doing here: injecting the
//   new 'bustAlignedButtons' option directly into the closure submenu
//   array. This seems to be the least disruptive method.
const closureindex = simonConfig.optionGroups.style.findIndex((item) =>
    typeof item === 'object' && "closure" in item)
simonConfig.optionGroups.style[closureindex].closure.push('bustAlignedButtons')

const config = {
  version,
  ...simonConfig,
  name: 'simone',
  optionGroups: {
    ...simonConfig.optionGroups,
    style: [...simonConfig.optionGroups.style, 'frontDarts', 'contour'],
    advanced: [
      ...simonConfig.optionGroups.advanced,
      'bustDartAngle',
      'bustDartLength',
      'frontDartLength',
    ],
  },
  measurements: [...simonConfig.measurements, 'bustSpan', 'highBust', 'hpsToBust'],
  inject: {
    ...simonConfig.inject,
    fbaFront: 'front',
    frontRight: 'fbaFront',
    frontLeft: 'fbaFront',
    buttonPlacket: 'fbaFront',
    buttonholePlacket: 'fbaFront',
    sleeveBase: 'fbaFront',
  },
  hide: [...simonConfig.hide, 'fbaFront'],
  options: {
    ...simonConfig.options,

    // Constants
    minimalDartShaping: 5,

    // Simone specific
    bustDartAngle: { deg: 10, min: 0, max: 20 },
    bustDartLength: { pct: 80, min: 50, max: 90 },
    frontDarts: { bool: false },
    frontDartLength: { pct: 45, min: 30, max: 60 },
    contour: { pct: 50, min: 30, max: 75 },
    bustAlignedButtons: {
      dflt: 'Disabled',
      list: ['Even spacing', 'Split spacing', 'Disabled'], },
  },
}

export default config
