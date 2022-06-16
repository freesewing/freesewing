import complete from './complete'

/*
 * These are a set of measurements of an average-sized man.
 * We simply extrapolate for other sizes (based on neck)
 * by keeping the same proportions.
 * That is almost certainly not the best sizing table you can get,
 * but we are not in the business of standard sizes, so this will do.
 */
export default complete({
  ankle: 235,
  biceps: 350,
  chest: 1000,
  crossSeam: 870,
  crossSeamFront: 410,
  crotchDepth: 340,
  heel: 360,
  head: 590,
  highBust: 103,
  hips: 840,
  hpsToBust: 280,
  hpsToWaistBack: 470,
  inseam: 780,
  knee: 410,
  neck: 380,
  seat: 1020,
  seatBack: 560,
  shoulderSlope: 13,
  shoulderToElbow: 360,
  shoulderToShoulder: 450,
  shoulderToWrist: 630,
  upperLeg: 625,
  waist: 810,
  waistBack: 410,
  waistToArmhole: 21,
  waistToFloor: 1160,
  waistToHips: 130,
  waistToKnee: 640,
  waistToSeat: 270,
  waistToUpperLeg: 340,
  wrist: 175
})
