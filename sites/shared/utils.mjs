//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import tlds from 'tlds/index.json' assert { type: 'json' }
import _slugify from 'slugify'
import get from 'lodash.get'
import set from 'lodash.set'
import orderBy from 'lodash.orderby'
import unset from 'lodash.unset'
import { cloudflareConfig } from './config/cloudflare.mjs'
import { mergeOptions } from '@freesewing/core'
import { freeSewingConfig as config } from './config/freesewing.config.mjs'

const slugifyConfig = {
  replacement: '-', // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: true, // strip special characters except replacement, defaults to `false`
  locale: 'en', // language code of the locale to use
  trim: true, // trim leading and trailing replacement chars, defaults to `true`
}

// Slugify a string
export const slugify = (input) => _slugify(input, slugifyConfig)
// Slugify a string, but don't trim it. Handy when slugifying user input
export const slugifyNoTrim = (input) => _slugify(input, { ...slugifyConfig, trim: false })

// Method that returns a unique ID when all you need is an ID
// but you can't be certain you have one
export const getId = (id) => (id ? id : Date.now())

// Generic rounding method
export const round = (val, decimals = 1) =>
  Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals)

// Rounds a value in mm
export const roundMm = (val, units) => {
  if (units === 'imperial') return Math.round(val * 1000000) / 1000000
  else return Math.round(val * 10) / 10
}

