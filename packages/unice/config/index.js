import pkg from '../package.json'
import Ursula from '@freesewing/ursula'

const design = ['Anna Puk', 'Natalia Sayang']

const config = {
  ...Ursula.config,
  design,
  code: design,
  version: pkg.version,
  name: 'unice',
  inject: {
    ...Ursula.config.inject,
    front: 'ursulaFront',
    back: 'ursulaBack',
    gusset: 'ursulaGusset',
  },
  hide: ['ursulaBack', 'ursulaFront', 'ursulaGusset'],
  parts: [],
  optionalMeasurements: ['crossSeam','crossSeamFront'],
  measurements: ['waist', 'seat', 'waistToSeat', 'waistToUpperLeg','hips','waistToHips'],
  optionGroups: {
    ...Ursula.config.optionGroups,
    fit: [
      'fabricStretchX',
      'fabricStretchY',
      'adjustStretch',
      'elasticStretch',
      'useCrossSeam',
      'gussetWidth',
      'gussetLength'
    ],
  },
  options: {
    ...Ursula.options,
    gussetShift: 0.015, // fraction of seat circumference - could be an advanced option?
    gussetWidth: { pct: 7.2, min: 2, max: 12 }, // Gusset width in relation to waist-to-upperleg
    fabricStretchX: { pct: 15, min: 0, max: 100 }, // horizontal stretch (range set wide for beta testing)
    fabricStretchY: {pct: 0, min: 0, max: 100 }, // vertical stretch (range set wide for beta testing)
    rise: { pct: 60, min: 30, max: 100 }, // extending rise beyond 100% would require adapting paths.sideLeft!
    legOpening: { pct: 45, min: 5, max: 85 },
    // booleans
    useCrossSeam: { bool: true },
    adjustStretch: {bool: true}, // to not stretch fabric to the limits
  }
}

//delete config.options.fabricStretch

export default config

