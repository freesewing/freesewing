import complete from './complete'

/*
 * These are a set of measurements of an average-sized woman.
 * We simply extrapolate for other sizes (based on neckCircumference)
 * by keeping the same proportions.
 * That is almost certainly not the best sizing table you can get,
 * but we are not in the business of standard sizes, so this will do.
 */

export default complete({
  ankleCircumference: 245,
  backSeat: 520,
  backWaist: 380,
  bicepsCircumference: 270,
  bustFront: 480,
  bustSpan: 160,
  chestCircumference: 925,
  crossSeam: 740,
  crotchDepth: 270,
  frontCrossSeam: 370,
  headCircumference: 565,
  highBust: 865,
  highBustFront: 440,
  hipsCircumference: 900,
  hpsToBust: 275,
  hpsToWaistBack: 395,
  hpsToWaistFront: 400,
  inseam: 765,
  kneeCircumference: 380,
  neckCircumference: 340,
  seatCircumference: 1010,
  shoulderSlope: 13,
  shoulderToElbow: 340,
  shoulderToShoulder: 415,
  shoulderToWrist: 590,
  underbust: 780,
  upperLegCircumference: 570,
  waistCircumference: 750,
  waistToFloor: 1050,
  waistToHips: 125,
  waistToKnee: 600,
  waistToSeat: 250,
  waistToUnderbust: 80,
  waistToUpperLeg: 285,
  wristCircumference: 165
})
