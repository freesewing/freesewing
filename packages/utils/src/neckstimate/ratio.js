/*
 * Since linear measurements don't scale the same as circumference
 * measurements, we apply a correction ratio.
 */

let a = 0.5 // arc
let c = 1 // circumference
let v = 0.65 // vertical

export default {
  // Arc measurements
  bustFront: a,
  bustSpan: a,
  highBustFront: a,
  // Circumference measurements
  ankleCircumference: c,
  bicepsCircumference: c,
  chestCircumference: c,
  highBust: c,
  hipsCircumference: c,
  neckCircumference: c,
  underbust: c,
  // Vertical measurements
  crotchDepth: v,
  hpsToBust: v,
  hpsToWaistBack: v,
  hpsToWaistFront: v,
  waistToHips: v,
  waistToKnee: v,
  waistToSeat: v,
  waistToUnderbust: v,
  waistToUpperLeg: v,
  // Other
  backSeat: 0.6,
  backWaist: 0.85,
  crossSeam: 0.6,
  frontCrossSeam: 0.3,
  headCircumference: 0.35,
  inseam: 0.25,
  kneeCircumference: 0.65,
  seatCircumference: 0.6,
  shoulderToElbow: 0.5,
  shoulderToShoulder: 0.75,
  shoulderToWrist: 0.3,
  upperLegCircumference: 0.45,
  waistCircumference: 0.85,
  waistToFloor: 0.4,
  wristCircumference: 0.5
}
