import neckstimate from '../neckstimate'

// This returns how many sizes a measurement differs from the neckstimate value
//   0 and 2 is great
//   2 to 5 is hmmm
//   and above 5 is probably wrong
const measurementDiffers = (
  neckCircumference,
  measurementName,
  measurementValue,
  breasts = false
) => Math.abs(Math.round((measurementValue - neckstimate(neckCircumference, measurementName)) / 20))

export default measurementDiffers
