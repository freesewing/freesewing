/*
 * Returns a list of measurements for a design
 *
 * @param {object} Swizzled - Swizzled code, not used here
 * @param {object} Design - The Design object
 * @param {object} measies - The current set of measurements
 * @return {object} measurements - Object holding measurements that are relevant for this design
 */
export function designMeasurements(Swizzled, Design, measies = {}) {
  const measurements = {}
  for (const m of Design.patternConfig?.measurements || []) measurements[m] = measies[m]
  for (const m of Design.patternConfig?.optionalMeasurements || []) measurements[m] = measies[m]

  return measurements
}
/**
 * Helper method to determine whether all required measurements for a design are present
 *
 * @param {object} Swizzled - Swizzled code, including methods
 * @param {object} Design - The FreeSewing design (or a plain object holding measurements)
 * @param {object} measurements - An object holding the user's measurements
 * @return {array} result - An array where the first element is true when we
 * have all measurements, and false if not. The second element is a list of
 * missing measurements.
 */
export function hasRequiredMeasurements(Swizzled, Design, measurements = {}) {
  /*
   * If design is just a plain object holding measurements, we restructure it as a Design
   * AS it happens, this method is smart enough to test for this, so we call it always
   */
  Design = Swizzled.methods.structureMeasurementsAsDesign(Design)

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
/**
 * Helper method to determine whether a measurement uses degrees
 *
 * @param {object} Swizzled - Swizzled code, not used here
 * @param {string} name - The name of the measurement
 * @return {bool} isDegree - True if the measurment is a degree measurement
 */
export function isDegreeMeasurement(Swizzled, name) {
  return Swizzled.config.degreeMeasurements.indexOf(name) !== -1
}
/*
 * Helper method to check whether measururements are missing
 *
 * Note that this does not actually check the settings against
 * the chose design, but rather relies on the missing measurements
 * being set in state. That's because checking is more expensive,
 * so we do it only once in the non-Swizzled ViewWrapper components
 *
 * @param {object} Swizzled - Object holding Swizzled code
 * @param {object } state - The Editor state
 * @return {bool} missing - True if there are missing measurments, false if not
 */
export function missingMeasurements(Swizzled, state) {
  return (
    !Swizzled.config.measurementsFreeViews.includes(state.view) &&
    state._.missingMeasurements &&
    state._.missingMeasurements.length > 0
  )
}
/*
 * This takes a POJO of measurements, and turns it into a structure that matches a design object
 *
 * @param {object} Swizzled - Swizzled code, not used here
 * @param {object} measurements - The POJO of measurments
 * @return {object} design - The measurements structured as a design object
 */
export function structureMeasurementsAsDesign(Swizzled, measurements) {
  return measurements.patternConfig ? measurements : { patternConfig: { measurements } }
}
