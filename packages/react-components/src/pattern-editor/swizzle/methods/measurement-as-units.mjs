/**
 * Converts a millimeter value to a Number value in the given units
 *
 * @param {object} Swizzled - Swizzled code, not used here
 * @param {number} mmValue - The input value in millimeter
 * @param {string} units - One of 'metric' or 'imperial'
 * @result {number} result - The result in millimeter
 */
export const measurementAsUnits = (Swizzled, mmValue, units = 'metric') =>
  Swizzled.methods.round(mmValue / (units === 'imperial' ? 25.4 : 10), 3)
