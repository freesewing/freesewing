/*
 * Since linear measurements don't scale the same as circumference
 * measurements, we apply a correction ratio.
 */

let a = 0.5 // arc
let c = 1 // circumference
let v = 0.75 // vertical

export default {
  // Arc measurements
  bustFront: a,
  bustSpan: a,
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
  hpsToBust: v,
  hpsToWaistBack: v,
  hpsToWaistFront: v,
  inseam: v,
  seatDepth: v,
  shoulderToElbow: v,
  shoulderToWrist: v,
  waistToFloor: v,
  waistToHips: v,
  waistToKnee: v,
  waistToSeat: v,
  waistToUnderbust: v,
  waistToUpperLeg: v
}
