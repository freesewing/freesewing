import tlds from 'tlds/index.json' assert { type: 'json' }
import get from 'lodash.get'
import set from 'lodash.set'
import orderBy from 'lodash.orderby'
import unset from 'lodash.unset'

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
  if (units === 'imperial') {
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

export const strapiImage = (
  img,
  sizes = ['thumbnail', 'xlarge', 'large', 'medium', 'small', 'xsmall']
) => {
  const image = {
    caption: img.caption || '',
    w: img.width,
    h: img.height,
    url: img.url,
    sizes: {},
  }
  for (const size of sizes) {
    if (img.formats[size])
      image.sizes[size] = {
        w: img.formats[size].width,
        h: img.formats[size].height,
        url: img.formats[size].url,
      }
  }

  // Some images only have a small original, and thus no (resized) sizes
  // In that case, return the original for the requested size
  if (Object.keys(image.sizes).length < 1) {
    for (const size of sizes) {
      image.sizes[size] = {
        w: img.width,
        h: img.height,
        url: img.url,
      }
    }
  }

  return image
}

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

export const optionsMenuStructure = (options) => {
  if (!options) return options
  const sorted = {}
  for (const [name, option] of Object.entries(options)) {
    if (typeof option === 'object') sorted[name] = { ...option, name }
  }

  const menu = {}
  // Fixme: One day we should sort this based on the translation
  for (const option of orderBy(sorted, ['menu', 'name'], ['asc'])) {
    if (typeof option === 'object') {
      const oType = optionType(option)
      option.dflt = option.dflt || option[oType]
      if (oType === 'pct') option.dflt /= 100
      if (option.menu) {
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
    } else console.log('Unexpected namespect type:', { arg })
  }

  return [...ns]
}

export const shortDate = (locale = 'en', timestamp = false) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
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
  Object.keys(page).filter((key) => !['t', 's', 'o', 'b', 'h'].includes(key)).length > 0

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
