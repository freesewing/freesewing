// The completes the list of measurements with the ones
// we can calculate based on what we already have
export default function complete(m) {
  // Added by plugin-bust:
  m.bust = m.chestCircumference

  // Added by plugin-measurements:
  m.backCrossSeam = m.crossSeam - m.frontCrossSeam
  m.backSeatArc = m.backSeat / 2
  m.backWaistArc = m.backWaist / 2
  if (m.bust && m.bustFront) m.bustBack = m.bust - m.bustFront
  m.frontSeat = m.seatCircumference - m.backSeat
  m.frontSeatArc = m.frontSeat / 2
  m.frontWaist = m.waistCircumference - m.backWaist
  m.frontWaistArc = m.frontWaist / 2
  if (m.hightBust && m.highBustFront) m.highBustBack = m.highBust - m.highBustFront

  return m
}
