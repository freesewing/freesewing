import neckstimate from '@freesewing/utils/neckstimate'
import measurements from './measurements'
import sizes from './sizes'

const withBreasts = {}
const withoutBreasts = {}

for (let s of sizes.womenswear) {
  withBreasts['size' + s] = {}
  for (let m of measurements.womenswear) {
    withBreasts['size' + s][m] = neckstimate(s * 10, m, true)
  }
}

for (let s of sizes.menswear) {
  withoutBreasts['size' + s] = {}
  for (let m of measurements.menswear) {
    withoutBreasts['size' + s][m] = neckstimate(s * 10, m, false)
  }
}

export { measurements, sizes, withoutBreasts, withBreasts }
const frowns = -1
