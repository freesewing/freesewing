import tlds from 'tlds/index.json' with { type: 'json' }
import { cloudflare as cloudflareConfig } from '@freesewing/config'
import _get from 'lodash/get.js'
import _set from 'lodash/set.js'
import _unset from 'lodash/unset.js'
import _orderBy from 'lodash/orderBy.js'
import { loadingMessages } from './loading-messages.mjs'
import { Path, Point } from '@freesewing/core'

/*
 * Re-export lodash utils
 */
export const get = _get
export const set = _set
export const unset = _unset
export const orderBy = _orderBy

/*
 * VARIABLES
 */

/*
 * CSS classes to  spread icon + text horizontally on a button
 */
export const horFlexClasses =
  'tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-4 tw-w-full'

/*
 * CSS classes to  spread icon + text horizontally on a button, only from md upwards
 */
export const horFlexClassesNoSm =
  'md:tw-flex md:tw-flex-row md:tw-items-center md:tw-justify-between md:tw-gap-4 tw-w-full'

/*
 * These classes are what makes a link a link
 */
export const linkClasses = 'tw-text-secondary hover:tw-underline hover:tw-cursor-pointer'

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

/**
 * A method to clone objects
 *
 * Note that as this uses JSON, this can only clone what can be serialized.
 *
 * @param {object} obj - The object to clone
 * @return {object} clone - The cloned object
 */
export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
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

/**
 * Determines the design option type based on the option's config
 *
 * @param {object} option - The option config
 * @return {string} type - The option type
 */
