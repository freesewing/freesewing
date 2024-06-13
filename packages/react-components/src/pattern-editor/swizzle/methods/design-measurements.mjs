/*
 * Returns a list of measurements for a design
 *
 * @param {object} methods - An object holding possibly swizzled methods (unused here)
 * @param {object} Design - The Design object
 * @param {object} measies - The current set of measurements
 * @return {object} measurements - Object holding measurements that are relevant for this design
 */
export const designMeasurements = (methods, Design, measies = {}) => {
  const measurements = {}
  for (const m of Design.patternConfig?.measurements || []) measurements[m] = measies[m]
  for (const m of Design.patternConfig?.optionalMeasurements || []) measurements[m] = measies[m]

  return measurements
}
