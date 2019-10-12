import roundMm from '../roundMm'
import formatImperial from '../formatImperial'

const formatMm = (val, units, format = 'html') => {
  val = roundMm(val)
  if (units === 'imperial') {
    if (val == 0) return formatImperial('', 0, false, false, format)
    let negative = ''
    let inches = ''
    let rest = ''
    let fraction = val / 25.4
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
    if (fraction128 == 0) return formatImperial(negative, inches)
    if (fraction128 % 64 == 0) return formatImperial(negative, inches, fraction128 / 64, 2, format)
    if (fraction128 % 32 == 0) return formatImperial(negative, inches, fraction128 / 32, 4, format)
    if (fraction128 % 16 == 0) return formatImperial(negative, inches, fraction128 / 16, 8, format)
    if (fraction128 % 8 == 0) return formatImperial(negative, inches, fraction128 / 8, 16, format)
    if (fraction128 % 4 == 0) return formatImperial(negative, inches, fraction128 / 4, 32, format)
    if (fraction128 % 2 == 0) return formatImperial(negative, inches, fraction128 / 2, 64, format)
    if (format === 'html') return negative + Math.round(fraction * 100) / 100 + '"'
    else return negative + Math.round(fraction * 100) / 100
  } else {
    if (format === 'html') return roundMm(val / 10) + 'cm'
    else return roundMm(val / 10)
  }
}

export default formatMm
