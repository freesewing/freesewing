function CreateCrotchPoints(part) {
  let { options, measurements, points, store, Path } = part.shorthand()

  let hem = store.get('hem')

  let seatDepth = (measurements.crotchDepth /* - measurements.waistToHips */) * (1 + options.waistRaise)
  let circumference = measurements.seat
  let circumference4 = circumference / 4

  points.mHip = points.mWaist.shift(270, seatDepth)

  points.fWaistSide = points.mWaist
    .shift(180, options.crotchFront * circumference4)
    .shift(90, store.get('waistBand'))
  points.fWaistCrotchCP = points.fWaistSide.shift(
    270,
    seatDepth * options.crotchFactorFrontVer + store.get('waistBand')
  )
  points.fHipCrotchCP = points.mHip.shift(
    180,
    options.crotchFront * circumference4 * options.crotchFactorFrontHor
  )

  points.fHipSide = points.mHip.shift(180, options.crotchFront * circumference4)

  points.bWaistSide = points.mWaist
    .shift(0, options.crotchBack * circumference4)
    .shift(90, store.get('waistBand'))
    .shift(90, options.backRaise * seatDepth)
  points.bWaistCrotchCP = points.bWaistSide.shift(270, seatDepth * options.crotchFactorBackVer)
  points.bHipCrotchCP = points.mHip.shift(
    0,
    options.crotchBack * circumference4 * options.crotchFactorBackHor
  )

  points.bHipSide = points.mHip.shift(0, options.crotchBack * circumference4)

  points.fCutOutHip = (new Path().move(points.fWaistSide)
  .curve(points.fWaistCrotchCP, points.fHipCrotchCP, points.mHip)).shiftAlong(measurements.waistToHips +hem)
  points.bCutOutHip = (new Path().move(points.bWaistSide)
  .curve(points.bWaistCrotchCP, points.bHipCrotchCP, points.mHip)).shiftAlong(measurements.waistToHips +hem)

  let waistCircumferenceBack4 = (measurements.waistBack /4)
  let waistCircumferenceFront4 = ((measurements.waist -measurements.waistBack) /4)

  console.log({waistCircumferenceBack4:waistCircumferenceBack4})
  console.log({waistCircumferenceFront4:waistCircumferenceFront4})

  points.bWaistAdjusted = points.bWaistSide.shift(0, waistCircumferenceBack4 *options.backWaistAdjustment)
  points.fWaistAdjusted = points.fWaistSide.shift(180, waistCircumferenceFront4 *options.frontWaistAdjustment)

}

export { CreateCrotchPoints }
