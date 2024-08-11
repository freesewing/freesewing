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
export const missingMeasurements = (Swizzled, state) =>
  !Swizzled.config.measurementsFreeViews.includes(state.view) &&
  state._.missingMeasurements &&
  state._.missingMeasurements.length > 0
