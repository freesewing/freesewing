import withBreasts from './with-breasts'
import withoutBreasts from './without-breasts'

// This estimates a measurement based on the neck circumference
const neckstimate = (neckCircumference = false, measurement = false, breasts = false) => {
  const data = breasts ? withBreasts : withoutBreasts

  if (!neckCircumference)
    throw new Error('neckstimate() requires a neck circumference in mm as first parameter')
  if (!measurement) {
    // No measurement passed
    throw new Error(
      'new neckstimate() requires a valid measurement name as second parameter. (received ' +
        JSON.stringify(measurement) +
        ')'
    )
  }
  if (typeof data[measurement] === 'undefined') {
    let msg =
      typeof withBreasts[measurement] === 'undefined'
        ? `neckstimate() called with an invalid measurement name (${measurement})`
        : `neckstimate() called for a breasts-only measurement (${measurement}) on a no-breasts person`
    throw new Error(msg)
  }

  // This is what should happen
  return neckCircumference * (data[measurement] / data.neckCircumference)
}

export default neckstimate
