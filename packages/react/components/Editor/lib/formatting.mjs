import React from 'react'
import { designOptionType } from '@freesewing/utils'
import { BoolNoIcon, BoolYesIcon } from '@freesewing/react/components/Icon'

/*
 * Method that capitalizes a string (make the first character uppercase)
 *
 * @param {string} string - The input string to capitalize
 * @return {string} String - The capitalized input string
 */
export function capitalize(string) {
  return typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

export function formatDesignOptionValue(option, value, imperial) {
  const oType = designOptionType(option)
  if (oType === 'pct') return formatPercentage(value ? value : option.pct / 100)
  if (oType === 'deg') return `${value ? value : option.deg}°`
  if (oType === 'bool')
    return typeof value === 'undefined' ? option.bool : value ? <BoolYesIcon /> : <BoolNoIcon />
  if (oType === 'mm') return formatMm(typeof value === 'undefined' ? option.mm : value, imperial)
  if (oType === 'list') return typeof value === 'undefined' ? option.dflt : value

  return value
}

/**
 * format a value to the nearest fraction with a denominator that is a power of 2
 * or a decimal if the value is between fractions
 * NOTE: this method does not convert mm to inches. It will turn any given value directly into its equivalent fractional representation
 *
 * fraction: the value to process
 * format: the type of formatting to apply. html, notags, or anything else which will only return numbers
 */
export function formatFraction128(fraction, format = 'html') {
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

// Formatting for imperial values
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

// Format a value in mm based on the user's units
// Format can be html, notags, or anything else which will only return numbers
export function formatMm(val, units, format = 'html') {
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
export function formatPercentage(val) {
  return Math.round(1000 * val) / 10 + '%'
}

/**
 * A generic rounding method
 *
 * @param {number} val - The input number to round
 * @param {number} decimals - The number of decimal points to use when rounding
 * @return {number} result - The rounded number
 */
export function round(methods, val, decimals = 1) {
  return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

// Rounds a value in mm
export function roundMm(val, units) {
  if (units === 'imperial') return Math.round(val * 1000000) / 1000000
  else return Math.round(val * 10) / 10
}

/**
 * Converts a value that contain a fraction to a decimal
 *
 * @param {number} value - The input value
 * @return {number} result - The resulting decimal value
 */
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

/**
 * Helper method to turn a measurement in millimeter regardless of units
 *
 * @param {number} value - The input value
 * @param {string} units - One of 'metric' or 'imperial'
 * @return {number} result - Value in millimeter
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

/**
 * Converts a millimeter value to a Number value in the given units
 *
 * @param {number} mmValue - The input value in millimeter
 * @param {string} units - One of 'metric' or 'imperial'
 * @result {number} result - The result in millimeter
 */
export function measurementAsUnits(mmValue, units = 'metric') {
  return round(mmValue / (units === 'imperial' ? 25.4 : 10), 3)
}
export function shortDate(locale = 'en', timestamp = false, withTime = true) {
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
/*
 * Parses value that should be a distance (cm or inch)
 *
 * @param {number} val - The input value
 * @param {bool} imperial - True if the units are imperial, false for metric
 * @return {number} result - The distance in the relevant units
 */
export function parseDistanceInput(val = false, imperial = false) {
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
