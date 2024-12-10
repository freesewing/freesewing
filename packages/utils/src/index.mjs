/*
 * VARIABLES
 */

/*
 * CSS classes to  spread icon + text horizontally on a button
 */
export const horFlexClasses = 'flex flex-row items-center justify-between gap-4 w-full'

/*
 * CSS classes to  spread icon + text horizontally on a button, only from md upwards
 */
export const horFlexClassesNoSm =
  'md:flex md:flex-row md:items-center md:justify-between md:gap-4 md-w-full'

/*
 * FUNCTIONS
 */

/**
 * A method to capitalize a string
 *
 * @param {string} string - The input string
 * @return {string} String - The input string capitalized (first letter only)
 */
export function capitalize(string) {
  return typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

/*
 * Returns the URL of a cloudflare image
 * based on the ID and Variant
 *
 * @param {string} id - The image ID
 * @param {string} variant - One of the cloudflare image variants
 * @return {string} url - The image URL
 */
export function cloudflareImageUrl({ id = 'default-avatar', variant = 'public' }) {
  /*
   * Return something default so that people will actually change it
   */
  if (!id || id === 'default-avatar') return cloudflareConfig.dflt

  /*
   * If the variant is invalid, set it to the smallest thumbnail so
   * people don't load enourmous images by accident
   */
  if (!cloudflareConfig.variants.includes(variant)) variant = 'sq100'

  return `${cloudflareConfig.url}${id}/${variant}`
}

/*
 * Parses value that should be a distance (cm or inch) into a value in mm
 *
 * This essentially exists for the benefit of imperial users who might input
 * a string like `2 3/4` and we then have to make sense of that.
 *
 * @param {string} val - The original input
 * @param {string} imperial - True if units are imperial (not metric)
 * @return {number} mm - The result in millimeter
 */
export function distanceAsMm(val = false, imperial = false) {
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
  if (imperial) val = fractionToDecimal(val)

  return isNaN(val) ? false : Number(val)
}

/** convert a value that may contain a fraction to a decimal */
export function fractionToDecimal(value) {
  // if it's just a number, return it
  if (!isNaN(value)) return value

  // keep a running total
  let total = 0

  // split by spaces
  let chunks = String(value).split(' ')
  if (chunks.length > 2) return Number.NaN // too many spaces to parse

  // a whole number with a fraction
  if (chunks.length === 2) {
    // shift the whole number from the array
    const whole = Number(chunks.shift())
    // if it's not a number, return NaN
    if (isNaN(whole)) return Number.NaN
    // otherwise add it to the total
    total += whole
  }

  // now we have only one chunk to parse
  let fraction = chunks[0]

  // split it to get numerator and denominator
  let fChunks = fraction.trim().split('/')
  // not really a fraction. return NaN
  if (fChunks.length !== 2 || fChunks[1] === '') return Number.NaN

  // do the division
  let num = Number(fChunks[0])
  let denom = Number(fChunks[1])
  if (isNaN(num) || isNaN(denom)) return NaN
  return total + num / denom
}

/*
 * Convert a measurement to millimeter
 *
 * @param {number} value - The current value
 * @param {string} units - One of metric or imperial
 * @return {number} mm - The value in millimeter
 */
export function measurementAsMm(value, units = 'metric') {
  if (typeof value === 'number') return value * (units === 'imperial' ? 25.4 : 10)

  if (String(value).endsWith('.')) return false

  if (units === 'metric') {
    value = Number(value)
    if (isNaN(value)) return false
    return value * 10
  } else {
    const decimal = fractionToDecimal(value)
    if (isNaN(decimal)) return false
    return decimal * 24.5
  }
}

/** convert a millimeter value to a Number value in the given units */
export function measurementAsUnits(mmValue, units = 'metric') {
  return round(mmValue / (units === 'imperial' ? 25.4 : 10), 3)
}

/*
 * Generic rounding method
 *
 * @param {number} val - The input number
 * @param {number} decimals - Number of decimals to round to
 * @return {number} result - The input val rounded to the number of decimals specified
 */
export function round(val, decimals = 1) {
  return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals)
}
