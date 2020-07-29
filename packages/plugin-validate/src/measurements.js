const validateMeasurements = (m, raise) => {
  // Helper method for raise.warning
  const warn = (a, b, delta = 'lower than') => {
    raise.warning(
      `A \`${a}\` measurement that is ${delta} the \`${b}\` measurement may cause unexpected results`
    )
  }

  // Helper method to check whether m1 < m2
  const notLower = (m1, m2) => {
    if (m[m1] && m[m2] && m[m1] < m[m2]) warn(m1, m2, 'less than')
  }

  // Helper method to check whether m1 < m2/2
  const notLowerThanHalf = (m1, m2) => {
    if (m[m1] && m[m2] && m[m1] < m[m2] / 2) warn(m1, m2, 'less than half of')
  }

  /*
   * Bust / Chest
   */
  notLower('bustFront', 'highBustFront')
  notLower('bustFront', 'shoulderToShoulder')
  notLower('highBustFront', 'shoulderToShoulder')
  notLower('highBust', 'underbust')
  notLower('chest', 'underbust')
  notLowerThanHalf('bustFront', 'chest')
  notLowerThanHalf('highBustFront', 'highBust')

  /*
   * Knee / ankle / upper leg / biceps / wrist
   */
  notLower('knee', 'ankle')
  notLower('upperLeg', 'knee')
  notLower('biceps', 'wrist')

  /*
   * Neck / head
   */
  notLower('neck', 'shoulderToShoulder')
  notLower('head', 'neck')

  /*
   * Waist / Hips / Seat
   */
  notLower('seat', 'hips')
  notLower('hips', 'waist')
  notLower('seat', 'waist')
  notLower('seatBack', 'seat')
  notLower('waistBack', 'waist')

  /*
   * Cross seam
   */
  notLowerThanHalf('crossSeamFront', 'crossSeam')

  /*
   * Vertical measurements
   */
  notLower('waistToUpperLeg', 'crotchDepth')
  notLower('hpsToWaistFront', 'hpsToWaistBack')
  notLower('hpsToWaist', 'hpsToBust')
  notLower('hpsToHips', 'hpsToWaist')
  notLower('waistToKnee', 'waistToUpperleg')
  notLower('waistToUpperLeg', 'waistToSeat')
  notLower('waistToSeat', 'waistToHips')
  notLower('waistToFloor', 'waistToKnee')
  notLower('shoulderToWrist', 'shoulderToElbow')
}

export default validateMeasurements
