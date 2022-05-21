import pkg from '../package.json'
import Simon from '@freesewing/simon'

const config = {
  ...Simon.config,
  name: 'simone',
  version: pkg.version,
  optionGroups: {
    ...Simon.config.optionGroups,
    style: [
      ...Simon.config.optionGroups.style,
      'contour',
    ],
    advanced: [
      ...Simon.config.optionGroups.advanced,
      'bustDartAngle',
      'bustDartLength',
      'frontDartLength',
    ],
  },
  measurements: [
    ...Simon.config.measurements,
    'bustSpan',
    'highBust',
    'hpsToBust',
  ],
  inject: {
    ...Simon.config.inject,
    fbaFront: 'front',
    frontRight: 'fbaFront',
    frontLeft: 'fbaFront',
    buttonPlacket: 'fbaFront',
    buttonholePlacket: 'fbaFront',
    sleeveBase: 'fbaFront',
  },
  hide: [
    ...Simon.config.hide,
    'fbaFront'
  ],
  options: {
    ...Simon.config.options,

    // Constants
    minimalDartShaping: 5,

    // Simone specific
    bustDartAngle: { deg: 10, min: 0, max: 20 },
    bustDartLength: { pct: 80, min: 50, max: 90 },
    frontDartLength: { pct: 45, min: 30, max: 60 },
    contour: { pct: 50, min: 30, max: 75 },
  },
}

export default config
