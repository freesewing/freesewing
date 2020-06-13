/*
 * Since linear measurements don't scale the same as circumference
 * measurements, we apply a correction ratio.
 */

let a = 0.5 // arc
let c = 1 // circumference
let v = 0.65 // vertical

export default {
  // Arc measurements
  backSeat: a,
  backWaist: a,
  bustFront: a,
  bustSpan: a,
  crossSeam: a,
  frontCrossSeam: a,
  highBustFront: a,
  shoulderToShoulder: a,
  // Circumference measurements
  ankleCircumference: c,
  bicepsCircumference: c,
  chestCircumference: c,
  headCircumference: c,
  highBust: c,
  hipsCircumference: c,
  kneeCircumference: c,
  neckCircumference: c,
  seatCircumference: c,
  underbust: c,
  upperLegCircumference: c,
  waistCircumference: c,
  wristCircumference: c,
  // Vertical measurements
  crotchDepth: v,
  hpsToBust: v,
  hpsToWaistBack: v,
  hpsToWaistFront: v,
  inseam: v,
  shoulderToElbow: v,
  shoulderToWrist: v,
  waistToFloor: v,
  waistToHips: v,
  waistToKnee: v,
  waistToSeat: v,
  waistToUnderbust: v,
  waistToUpperLeg: v
}
