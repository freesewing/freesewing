/*
 * This takes a POJO of measurements, and turns it into a structure that matches a design object
 *
 * @param {object} methods - An object holding possibly swizzled methods (unused here)
 * @param {object} measurements - The POJO of measurments
 * @return {object} design - The measurements structured as a design object
 */
export const structureMeasurementsAsDesign = (methods, measurements) =>
  measurements.patternConfig ? measurements : { patternConfig: { measurements } }
