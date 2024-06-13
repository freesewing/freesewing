/**
 * Helper method to determine whether all required measurements for a design are present
 *
 * @param {object} methods - An object holding possibly swizzled methods (unused here)
 * @param {object} Design - The FreeSewing design (or a plain object holding measurements)
 * @param {object} measurements - An object holding the user's measurements
 * @return {array} result - An array where the first element is true when we
 * have all measurements, and false if not. The second element is a list of
 * missing measurements.
 */
export const hasRequiredMeasurements = (methods, Design, measurements = {}) => {
  /*
   * If design is just a plain object holding measurements, we restructure it as a Design
   * AS it happens, this method is smart enough to test for this, so we call it always
   */
  Design = methods.structureMeasurementsAsDesign(Design)

  /*
   * Walk required measuremnets, and keep track of what's missing
   */
  const missing = []
  for (const m of Design.patternConfig?.measurements || []) {
    if (typeof measurements[m] === 'undefined') missing.push(m)
  }

  /*
   * Return true or false, plus a list of missing measurements
   */
  return [missing.length === 0, missing]
}
