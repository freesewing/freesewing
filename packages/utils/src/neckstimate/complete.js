// The completes the list of measurements with the ones
// we can calculate based on what we already have
export default function complete(m) {
  // Added by plugin-bust:
  m.bust = m.chest

  // Added by plugin-measurements:
  m.crossSeamBack = m.crossSeam - m.crossSeamFront
  m.seatBackArc = m.seatBack / 2
  m.waistBackArc = m.waistBack / 2
  if (m.bust && m.bustFront) m.bustBack = m.bust - m.bustFront
  m.seatFront = m.seat - m.seatBack
  m.seatFrontArc = m.seatFront / 2
  m.waistFront = m.waist - m.waistBack
  m.waistFrontArc = m.waistFront / 2
  if (m.hightBust && m.highBustFront) m.highBustBack = m.highBust - m.highBustFront

  return m
}
