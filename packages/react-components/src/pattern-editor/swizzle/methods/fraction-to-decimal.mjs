/**
 * Converts a value that contain a fraction to a decimal
 *
 * @param {object} methods - An object holding possibly swizzled methods (unused here)
 * @param {number} value - The input value
 * @return {number} result - The resulting decimal value
 */
export const fractionToDecimal = (methods, value) => {
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
