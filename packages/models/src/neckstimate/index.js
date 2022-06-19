import withBreasts from './with-breasts'
import withoutBreasts from './without-breasts'
import ratio from './ratio'

// This estimates a measurement based on the neck
const neckstimate = (neck = false, measurement = false, breasts = false, noRound=false) => {
  let data = breasts ? withBreasts : withoutBreasts

  // Shoulder slope is in degrees now. Always return de default.
  if (measurement === 'shoulderSlope') return withBreasts.shoulderSlope

  if (!neck) throw new Error('neckstimate() requires a neck measurement in mm as first parameter')
  if (!measurement) {
    // No measurement passed
    throw new Error(
      'new neckstimate() requires a valid measurement name as second parameter. (received ' +
        JSON.stringify(measurement) +
        ')'
    )
  }
  if (typeof data[measurement] === 'undefined') {
    if (typeof withBreasts[measurement] === 'undefined') {
      // We used to throw this error, but let's just return null instead so things don't go off the rails
      console.log(
        new Error(`neckstimate() called with an invalid measurement name (${measurement})`)
      )
      return null
    } else {
      console.log(
        `WARNING: neckstimate() called for a breasts-only measurement (${measurement}) on a no-breasts person`
      )
      // Return something anyway, rather than fall over
      data = withBreasts
    }
  }

  // This is what should happen
  let delta = (neck / data.neck) * data[measurement] - data[measurement]

  return noRound
    ? data[measurement] + delta * ratio[measurement]
    : Math.round(data[measurement] + delta * ratio[measurement])
}

export default neckstimate
