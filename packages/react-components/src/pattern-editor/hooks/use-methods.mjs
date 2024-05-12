/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor useMethods hook, with swizzle support     *
 *                                                                       *
 * To 'swizzle' means to replace the default implementation of a         *
 * method with a custom one. It allows one to customize                  *
 * the pattern editor.                                                   *
 *                                                                       *
 * This file holds the 'useMethods' hook that will load the various      *
 * methods that can be swizzled, as well as their default versions       *
 * that can be overridden.                                               *
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
import { hasRequiredMeasurements } from '../swizzle/methods/has-required-measurements.mjs'
import { isDegreeMeasurement } from '../swizzle/methods/is-degree-measurement.mjs'
import { measurementAsMm } from '../swizzle/methods/measurement-as-mm.mjs'
import { measurementAsUnits } from '../swizzle/methods/measurement-as-units.mjs'
import { nsMerge } from '../swizzle/methods/ns-merge.mjs'
import { objUpdate } from '../swizzle/methods/obj-update.mjs'
import { parseDistanceInput } from '../swizzle/methods/parse-distance-input.mjs'
import { round } from '../swizzle/methods/round.mjs'
import { t } from '../swizzle/methods/t.mjs'
/*
 * Placeholder for methods that need to be swizzled or won't be available
 */
import { noop } from '../swizzle/methods/noop.mjs'

/**
 * This object holds all methods that can be swizzled
 */
const defaultMethods = {
  hasRequiredMeasurements,
  isDegreeMeasurement,
  measurementAsMm,
  measurementAsUnits,
  nsMerge,
  objUpdate,
  parseDistanceInput,
  round,
  setModal: noop,
  t,
}

/*
 * This hook returns methods that can be swizzled
 * So either the passed-in methods, or the default ones
 */
export const useMethods = (methods) => {
  /*
   * We need to pass down the resulting methods, swizzled or not
   * because some methods rely on other (possibly swizzled) methods.
   * So we put this in this object so we can pass that down
   */
  const all = {}
  for (let [name, method] of Object.entries(defaultMethods)) {
    if (methods[name]) method = methods[name]
    console.log({ name, method })
    all[name] = (...params) => method(all, ...params)
  }

  /*
   * Return all methods
   */
  return all
}
