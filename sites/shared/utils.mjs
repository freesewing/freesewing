import get from 'lodash.get'
import set from 'lodash.set'
import orderBy from 'lodash.orderby'

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
    if (numo) return `<span>${neg}${inch}"&nbsp;<sup>${numo}</sup>/<sub>${deno}</sub></span>`
    else return `<span>${neg}${inch}"</span>`
  } else if (format === 'notags') {
    if (numo) return `${neg}${inch}" ${numo}/${deno}`
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
  if (fraction128 == 0) return formatImperial(negative, inches, false, false, format)

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

export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

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

export const measurementAsMm = (value, units = 'metric') => {
  if (typeof value === 'number') return value * (units === 'imperial' ? 25.4 : 10)

  if (value.endsWith('.')) return false

  if (units === 'metric') {
    value = Number(value)
    if (isNaN(value)) return false
    return value * 10
  } else {
    const imperialFractionToMm = (value) => {
      let chunks = value.trim().split('/')
      if (chunks.length !== 2 || chunks[1] === '') return false
      let num = Number(chunks[0])
      let denom = Number(chunks[1])
      if (isNaN(num) || isNaN(denom)) return false
      else return (num * 25.4) / denom
    }
    let chunks = value.split(' ')
    if (chunks.length === 1) {
      let val = chunks[0]
      if (!isNaN(Number(val))) return Number(val) * 25.4
      else return imperialFractionToMm(val)
    } else if (chunks.length === 2) {
      let inches = Number(chunks[0])
      if (isNaN(inches)) return false
      let fraction = imperialFractionToMm(chunks[1])
      if (fraction === false) return false
      return inches * 25.4 + fraction
    }
  }
  return false
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
      if (option.menu) set(menu, `${option.menu}.${option.name}`, optionType(option))
      else if (typeof option.menu === 'undefined') {
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