// Formatting for imperial values
export const formatImperial = (neg, inch, numo = false, deno = false, format = 'html') => {
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
 * format a value to the nearest fraction with a denominator that is a power of 2
 * or a decimal if the value is between fractions
 * NOTE: this method does not convert mm to inches. It will turn any given value directly into its equivalent fractional representation
 *
 * fraction: the value to process
 * format: the type of formatting to apply. html, notags, or anything else which will only return numbers
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

// Format a value in mm based on the user's units
// Format can be html, notags, or anything else which will only return numbers
export const formatMm = (val, units, format = 'html') => {
  val = roundMm(val)
  if (units === 'imperial' || units === true) {
    if (val == 0) return formatImperial('', 0, false, false, format)

    let fraction = val / 25.4
    return formatFraction128(fraction, format)
  } else {
    if (format === 'html' || format === 'notags') return roundMm(val / 10) + 'cm'
    else return roundMm(val / 10)
  }
}

// Format a percentage (as in, between 0 and 1)
export const formatPercentage = (val) => Math.round(1000 * val) / 10 + '%'

export const optionType = (option) => {
  if (typeof option?.pct !== 'undefined') return 'pct'
  if (typeof option?.bool !== 'undefined') return 'bool'
  if (typeof option?.count !== 'undefined') return 'count'
  if (typeof option?.deg !== 'undefined') return 'deg'
  if (typeof option?.list !== 'undefined') return 'list'
  if (typeof option?.mm !== 'undefined') return 'mm'

  return 'constant'
}

export const capitalize = (string) =>
  typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : ''

export const getCrumbs = (app, slug = false) => {
  if (!slug) return null
  const crumbs = []
  const chunks = slug.split('/')
  for (const i in chunks) {
    const j = parseInt(i) + parseInt(1)
    const page = get(app.navigation, chunks.slice(0, j))
    if (page) crumbs.push([page.__linktitle, '/' + chunks.slice(0, j).join('/'), j < chunks.length])
  }

  return crumbs
}

/** convert a millimeter value to a Number value in the given units */
export const measurementAsUnits = (mmValue, units = 'metric') =>
  round(mmValue / (units === 'imperial' ? 25.4 : 10), 3)

/** convert a value that may contain a fraction to a decimal */
export const fractionToDecimal = (value) => {
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

export const measurementAsMm = (value, units = 'metric') => {
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

// Helper method to handle object updates
export const objUpdate = (obj = {}, path, val = 'unset') => {
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

/** Validates an email address for correct syntax */
export const validateEmail = (email) => {
  /* eslint-disable */
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  /* eslint-enable */
  return re.test(email)
}

/** Validates the top level domain (TLT) for an email address */
export const validateTld = (email) => {
  const tld = email.split('@').pop().split('.').pop().toLowerCase()
  if (tlds.indexOf(tld) === -1) return tld
  else return true
}

export const nsMerge = (...args) => {
  const ns = new Set()
  for (const arg of args) {
    if (typeof arg === 'string') ns.add(arg)
    else if (Array.isArray(arg)) {
      for (const el of nsMerge(...arg)) ns.add(el)
    }
  }

  return [...ns]
}

export const shortDate = (locale = 'en', timestamp = false, withTime = true) => {
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

  return ts.toLocaleDateString(locale, options)
}

export const yyyymmdd = (timestamp = false) => {
  const ts = timestamp ? new Date(timestamp) : new Date()

  let m = String(ts.getMonth() + 1)
  if (m.length === 1) m = '0' + m
  let d = '' + ts.getDate()
  if (d.length === 1) d = '0' + d

  return `${ts.getFullYear()}${m}${d}`
}

export const scrollTo = (id) => {
  // eslint-disable-next-line no-undef
  const el = document ? document.getElementById(id) : null
  if (el) el.scrollIntoView()
}

const structureMeasurementsAsDesign = (measurements) => ({ patternConfig: { measurements } })

export const designMeasurements = (Design, measies = {}, DesignIsMeasurementsPojo = false) => {
  if (DesignIsMeasurementsPojo) Design = structureMeasurementsAsDesign(Design)
  const measurements = {}
  for (const m of Design.patternConfig?.measurements || []) measurements[m] = measies[m]
  for (const m of Design.patternConfig?.optionalMeasurements || []) measurements[m] = measies[m]

  return measurements
}

export const hasRequiredMeasurements = (Design, measies = {}, DesignIsMeasurementsPojo = false) => {
  if (DesignIsMeasurementsPojo) Design = structureMeasurementsAsDesign(Design)
  const missing = []
  for (const m of Design.patternConfig?.measurements || []) {
    if (typeof measies[m] === 'undefined') missing.push(m)
  }

  return [missing.length === 0, missing]
}

/*
 * This expects a object from the nav tree and will filter out the know 1-char keys
 * and then check if there are any left. If there are, those are child-pages.
 */
export const pageHasChildren = (page) =>
  Object.keys(page).filter((key) => !['t', 's', 'o', 'b', 'h', '_'].includes(key)).length > 0

/*
 * Returns the slug of the page above this one
 * Or the current slug if there is no higher slug
 */
export const oneUpSlug = (slug) => {
  const chunks = slug.split('/')

  return chunks.length > 1 ? chunks.slice(0, -1).join('/') : slug
}

/*
 * Returns the slug at the max depth of the navigation root
 * We don't descend too far into the navigation because it becomes harder to find your way back
 */
export const maxPovDepthSlug = (slug, site) => {
  // Default depth
  let depth = 2

  // Split the slug
  const chunks = slug.split('/')

  // Some specific exceptions
  if (site === 'org') {
    if (chunks[0] === 'docs' && chunks[1] === 'designs') depth = 3
  }

  return chunks.length > depth ? chunks.slice(0, depth).join('/') : slug
}

/*
 * Checks whether one slug is part of another.
 * Typically used to see if a page is 'active' on the path to another page.
 * Eg: the user is on page reference/api/part so reference/api is on the way to that page
 * In that case, this will return true
 */
export const isSlugPart = (part, slug) => slug && part && slug.slice(0, part.length) === part

/*
 * Makes a properly formated path for the given locale
 * (i.e. skips adding 'en' to localized paths)
 * Expects a slug with no leading slash
 * */
export const localePath = (locale, slug) => (locale === 'en' ? '/' : `/${locale}/`) + slug

/*
 * Formats a number for display to human beings. Keeps long/high numbers short
 */
export const formatNumber = (num, suffix = '') => {
  if (num === null || typeof num === 'undefined') return num
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

/*
 * Returns the URL of a cloudflare image
 * based on the ID and Variant
 */
export const cloudflareImageUrl = ({ id = 'default-avatar', variant = 'public' }) => {
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
 * Parses value that should be a distance (cm or inch)
 */
export const parseDistanceInput = (val = false, imperial = false) => {
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

/*
 * To spread icon + text horizontal
 */
export const horFlexClasses = 'flex flex-row items-center justify-between gap-4 w-full'

/*
 * To spread icon + text horizontal but only from md upwards
 */
export const horFlexClassesNoSm =
  'md:flex md:flex-row md:items-center md:justify-between md:gap-4 md-w-full'

/*
 * A method that check that a var is not empty
 */
export const notEmpty = (thing) => `${thing}`.length > 0

/*
 * Generates a random string (used in Oauth flow)
 */
const dec2hex = (dec) => dec.toString(16).padStart(2, '0')
export const randomString = (len = 42) => {
  if (typeof window === 'undefined') return '' // eslint-disable-line
  const arr = new Uint8Array(len / 2)
  window.crypto.getRandomValues(arr) // eslint-disable-line
  return Array.from(arr, dec2hex).join('')
}

/*
 * Gets the pattern namespaces based on patternConfig
 */
export const patternNsFromPatternConfig = (config) => {
  const ns = new Set()
  for (const part of config.draftOrder) ns.add(part.split('.')[0])

  return [...ns]
}

export const newPatternUrl = ({ design, settings = {}, view = 'draft' }) =>
  `/new/${design}/#settings=${encodeURIComponent(
    JSON.stringify(settings)
  )}&view=${encodeURIComponent('"' + view + '"')}`

export const workbenchHash = ({ settings = {}, view = 'draft' }) =>
  `#settings=${encodeURIComponent(JSON.stringify(settings))}&view=${encodeURIComponent(
    '"' + view + '"'
  )}`

export const getSearchParam = (name = 'id') =>
  typeof window === 'undefined' ? undefined : new URLSearchParams(window.location.search).get(name) // eslint-disable-line

export const slugToOgImg = (slug, language) => `${language}_${slug.split('/').join('_')}.png`

export const ogUrl = ({ site = false, title, intro }) =>
  `${config.backend}/img/${encodeURIComponent(JSON.stringify({ site, title, intro }))}`
