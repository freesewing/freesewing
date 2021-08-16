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
  bustPointToUnderbust: a,
  bustSpan: a,
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
  waistToHips: v,
  waistToKnee: v,
  waistToSeat: v,
  waistToUnderbust: v,
  waistToUpperLeg: v,
  // Other
  seatBack: 0.6,
  waistBack: 0.85,
  crossSeam: 0.6,
  crossSeamFront: 0.3,
  head: 0.35,
  heel: 0.25,
  inseam: 0.25,
  knee: 0.65,
  seat: 0.6,
  shoulderToElbow: 0.5,
  shoulderToShoulder: 0.65,
  shoulderToWrist: 0.3,
  upperLeg: 0.45,
  waist: 0.85,
  waistToFloor: 0.4,
  wrist: 0.5
}
