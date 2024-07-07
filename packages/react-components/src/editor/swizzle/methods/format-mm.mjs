// Format a value in mm based on the user's units
// Format can be html, notags, or anything else which will only return numbers
export const formatMm = (Swizzled, val, units, format = 'html') => {
  val = Swizzled.methods.roundMm(val)
  if (units === 'imperial' || units === true) {
    if (val == 0) return Swizzled.methods.formatImperial('', 0, false, false, format)

    let fraction = val / 25.4
    return Swizzled.methods.formatFraction128(fraction, format)
  } else {
    if (format === 'html' || format === 'notags') return Swizzled.methods.roundMm(val / 10) + 'cm'
    else return Swizzled.methods.roundMm(val / 10)
  }
}
