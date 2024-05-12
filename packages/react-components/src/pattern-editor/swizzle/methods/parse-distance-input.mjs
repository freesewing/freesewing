/*
 * Parses value that should be a distance (cm or inch)
 *
 * @param {object} methods - An object holding possibly swizzled methods
 * @param {number} val - The input value
 * @param {bool} imperial - True if the units are imperial, false for metric
 * @return {number} result - The distance in the relevant units
 */
export const parseDistanceInput = (methods, val = false, imperial = false) => {
  // No input is not valid
  if (!val) return false

  // Cast to string, and replace comma with period
  val = val.toString().trim().replace(',', '.')

  // Regex pattern for regular numbers with decimal seperator or fractions
  const regex = imperial
    ? /^-?[0-9]*(\s?[0-9]+\/|[.])?[0-9]+$/ // imperial (fractions)
    : /^-?[0-9]*[.]?[0-9]+$/ // metric (no fractions)
  if (!val.match(regex)) return false

  // if fractions are allowed, parse for fractions, otherwise use the number as a value
  if (imperial) val = methods.fractionToDecimal(val)

  return isNaN(val) ? false : Number(val)
}
