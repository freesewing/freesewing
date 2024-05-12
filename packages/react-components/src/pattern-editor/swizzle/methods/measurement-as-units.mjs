/**
 * Converts a millimeter value to a Number value in the given units
 *
 * @param {object} methods - An object holding possibly swizzled methods
 * @param {number} mmValue - The input value in millimeter
 * @param {string} units - One of 'metric' or 'imperial'
 * @result {number} result - The result in millimeter
 */
export const measurementAsUnits = (methods, mmValue, units = 'metric') =>
  methods.round(mmValue / (units === 'imperial' ? 25.4 : 10), 3)
