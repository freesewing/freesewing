import tlds from 'tlds/index.json' with { type: 'json' }
import { cloudflare as cloudflareConfig } from '@freesewing/config'

/*
 * VARIABLES
 */

/*
 * CSS classes to  spread icon + text horizontally on a button
 */
export const horFlexClasses = 'flex flex-row items-center justify-between gap-4'

/*
 * CSS classes to  spread icon + text horizontally on a button, only from md upwards
 */
export const horFlexClassesNoSm =
  'md:flex md:flex-row md:items-center md:justify-between md:gap-4 md-w-full'

/*
 * These classes are what makes a link a link
 */
export const linkClasses =
  'underline decoration-2 hover:decoration-4 text-secondary hover:text-secondary-focus'

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

/**
 * Format a number using fractions, typically used for imperial
 *
 * @param {number} fraction - the value to process
 * @param {string} format - One of
 * fraction: the value to process
 * format: one of the the type of formatting to apply. html, notags, or anything else which will only return numbers
 */
export const formatFraction128 = (fraction, format = 'html') => {
  let negative = ''
  let inches = ''
  let rest = ''
  if (fraction < 0) {
    fraction = fraction * -1
    negative = '-'
  }
  if (Math.abs(fraction) < 1) rest = fraction
  else {
    inches = Math.floor(fraction)
    rest = fraction - inches
  }
  let fraction128 = Math.round(rest * 128)
  if (fraction128 == 0) return formatImperial(negative, inches || fraction128, false, false, format)

  for (let i = 1; i < 7; i++) {
    const numoFactor = Math.pow(2, 7 - i)
    if (fraction128 % numoFactor === 0)
      return formatImperial(negative, inches, fraction128 / numoFactor, Math.pow(2, i), format)
  }

  return (
    negative +
    Math.round(fraction * 100) / 100 +
    (format === 'html' || format === 'notags' ? '"' : '')
  )
}

/*
 * Format an imperial value
 *
 * @param {bool} neg - Whether or not to render as a negative value
 * @param {number} inch - The inches
 * @param {number} numo - The fration numerator
 * @param {number} deno - The fration denominator
 * @param {string} format - One of 'html', 'notags', or anything else for numbers only
 * @return {string} formatted - The formatted value
 */
export function formatImperial(neg, inch, numo = false, deno = false, format = 'html') {
  if (format === 'html') {
    if (numo) return `${neg}${inch}&nbsp;<sup>${numo}</sup>/<sub>${deno}</sub>"`
    else return `${neg}${inch}"`
  } else if (format === 'notags') {
    if (numo) return `${neg}${inch} ${numo}/${deno}"`
    else return `${neg}${inch}"`
  } else {
    if (numo) return `${neg}${inch} ${numo}/${deno}`
    else return `${neg}${inch}`
  }
}

/**
 * Format a value in mm, taking units into account
 *
 * @param {number} val - The value to format
 * @param {units} units - Both 'imperial' and true will result in imperial, everything else is metric
 * @param {string} format - One of 'html', 'notags', or anything else for numbers only
 * @return {string} result - The formatted result
 */
export function formatMm(val, units, format = 'html') {
  val = roundDistance(val)
  if (units === 'imperial' || units === true) {
    if (val == 0) return formatImperial('', 0, false, false, format)

    let fraction = val / 25.4
    return formatFraction128(fraction, format)
  } else {
    if (format === 'html' || format === 'notags') return roundDistance(val / 10) + 'cm'
    else return roundDistance(val / 10)
  }
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
 * Get search parameters from the browser
 *
 * @param {string} name - Name of the parameter to retrieve
 * @return {string} value - Value of the parameter
 */
export function getSearchParam(name = 'id') {
  if (typeof window === 'undefined') return undefined
  return new URLSearchParams(window.location.search).get(name) // eslint-disable-line
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

/** Generate a URL to create a new pattern with a given design, settings, and view */
export const newPatternUrl = ({ design, settings = {}, view = 'draft' }) =>
  `/-/#settings=${encodeURIComponent(
    JSON.stringify(settings)
  )}&view=${encodeURIComponent('"' + view + '"')}`

/*
 * A method to ensure input is not empty
 *
 * @param {string} input - The input
 * @return {bool} notEmpty - True if input is not an emtpy strign, false of not
 */
export const notEmpty = (input) => `${input}`.length > 0

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

/*
 * Rounds a value that is a distance, either mm or inch
 *
 * @param {number} val - The value to round
 * @param {string} units - Use 'imperial' or true for imperial, anything else and you get metric
 * @return {number} rounded - The rounded value
 */
export function roundDistance(val, units) {
  return units === 'imperial' || units === true
    ? Math.round(val * 1000000) / 1000000
    : Math.round(val * 10) / 10
}

/*
 * A method to render a date in a way that is concise
 *
 * @param {number} timestamp - The timestamp to render, or current time if none is provided
 * @param {bool} withTime - Set this to true to also include time (in addition to date)
 * @return {string} date - The formatted date
 */
export function shortDate(timestamp = false, withTime = true) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  if (withTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.hour12 = false
  }
  const ts = timestamp ? new Date(timestamp) : new Date()

  return ts.toLocaleDateString('en', options)
}

/*
 * Shorten a UUID
 *
 * @param {string} uuid - The input UUID
 * @return {string} short - The shortened UUID
 */
export const shortUuid = (uuid) => uuid.slice(0, 5)

/*
 * We used to use react-timeago but that's too much overhead
 * This is a drop-in replacement that does not rerender
 *
 * @param {string/number} timestamp - The time to parse
 * @return {string} timeago - How long ago it was
 */
export function timeAgo(timestamp, terse = true) {
  const delta = new Date() - new Date(timestamp)

  const seconds = Math.floor(delta / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)
  const suffix = ' ago'

  if (seconds < 1) return 'Now'
  if (seconds === 1) return `${terse ? '1s' : '1 second'}${suffix}`
  if (seconds === 60) return `${terse ? '1m' : '1 minute'}${suffix}`
  if (seconds < 91) return `${seconds}${terse ? 's' : ' seconds'}${suffix}`
  if (minutes === 60) return `${terse ? '1h' : '1 hour'}${suffix}`
  if (minutes < 120) return `${minutes}${terse ? 'm' : ' minutes'}${suffix}`
  if (hours === 24) return `${terse ? '1d' : '1 day'}${suffix}`
  if (hours < 48) return `${hours}${terse ? 'h' : ' hours'}${suffix}`
  if (days < 61) return `${days}${terse ? 'd' : ' days'}${suffix}`
  if (months < 25) return `${months}${terse ? 'M' : ' months'}${suffix}`
  return `${years}${terse ? 'Y' : ' years'}${suffix}`
}

/**
 * Validates an email address for correct syntax
 *
 * @param {string} email - The email input to check
 * @return {bool} valid - True if it's a valid email address
 */
export function validateEmail(email) {
  /* eslint-disable */
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  /* eslint-enable */
  return re.test(email)
}

/**
 * Validates the top level domain (TLT) for an email address
 *
 * @param {string} email - The email input to check
 * @return {bool} valid - True if it's a valid email address
 */
export function validateTld(email) {
  const tld = email.split('@').pop().split('.').pop().toLowerCase()
  if (tlds.indexOf(tld) === -1) return tld
  else return true
}
