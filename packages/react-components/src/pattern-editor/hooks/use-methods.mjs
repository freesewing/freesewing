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
 * This hook returns methods that can be swizzled
 * So either the passed-in methods, or the default ones
 */
export const useMethods = (props) => ({
  hasRequiredMeasurements: props?.hasRequiredMeasurements || hasRequiredMeasurements,
  nsMerge: props?.nsMerge || nsMerge,
  t: props?.t || t,
})

/**
 * Helper method to merge arrays of translation namespaces
 *
 * Note that this method is variadic
 *
 * @param {[string]} namespaces - A string or array of strings of namespaces
 * @return {[string]} namespaces - A merged array of all namespaces
 */
const nsMerge = (...args) => {
  const ns = new Set()
  for (const arg of args) {
    if (typeof arg === 'string') ns.add(arg)
    else if (Array.isArray(arg)) {
      for (const el of nsMerge(...arg)) ns.add(el)
    }
  }

  return [...ns]
}

/**
 * Helper method to determine whether all required measurements for a design are present
 *
 * @param {object} Design - The FreeSewing design (or a plain object holding measurements)
 * @param {object} measies - An object holding the user's measurements
 * @return {array} result - An array where the first element is true when we
 * have all measurements, and false if not. The second element is a list of
 * missing measurements.
 */
const hasRequiredMeasurements = (Design, measies = {}) => {
  /*
   * If design is just a plain object holding measurements, restructure it as a Design
   */
  if (!Design.patternConfig) Design = { patternConfig: { measurements } }

  /*
   * Walk required measuremnets, and keep track of what's missing
   */
  const missing = []
  for (const m of Design.patternConfig?.measurements || []) {
    if (typeof measies[m] === 'undefined') missing.push(m)
  }

  /*
   * Return true or false, plus a list of missing measurements
   */
  return [missing.length === 0, missing]
}

/*
 * A translation fallback method in case none is passed in
 */
const t = (key) => key
