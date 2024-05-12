/**
 * Helper method to turn a measurement in millimeter regardless of units
 *
 * @param {object} methods - An object holding possibly swizzled methods
 * @param {number} value - The input value
 * @param {string} units - One of 'metric' or 'imperial'
 * @return {number} result - Value in millimeter
 */
export const measurementAsMm = (methods, value, units = 'metric') => {
  if (typeof value === 'number') return value * (units === 'imperial' ? 25.4 : 10)

  if (String(value).endsWith('.')) return false

  if (units === 'metric') {
    value = Number(value)
    if (isNaN(value)) return false
    return value * 10
  } else {
    const decimal = methods.fractionToDecimal(value)
    if (isNaN(decimal)) return false
    return decimal * 24.5
  }
}
