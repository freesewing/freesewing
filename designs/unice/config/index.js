import { version } from '../package.json'
import { config as ursulaConfig } from '@freesewing/ursula'

const design = ['Anna Puk', 'Natalia Sayang']

const config = {
  ...ursulaConfig,
  version,
  design,
  code: design,
  name: 'unice',
  inject: {
    front: 'ursulaFront',
    back: 'ursulaBack',
    gusset: 'ursulaGusset',
    front2: 'front',
    back2: 'back',
    gusset2: 'gusset',    
  },
  hide: ['ursulaBack', 'ursulaFront', 'ursulaGusset','front', 'back', 'gusset'],
  parts: ['front','back','gusset','elastic','front2','back2','gusset2'],
  optionalMeasurements: ['crossSeam','crossSeamFront'],
  measurements: ['waist', 'seat', 'waistToSeat', 'waistToUpperLeg','hips','waistToHips'],
  optionGroups: {
    ...ursulaConfig.optionGroups,
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
  dependencies: {
    back: 'front',
    gusset: 'back',
    elastic: 'gusset',
    front2: 'elastic',
    back2: 'elastic',
    gusset2: 'elastic',
  },
  options: {
    ...ursulaConfig.options,
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

