/**
 * format a value to the nearest fraction with a denominator that is a power of 2
 * or a decimal if the value is between fractions
 * NOTE: this method does not convert mm to inches. It will turn any given value directly into its equivalent fractional representation
 *
 * fraction: the value to process
 * format: the type of formatting to apply. html, notags, or anything else which will only return numbers
 */
export const formatFraction128 = (Swizzled, fraction, format = 'html') => {
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
  if (fraction128 == 0)
    return Swizzled.methods.formatImperial(negative, inches || fraction128, false, false, format)

  for (let i = 1; i < 7; i++) {
    const numoFactor = Math.pow(2, 7 - i)
    if (fraction128 % numoFactor === 0)
      return Swizzled.methods.formatImperial(
        negative,
        inches,
        fraction128 / numoFactor,
        Math.pow(2, i),
        format
      )
  }

  return (
    negative +
    Math.round(fraction * 100) / 100 +
    (format === 'html' || format === 'notags' ? '"' : '')
  )
}
