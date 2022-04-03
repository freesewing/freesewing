import complete from './complete'

/*
 * These are a set of measurements of an average-sized woman.
 * We simply extrapolate for other sizes (based on neck)
 * by keeping the same proportions.
 * That is almost certainly not the best sizing table you can get,
 * but we are not in the business of standard sizes, so this will do.
 */

export default complete({
  ankle: 245,
  biceps: 270,
  bustFront: 480,
  bustPointToUnderbust: 100,
  bustSpan: 160,
  chest: 925,
  crossSeam: 740,
  crossSeamFront: 370,
  crotchDepth: 270,
  heel: 315,
  head: 565,
  highBust: 865,
  highBustFront: 440,
  hips: 900,
  hpsToBust: 275,
  hpsToWaistBack: 395,
  hpsToWaistFront: 400,
  inseam: 765,
  knee: 380,
  neck: 340,
  seat: 1010,
  seatBack: 520,
  shoulderSlope: 13,
  shoulderToElbow: 340,
  shoulderToShoulder: 415,
  shoulderToWrist: 590,
  underbust: 780,
  upperLeg: 570,
  waist: 750,
  waistBack: 380,
  waistToArmhole: 17,
  waistToFloor: 1050,
  waistToHips: 125,
  waistToKnee: 600,
  waistToSeat: 250,
  waistToUnderbust: 80,
  waistToUpperLeg: 285,
  wrist: 165
})
