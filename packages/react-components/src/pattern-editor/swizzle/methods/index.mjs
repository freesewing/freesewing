/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor allows swizzling methods                  *
 *                                                                       *
 * To 'swizzle' means to replace the default implementation of a         *
 * method with a custom one. It allows one to customize                  *
 * the pattern editor.                                                   *
 *                                                                       *
 * This file holds the 'swizzleMethods' method that will return          *
 * the various methods that can be swizzled, or their default            *
 * implementation.                                                       *
 *                                                                       *
 * To use a custom version, simply pas it as a prop into the editor      *
 * under the 'methods' key. So to pass a custom 't' method (used for     *
 * translate(, you do:                                                   *
 *                                                                       *
 * <PatternEditor methods={{ t: myCustomTranslationMethod }} />          *
 *                                                                       *
 *************************************************************************/

/*
 * Import of methods that can be swizzled
 */
import { capitalize } from './capitalize.mjs'
import { cloudImageUrl } from './cloud-image-url.mjs'
import { designMeasurements } from './design-measurements.mjs'
import { hasRequiredMeasurements } from './has-required-measurements.mjs'
import { isDegreeMeasurement } from './is-degree-measurement.mjs'
import { measurementAsMm } from './measurement-as-mm.mjs'
import { measurementAsUnits } from './measurement-as-units.mjs'
import { nsMerge } from './ns-merge.mjs'
import { objUpdate } from './obj-update.mjs'
import { parseDistanceInput } from './parse-distance-input.mjs'
import { round } from './round.mjs'
import { structureMeasurementsAsDesign } from './structure-measurements-as-design.mjs'
import { t } from './t.mjs'
import { draft } from './draft.mjs'
import { menuSettingsStructure } from './menu-settings-structure.mjs'
import { menuOptionsStructure } from './menu-options-structure.mjs'
import { menuOptionType } from './menu-option-type.mjs'
import { menuRoundPct, menuValidateNumericValue, menuValueWasChanged } from './menus.mjs'
import { formatPercentage } from './format-percentage.mjs'
import { defaultSa } from './default-sa.mjs'
import { formatFraction128 } from './format-fraction-128.mjs'
import { formatImperial } from './format-imperial.mjs'
import { formatMm } from './format-mm.mjs'
import { roundMm } from './round-mm.mjs'
import {
  menuSettingsOnlyHandler,
  menuSettingsSammHandler,
  menuSettingsSaboolHandler,
} from './menu-settings-handlers.mjs'
import { defaultSamm } from './default-samm.mjs'

/*
 * Placeholder for methods that need to be swizzled or won't be available
 */
import { noop } from './noop.mjs'

/**
 * This object holds all methods that can be swizzled
 */
const defaultMethods = {
  capitalize,
  cloudImageUrl,
  defaultSa,
  defaultSamm,
  designMeasurements,
  draft,
  formatFraction128,
  formatImperial,
  formatMm,
  formatPercentage,
  hasRequiredMeasurements,
  isDegreeMeasurement,
  measurementAsMm,
  measurementAsUnits,
  menuSettingsStructure,
  menuSettingsOnlyHandler,
  menuSettingsSammHandler,
  menuSettingsSaboolHandler,
  menuOptionsStructure,
  menuOptionType,
  menuRoundPct,
  menuValidateNumericValue,
  menuValueWasChanged,
  nsMerge,
  objUpdate,
  parseDistanceInput,
  round,
  roundMm,
  setModal: noop,
  structureMeasurementsAsDesign,
  t,
}

/*
 * This method returns methods that can be swizzled
 * So either the passed-in methods, or the default ones
 */
export const swizzleMethods = (methods, Swizzled) => {
  /*
   * We need to pass down the resulting methods, swizzled or not
   * because some methods rely on other (possibly swizzled) methods.
   * So we put this in this object so we can pass that down
   */
  const all = {}
  for (const [name, method] of Object.entries(defaultMethods)) {
    if (typeof method !== 'function')
      console.warn(`${name} is not defined as default method in swizzleMethods`)
    all[name] = methods[name]
      ? (...params) => methods[name](all, ...params)
      : (...params) => method(Swizzled, ...params)
  }

  /*
   * Return all methods
   */
  return all
}
