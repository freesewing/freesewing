import { version } from '../package.json'
import { config as simonConfig } from '@freesewing/simon'

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
  },
}

export default config
