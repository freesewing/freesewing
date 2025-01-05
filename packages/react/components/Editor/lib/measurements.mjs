// Dependencies
import { defaultConfig } from '../config/index.mjs'
import { degreeMeasurements } from '@freesewing/config'

/*
 * Returns a list of measurements for a design
 *
 * @param {object} Design - The Design object
 * @param {object} measies - The current set of measurements
 * @return {object} measurements - Object holding measurements that are relevant for this design
 */
export function designMeasurements(Design, measies = {}) {
  const measurements = {}
  for (const m of Design.patternConfig?.measurements || []) measurements[m] = measies[m]
  for (const m of Design.patternConfig?.optionalMeasurements || []) measurements[m] = measies[m]

  return measurements
}

/*
 * Helper method to check whether measurements are missing
 *
 * Note that this does not actually check the settings against
 * the chosen design, but rather relies on the missing measurements
 * being set in state. That's because checking is more expensive,
 * so we do it only once.
 *
 * @param {object} state - The Editor state
 * @return {bool} missing - True if there are missing measurments, false if not
 */
export function missingMeasurements(state) {
  return (
    !defaultConfig.measurementsFreeViews.includes(state.view) &&
    state._.missingMeasurements &&
    state._.missingMeasurements.length > 0
  )
}