export function designOptionType(option) {
  if (typeof option?.pct !== 'undefined') return 'pct'
  if (typeof option?.bool !== 'undefined') return 'bool'
  if (typeof option?.count !== 'undefined') return 'count'
  if (typeof option?.deg !== 'undefined') return 'deg'
  if (typeof option?.list !== 'undefined') return 'list'
  if (typeof option?.mm !== 'undefined') return 'mm'

  return 'constant'
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

/*
 * Formats a number
 *
 * @params {number} nun = The original number
 * @params {string} suffix = Any suffix to add
 * @return {string} newNumber - The formatted number
 */
export const formatNumber = (num, suffix = '') => {
  if (num === null || typeof num === 'undefined') return num
  if (typeof num.value !== 'undefined') num = num.value
  // Small values don't get formatted
  if (num < 1) return num
  if (num) {
    const sizes = ['', 'K', 'M', 'B']
    const i = Math.min(
      parseInt(Math.floor(Math.log(num) / Math.log(1000)).toString(), 10),
      sizes.length - 1
    )
    return `${(num / 1000 ** i).toFixed(i ? 1 : 0)}${sizes[i]}${suffix}`
  }

  return '0'
}

/**
 * Format a percentage (as in, between 0 and 1)
 *
 * @param {number} val - The value
 * @return {string} pct - The value formatted as percentage
 */
export function formatPercentage(val) {
  return Math.round(1000 * val) / 10 + '%'
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

/**
 * Helper method to determine whether all required measurements for a design are present
 *
 * @param {object} Design - The FreeSewing design (or a plain object holding measurements)
 * @param {object} measurements - An object holding the user's measurements
 * @return {array} result - An array where the first element is true when we
 * have all measurements, and false if not. The second element is a list of
 * missing measurements.
 */
export function hasRequiredMeasurements(Design, measurements = {}) {
  /*
   * If design is just a plain object holding measurements, we restructure it as a Design
   * As it happens, this method is smart enough to test for this, so we call it always
   */
  Design = structureMeasurementsAsDesign(Design)

  /*
   * Walk required measurements, and keep track of what's missing
   */
  const missing = []
  for (const m of Design.patternConfig?.measurements || []) {
    if (typeof measurements[m] === 'undefined') missing.push(m)
  }

  /*
   * Return true or false, plus a list of missing measurements
   */
  return [missing.length === 0, missing]
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
 * Helper method to handle updates to nested object properties
 *
 * This is mostly using lodash.set but also has a quirk
 * where passing 'unset' as value unsets the value
 *
 * @param {object} obj - The object to mutate
 * @param {string|array} path - The path to the property to change, either an array or dot notation
 * @param {mixed} val - The value to set it to, or 'unset' to remove/unset it
 * @return {object} obj - The mutated object
 */
export const mutateObject = (obj = {}, path, val = 'unset') => {
  if (val === 'unset') {
    if (Array.isArray(path) && Array.isArray(path[0])) {
      for (const [ipath, ival = 'unset'] of path) {
        if (ival === 'unset') unset(obj, ipath)
        else set(obj, ipath, ival)
      }
    } else unset(obj, path)
  } else set(obj, path, val)

  return obj
}

/**
 * This calculates teh length of a path that is obtained from renderprops
 *
 * In other words, a plain POJO with the path data, and not an instantiated Path object from core.
 * This is useful if you want to know the path length after rendering.
 *
 * @param {object} path - A path object as available from renderProps
 * @return {number} length - The path length in mm
 */
export function pathLength(path) {
  let p = new Path()
  for (const op of path.ops) {
    if (op.type === 'move') p = p.move(new Point(op.to.x, op.to.y))
    if (op.type === 'line') p = p.line(new Point(op.to.x, op.to.y))
    if (op.type === 'curve')
      p = p.curve(
        new Point(op.cp1.x, op.cp1.y),
        new Point(op.cp2.x, op.cp2.y),
        new Point(op.to.x, op.to.y)
      )
    if (op.type === 'close') p = p.close()
  }

  return p.length()
}

/** Generate a URL to create a new pattern with a given design, settings, and view */
export const patternUrlFromState = (state = {}, includeMeasurements = false, view = 'draft') => {
  // Avoid changing state by accident
  const newState = clone(state)
  const measurements = includeMeasurements ? { ...(newState.settings?.measurements || {}) } : {}
  const settings = { ...(newState.settings || {}) }
  settings.measurements = measurements
  const obj = {
    design: newState.design,
    settings,
    view,
  }

  return `/editor/#s=${encodeURIComponent(JSON.stringify(obj))}`
}

/*
 * A method to ensure input is not empty
 *
 * @param {string} input - The input
 * @return {bool} notEmpty - True if input is not an emtpy strign, false of not
 */
export const notEmpty = (input) => `${input}`.length > 0

/*
 * A method to build a structured menu of design options
 */
export const optionsMenuStructure = (options, settings, asFullList = false) => {
  if (!options) return options
  const sorted = {}
  for (const [name, option] of Object.entries(options)) {
    if (typeof option === 'object') sorted[name] = { ...option, name }
  }

  const menu = {}
  // Fixme: One day we should sort this based on the translation
  for (const option of orderBy(sorted, ['order', 'menu', 'name'], ['asc', 'asc', 'asc'])) {
    if (typeof option === 'object') {
      const oType = optionType(option)
      option.dflt = option.dflt || option[oType]
      if (oType === 'pct') option.dflt /= 100
      if (typeof option.menu === 'function')
        option.menu = asFullList
          ? 'conditional'
          : option.menu(settings, mergeOptions(settings, options))
      if (option.menu) {
        // Handle nested groups that don't have any direct children
        if (option.menu.includes('.')) {
          let menuPath = []
          for (const chunk of option.menu.split('.')) {
            menuPath.push(chunk)
            set(menu, `${menuPath.join('.')}.isGroup`, true)
          }
        }
        set(menu, `${option.menu}.isGroup`, true)
        set(menu, `${option.menu}.${option.name}`, option)
      } else if (typeof option.menu === 'undefined') {
        console.log(
          `Warning: Option ${option.name} does not have a menu config. ` +
            'Either configure it, or set it to false to hide this option.'
        )
      }
    }
  }

  // Always put advanced at the end
  if (menu.advanced) {
    const adv = menu.advanced
    delete menu.advanced
    menu.advanced = adv
  }

  return menu
}

/*
 * A method to determine the option type based on its config
 */
export const optionType = (option) => {
  if (typeof option?.pct !== 'undefined') return 'pct'
  if (typeof option?.bool !== 'undefined') return 'bool'
  if (typeof option?.count !== 'undefined') return 'count'
  if (typeof option?.deg !== 'undefined') return 'deg'
  if (typeof option?.list !== 'undefined') return 'list'
  if (typeof option?.mm !== 'undefined') return 'mm'

  return 'constant'
}

/*
 * Returns a random loading message
 *
 * @return {string} msg - A random loading message
 */
export function randomLoadingMessage() {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
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
 * This takes a POJO of measurements, and turns it into a structure that matches a design object
 *
 * @param {object} measurements - The POJO of measurments
 * @return {object} design - The measurements structured as a design object
 */
export function structureMeasurementsAsDesign(measurements) {
  return measurements.patternConfig ? measurements : { patternConfig: { measurements } }
}
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

/**
 * Copies a string to the clipboard using the clipboard API
 *
 * @param {string} text - The text to copy to the clipboard
 */
export function copyToClipboard(text) {
  const textToCopy = text

  /*
   * This is only available in a secure browser context
   * So when we are running a localhost dev instance,
   * this won't work, and we fall back to the one further down.
   */
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(text).catch((error) => {
      console.error('Failed to use the clipboard API to copy text to clipboard:', error)
      copyToClipboardFallback(text)
    })
  } else {
    copyToClipboardFallback(text)
  }
}

/**
 * Copies a string to the clipboard using DOM manipulation
 *
 * @param {string} text - The text to copy to the clipboard
 */
function copyToClipboardFallback(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export function navigate(href, relative = false) {
  // Guard against non-browser use
  if (!window) return

  if (relative) window.location.href = `${window.location.origin}${href}`
  else window.location.href = href
}
