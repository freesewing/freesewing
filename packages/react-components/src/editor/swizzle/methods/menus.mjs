/**
 * round a value to the correct number of decimal places to display all supplied digits after multiplication
 * this is a workaround for floating point errors
 * examples:
 * roundPct(0.72, 100) === 72
 * roundPct(7.5, 0.01) === 0.075
 * roundPct(7.50, 0.01) === 0.0750
 * @param {object} Swizzled - Swizzled code, not used here
 * @param  {Number} num the number to be operated on
 * @param  {Number} factor the number to multiply by
 * @return {Number}     the given num multiplied by the factor, rounded appropriately
 */
export const menuRoundPct = (Swizzled, num, factor) => {
  const { round } = Swizzled.methods
  // stringify
  const str = '' + num
  // get the index of the decimal point in the number
  const decimalIndex = str.indexOf('.')
  // get the number of places the factor moves the decimal point
  const factorPlaces = factor > 0 ? Math.ceil(Math.log10(factor)) : Math.floor(Math.log10(factor))
  // the number of places needed is the number of digits that exist after the decimal minus the number of places the decimal point is being moved
  const numPlaces = Math.max(0, str.length - (decimalIndex + factorPlaces))
  return round(num * factor, numPlaces)
}

const menuNumericInputMatcher = /^-?[0-9]*[.,eE]?[0-9]+$/ // match a single decimal separator
const menuFractionInputMatcher = /^-?[0-9]*(\s?[0-9]+\/|[.,eE])?[0-9]+$/ // match a single decimal separator or fraction

/**
 * Validate and parse a value that should be a number
 * @param {object} Swizzled - Swizzled code, not used here
 * @param  {any}  val            the value to validate
 * @param  {Boolean} allowFractions should fractions be considered valid input?
 * @param  {Number}  min            the minimum allowable value
 * @param  {Number}  max            the maximum allowable value
 * @return {null|false|Number}      null if the value is empty,
 *                                  false if the value is invalid,
 *                                  or the value parsed to a number if it is valid
 */
export const menuValidateNumericValue = (
  Swizzled,
  val,
  allowFractions = true,
  min = -Infinity,
  max = Infinity
) => {
  // if it's empty, we're neutral
  if (typeof val === 'undefined' || val === '') return null

  // make sure it's a string
  val = ('' + val).trim()

  // get the appropriate match pattern and check for a match
  const matchPattern = allowFractions ? menuFractionInputMatcher : menuNumericInputMatcher
  if (!val.match(matchPattern)) return false

  // replace comma with period
  const parsedVal = val.replace(',', '.')
  // if fractions are allowed, parse for fractions, otherwise use the number as a value
  const useVal = allowFractions ? fractionToDecimal(parsedVal) : parsedVal

  // check that it's a number and it's in the range
  if (isNaN(useVal) || useVal > max || useVal < min) return false

  // all checks passed. return the parsed value
  return useVal
}

/**
 * Check to see if a value is different from its default
 * @param {object} Swizzled - Swizzled code, not used here
 * @param {Number|String|Boolean} current the current value
 * @param {Object} config  configuration containing a dflt key
 * @return {Boolean}         was the value changed?
 */
export const menuValueWasChanged = (Swizzled, current, config) => {
  if (typeof current === 'undefined') return false
  if (current == config.dflt) return false

  return true
}
