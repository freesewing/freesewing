/*
 * These are a set of measurements of an average-sized [woman, man].
 * We simply extrapolate for other sizes (based on neck)
 * by keeping the same proportions.
 * That is almost certainly not the best sizing table you can get,
 * but we are not in the business of standard sizes, so this will do.
 */

// This signifies the index in the array of a measurements' value
export const CISFEMALE = 0
export const CISMALE = 1

const base = {
  ankle: [245, 235],
  biceps: [270, 350],
  bustFront: [480, 560], // FIXME: Estimate
  bustPointToUnderbust: [100, 60], // FIXME: Estimate
  bustSpan: [160, 190], // FIXME: Estimate
  chest: [925, 1000],
  crossSeam: [740, 870],
  crossSeamFront: [370, 410],
  crotchDepth: [270, 340],
  heel: [315, 360],
  head: [565, 590],
  highBust: [865, 1030],
  highBustFront: [440, 570], // FIXME: Estimate
  hips: [900, 840],
  hpsToBust: [275, 280],
  hpsToWaistBack: [395, 470],
  hpsToWaistFront: [400, 460], // FIXME: Estimate
  inseam: [765, 780],
  knee: [380, 410],
  neck: [340, 380],
  seat: [1010, 1020],
  seatBack: [520, 560],
  shoulderSlope: [13, 13],
  shoulderToElbow: [340, 360],
  shoulderToShoulder: [415, 450],
  shoulderToWrist: [590, 630],
  underbust: [780, 980], // FIXME: Estimate
  upperLeg: [570, 625],
  waist: [750, 810],
  waistBack: [380, 410],
  waistToArmpit: [170, 210],
  waistToFloor: [1050, 1160],
  waistToHips: [125, 130],
  waistToKnee: [600, 640],
  waistToSeat: [250, 270],
  waistToUnderbust: [80, 55], // FIXME: Estimate
  waistToUpperLeg: [285, 340],
  wrist: [165, 175],
}

/*
 * Since linear measurements don't scale the same as circumference
 * measurements, we apply a correction ratio.
 */
let a = 0.5 // arc
let c = 1 // circumference
let v = 0.65 // vertical
const ratio = {
  // Arc measurements
  bustFront: a,
  bustBack: a,
  bustPointToUnderbust: a,
  bustSpan: a,
  highBustBack: a,
  highBustFront: a,
  // Circumference measurements
  ankle: c,
  biceps: c,
  chest: c,
  highBust: c,
  hips: c,
  neck: c,
  underbust: c,
  // Vertical measurements
  crotchDepth: v,
  hpsToBust: v,
  hpsToWaistBack: v,
  hpsToWaistFront: v,
  waistToArmpit: v,
  waistToHips: v,
  waistToKnee: v,
  waistToSeat: v,
  waistToUnderbust: v,
  waistToUpperLeg: v,
  // Other
  crossSeam: 0.6,
  crossSeamFront: 0.6,
  crossSeamBack: 0.6,
  head: 0.35,
  heel: 0.25,
  inseam: 0.25,
  knee: 0.65,
  seat: 0.6,
  seatBack: 0.6,
  seatBackArc: 0.6,
  seatFront: 0.6,
  seatFrontArc: 0.6,
  shoulderToElbow: 0.5,
  shoulderToShoulder: 0.65,
  shoulderToWrist: 0.3,
  upperLeg: 0.45,
  waist: 0.85,
  waistBack: 0.85,
  waistBackArc: 0.85,
  waistFront: 0.85,
  waistFrontArc: 0.85,
  waistToFloor: 0.4,
  wrist: 0.5,
}

export const measurements = Object.keys(base)

// This estimates a measurement based on the neck
export const neckstimate = (neck = false, measurement = false, i = 0, noRound = false) => {
  if (typeof base[measurement] === 'undefined') {
    console.log(new Error(`neckstimate() called with an invalid measurement name (${measurement})`))
    return null
  }
  if (!measurement) {
    // No measurement passed
    throw new Error(
      'new neckstimate() requires a valid measurement name as second parameter. (received ' +
        JSON.stringify(measurement) +
        ')'
    )
  }

  // Shoulder slope is in degrees. Always return the base.
  if (measurement === 'shoulderSlope') return base.shoulderSlope[i]

  if (!neck) throw new Error('neckstimate() requires a neck measurement in mm as first parameter')

  // This is what should happen
  const delta = (neck / base.neck[i]) * base[measurement][i] - base[measurement][i]

  return noRound
    ? base[measurement][i] + delta * ratio[measurement]
    : Math.round(base[measurement][i] + delta * ratio[measurement])
}
