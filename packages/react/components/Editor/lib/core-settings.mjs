import React from 'react'
// Dependencies
import { defaultConfig as config } from '../config/index.mjs'
import { measurementAsMm } from '@freesewing/utils'
import { linkClasses } from '@freesewing/utils'
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

const CoreDocsLink = ({ item }) => (
  <a href={`/docs/about/site/draft/#${item.toLowerCase()}`} className={`${linkClasses} tw-px-2`}>
    Learn more
  </a>
)

export function menuCoreSettingsStructure({ units = 'metric', sabool = false, parts = [] }) {
  return {
    sabool: {
      dense: true,
      title: 'Include seam allowance',
      about: (
        <>
          Controls whether or not you want to include seam allowance on your pattern.
          <CoreDocsLink item="sabool" />
        </>
      ),
      ux: config.uxLevels.core.sa,
      list: [0, 1],
      choiceTitles: {
        0: 'Do not include seam allowance',
        1: 'Include seam allowance',
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
          title: 'Seam Allowance Size',
          about: (
            <>
              Controls the size of the pattern's seam allowance.
              <CoreDocsLink item="sa" />
            </>
          ),
          ux: config.uxLevels.core.sa,
          min: 0,
          max: units === 'imperial' ? 2 : 2.5,
          dflt: defaultSamm(units),
          icon: SaIcon,
        }
      : false,
    units: {
      dense: true,
      title: 'Pattern units',
      about: (
        <>
          Allows you to switch between metric and imperial units on the pattern.
          <CoreDocsLink item="units" />
        </>
      ),
      ux: config.uxLevels.core.units,
      list: ['metric', 'imperial'],
      dflt: 'metric',
      choiceTitles: {
        metric: 'Metric Units (cm)',
        imperial: 'Imperial Units (inch)',
      },
      valueTitles: {
        metric: 'Metric',
        imperial: 'Imperial',
      },
      icon: UnitsIcon,
    },
    paperless: {
      dense: true,
      title: 'Paperless pattern',
      about: (
        <>
          Trees are awesome, and taping together sewing patterns is not much fun. Try our paperless
          mode to avoid the need to print out your pattern altogether.
          <CoreDocsLink item="paperless" />
        </>
      ),
      ux: config.uxLevels.core.paperless,
      list: [0, 1],
      choiceTitles: {
        0: 'Generate a regular pattern',
        1: 'Generate a paperless pattern',
      },
      valueTitles: {
        0: 'No',
        1: 'Yes',
      },
      dflt: 0,
      icon: PaperlessIcon,
    },
    complete: {
      dense: true,
      title: 'Generate a detailed pattern',
      about: (
        <>
          Controls how detailed the pattern is; Either a complete pattern with all details, or a
          basic outline of the pattern parts.
          <CoreDocsLink item="complete" />
        </>
      ),
      ux: config.uxLevels.core.complete,
      list: [1, 0],
      dflt: 1,
      choiceTitles: {
        0: 'Generate a pattern outline',
        1: 'Generate a detailed pattern',
      },
      valueTitles: {
        0: 'No',
        1: 'Yes',
      },
      icon: DetailIcon,
    },
    expand: {
      dense: true,
      title: 'Expand pattern parts',
      about: (
        <>
          Controls efforts to save paper. Disable this to expand all pattern parts at the cost of
          using more space & paper.
          <CoreDocsLink item="expand" />
        </>
      ),
      ux: config.uxLevels.core.expand,
      list: [1, 0],
      dflt: 1,
      choiceTitles: {
        0: 'Keep pattern parts compact where possible',
        1: 'Expand all pattern parts',
      },
      valueTitles: {
        0: 'No',
        1: 'Yes',
      },
      icon: ExpandIcon,
    },
    only: {
      dense: true,
      title: 'Only included selected pattern parts',
      about: (
        <>
          Allows you to control what parts to include in your pattern.
          <CoreDocsLink item="only" />
        </>
      ),
      ux: config.uxLevels.core.only,
      dflt: false,
      list: parts,
      parts,
      icon: IncludeIcon,
    },
    scale: {
      title: 'Pattern annotations scale',
      about: (
        <>
          Allows you to control the scale of annotations on the pattern. This is most useful when
          generating very small patterns, like for doll outfits.
          <CoreDocsLink item="scale" />
        </>
      ),
      ux: config.uxLevels.core.scale,
      min: 0.1,
      max: 5,
      dflt: 1,
      step: 0.1,
      icon: ScaleIcon,
    },
    margin: {
      title: 'Pattern parts margin',
      about: (
        <>
          Controls the gap between pattern parts, as well as the gap between the parts and the page
          edge.
          <CoreDocsLink item="margin" />
        </>
      ),
      ux: config.uxLevels.core.margin,
      min: 0,
      max: 2.5,
      dflt: measurementAsMm(units === 'imperial' ? 0.125 : 0.2, units),
      icon: MarginIcon,
    },
  }
}
