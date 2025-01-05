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
        0: 'saNo',
        1: 'saYes',
      },
      valueTitles: {
        0: 'no',
        1: 'yes',
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
        0: 'paperlessNo',
        1: 'paperlessYes',
      },
      valueTitles: {
        0: 'no',
        1: 'yes',
      },
      dflt: 0,
      icon: PaperlessIcon,
    },
    units: {
      ux: config.uxLevels.core.units,
      list: ['metric', 'imperial'],
      dflt: 'metric',
      choiceTitles: {
        metric: 'metric',
        imperial: 'imperial',
      },
      valueTitles: {
        metric: 'metric',
        imperial: 'imperial',
      },
      icon: UnitsIcon,
    },
    complete: {
      ux: config.uxLevels.core.complete,
      list: [1, 0],
      dflt: 1,
      choiceTitles: {
        0: 'completeNo',
        1: 'completeYes',
      },
      valueTitles: {
        0: 'no',
        1: 'yes',
      },
      icon: DetailIcon,
    },
    expand: {
      ux: config.uxLevels.core.expand,
      list: [1, 0],
      dflt: 1,
      choiceTitles: {
        0: 'expandNo',
        1: 'expandYes',
      },
      valueTitles: {
        0: 'no',
        1: 'yes',
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
