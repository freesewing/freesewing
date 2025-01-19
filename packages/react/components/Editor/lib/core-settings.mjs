// Dependencies
import { defaultConfig as config } from '../config/index.mjs'
import { measurementAsMm } from '@freesewing/utils'
/*
 * Components
 * Note that these are only used as returns values
 * There's no JSX in here so no React import needed
 */
import {
  DetailIcon,
  ExpandIcon,
  IncludeIcon,
  MarginIcon,
  PaperlessIcon,
  SaIcon,
  ScaleIcon,
  UnitsIcon,
} from '@freesewing/react/components/Icon'

export function defaultSa(units, inMm = true) {
  const dflt = units === 'imperial' ? 0.5 : 1
  return inMm ? measurementAsMm(dflt, units) : dflt
}
export function defaultSamm(units, inMm = true) {
  const dflt = units === 'imperial' ? 0.5 : 1
  return inMm ? measurementAsMm(dflt, units) : dflt
}
/** custom event handlers for inputs that need them */
export function menuCoreSettingsOnlyHandler({ updateHandler, current }) {
  return function (path, part) {
    // Is this a reset?
    if (part === undefined || part === '__UNSET__') return updateHandler(path, part)

    // add or remove the part from the set
    let newParts = new Set(current || [])
    if (newParts.has(part)) newParts.delete(part)
    else newParts.add(part)

    // if the set is now empty, reset
    if (newParts.size < 1) newParts = undefined
    // otherwise use the new set
    else newParts = [...newParts]

    updateHandler(path, newParts)
  }
}

export function menuCoreSettingsSammHandler({ updateHandler, config }) {
  return function (_path, newCurrent) {
    // convert to millimeters if there's a value
    newCurrent = newCurrent === undefined ? config.dflt : newCurrent
    // update both values to match
    updateHandler(['samm'], newCurrent)
    updateHandler(['sa'], newCurrent)
  }
}

export function menuCoreSettingsSaboolHandler({ toggleSa }) {
  return toggleSa
}
export function menuCoreSettingsStructure({ units = 'metric', sabool = false, parts = [] }) {
  return {
    sabool: {
      ux: config.uxLevels.core.sa,
      list: [0, 1],
      choiceTitles: {
        0: 'Do not include seam allowance',
        1: 'Include seam allowance',
      },
      choiceDescriptions: {
        0: 'This generates a pattern which does not include any seam allowance. The size of the seam allowance does not matter as no seam allowance will be included',
        1: 'This generates a pattern that will include seam allowance. The size of the seam allowance is set individually',
      },
      valueTitles: {
        0: 'No',
        1: 'Yes',
      },
      dflt: 0,
      icon: SaIcon,
    },
    samm: sabool
      ? {
          ux: config.uxLevels.core.sa,
          min: 0,
          max: units === 'imperial' ? 2 : 2.5,
          dflt: defaultSamm(units),
          icon: SaIcon,
        }
      : false,
    paperless: {
      ux: config.uxLevels.core.paperless,
      list: [0, 1],
      choiceTitles: {
        0: 'Generate a regular pattern',
        1: 'Generate a paperless pattern',
      },
      choiceDescriptions: {
        0: 'This will generate a regular pattern, which you can them print out.',
        1: 'This will generate a pattern with dimensions and a grid, which allows you to transfer it on fabric or another medium without the need to print the pattern.',
      },
      valueTitles: {
        0: 'No',
        1: 'Yes',
      },
      dflt: 0,
      icon: PaperlessIcon,
    },
    units: {
      ux: config.uxLevels.core.units,
      list: ['metric', 'imperial'],
      dflt: 'metric',
      choiceTitles: {
        metric: 'Metric',
        imperial: 'Imperial',
      },
      choiceDescriptions: {
        0: 'Use this if you use the metric system, and centimeters are something you are familiar with. This is the best choice for most people around the world.',
        1: 'Use this if inches are more familiar to you. This is often the preferred choice for people based in the UK & US.',
      },
      valueTitles: {
        metric: 'Metric',
        imperial: 'Imperial',
      },
      icon: UnitsIcon,
    },
    complete: {
      ux: config.uxLevels.core.complete,
      list: [1, 0],
      dflt: 1,
      choiceTitles: {
        0: 'Generate a pattern outline',
        1: 'Generate a complete pattern',
      },
      choiceDescriptions: {
        0: 'Only generate the outline of the pattern parts. Use this if you are looking to use a laser cutter or have other specific needs.',
        1: 'This will generate a complete pattern with all annotations, markings and lines. Use this if you are not certain what to choose.',
      },
      valueTitles: {
        0: 'No',
        1: 'Yes',
      },
      icon: DetailIcon,
    },
    expand: {
      ux: config.uxLevels.core.expand,
      list: [1, 0],
      dflt: 1,
      choiceTitles: {
        0: 'Keep pattern parts compact where possible',
        1: 'Expand all pattern parts',
      },
      choiceDescriptions: {
        0: 'This will generate a more dense representation of the pattern which includes all info without using up too much space.',
        1: 'This will generate a pattern where all parts are drown to their full size, even if they are simple rectangles.',
      },
      valueTitles: {
        0: 'No',
        1: 'Yes',
      },
      icon: ExpandIcon,
    },
    only: {
      ux: config.uxLevels.core.only,
      dflt: false,
      list: parts,
      parts,
      icon: IncludeIcon,
    },
    scale: {
      ux: config.uxLevels.core.scale,
      min: 0.1,
      max: 5,
      dflt: 1,
      step: 0.1,
      icon: ScaleIcon,
    },
    margin: {
      ux: config.uxLevels.core.margin,
      min: 0,
      max: 2.5,
      dflt: measurementAsMm(units === 'imperial' ? 0.125 : 0.2, units),
      icon: MarginIcon,
    },
  }
}
