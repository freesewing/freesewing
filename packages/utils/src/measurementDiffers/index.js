import neckstimate from '../neckstimate'

// This returns how many sizes a measurement differs from the neckstimate value
//   0 and 2 is great
//   2 to 5 is hmmm
//   and above 5 is probably wrong
const measurementDiffers = (
  neckCircumference,
  measurementName,
  measurementValue,
  breasts = false,
  absolute = true
) => {
  let result = Math.round((measurementValue - neckstimate(neckCircumference, measurementName, breasts)) / 20)

  return absolute
    ? Math.abs(Math.round((measurementValue - neckstimate(neckCircumference, measurementName, breasts)) / 20))
    : (measurementValue - neckstimate(neckCircumference, measurementName, breasts, true)) / 20
}

export default measurementDiffers
