/*
 * This takes a POJO of measurements, and turns it into a structure that matches a design object
 *
 * @param {object} Swizzled - Swizzled code, not used here
 * @param {object} measurements - The POJO of measurments
 * @return {object} design - The measurements structured as a design object
 */
export const structureMeasurementsAsDesign = (Swizzled, measurements) =>
  measurements.patternConfig ? measurements : { patternConfig: { measurements } }
